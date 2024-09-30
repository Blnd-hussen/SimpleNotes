// src/assets/index.js

//* Default theme
import addDefault from "./default/add.png";
import removeDefault from "./default/remove.png";
import editDefault from "./default/edit.png";
import pinDefault from "./default/pin.png";
import copyDefault from "./default/copy.png";
import unpinDefault from "./default/pinned/unpin.png";
import removeDefaultPinned from "./default/pinned/remove.png";
import editDefaultPinned from "./default/pinned/edit.png";
import copyDefaultPinned from "./default/pinned/copy.png";

//* search icon
import searchIcon from "./search.png";

export const icons = {
  search: searchIcon,
  default: {
    pinned: {
      remove: removeDefaultPinned,
      edit: editDefaultPinned,
      copy: copyDefaultPinned,
      unpin: unpinDefault,
    },
    add: addDefault,
    remove: removeDefault,
    edit: editDefault,
    pin: pinDefault,
    copy: copyDefault,
  },
};
