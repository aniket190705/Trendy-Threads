"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../Context/AuthContext";
import { buildApiUrl } from "@/lib/api";

export default function PaymentSuccess({ orderId }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setCart, setCartItems } = useAuth();

  useEffect(() => {
    const razorpayPaymentId = searchParams.get("razorpay_payment_id");
    const resolvedOrderId = searchParams.get("orderId") || orderId;

    if (razorpayPaymentId && resolvedOrderId) {
      fetch(buildApiUrl("/api/payments/updateinfo"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          payment_id: razorpayPaymentId,
          order_id: resolvedOrderId,
        }),
      })
        .then((response) => response.json())
        .then(() => {
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

          router.replace("/account/order");
        })
        .catch((error) => console.error("Payment verify failed", error));
    }
  }, [orderId, router, searchParams, setCart, setCartItems]);

  return (
    <div className="flex h-[70vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="font-serif text-4xl text-emerald-600">Payment Successful</h1>
      <p className="mt-3 text-stone-600">
        Your order has been placed successfully.
      </p>
      <button
        onClick={() => router.push("/account/order")}
        className="mt-6 rounded-full bg-brand-800 px-5 py-3 font-semibold text-white"
      >
        View Order History
      </button>
    </div>
  );
}
