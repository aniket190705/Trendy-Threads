import { Grid2 } from "@mui/material";
import React from "react";
import OrderCard from "./OrderCard";

const Order = () => {
  const orderStatus = [
    { label: "On The Way", value: "on_the_way" },
    { label: "Delivered", value: "delevered" },
    { label: "Cancelled", value: "cancelled" },
    { label: "Returned", value: "returned" },
  ];
  return (
    <div>
      <Grid2 container sx={{ justifyContent: "space-between" }}>
        <Grid2 item size={{ xs: 2.5 }}>
          <div className="h-auto shadow-lg bg-white p-5 sticky top-5">
            <h1 className="font-bold text-lg">Filter</h1>
            <div className="space-y-4 mt-10">
              <h1 className="font-semibold">OREDER STATUS</h1>

              {orderStatus.map((option) => (
                <div className="flex items-center">
                  <input
                    defaultValue={option.value}
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 
text-indigo-600 
focus: ring-indigo-500"
                  />
                  <label
                    className="ml-3 text-smtext-gray-600"
                    htmlFor={option.value}
                  >
                    {option.label}{" "}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </Grid2>

        <Grid2 item size={{ xs: 9 }}>
          <div>
            {[1, 1, 1, 1, 1, 1].map((item) => {
              return <OrderCard />;
            })}
          </div>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default Order;
