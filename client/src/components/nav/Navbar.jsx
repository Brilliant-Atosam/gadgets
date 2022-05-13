import "./navbar.css";
import { Menu, TrendingUp } from "@mui/icons-material";
import LogoutSharp from "@mui/icons-material/Logout";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Logout } from "../../redux/login";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const toggle = () => {
    setShowMenu(!showMenu);
  };
  const handleLogout = () => {
    dispatch(Logout());
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
            <li className="menu-item">
              Drugs <i class="fa-solid fa-pills"></i>
            </li>
          </Link>
          <Link to="/sales">
            <li className="menu-item">
              Sales <TrendingUp />
            </li>
          </Link>
          <Link to="/sales">
            <li className="menu-item">
              Tutorials <i class="fa-solid fa-chalkboard"></i>
            </li>
          </Link>
          <li className="menu-item sign-out btn" onClick={() => handleLogout()}>
            Sign out <LogoutSharp className="ml5" />
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
