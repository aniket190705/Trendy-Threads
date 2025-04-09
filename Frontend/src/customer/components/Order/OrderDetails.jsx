import React from "react";
import AddressCard from "../AddressCard/AddressCard";
import OrderTracker from "./OrderTracker";
import { Grid2 } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import Box from "@mui/material/Box";
import StarBorderIcon from "@mui/icons-material/StarBorder";
const OrderDetails = () => {
  return (
    <div className="lg:px-20">
      <div className="p-2 shadow-xl rounded-s-md border ">
        <h1 className="font-bold text-xl py-7">Delivery Address</h1>
        <AddressCard />
      </div>

      <div className="m-10">
        <OrderTracker activeStep={3} />
      </div>

      <Grid2 className="space-y-5 m-5" container>
        {[1, 1, 1, 1].map((item) => (
          <Grid2
            item
            container
            className="shadow-xl rounded-md p-5 border w-full"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Grid2
              item
              size={{ xs: 6 }}
              sx={{ width: "full" }}
              className="w-full"
            >
              <div className="flex items-center space-x-2">
                <img
                  className="w-[5rem] h-[5rem] object-cover object-top"
                  src="https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/e/j/j/l-jcardkurta-yellow-divra-clothing-original-imaggjhfgjqhuwtk.jpeg?q=70"
                  alt=""
                ></img>
                <div className="space-y-2">
                  <p className="">Men Slim Mid Rise Black Jeans</p>
                  <p className="opacity-50 text-xs font-semibold space-x-5">
                    <span>Size: M</span>
                    <span>Color: Black</span>{" "}
                  </p>
                  <p className="opacity-50 text-xs font-semibold">
                    Seller: Linaria
                  </p>
                  <p className="opacity-50 text-xs font-semibold">
                    Price: ₹2455
                  </p>
                </div>
              </div>
            </Grid2>

            <Grid2 item>
              <Box sx={{ color: deepPurple[500] }}>
                <StarBorderIcon
                  sx={{ fontSize: "2rem" }}
                  className="px-2 text-5xl"
                ></StarBorderIcon>
                <span>Rate and review product</span>
              </Box>
            </Grid2>
          </Grid2>
        ))}
      </Grid2>
    </div>
  );
};

export default OrderDetails;
