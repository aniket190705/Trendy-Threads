"use client";

import { useEffect, useState } from "react";
import { Box, Button, Grid2, TextField } from "@mui/material";
import AddressCard from "../AddressCard/AddressCard";
import { useAuth } from "../../../Context/AuthContext.jsx";
import OrderLoadingOverlay from "../Order/OrderLoadingOverlay.jsx";
import { buildApiUrl } from "@/lib/api";

const DeliveryAddressForm = () => {
  const { user, cart, cartItems, addresses, setAddresses } = useAuth();
  const [loading, setLoading] = useState(false);
  const [payingAddressId, setPayingAddressId] = useState(null);
  const [payError, setPayError] = useState("");

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetch(buildApiUrl(`/api/address/${user._id}`));
        const data = await response.json();
        if (response.ok) {
          setAddresses(data.addresses || []);
          localStorage.setItem("addresses", JSON.stringify(data.addresses || []));
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    if (user?._id) {
      fetchAddresses();
    }
  }, [setAddresses, user?._id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formDataObj = Object.fromEntries(data.entries());
    const payload = { ...formDataObj, user: user._id };

    try {
      setLoading(true);
      const response = await fetch(buildApiUrl("/api/address/add"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok) {
        localStorage.setItem(
          "addresses",
          JSON.stringify([...addresses, result.address]),
        );
        setAddresses((previous) => [...previous, result.address]);
        event.target.reset();
      }
    } catch (error) {
      console.error("Error adding address:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (addressId) => {
    try {
      const response = await fetch(buildApiUrl(`/api/address/${addressId}`), {
        method: "DELETE",
      });

      if (response.ok) {
        setAddresses((previous) => previous.filter((item) => item._id !== addressId));
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const handleDeliverHere = async (address) => {
    try {
      setPayError("");
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
      const response = await fetch(buildApiUrl("/api/payments/createOrder"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      if (!response.ok) {
        setPayError(result?.error || "Could not create order for payment.");
        return;
      }

      const paymentRes = await fetch(
        buildApiUrl(`/api/payments/paymentlink/${result.order._id}`),
        { method: "POST" },
      );

      const paymentText = await paymentRes.text();
      let paymentData = null;
      try {
        paymentData = paymentText ? JSON.parse(paymentText) : null;
      } catch {
        paymentData = { error: paymentText };
      }

      if (!paymentRes.ok) {
        setPayError(
          paymentData?.error || "Could not create payment link. Please try again.",
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
        <div className="mx-5 mb-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {payError}
        </div>
      )}
      <Grid2 container spacing={4}>
        <Grid2
          size={{ xs: 12, lg: 5 }}
          className="m-5 h-[30.5rem] overflow-y-scroll rounded-[28px] border border-stone-200 bg-white shadow-sm"
        >
          {addresses.map((address) => (
            <div
              key={address._id}
              className="flex flex-col gap-3 border-b border-stone-100 p-5 py-7"
            >
              <AddressCard address={address} />
              <div className="flex gap-2">
                <Button
                  sx={{ bgcolor: "#64432f" }}
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

        <Grid2 size={{ xs: 12, lg: 6 }}>
          <Box className="rounded-[28px] border border-stone-200 bg-white p-5 shadow-sm">
            <form onSubmit={handleSubmit}>
              <Grid2 container spacing={3}>
                <Grid2 size={{ xs: 12, sm: 6 }}>
                  <TextField required name="firstName" label="First Name" fullWidth />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6 }}>
                  <TextField required name="lastName" label="Last Name" fullWidth />
                </Grid2>
                <Grid2 size={{ xs: 12 }}>
                  <TextField
                    required
                    name="address"
                    label="Address"
                    fullWidth
                    multiline
                    rows={4}
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6 }}>
                  <TextField required name="city" label="City" fullWidth />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6 }}>
                  <TextField
                    required
                    name="state"
                    label="State/Province/Region"
                    fullWidth
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6 }}>
                  <TextField required name="zipCode" label="Zip / Postal Code" fullWidth />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6 }}>
                  <TextField required name="mobile" label="Mobile Number" fullWidth />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6 }}>
                  <Button
                    sx={{ mt: 2, bgcolor: "#64432f" }}
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
