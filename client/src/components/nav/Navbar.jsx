import "./navbar.css";
import { Autorenew, Menu, Search, TrendingUp } from "@mui/icons-material";
import LogoutSharp from "@mui/icons-material/Logout";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Logout } from "../../redux/login";
import { useDispatch } from "react-redux";
import { clearDrugs } from "../../redux/drugs";
import { clearSales } from "../../redux/sales";

const Navbar = ({ refresh }) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const toggle = () => {
    setShowMenu(!showMenu);
  };
  const handleLogout = () => {
    dispatch(Logout());
    dispatch(clearDrugs());
    dispatch(clearSales());
  };

  return (
    <div className="navbar-container">
      <div className="nav-left">
        <Link to="/">
          <h1 className="logo">Pharm</h1>
        </Link>
        <li className="refresh" key={0} onClick={refresh}>
          Refresh <Autorenew />
        </li>
      </div>
      <div className="nav-right">
        <div className="menu-list">
          <Link to="/drugs">
            <li className="menu-item" key={1}>
              Drugs <i className="fa-solid fa-pills"></i>
            </li>
          </Link>
          <Link to="/sales">
            <li className="menu-item" key={2}>
              Sales <TrendingUp />
            </li>
          </Link>
          <Link to="/sales">
            <li className="menu-item" key={3}>
              Tutorials <i className="fa-solid fa-chalkboard"></i>
            </li>
          </Link>
          <li
            className="menu-item sign-out btn"
            onClick={() => handleLogout()}
            key={4}
          >
            Sign out <LogoutSharp className="ml5" />
          </li>
        </div>
        <div className={showMenu ? "menu-list-mb" : "no-show"}>
          <Link to="/drugs">
            <li key={5} className="menu-item-mb">
              Drugs
            </li>
          </Link>
          <Link to="/sales">
            <li key={6} className="menu-item-mb">
              Sales
            </li>
          </Link>
          <li
            className="menu-item-mb
            "
            onClick={() => handleLogout()}
            key={4}
          >
            Sign out
          </li>
        </div>
        <Menu className="toggler" onClick={() => toggle()} />
      </div>
    </div>
  );
};
export default Navbar;
