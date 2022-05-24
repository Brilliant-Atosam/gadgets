import "./login.css";
import Input from "../../components/input/Input";
import AlertComponent from "../../components/Alert";
import { useState } from "react";
import { request } from "../../request";
import Loading from "../../components/Loading";
import { LoginStart, LoginSuccess, LoginFailure } from "../../redux/login";
import { useDispatch } from "react-redux";
import { drugsFailure, drugsStart, drugsSuccess } from "../../redux/drugs";
import { salesFailure, salesStart, salesSuccess } from "../../redux/sales";
import { Link } from "react-router-dom";
export const Login = () => {
  const dispatch = useDispatch();

  const [id, setId] = useState(localStorage.getItem("storeId"));
  const [password, setPassword] = useState("");
  const [severity, setSeverity] = useState("info");
  const [message, setMessage] = useState("info");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    setLoading(true);
    if (!id || password.length < 5) {
      setOpen(true);
      setSeverity("warning");
      setMessage("Invalid login input");
      setLoading(false);
    } else {
      dispatch(LoginStart);
      try {
        const res = await request.post("/auth", {
          id,
          password,
        });
        setOpen(true);
        setSeverity("success");
        setMessage("Login successful. Redirecting to dashoard");
        dispatch(LoginSuccess(res.data));
        localStorage.setItem("storeId", id);
        dispatch(drugsStart);
        dispatch(salesStart);
        try {
          const fetchData = async () => {
            const drugs = await request.get(`/drugs?storeId=${id}`);
            dispatch(drugsSuccess(drugs.data));
            const sales = await request.get(`/sales?storeId=${id}`);
            dispatch(salesSuccess(sales.data));
          };
          fetchData();
        } catch (err) {
          dispatch(drugsFailure(err.response.data));
          dispatch(salesFailure(err.response.data));
        }
      } catch (err) {
        dispatch(LoginFailure(err.response.data));
        setOpen(true);
        setSeverity("error");
        setMessage(err.response.data);
        setLoading(false);
      }
    }
  };
  return (
    <div className="login-container p20">
      <Loading open={loading} />
      <h1 className="login-greetings">Welcome! Login to continue</h1>
      <AlertComponent
        open={open}
        close={() => setOpen(false)}
        severity={severity}
        message={message}
      />
      <Input
        type="text"
        placeholder="Store ID"
        value={id}
        event={(e) => setId(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        event={(e) => setPassword(e.target.value)}
      />
      <button
        className="btn login-btn"
        disabled={loading}
        onClick={() => handleLogin()}
      >
        {loading ? "Please wait..." : "Sign in"}
      </button>
      <Link to="/register" className="instead">
        Create new account
      </Link>
    </div>
  );
};
