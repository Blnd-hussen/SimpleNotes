import { AES, Utf8 } from "crypto-es";

async function getDerivedKey(password, salt) {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"],
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
}

export async function encryptText(text, password) {
  const enc = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await getDerivedKey(password, salt);

  const encryptedBuffer = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv },
    key,
    enc.encode(text),
  );

  const combined = new Uint8Array(
    salt.length + iv.length + encryptedBuffer.byteLength,
  );
  combined.set(salt, 0);
  combined.set(iv, salt.length);
  combined.set(new Uint8Array(encryptedBuffer), salt.length + iv.length);

  return btoa(String.fromCharCode(...combined));
}

async function decryptTextModern(base64Payload, password) {
  const dec = new TextDecoder();
  const combined = Uint8Array.from(atob(base64Payload), (c) => c.charCodeAt(0));

  const salt = combined.slice(0, 16);
  const iv = combined.slice(16, 28);
  const data = combined.slice(28);

  const key = await getDerivedKey(password, salt);

  const decryptedBuffer = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: iv },
    key,
    data,
  );

  return dec.decode(decryptedBuffer);
}

export async function smartDecryptText(ciphertext, password) {
  if (ciphertext.startsWith("U2FsdGVkX1")) {
    const bytes = AES.decrypt(ciphertext, password);
    const decrypted = bytes.toString(Utf8);

    if (!decrypted) {
      throw new Error("Invalid password");
    }
    return decrypted;
  }

  return await decryptTextModern(ciphertext, password);
}
