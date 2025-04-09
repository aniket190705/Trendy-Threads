import React from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "../customer/components/Navigation/Navigation";
import HomePage from "../customer/pages/HomePage/HomePage";
import Footer from "../customer/components/Footer/Footer";
import Product from "../customer/components/Product/Product";
import Cart from "../customer/components/Cart/Cart";
import ProductDetails from "../customer/components/ProductDetails/ProductDetail";
import DeliveryAddressForm from "../customer/components/Checkout/DeliveryAddressForm";
import Checkout from "../customer/components/Checkout/Checkout";
import OrderDetails from "../customer/components/Order/OrderDetails";
import Order from "../customer/components/Order/Order";
import Signin from "../customer/components/Login/Signin";
import Signup from "../customer/components/Login/Signup";
const CustomerRouter = () => {
  return (
    <div>
      <div>
        <Navigation />
      </div>

      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route
          path="/:levelOne/:levelTwo/:levelThree"
          element={<Product />}
        ></Route>
        <Route path="/product/:productId" element={<ProductDetails />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/account/order" element={<Order />}></Route>
        <Route
          path="/account/order/:orderId"
          element={<OrderDetails />}
        ></Route>
        <Route path="/account/signup" element={<Signup />}></Route>
        <Route path="/account/signin" element={<Signin />}></Route>
      </Routes>

      <div>
        <Footer />
      </div>

      <div>
        {/* <Cart /> */}

        {/* <Checkout /> */}
        {/* <DeliveryAddressForm /> */}
        {/* <Order /> */}
        {/* <OrderDetails /> */}
      </div>
    </div>
  );
};

export default CustomerRouter;
