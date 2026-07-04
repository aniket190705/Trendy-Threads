"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import CartItem from "./CartItem";
import { useAuth } from "../../../Context/AuthContext";
import { buildApiUrl } from "@/lib/api";

const Cart = () => {
  const router = useRouter();
  const { cartItems, setCartItems, user, setCart } = useAuth();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscountedPrice, setTotalDiscountedPrice] = useState(0);
  const [discount, setDiscount] = useState(0);

  const fetchCartItems = useCallback(async () => {
    const response = await fetch(buildApiUrl(`/api/cart/${user._id}`));
    const data = await response.json();
    setCartItems(data.cartItems);
    localStorage.setItem("cartItems", JSON.stringify(data.cartItems));
  }, [setCartItems, user?._id]);

  useEffect(() => {
    if (user?._id) {
      fetchCartItems();
    }
  }, [fetchCartItems, user?._id]);

  const deleteItem = async (itemId) => {
    const response = await fetch(buildApiUrl(`/api/cartitems/delete/${itemId}`), {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      fetchCartItems();
    }
  };

  const updateCart = useCallback(async (userId, updatedItems, price, discounted, discountValue) => {
    const response = await fetch(buildApiUrl("/api/cart/updatecart"), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        cartItems: updatedItems.map((item) => item._id),
        totalPrice: price,
        totalDiscountedPrice: discounted,
        discount: discountValue,
        totalItem: updatedItems.length,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      setCart(data.cart);
      localStorage.setItem("cart", JSON.stringify(data.cart));
    }
  }, [setCart]);

  useEffect(() => {
    let price = 0;
    let discounted = 0;

    for (const item of cartItems) {
      const quantity = item.quantity || 1;
      price += item.price * quantity;
      discounted += item.discountedPrice * quantity;
    }

    const discountValue = price - discounted;
    setTotalPrice(price);
    setTotalDiscountedPrice(discounted);
    setDiscount(discountValue);

    if (user?._id) {
      updateCart(user._id, cartItems, price, discounted, discountValue);
    }
  }, [cartItems, updateCart, user?._id]);

  const handleRemoveItem = (itemId) => {
    const updatedItems = cartItems.filter((item) => item._id !== itemId);

    if (updatedItems.length === 0) {
      deleteItem(itemId);
      localStorage.removeItem("cartItems");
      setCartItems([]);
      return;
    }

    setCartItems(updatedItems);
    deleteItem(itemId);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    updateCart(user._id, updatedItems, totalPrice, totalDiscountedPrice, discount);
  };

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-3 lg:gap-8">
        <div className="col-span-2 space-y-4">
          {cartItems.length === 0 ? (
            <div className="rounded-[32px] border border-dashed border-stone-300 bg-white/80 px-6 py-16 text-center shadow-sm">
              <h1 className="font-serif text-3xl text-brand-900">Your cart is empty</h1>
              <p className="mt-3 text-stone-500">
                Items you add to your bag will appear here.
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <CartItem key={item._id} item={item} onRemove={handleRemoveItem} />
            ))
          )}
        </div>

        <div className="mt-6 px-2 lg:sticky lg:top-28 lg:mt-0 lg:h-fit">
          <div className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-soft">
            <p className="pb-3 text-xs font-semibold uppercase tracking-[0.28em] text-stone-400">
              Price Details
            </p>
            <hr className="mb-4 border-stone-200" />

            <div className="space-y-4 text-sm font-medium text-stone-700">
              <div className="flex justify-between">
                <span>Price</span>
                <span className="font-semibold text-emerald-600">Rs. {totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span className="font-semibold text-emerald-600">-Rs. {discount}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span className="font-semibold text-emerald-600">Free</span>
              </div>

              <div className="flex justify-between border-t border-stone-200 pt-4 text-lg font-bold">
                <span>Total Amount</span>
                <span className="text-emerald-700">Rs. {totalDiscountedPrice}</span>
              </div>
            </div>

            <Button
              className="w-full mt-6 !rounded-full !shadow-md hover:!shadow-lg transition-all"
              variant="contained"
              onClick={() => router.push("/checkout?step=2")}
              sx={{
                px: "2.5rem",
                py: ".9rem",
                bgcolor: "#64432f",
                fontSize: "1rem",
                fontWeight: "600",
                textTransform: "none",
              }}
              disabled={cartItems.length === 0}
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
