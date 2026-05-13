import React, { useEffect, useState } from "react";
import AddressCard from "../AddressCard/AddressCard";
import OrderTracker from "./OrderTracker";
import { Grid2 } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import Box from "@mui/material/Box";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/orders/${orderId}`
        );
        const data = await response.json();
        if (response.ok) {
          setOrder(data.order);
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return <div className="px-6 py-10 text-gray-600">Loading order...</div>;
  }

  if (!order) {
    return <div className="px-6 py-10 text-gray-600">Order not found.</div>;
  }

  return (
    <div className="lg:px-20">
      <div className="p-2 shadow-xl rounded-s-md border ">
        <h1 className="font-bold text-xl py-7">Delivery Address</h1>
        <AddressCard address={order.shippingAddress} />
      </div>

      <div className="m-10">
        <OrderTracker activeStep={order.orderStatus === "cancelled" ? 0 : 1} />
      </div>

      <Grid2 className="space-y-5 m-5" container>
        {order.items?.map((item, index) => (
          <Grid2
            key={`${item.productId}-${index}`}
            item
            container
            className="shadow-xl rounded-md p-5 border w-full"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Grid2
              item
              size={{ xs: 6 }}
              sx={{ width: "full" }}
              className="w-full"
            >
              <div className="flex items-center space-x-2">
                <img
                  className="w-[5rem] h-[5rem] object-cover object-top"
                  src={item.imageUrl}
                  alt={item.title}
                />
                <div className="space-y-2">
                  <p>{item.title}</p>
                  <p className="opacity-50 text-xs font-semibold space-x-5">
                    <span>Quantity: {item.quantity}</span>
                    <span>Color: {item.color || "N/A"}</span>
                  </p>
                  <p className="opacity-50 text-xs font-semibold">
                    Status: {order.orderStatus}
                  </p>
                  <p className="opacity-50 text-xs font-semibold">
                    Price: Rs. {item.discountedPrice}
                  </p>
                </div>
              </div>
            </Grid2>

            <Grid2 item>
              <Box sx={{ color: deepPurple[500] }}>
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
