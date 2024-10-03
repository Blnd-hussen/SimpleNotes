import "./Header.css";
import { icons } from "@assets";
import PropTypes from "prop-types";

function Header(props) {
  return (
    <header className="header">
      <div className="searchbox-container">
        <span className="search-icon">
          <img src={icons["search"]} alt="search icon" />
        </span>
        <input
          type="text"
          name="search"
          id="search-box"
          placeholder="Search notes"
          autoComplete="off"
          onInput={(e) => props.onSearch(e.target.value.trim())}
        />
      </div>
      <div className="header__actions">
        <button onClick={() => props.onAddClick()}>
          <img src={icons["default"].add} alt="add" />
        </button>
      </div>
    </header>
  );
}

Header.propTypes = {
  onAddClick: PropTypes.func,
  onSearch: PropTypes.func,
};

export default Header;
