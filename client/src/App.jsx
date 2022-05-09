import "./common.css";
import Navbar from "./components/nav/Navbar";
import Dashboard from "./pages/dashboard/Dashboard";
import { Login } from "./pages/login/Login";
function App() {
  return (
    <div className="container">
      <Navbar />
      <Dashboard />
    </div>
  );
}

export default App;
