import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";

export default function ProductDetails() {
  const { isSignedIn } = useAuth();

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(""); // 🔔 State for messages

  const navigate = useNavigate();
  const location = useLocation();
  const { user, cart, cartItems, setCartItems } = useAuth();
  const item = location.state || location.state.item || {};

  const fetchCartItems = async (str) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/cart/${user._id}`
    );
    const data = await response.json();
    localStorage.setItem("cartItems", JSON.stringify(data.cartItems));
    setCartItems(data.cartItems);
  };

  const createCartItem = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/cartitems`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart: cart._id,
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
      }
    );
    return await response.json();
  };

  const updateCartItem = async (existingItem) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/cartitems/update`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quantity: existingItem.quantity + 1,
          userId: user._id,
          productId: existingItem.productId,
        }),
      }
    );
    return await response.json();
  };

  const handleAddToBag = async () => {
    if (!isSignedIn) {
      setNotification("Please sign in to add items to your cart.");
      return;
    }

    if (loading) return;
    setLoading(true);

    try {
      await fetchCartItems("before adding");

      const existingItem = cartItems.find(
        (ci) => ci.productId === item.productId
      );

      if (existingItem) {
        await updateCartItem(existingItem);
      } else {
        await createCartItem();
      }

      await fetchCartItems("after add/update");
      navigate("/cart", { state: item });
    } catch (err) {
      setNotification("Something went wrong. Try again!");
      console.error("Error adding to bag:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">
      <div className="pt-6">
        {/* 🔔 Notification Banner */}

        {/* Product Gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <img
            alt={item.imageUrl}
            src={item.imageUrl}
            className="hidden size-full rounded-lg object-cover lg:block"
          />
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <img
              alt={item.imageUrl}
              src={item.imageUrl}
              className="aspect-3/2 w-full rounded-lg object-cover"
            />
            <img
              alt={item.imageUrl}
              src={item.imageUrl}
              className="aspect-3/2 w-full rounded-lg object-cover"
            />
          </div>
          <img
            alt={item.imageUrl}
            src={item.imageUrl}
            className="aspect-4/5 size-full object-cover sm:rounded-lg lg:aspect-auto"
          />
        </div>

        {/* Product Info */}
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {item.brand}
            </h1>
          </div>

          {/* Price + Add to Bag */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <p className="text-3xl tracking-tight text-gray-900">
              ₹{item.discountedPrice}
            </p>

            <button
              onClick={handleAddToBag}
              disabled={loading}
              className={`mt-10 flex w-full items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium text-white focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden 
                ${
                  loading
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
            >
              {loading ? "Adding..." : "Add to bag"}
            </button>
            {notification && (
              <div className="w-full sm:px-6 lg:max-w-7xl lg:px-2 mb-4 mt-4">
                <div className="rounded-md w-full bg-yellow-100 p-4 flex justify-between items-center">
                  <p className="text-sm w-full flex-1 font-medium text-yellow-800">
                    {notification}
                  </p>
                  <button
                    onClick={() => {
                      setNotification("");
                      if (!isSignedIn) navigate("/account/signin"); // redirect if user clicks dismiss
                    }}
                    className="ml-3 text-yellow-700 font-semibold hover:underline"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
            <div>
              <h3 className="sr-only text-gray-900">Description</h3>
              <div className="space-y-6">
                <p className="text-base text-gray-900">{item.title}</p>
              </div>
            </div>
            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
            </div>
            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>
              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
