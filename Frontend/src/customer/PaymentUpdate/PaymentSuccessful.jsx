import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

export default function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { setCart, setCartItems } = useAuth();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const razorpay_payment_id = query.get("razorpay_payment_id");
    const razorpay_order_id = query.get("razorpay_order_id");
    const orderId = query.get("orderId") || id;

    console.log("Payment details from successful:", {
      razorpay_payment_id,
      razorpay_order_id,
      orderId,
    });

    if (razorpay_payment_id && orderId) {
      // Send details to backend to update order status
      fetch(`${import.meta.env.VITE_API_BASE_URL}/api/payments/updateinfo`, {
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
          const emptyCart = {
            cartItems: [],
            totalPrice: 0,
            totalDiscountedPrice: 0,
            discount: 0,
            totalItem: 0,
          };

          setCart(emptyCart);
          setCartItems([]);
          localStorage.setItem("cart", JSON.stringify(emptyCart));
          localStorage.setItem("cartItems", JSON.stringify([]));

          navigate("/account/order", { replace: true });
        })
        .catch((err) => console.error("Payment verify failed", err));
    }
  }, [id, location, navigate, setCart, setCartItems]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-green-600">
        Payment Successful 🎉
      </h1>
      <p className="mt-2 text-gray-600">
        Your order has been placed successfully.
      </p>
      <button
        onClick={() => navigate("/account/order")}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        View Order History
      </button>
    </div>
  );
}
