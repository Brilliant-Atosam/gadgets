import "./login.css";
import Input from "../../components/input/Input";
import AlertComponent from "../../components/Alert";
import { useState } from "react";
import { request } from "../../request";
import Loading from "../../components/Loading";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [severity, setSeverity] = useState("info");
  const [message, setMessage] = useState("info");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
      setLoading(true)
    if (!email || password.length < 5) {
      setOpen(true);
      setSeverity("warning");
      setMessage("Invalid login input");
      setLoading(false)
    } else {
      try {
        const res = await request.post("/auth", {
          email,
          password,
        });
        setOpen(true);
        setSeverity("success");
        setMessage(res.data);
        setLoading(false)
      } catch (err) {
        setOpen(true);
        setSeverity("error");
        setMessage(err.response.data);
        setLoading(false)
      }
    }
  };
  return (
    <div className="login-container p20">
      <h1 className="login-greetings">Welcome! Login to continue</h1>
      <AlertComponent
        open={open}
        close={() => setOpen(false)}
        severity={severity}
        message={message}
      />
      <Input
        type="text"
        placeholder="Email"
        value={email}
        event={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        event={(e) => setPassword(e.target.value)}
      />
      <button className="btn login-btn" disabled={loading} onClick={() => handleLogin()}>
        {loading ? "Please wait..." : "Sign in"}
      </button>
    </div>
  );
};
