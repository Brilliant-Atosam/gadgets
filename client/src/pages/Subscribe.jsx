import { usePaystackPayment } from "react-paystack";
import { request } from "../request";
const storeId = localStorage.getItem("storeId");
const Subscribe = () => {
  async function subscribe() {
    await request.put(`/store/${storeId}`);
    window.location.href = "/login";
  }
  const onSuccess = () => {
    subscribe();
  };

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
          initializePayment(onSuccess, onClose);
        }}
      >
        Activate Store
      </button>
    </div>
  );
};

export default Subscribe;
