import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const razorpay_payment_id = query.get("razorpay_payment_id");
    const razorpay_order_id = query.get("razorpay_order_id");
    const orderId = query.get("orderId");

    if (razorpay_payment_id && orderId) {
      // Send details to backend to update order status
      fetch("https://your-backend.com/api/payment/updateinfo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          payment_id: razorpay_payment_id,
          order_id: orderId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Payment verified:", data);
        })
        .catch((err) => console.error("Payment verify failed", err));
    }
  }, [location]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-green-600">
        Payment Successful 🎉
      </h1>
      <p className="mt-2 text-gray-600">
        Your order has been placed successfully.
      </p>
      <button
        onClick={() => navigate("/orders")}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        View My Orders
      </button>
    </div>
  );
}
