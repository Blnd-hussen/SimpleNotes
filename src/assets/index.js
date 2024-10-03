import remove from "./default/remove.png";
import edit from "./default/edit.png";
import pin from "./default/pin.png";
import copy from "./default/copy.png";
import unpin from "./pinned/unpin.png";
import removePinned from "./pinned/remove.png";
import editPinned from "./pinned/edit.png";
import copyPinned from "./pinned/copy.png";

import searchIcon from "./search.png";
import add from "./add.png";

export const icons = {
  search: searchIcon,
  default: {
    add: add,
    remove: remove,
    edit: edit,
    pin: pin,
    copy: copy,
  },
  pinned: {
    remove: removePinned,
    edit: editPinned,
    copy: copyPinned,
    unpin: unpin,
  },
};
