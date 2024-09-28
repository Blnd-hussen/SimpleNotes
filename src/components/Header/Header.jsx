import "./Header.css";
import { icons } from "@assets"

function Header(props) {
  return (
    <header className="header">
      <input 
        type="text" 
        name="search" 
        id="search-box" 
        placeholder="Search notes"
        autoComplete="off"
      />
      <div className="header__actions">
        <button onClick={() => props.onAddClick()}>
          <img src={icons['default'].add} alt="add" />
        </button>
      </div>
    </header>
  );
}

export default Header;
