import { usePaystackPayment } from "react-paystack";
import { useDispatch } from "react-redux";
import { LoginFailure, LoginStart, LoginSuccess } from "../redux/login";
import { request } from "../request";
const storeId = localStorage.getItem("storeId");
const Subscribe = () => {
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
  const subscribe = async () => {
    await request.put(`/store/${storeId}`);
    window.location.href = "/";
  };
  // const onSuccess = () => {
  //   subscribe();
  // };

  const onClose = () => {
    window.location.reload();
  };
  const initializePayment = usePaystackPayment({
    currency: "GHS",
    amount: 3000,
    email: "atosam91@gmail.com",
    publicKey: "pk_test_f925fc9d48c06b97cc20e2aede4a0198c2396557",
    channels: ["mobile_money"],
    label: `Store id: ${storeId}`,
  });
  return (
    <div className="login-container p20">
      <div className="message">
        Your store has been created. Your store's id is <b>{storeId}</b>
      </div>
      <button
        className="btn btn-sub"
        onClick={() => {
          callLogin();
          // initializePayment(onSuccess, onClose);
        }}
      >
        Activate Store
      </button>
    </div>
  );
};

export default Subscribe;
