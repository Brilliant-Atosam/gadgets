import "./common.css";
import {
  BrowserRouter,
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
import Drugs from "./pages/products/Drugs";
import {useDispatch} from 'react-redux'
import { useEffect } from "react";
function App() {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.store.Store);
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
          <Route path="/sales" element={isLoggedIn ? <Sales /> : <Navigate to="/login" />} />
          <Route path="/drugs" element={isLoggedIn ? <Drugs /> : <Navigate to="/login" />} />
          <Route path="/drugs/:id" element={isLoggedIn ? <ProductDetails /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
