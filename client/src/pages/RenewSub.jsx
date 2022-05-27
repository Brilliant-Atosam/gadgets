import { Key } from "@mui/icons-material";
import { LoginStart, LoginSuccess, LoginFailure } from "../redux/login";
import { usePaystackPayment } from "react-paystack";
import { useSelector, useDispatch } from "react-redux";
import { request } from "../request";
const storeId = localStorage.getItem("storeId");
const RenewSub = () => {
  const dispatch = useDispatch();
  const callLogin = async () => {
    dispatch(LoginStart);
    try {
      const res = await request.post("/auth/renew", {
        id: storeId,
      });
      dispatch(LoginSuccess(res.data));
      window.location.href = "/";
    } catch (err) {
      dispatch(LoginFailure());
    }
  };
  const onSuccess = () => {
    callLogin();
  };

  const onClose = () => {
    window.location.reload();
  };
  const initializePayment = usePaystackPayment({
    currency: "GHS",
    amount: 2000,
    email: "atosam91@gmail.com",
    publicKey: "pk_test_f925fc9d48c06b97cc20e2aede4a0198c2396557",
    channels: ["mobile_money"],
    label: `Store id: ${storeId}`,
  });
  return (
    <div className="login-container p20">
      <div className="message">
        Subscription for store with ID <b>{storeId}</b> is due for renewal
      </div>
      <button
        className="btn btn-sub"
        onClick={() => {
          // callLogin();
          initializePayment(onSuccess, onClose);
        }}
      >
        Renew Store Subscription
      </button>
    </div>
  );
};

export default RenewSub;
