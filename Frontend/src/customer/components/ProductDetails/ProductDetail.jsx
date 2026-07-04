"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import SmartImage from "@/components/common/SmartImage";
import { useAuth } from "../../../Context/AuthContext";
import { buildApiUrl } from "@/lib/api";
import { findProductById } from "@/lib/catalog";

export default function ProductDetails({ productId }) {
  const { isSignedIn, user, cart, setCart, setCartItems } = useAuth();
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState("");
  const router = useRouter();

  const item = useMemo(() => findProductById(productId) || {}, [productId]);

  const fetchCartData = async () => {
    const response = await fetch(buildApiUrl(`/api/cart/${user._id}`));
    const data = await response.json();
    localStorage.setItem("cart", JSON.stringify(data));
    localStorage.setItem("cartItems", JSON.stringify(data.cartItems));
    setCart(data);
    setCartItems(data.cartItems);
    return data;
  };

  const createCartItem = async (cartId) => {
    const response = await fetch(buildApiUrl("/api/cartitems"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cart: cartId,
        price: item.price,
        discountedPrice: item.discountedPrice,
        userId: user._id,
        quantity: item.quantity || 1,
        title: item.title,
        description: item.description,
        discountPercent: item.discountPersent,
        imageUrl: item.imageUrl,
        color: item.color,
        productId: item.productId,
      }),
    });
    return response.json();
  };

  const updateCartItem = async (existingItem) => {
    const response = await fetch(buildApiUrl("/api/cartitems/update"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quantity: existingItem.quantity + 1,
        userId: user._id,
        productId: existingItem.productId,
      }),
    });
    return response.json();
  };

  const handleAddToBag = async () => {
    if (!isSignedIn) {
      setNotification("Please sign in to add items to your cart.");
      return;
    }

    if (loading) {
      return;
    }

    setLoading(true);

    try {
      const latestCart = await fetchCartData();
      const latestCartItems = latestCart?.cartItems || [];
      const existingItem = latestCartItems.find(
        (cartItem) => cartItem.productId === item.productId,
      );

      if (existingItem) {
        await updateCartItem(existingItem);
      } else {
        const cartId = latestCart?._id || cart?._id;

        if (!cartId) {
          throw new Error("Cart not found for this user.");
        }

        await createCartItem(cartId);
      }

      await fetchCartData();
      router.push("/cart");
    } catch (error) {
      setNotification("Something went wrong. Try again!");
      console.error("Error adding to bag:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!item?.productId) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl text-brand-900">Product not found</h1>
        <p className="mt-3 text-stone-500">
          The selected product could not be loaded.
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 pb-12 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[36px] border border-white/70 bg-white/80 p-6 shadow-soft backdrop-blur sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative min-h-[30rem] overflow-hidden rounded-[28px] bg-stone-50 sm:col-span-2">
              <SmartImage
                alt={item.imageUrl}
                src={item.imageUrl}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="relative min-h-60 overflow-hidden rounded-[24px] bg-stone-50">
              <SmartImage
                alt={item.imageUrl}
                src={item.imageUrl}
                fill
                sizes="25vw"
                className="object-cover"
              />
            </div>
            <div className="relative min-h-60 overflow-hidden rounded-[24px] bg-stone-50">
              <SmartImage
                alt={item.imageUrl}
                src={item.imageUrl}
                fill
                sizes="25vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-[28px] border border-stone-200 bg-stone-50/70 p-6">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-stone-400">
                {item.brand}
              </p>
              <h1 className="mt-3 font-serif text-4xl text-brand-900">{item.title}</h1>
              <p className="mt-6 text-3xl font-semibold text-brand-800">
                Rs. {item.discountedPrice}
              </p>
              <div className="mt-3 flex items-center gap-3 text-sm">
                <span className="text-stone-400 line-through">Rs. {item.price}</span>
                <span className="rounded-full bg-emerald-100 px-3 py-1 font-semibold text-emerald-700">
                  {item.discountPersent}% off
                </span>
              </div>
              <div className="mt-8 space-y-4 text-sm leading-7 text-stone-600">
                <p>{item.description}</p>
                <p>Color: {item.color || "N/A"}</p>
              </div>
            </div>

            <div className="mt-10">
              <button
                onClick={handleAddToBag}
                disabled={loading}
                className={`flex w-full items-center justify-center rounded-full px-8 py-4 text-base font-semibold text-white transition ${
                  loading
                    ? "cursor-not-allowed bg-brand-300"
                    : "bg-brand-800 hover:bg-brand-900"
                }`}
              >
                {loading ? "Adding..." : "Add to bag"}
              </button>

              {notification && (
                <div className="mt-4 rounded-2xl bg-amber-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-amber-800">{notification}</p>
                    <button
                      onClick={() => {
                        setNotification("");
                        if (!isSignedIn) {
                          router.push("/account/signin");
                        }
                      }}
                      className="rounded-full bg-amber-200 px-3 py-1 text-sm font-semibold text-amber-800 transition hover:bg-amber-300"
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
