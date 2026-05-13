import { Grid2 } from "@mui/material";
import React from "react";
import AdjustIcon from "@mui/icons-material/Adjust";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ order }) => {
  const navigate = useNavigate();
  const firstItem = order.items?.[0];
  const itemCount = order.items?.length || 0;
  const uniqueItems =
    order.items?.filter((item, index, arr) => {
      const itemKey = item.productId || item.title;
      return (
        index ===
        arr.findIndex((candidate) => {
          const candidateKey = candidate.productId || candidate.title;
          return candidateKey === itemKey;
        })
      );
    }) || [];
  const statusText =
    order.orderStatus === "cancelled"
      ? "Order cancelled"
      : order.orderStatus === "PLACED"
        ? "Order placed successfully"
        : "Payment pending";

  return (
    <div
      onClick={() => navigate(`/account/order/${order._id}`)}
      className="border p-5 shadow-lg rounded-md hover:shadow-xl m-2"
    >
      <Grid2 container spacing={2} sx={{ justifyContent: "space-between" }}>
        <Grid2 item xs={6}>
          <div className="flex cursor-pointer">
            <div className="flex items-center gap-2">
              {uniqueItems.map((item) => (
                <img
                  key={item.productId || item.title}
                  className="h-[5rem] w-[5rem] rounded-sm object-cover object-top"
                  src={item.imageUrl}
                  alt={item.title}
                />
              ))}
            </div>
            <div className="ml-5 space-y-2">
              <p>{firstItem?.title || "Order Item"}</p>
              <p className="opacity-50 text-xs font-semibold">
                {itemCount} item{itemCount === 1 ? "" : "s"}
              </p>
              <p className="opacity-50 text-xs font-semibold">
                {firstItem?.color ? `Color: ${firstItem.color}` : "Ready to ship"}
              </p>
            </div>
          </div>
        </Grid2>

        <Grid2 item size={{ xs: 2 }}>
          <p>Rs. {order.totalDiscountedPrice}</p>
        </Grid2>

        <Grid2 item size={{ xs: 4 }}>
          <div>
            <p>
              <AdjustIcon
                sx={{ height: "15px", width: "15px" }}
                className={`mr-2 ${
                  order.orderStatus === "cancelled"
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              />
              <span>{statusText}</span>
            </p>
            <p className="text-xs">
              Ordered on {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default OrderCard;
