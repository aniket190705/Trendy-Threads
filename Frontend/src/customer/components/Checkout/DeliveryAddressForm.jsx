import React from "react";
import { Box, Button, Grid2, TextField } from "@mui/material";
import AddressCard from "../AddressCard/AddressCard";
import Checkout from "./Checkout.jsx";
import { useNavigate } from "react-router-dom";

// import { create } from "../../../../../API/src/models/order.model.js";

const DeliveryAddressForm = ({ item }) => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("item from delivery address form: ", item);
    const data = new FormData(e.currentTarget);
    // const a = Checkout.hojapls();

    // Convert FormData to an object
    const formDataObj = Object.fromEntries(data.entries());

    // user: data.userId,  // Assuming userId is passed in data
    // totalPrice: data.totalPrice, // Assuming totalPrice is passed in data
    // totalItem: data.totalItem, // Assuming totalItem is passed in data
    // shippingAddress: data.shippingAddress
    console.log("address: ", formDataObj);
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("userId from delivery address form: ", user._id);
    const orderData = {
      userId: user._id,
      totalPrice: item.price,
      totalItem: item.quantity,
      shippingAddress: formDataObj,
    };

    //Creating order
    console.log("order data: ", orderData);
    try {
      const response = await fetch(
        "https://trendy-threads-jsld.onrender.com/api/payments/createOrder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      const text = await response.text(); // read once
      let result;
      result = JSON.parse(text); // parse the text to JSON
      if (response.ok) {
        console.log("Order created successfully:", result.order);
        createPaymentLink(result.order._id); // Call createPaymentLink with the order ID
      } else {
        console.log(result?.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const createPaymentLink = async (orderId) => {
    try {
      console.log("orderId from delivery address formmm: ", orderId);
      const response = await fetch(
        `https://trendy-threads-jsld.onrender.com/api/payments/paymentlink/${orderId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(formDataObj),
        }
      );
      const result = await response.json();
      if (response.ok) {
        console.log("link created successfully: ", result.paymentLink);
        // ✅ Store JWT
        window.location.href = result.paymentLink.payment_link_url; // ✅ Redirect to Home Page
      } else {
        console.log("Error redirecting to payment link: ", result.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Grid2 container spacing={4}>
        <Grid2
          size={{ xs: 12, lg: 5 }}
          className="border m-5 rounded-e-md shadow-md h-[30.5rem] overflow-y-scroll"
        >
          <div className="p-5 py-7 border-b cursor-pointer">
            <AddressCard />
            <Button
              sx={{ mt: 2, bgcolor: "RGB(145 85 253)" }}
              size="large"
              variant="contained"
            >
              Deliver Here and Pay
            </Button>
          </div>
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 6 }} item>
          <Box className="border rounded-s-md shadow-md p-5">
            <form onSubmit={handleSubmit}>
              <Grid2 container spacing={3}>
                <Grid2 item size={{ xs: 12, sm: 6 }}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid2>

                <Grid2 item size={{ xs: 12, sm: 6 }}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid2>

                <Grid2 item size={{ xs: 12 }}>
                  <TextField
                    required
                    id="adress"
                    name="Address"
                    label="Address"
                    fullWidth
                    autoComplete="given-name"
                    multiline
                    rows={4}
                  />
                </Grid2>

                <Grid2 item size={{ xs: 12, sm: 6 }}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid2>

                <Grid2 item size={{ xs: 12, sm: 6 }}>
                  <TextField
                    required
                    id="state"
                    name="state"
                    label="State/Province/Region"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid2>

                <Grid2 item size={{ xs: 12, sm: 6 }}>
                  <TextField
                    required
                    id="zipCode"
                    name="zipCode"
                    label="Zip / Postal Code"
                    fullWidth
                    autoComplete="shipping postal-code"
                  />
                </Grid2>

                <Grid2 item size={{ xs: 12, sm: 6 }}>
                  <TextField
                    required
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Phone Number"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid2>

                <Grid2 item size={{ xs: 12, sm: 6 }}>
                  <Button
                    sx={{ mt: 2, bgcolor: "RGB(145 85 253)" }}
                    size="large"
                    variant="contained"
                    type="submit"
                  >
                    Deliver Here and Pay
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
