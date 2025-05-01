import React from "react";
import Navigation from "./customer/components/Navigation/Navigation";
import HomePage from "./customer/pages/HomePage/HomePage";
import Card from "./customer/components/HomeSectionCard/Card";
import Footer from "./customer/components/Footer/Footer";
import Product from "./customer/components/Product/Product";
import ProductDetails from "./customer/components/ProductDetails/ProductDetail";
import Cart from "./customer/components/Cart/Cart";
import Checkout from "./customer/components/Checkout/Checkout";
import DeliveryAddressForm from "./customer/components/Checkout/DeliveryAddressForm";
import Order from "./customer/components/Order/Order";
import OrderDetails from "./customer/components/Order/OrderDetails";
import CustomerRouter from "./Routes/CustomerRouter";
import ProductCard from "./customer/components/Product/ProductCard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/*" element={<CustomerRouter />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
