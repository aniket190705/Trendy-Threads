import React from "react";
import CartItem from "./CartItem";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state || {};

  return (
    <div>
      <div className="lg:grid grid-cols-3 lg:px-16 relative">
        <div className="col-span-2">
          {[1, 1, 1, 1, 1].map((item) => {
            return <CartItem />;
          })}
        </div>
        <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0">
          <div className="border">
            <p className="uppercase font-bold opacity-60 pb-4">Price details</p>
            <hr />
            <div className="space-y-3 font-semibold mb-10">
              <div className="flex justify-between pt-3 ">
                <span>Price</span>
                <span className="text-green-600">₹4697</span>
              </div>
              <div className="flex justify-between pt-3 ">
                <span>Discount</span>
                <span className="text-green-600">-₹3697</span>
              </div>

              <div className="flex justify-between pt-3 ">
                <span>Delivery Charge</span>
                <span className="text-green-600">Free</span>
              </div>

              <div className="flex justify-between pt-3 ">
                <span>Total Amount</span>

                <span className="text-green-600">₹1000</span>
              </div>
            </div>
            <Button
              className="w-full mt-5"
              variant="contained"
              onClick={() => navigate("/checkout?step=2", { state: item })}
              sx={{
                px: "2.5rem",
                py: ".7rem",
                bgcolor: "#9155fd",
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
