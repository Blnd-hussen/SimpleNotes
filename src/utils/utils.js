export const getDate = () => {
  const date = new Date().toJSON().slice(0, 10).split("-").reverse().join("-");

  const [hour, AMPM] = new Date()
    .toLocaleString("en-US", {
      hour: "2-digit",
      hour12: true,
    })
    .split(" ");

  const minute = new Date().toLocaleString("en-US", {
    minute: "2-digit",
    hour12: true,
  });

  return `${date} - ${hour}:${minute} ${AMPM}`;
};
