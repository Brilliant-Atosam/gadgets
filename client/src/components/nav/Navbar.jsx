import "./navbar.css";
import { Logout, Menu } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const toggle = () => {
    setShowMenu(!showMenu);
  };
  return (
    <div className="navbar-container">
      <div className="nav-left">
        <Link to="/">
          <h1 className="logo">Pharm</h1>
        </Link>
      </div>
      <div className="nav-right">
        <div className="menu-list">
          <Link to="/drugs">
            <li className="menu-item">Drugs</li>
          </Link>
          <Link to="/sales">
            <li className="menu-item">Sales</li>
          </Link>
          <li className="menu-item sign-out btn">
            Sign out <Logout className="ml5" />
          </li>
        </div>
        <div className={showMenu ? "menu-list-mb" : "no-show"}>
          <Link to="/drugs">
            <li className="menu-item-mb">Drugs</li>
          </Link>
          <Link to="/sales">
            <li className="menu-item-mb">Sales</li>
          </Link>
        </div>
        <Menu className="toggler" onClick={() => toggle()} />
      </div>
    </div>
  );
};
export default Navbar;
