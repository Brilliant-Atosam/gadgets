import "./common.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import { Login } from "./pages/login/Login";
import ProductDetails from "./pages/productDetails/ProductDetails";
import Sales from "./pages/sales/Sales";
import { useSelector } from "react-redux";
import Drugs from "./pages/products/Drugs";
function App() {
  const isLoggedIn = useSelector((state) => state.store.Store);
  const sales = useSelector((state) => state.sales.Sales);
  const drugs = useSelector((state) => state.drugs.Drugs);
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route
            path="/login"
            element={
              isLoggedIn && drugs !== null && sales !== null ? (
                <Navigate to="/" />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/"
            element={
              isLoggedIn && drugs !== null && sales !== null ? (
                <Dashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/sales"
            element={
              isLoggedIn && sales !== null ? (
                <Sales />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/drugs"
            element={
              isLoggedIn && drugs !== null ? (
                <Drugs />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/drugs/:id"
            element={
              isLoggedIn && drugs !== null && sales !== null ? (
                <ProductDetails />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
