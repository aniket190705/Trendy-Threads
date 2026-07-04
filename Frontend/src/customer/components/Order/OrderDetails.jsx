"use client";

import { useEffect, useState } from "react";
import { Grid2 } from "@mui/material";
import Box from "@mui/material/Box";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { deepPurple } from "@mui/material/colors";
import AddressCard from "../AddressCard/AddressCard";
import OrderTracker from "./OrderTracker";
import SmartImage from "@/components/common/SmartImage";
import { buildApiUrl } from "@/lib/api";

const readApiResponse = async (response) => {
  const contentType = response.headers.get("content-type") || "";
  const text = await response.text();

  if (contentType.includes("application/json")) {
    return text ? JSON.parse(text) : {};
  }

  return {
    error: text || "The server returned an unexpected response.",
  };
};

const OrderDetails = ({ orderId }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setFetchError("");
        const response = await fetch(buildApiUrl(`/api/orders/${orderId}`));
        const data = await readApiResponse(response);
        if (response.ok) {
          setOrder(data.order);
        } else {
          setOrder(null);
          setFetchError(data.error || "Could not load order details.");
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
        setFetchError("Could not load order details.");
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  if (loading) {
    return <div className="px-6 py-10 text-stone-600">Loading order...</div>;
  }

  if (!order) {
    return <div className="px-6 py-10 text-stone-600">{fetchError || "Order not found."}</div>;
  }

  return (
    <div className="px-4 py-8 lg:px-20">
      <div className="rounded-[28px] border bg-white p-6 shadow-xl">
        <h1 className="pb-6 font-serif text-2xl text-brand-900">Delivery Address</h1>
        <AddressCard address={order.shippingAddress} />
      </div>

      <div className="my-10 rounded-[28px] border bg-white p-6 shadow-sm">
        <OrderTracker activeStep={order.orderStatus === "cancelled" ? 0 : 1} />
      </div>

      <Grid2 className="m-2 space-y-5" container>
        {order.items?.map((item, index) => (
          <Grid2
            key={`${item.productId}-${index}`}
            container
            className="w-full rounded-[28px] border bg-white p-5 shadow-sm"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Grid2 size={{ xs: 12, md: 7 }}>
              <div className="flex items-center space-x-4">
                <div className="relative h-24 w-24 overflow-hidden rounded-2xl bg-stone-50">
                  <SmartImage
                    className="object-cover object-top"
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="100px"
                  />
                </div>
                <div className="space-y-2">
                  <p>{item.title}</p>
                  <p className="text-xs font-semibold text-stone-400">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-xs font-semibold text-stone-400">
                    Color: {item.color || "N/A"}
                  </p>
                  <p className="text-xs font-semibold text-stone-400">
                    Status: {order.orderStatus}
                  </p>
                  <p className="text-xs font-semibold text-stone-400">
                    Price: Rs. {item.discountedPrice}
                  </p>
                </div>
              </div>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 5 }}>
              <Box sx={{ color: deepPurple[500] }} className="mt-4 md:mt-0">
                <StarBorderIcon sx={{ fontSize: "2rem" }} className="px-2 text-5xl" />
                <span>Rate and review product</span>
              </Box>
            </Grid2>
          </Grid2>
        ))}
      </Grid2>
    </div>
  );
};

export default OrderDetails;
