import React, { useEffect } from "react";
import CartItem from "./CartItem";
import { Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import { useState } from "react";
const Cart = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, setCartItems, user, cart, setCart } = useAuth(); // make sure AuthContext provides setCartItems
  const [finalCartItems, setFinalCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscountedPrice, setTotalDiscountedPrice] = useState(0);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    fetchCartItems("to update cart items on page reload");
  }, []);

  const fetchCartItems = async (str) => {
    const response3 = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/cart/${user._id}`
    );
    const data = await response3.json();
    console.log(`Cart fetched ${str}`, data);
    setCartItems(data.cartItems);
    localStorage.setItem("cartItems", JSON.stringify(data.cartItems));
  };
  const deleteItem = async (itemId) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/cartitems/delete/${itemId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      fetchCartItems("from completely deleting the item");
      console.log("Item deleted successfully");
    } else {
      console.error("Error deleting item:", response.statusText);
    }
  };

  const updateCart = async (
    userId,
    updatedItems,
    price,
    discounted,
    discountValue
  ) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/cart/updatecart`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          cartItems: updatedItems.map((i) => i._id),
          totalPrice: price,
          totalDiscountedPrice: discounted,
          discount: discountValue,
          totalItem: updatedItems.length,
        }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      setCart(data.cart);
      localStorage.setItem("cart", JSON.stringify(data.cart));
      console.log("Cart updated successfully:", data);
    } else {
      console.error("Error updating cart:", data);
    }
  };

  const calculatePrices = () => {
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

    console.log("after calculation: ", {
      price,
      discounted,
      discountValue,
    });

    try {
      updateCart(user._id, cartItems, price, discounted, discountValue);
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  useEffect(() => {
    calculatePrices();
  }, [cartItems]);
  // const updateCartItems = async (updatedItems) => {
  //   console.log("Updating cart items:", updatedItems);
  //   const response2 = await fetch(
  //     `${import.meta.env.VITE_API_BASE_URL}/api/cartitems`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         cart: updatedItems.cart,
  //         price: updatedItems.price,
  //         discountedPrice: updatedItems.discountedPrice,
  //         userId: user._id,
  //         title: updatedItems.title,
  //         description: updatedItems.description,
  //         discountPercent: updatedItems.discountPercent,
  //         imageUrl: updatedItems.imageUrl,
  //         color: updatedItems.color,
  //       }),
  //     }
  //   );
  // };

  // 🗑️ remove handler
  const handleRemoveItem = (itemId) => {
    const updatedItems = cartItems.filter((item) => item._id !== itemId);
    console.log("Updated cart items after removal: ", updatedItems);
    // update frontend state immediately
    if (updatedItems.length === 0) {
      // Option A: Clear cart completely
      console.log("deletiing cartitem with id: ", itemId);
      deleteItem(itemId);

      localStorage.removeItem("cartItems");
      setCartItems([]);
      // updateCart(user._id, [], 0, 0, 0);
    } else {
      setCartItems(updatedItems);
      deleteItem(itemId);
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      updateCart(
        user._id,
        updatedItems,
        totalPrice,
        totalDiscountedPrice,
        discount
      );
    }
  };

  return (
    <div>
      <div className="lg:grid grid-cols-3 lg:px-16 relative">
        <div className="col-span-2">
          {cartItems.map((item) => (
            <CartItem key={item._id} item={item} onRemove={handleRemoveItem} />
          ))}
        </div>
        <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0">
          <div className="bg-white rounded-2xl shadow-lg p-6 border">
            <p className="uppercase font-semibold text-gray-500 pb-3 tracking-wide">
              Price Details
            </p>
            <hr className="mb-4" />

            <div className="space-y-4 text-gray-700 font-medium">
              <div className="flex justify-between">
                <span>Price</span>
                <span className="text-green-600 font-semibold">
                  ₹{totalPrice}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span className="text-green-600 font-semibold">
                  -₹{discount}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span className="text-green-600 font-semibold">Free</span>
              </div>

              <div className="border-t pt-4 mb-4 flex justify-between text-lg font-bold">
                <span>Total Amount</span>
                <span className="text-green-700">₹{totalDiscountedPrice}</span>
              </div>
            </div>

            <Button
              className="w-full mt-6 !rounded-xl !shadow-md hover:!shadow-lg transition-all"
              variant="contained"
              onClick={() =>
                navigate("/checkout?step=2", { state: location.state })
              }
              sx={{
                px: "2.5rem",
                py: ".9rem",
                bgcolor: "#9155fd",
                fontSize: "1rem",
                fontWeight: "600",
                textTransform: "none",
              }}
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
