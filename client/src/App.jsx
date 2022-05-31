import "./common.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import { Login } from "./pages/login/Login";
import ProductDetails from "./pages/productDetails/ProductDetails";
import Sales from "./pages/sales/Sales";
import { useSelector } from "react-redux";
import Items from "./pages/products/Items";
import { Register } from "./pages/register/Register";
import Subscribe from "./pages/Subscribe";
import RenewSub from "./pages/RenewSub";
import { Tutorials } from "./pages/tutorials/Tutorials";
function App() {
  const store = useSelector((state) => state.store.Store);
  const sales = useSelector((state) => state.sales.Sales);
  const items = useSelector((state) => state.items.Items);
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/tuts" element={<Tutorials />} />
          <Route
            path="/sub"
            element={store ? <Subscribe /> : <Navigate to="/login" />}
          />
          <Route
            path="/renew"
            element={store ? <RenewSub /> : <Navigate to="/login" />}
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={
              store && items !== null && sales !== null ? (
                <Navigate to="/" />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/"
            element={
              store && items !== null && sales !== null ? (
                <Dashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/sales"
            element={
              store && sales !== null ? <Sales /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/items"
            element={
              store && items !== null ? <Items /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/items/:id"
            element={
              store && items !== null && sales !== null ? (
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
