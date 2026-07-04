"use client";

import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Button } from "@headlessui/react";
import SmartImage from "@/components/common/SmartImage";
import { useAuth } from "../../../Context/AuthContext";
import { buildApiUrl } from "@/lib/api";

const CartItem = ({ item, onRemove }) => {
  const { user, setCartItems } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (item.quantity === 0) {
      onRemove(item._id);
    }
  }, [item.quantity, item._id, onRemove]);

  const fetchCartItems = async () => {
    const response = await fetch(buildApiUrl(`/api/cart/${user._id}`));
    const data = await response.json();
    setCartItems(data.cartItems);
    localStorage.setItem("cartItems", JSON.stringify(data.cartItems));
  };

  const updateQuantity = async (newQuantity) => {
    setLoading(true);

    try {
      await fetch(buildApiUrl("/api/cartitems/update"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quantity: newQuantity,
          userId: user._id,
          productId: item.productId,
        }),
      });

      await fetchCartItems();
    } catch (error) {
      console.error("Error updating cart item:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-[28px] border border-stone-200 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="relative h-28 w-24 overflow-hidden rounded-2xl bg-stone-50 lg:h-36 lg:w-32">
          <SmartImage
            src={item.imageUrl}
            alt={item.title}
            fill
            sizes="200px"
            className="object-cover object-top"
          />
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-brand-900">{item.title}</p>
          <p className="text-sm text-stone-500">Size: L, {item.color}</p>
          <p className="text-sm text-stone-400">Seller: allan peter</p>

          <div className="mt-4 flex items-center space-x-4 text-sm">
            <p className="font-semibold text-brand-800">Rs. {item.discountedPrice}</p>
            <p className="text-stone-400 line-through">Rs. {item.price}</p>
            <p className="font-semibold text-emerald-600">{item.discountPercent}%</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4 lg:gap-8">
        <div className="flex items-center rounded-full border border-stone-200 px-2 py-1">
          <IconButton onClick={() => updateQuantity(item.quantity - 1)} disabled={loading || item.quantity <= 1}>
            <RemoveCircleOutlineIcon />
          </IconButton>
          <span className="min-w-12 text-center text-sm font-semibold">{item.quantity}</span>
          <IconButton
            onClick={() => updateQuantity(item.quantity + 1)}
            sx={{ color: "RGB(145, 85, 253)" }}
            disabled={loading}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </div>

        <Button
          className={`rounded-full px-4 py-2 text-sm font-semibold text-brand-700 ${
            loading ? "cursor-not-allowed opacity-50" : "hover:bg-brand-50"
          }`}
          onClick={() => onRemove(item._id)}
          disabled={loading}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
