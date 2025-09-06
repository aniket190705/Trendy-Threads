import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Button } from "@headlessui/react";
import { useAuth } from "../../../Context/AuthContext";

const CartItem = ({ item, onRemove }) => {
  const { user, setCartItems } = useAuth();
  const [loading, setLoading] = useState(false); // 🔑 disable buttons while updating

  useEffect(() => {
    if (item.quantity === 0) {
      onRemove(item._id);
    }
  }, [item.quantity, item._id, onRemove]);

  const fetchCartItems = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/cart/${user._id}`
    );
    const data = await response.json();
    setCartItems(data.cartItems);
    localStorage.setItem("cartItems", JSON.stringify(data.cartItems));
  };

  const updateQuantity = async (newQuantity) => {
    setLoading(true); // disable buttons
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/cartitems/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity: newQuantity,
            userId: user._id,
            productId: item.productId,
          }),
        }
      );

      const data = await response.json();
      console.log("Item updated:", data);

      await fetchCartItems();
    } catch (err) {
      console.error("Error updating cart item:", err);
    } finally {
      setLoading(false); // re-enable buttons
    }
  };

  const handleAdd = () => updateQuantity(item.quantity + 1);
  const handleRemove = () => updateQuantity(item.quantity - 1);

  return (
    <div className="p-5 border shadow-lg rounded-md m-4">
      <div className="flex items-center">
        <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
          <img
            className="w-full h-full object-cover object-top"
            src={item.imageUrl}
            alt=""
          />
        </div>

        <div className="ml-5 space-y-1">
          <p className="font-semibold">{item.title}</p>
          <p className="opacity-70">Size: L, {item.color}</p>
          <p className="opacity-70 mt-2">Seller: allan peter</p>

          <div className="flex space-x-5 items-center text-gray-900 mt-6">
            <p className="font-semibold">₹{item.discountedPrice}</p>
            <p className="opacity-50 line-through">₹{item.price}</p>
            <p className="text-green-600 font-semibold">
              {item.discountPercent}%
            </p>
          </div>
        </div>
      </div>

      <div className="lg:flex items-center lg:space-x-10 pt-4">
        <div className="flex items-center space-x-2">
          <IconButton
            onClick={handleRemove}
            disabled={loading || item.quantity <= 1}
          >
            <RemoveCircleOutlineIcon />
          </IconButton>
          <span className="py-1 px-7 border rounded-sm">{item.quantity}</span>
          <IconButton
            onClick={handleAdd}
            sx={{ color: "RGB(145, 85, 253)" }}
            disabled={loading}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </div>

        <div>
          <Button
            className={`text-purple-600 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => onRemove(item._id)}
            disabled={loading}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
