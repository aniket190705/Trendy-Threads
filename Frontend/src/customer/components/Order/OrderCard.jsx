import { Grid2 } from "@mui/material";
import React from "react";
import AdjustIcon from "@mui/icons-material/Adjust";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import { Height } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const OrderCard = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/account/order/${5}`)}
      className="border p-5 shadow-lg rounded-md hover:shadow-xl m-2"
    >
      <Grid2 container spacing={2} sx={{ justifyContent: "space-between" }}>
        <Grid2 item xs={6}>
          <div className="flex cursor-pointer">
            <img
              className="w-[5rem] h-[5rem] object-cover object-top"
              src="https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/e/j/j/l-jcardkurta-yellow-divra-clothing-original-imaggjhfgjqhuwtk.jpeg?q=70"
              alt=""
            ></img>
            <div className="ml-5 space-y-2">
              <p className="">Men Slim Mid Rise Black Jeans</p>
              <p className="opacity-50 text-xs font-semibold">Size: M</p>
              <p className="opacity-50 text-xs font-semibold">Color: Black</p>
            </div>
          </div>
        </Grid2>

        <Grid2 item size={{ xs: 2 }}>
          <p>₹1299</p>
        </Grid2>

        <Grid2 item size={{ xs: 4 }}>
          {true && (
            <div>
              <p>
                <AdjustIcon
                  sx={{ height: "15px", width: "15px" }}
                  className="text-green-600 mr-2"
                />
                <span>Delivered on March 3</span>
              </p>
              <p className="text-xs">Your item has been delivered</p>
            </div>
          )}

          {false && (
            <p>
              <span>Expected Delivery on March 3</span>
            </p>
          )}
        </Grid2>
      </Grid2>
    </div>
  );
};

export default OrderCard;
