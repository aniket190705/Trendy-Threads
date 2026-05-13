import React, { useEffect, useState } from "react";
import { Box, Button, Grid2, TextField } from "@mui/material";
import AddressCard from "../AddressCard/AddressCard";
import { useAuth } from "../../../Context/AuthContext.jsx";
import OrderLoadingOverlay from "../Order/OrderLoadingOverlay.jsx";

const DeliveryAddressForm = () => {
  const { user, cart, cartItems, addresses, setAddresses } = useAuth();
  // const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [payingAddressId, setPayingAddressId] = useState(null);
  const [payError, setPayError] = useState("");

  // ✅ Fetch user addresses on mount
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/address/${user._id}`,
        );
        const data = await response.json();
        if (response.ok) {
          setAddresses(data.addresses || []);
          localStorage.setItem(
            "addresses",
            JSON.stringify(data.addresses || []),
          );
        } else {
          console.error("Failed to fetch addresses:", data.error);
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };
    fetchAddresses();
  }, [user._id]);

  // ✅ Add a new address
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const formDataObj = Object.fromEntries(data.entries());

    // attach userId
    const payload = {
      ...formDataObj,
      user: user._id, // 👈 ensure it's tied to the logged-in user
    };

    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/address/add`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload), // 👈 send with userId
        },
      );

      const result = await response.json();
      if (response.ok) {
        console.log("Address added:", result.address);
        localStorage.setItem(
          "addresses",
          JSON.stringify([...addresses, result.address]),
        );
        setAddresses((prev) => [...prev, result.address]);

        e.target.reset();
      } else {
        console.error("Failed to add address:", result.error);
      }
    } catch (error) {
      console.error("Error adding address:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Remove an address
  const handleRemove = async (addressId) => {
    try {
      console.log("Removing address:", addressId);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/address/${addressId}`,
        { method: "DELETE" },
      );

      if (response.ok) {
        setAddresses((prev) => prev.filter((a) => a._id !== addressId));
      } else {
        console.error("Failed to delete address");
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  // ✅ Select an address and go to payment
  const handleDeliverHere = async (address) => {
    try {
      setPayError("");
      console.log("Delivering to address:", address);
      const orderData = {
        userId: user._id,
        totalPrice: cart.totalPrice,
        totalItem: cart.totalItem,
        discountedPrice: cart.totalDiscountedPrice,
        shippingAddress: address,
        items: cartItems.map((item) => ({
          productId: item.productId,
          title: item.title,
          imageUrl: item.imageUrl,
          price: item.price,
          discountedPrice: item.discountedPrice,
          quantity: item.quantity,
          color: item.color,
        })),
      };

      setPayingAddressId(address._id);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/payments/createOrder`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        },
      );

      const result = await response.json();
      if (!response.ok) {
        setPayError(result?.error || "Could not create order for payment.");
        return;
      }

      // create payment link
      const paymentRes = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/payments/paymentlink/${
          result.order._id
        }`,
        { method: "POST" },
      );

      const paymentText = await paymentRes.text();
      let paymentData = null;
      try {
        paymentData = paymentText ? JSON.parse(paymentText) : null;
      } catch (error) {
        paymentData = { error: paymentText };
      }

      if (!paymentRes.ok) {
        setPayError(
          paymentData?.error || "Could not create payment link. Please try again."
        );
        return;
      }

      if (paymentData?.paymentLink?.payment_link_url) {
        window.location.href = paymentData.paymentLink.payment_link_url;
      } else {
        setPayError("Payment link is missing from server response.");
      }
    } catch (error) {
      console.error("Error delivering here:", error);
      setPayError("Something went wrong while starting payment.");
    } finally {
      setPayingAddressId(null);
    }
  };

  return (
    <div>
      {payingAddressId && (
        <OrderLoadingOverlay message="Preparing your order and opening the payment page..." />
      )}
      {payError && (
        <div className="mx-5 mb-3 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {payError}
        </div>
      )}
      <Grid2 container spacing={4}>
        {/* LEFT COLUMN - Address List */}
        <Grid2
          size={{ xs: 12, lg: 5 }}
          className="border m-5 rounded-e-md shadow-md h-[30.5rem] overflow-y-scroll"
        >
          {addresses.map((address) => (
            <div
              key={address._id}
              className="p-5 py-7 border-b flex flex-col gap-2"
            >
              <AddressCard address={address} />
              <div className="flex gap-2">
                <Button
                  sx={{ bgcolor: "RGB(145 85 253)" }}
                  size="small"
                  variant="contained"
                  disabled={payingAddressId === address._id}
                  onClick={() => handleDeliverHere(address)}
                >
                  {payingAddressId === address._id
                    ? "Redirecting to payment..."
                    : "Deliver Here and Pay"}
                </Button>
                <Button
                  sx={{ bgcolor: "red" }}
                  size="small"
                  variant="contained"
                  onClick={() => handleRemove(address._id)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </Grid2>

        {/* RIGHT COLUMN - Add New Address */}
        <Grid2 size={{ xs: 12, lg: 6 }} item>
          <Box className="border rounded-s-md shadow-md p-5">
            <form onSubmit={handleSubmit}>
              <Grid2 container spacing={3}>
                <Grid2 item size={{ xs: 12, sm: 6 }}>
                  <TextField
                    required
                    name="firstName"
                    label="First Name"
                    fullWidth
                  />
                </Grid2>
                <Grid2 item size={{ xs: 12, sm: 6 }}>
                  <TextField
                    required
                    name="lastName"
                    label="Last Name"
                    fullWidth
                  />
                </Grid2>
                <Grid2 item size={{ xs: 12 }}>
                  <TextField
                    required
                    name="address"
                    label="Address"
                    fullWidth
                    multiline
                    rows={4}
                  />
                </Grid2>
                <Grid2 item size={{ xs: 12, sm: 6 }}>
                  <TextField required name="city" label="City" fullWidth />
                </Grid2>
                <Grid2 item size={{ xs: 12, sm: 6 }}>
                  <TextField
                    required
                    name="state"
                    label="State/Province/Region"
                    fullWidth
                  />
                </Grid2>
                <Grid2 item size={{ xs: 12, sm: 6 }}>
                  <TextField
                    required
                    name="zipCode"
                    label="Zip / Postal Code"
                    fullWidth
                  />
                </Grid2>
                <Grid2 item size={{ xs: 12, sm: 6 }}>
                  <TextField
                    required
                    name="mobile"
                    label="Mobile Number"
                    fullWidth
                  />
                </Grid2>
                <Grid2 item size={{ xs: 12, sm: 6 }}>
                  <Button
                    sx={{ mt: 2, bgcolor: "RGB(145 85 253)" }}
                    size="large"
                    variant="contained"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Add Delivery Address"}
                  </Button>
                </Grid2>
              </Grid2>
            </form>
          </Box>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default DeliveryAddressForm;
