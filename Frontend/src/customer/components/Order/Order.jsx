import { Grid2 } from "@mui/material";
import React, { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import { useAuth } from "../../../Context/AuthContext";

const Order = () => {
  const { user, isSignedIn } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingOrderId, setCancellingOrderId] = useState(null);

  const fetchOrders = async () => {
    if (!user?._id) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/orders/user/${user._id}`
      );
      const data = await response.json();
      if (response.ok) {
        setOrders(data.orders || []);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user?._id]);

  const handleCancelOrder = async (orderId) => {
    try {
      setCancellingOrderId(orderId);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/orders/${orderId}/cancel`,
        {
          method: "PUT",
        }
      );
      const data = await response.json();
      if (response.ok) {
        setOrders((prev) =>
          prev.map((order) => (order._id === orderId ? data.order : order))
        );
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
    } finally {
      setCancellingOrderId(null);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
        <p className="mt-1 text-sm text-gray-500">
          See your past purchases and cancel orders before delivery.
        </p>
      </div>

      {!isSignedIn && (
        <div className="rounded-xl border bg-white p-6 text-gray-600 shadow-sm">
          Please sign in to view your order history.
        </div>
      )}

      {isSignedIn && loading && (
        <div className="rounded-xl border bg-white p-6 text-gray-600 shadow-sm">
          Loading your orders...
        </div>
      )}

      {isSignedIn && !loading && orders.length === 0 && (
        <div className="rounded-xl border bg-white p-6 text-gray-600 shadow-sm">
          No orders yet. Your completed checkouts will appear here.
        </div>
      )}

      {isSignedIn && !loading && orders.length > 0 && (
        <Grid2 container spacing={3}>
          {orders.map((order) => (
            <Grid2 key={order._id} size={{ xs: 12 }}>
              <div className="rounded-xl border bg-white shadow-sm">
                <OrderCard order={order} />
                <div className="flex items-center justify-between px-7 pb-5">
                  <p className="text-sm text-gray-500">
                    Status: {order.orderStatus}
                  </p>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleCancelOrder(order._id);
                    }}
                    disabled={
                      order.orderStatus === "cancelled" ||
                      cancellingOrderId === order._id
                    }
                    className={`rounded-md px-4 py-2 text-sm font-medium text-white ${
                      order.orderStatus === "cancelled" ||
                      cancellingOrderId === order._id
                        ? "cursor-not-allowed bg-gray-400"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    {cancellingOrderId === order._id
                      ? "Cancelling..."
                      : order.orderStatus === "cancelled"
                        ? "Cancelled"
                        : "Cancel Order"}
                  </button>
                </div>
              </div>
            </Grid2>
          ))}
        </Grid2>
      )}
    </div>
  );
};

export default Order;
