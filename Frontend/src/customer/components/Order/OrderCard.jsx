"use client";

import { Grid2 } from "@mui/material";
import AdjustIcon from "@mui/icons-material/Adjust";
import { useRouter } from "next/navigation";
import SmartImage from "@/components/common/SmartImage";

const OrderCard = ({ order }) => {
  const router = useRouter();
  const firstItem = order.items?.[0];
  const itemCount = order.items?.length || 0;
  const uniqueItems =
    order.items?.filter((item, index, collection) => {
      const itemKey = item.productId || item.title;
      return (
        index ===
        collection.findIndex((candidate) => {
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
      onClick={() => router.push(`/account/order/${order._id}`)}
      className="m-2 cursor-pointer rounded-[24px] border border-stone-200 p-5 shadow-sm transition hover:shadow-md"
    >
      <Grid2 container spacing={2} sx={{ justifyContent: "space-between" }}>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <div className="flex flex-wrap items-center gap-3">
            {uniqueItems.map((item) => (
              <div
                key={item.productId || item.title}
                className="relative h-20 w-20 overflow-hidden rounded-2xl bg-stone-50"
              >
                <SmartImage
                  className="object-cover object-top"
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="80px"
                />
              </div>
            ))}
            <div className="space-y-2">
              <p>{firstItem?.title || "Order Item"}</p>
              <p className="text-xs font-semibold text-stone-400">
                {itemCount} item{itemCount === 1 ? "" : "s"}
              </p>
              <p className="text-xs font-semibold text-stone-400">
                {firstItem?.color ? `Color: ${firstItem.color}` : "Ready to ship"}
              </p>
            </div>
          </div>
        </Grid2>

        <Grid2 size={{ xs: 12, md: 2 }}>
          <p className="font-semibold text-brand-800">Rs. {order.totalDiscountedPrice}</p>
        </Grid2>

        <Grid2 size={{ xs: 12, md: 4 }}>
          <p className="flex items-center">
            <AdjustIcon
              sx={{ height: "15px", width: "15px" }}
              className={`mr-2 ${
                order.orderStatus === "cancelled" ? "text-red-600" : "text-green-600"
              }`}
            />
            <span>{statusText}</span>
          </p>
          <p className="text-xs text-stone-400">
            Ordered on {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default OrderCard;
