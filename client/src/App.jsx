import "./common.css";
import {
  BrowserRouter,
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from "./components/nav/Navbar";
import Dashboard from "./pages/dashboard/Dashboard";
import { Login } from "./pages/login/Login";
import ProductDetails from "./pages/productDetails/ProductDetails";
import Sales from "./pages/sales/Sales";
import { useSelector } from "react-redux";
function App() {
  const isLoggedIn = useSelector((state) => state.store.Store);
  console.log(isLoggedIn);
  return (
    <BrowserRouter>
      <div className="container">
        <Navbar />
        <Routes>
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route path="/sales" element={<Sales />} />
          <Route path="/drugs/:id" element={<ProductDetails />} />
          {/* <Sales /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
