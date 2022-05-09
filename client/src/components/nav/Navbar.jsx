import "./navbar.css";
import { Logout, Menu } from "@mui/icons-material";
import { useState } from "react";
const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  console.log(showMenu);
  const toggle = () => {
    setShowMenu(!showMenu);
  };
  return (
    <div className="navbar-container">
      <div className="nav-left">
        <h1 className="logo">logo</h1>
      </div>
      <div className="nav-right">
        <div className="menu-list">
          <li className="menu-item">Drugs</li>
          <li className="menu-item">Sales</li>
          <li className="menu-item sign-out btn">
            Sign out <Logout className="ml5" />
          </li>
        </div>
        <div className={showMenu ? "menu-list-mb" : "no-show"}>
          <li className="menu-item-mb">Drugs</li>
          <li className="menu-item-mb">Sales</li>
        </div>
        <Menu className="toggler" onClick={() => toggle()} />
      </div>
    </div>
  );
};
export default Navbar;
