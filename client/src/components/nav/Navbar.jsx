import "./navbar.css";
import { Logout, Menu } from "@mui/icons-material";
const Navbar = () => {
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
        <Menu className="toggler" />
      </div>
    </div>
  );
};
export default Navbar;
