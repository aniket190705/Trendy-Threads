import React, { useEffect } from "react";
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
import PaymentSuccessful from "../customer/PaymentUpdate/PaymentSuccessful";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
const CustomerRouter = () => {
  const [notification, setNotification] = React.useState("");
  const { isSignedIn } = useAuth();
  useEffect(() => {
    if (isSignedIn) {
      setNotification("");
    }
  }, [isSignedIn]);

  return (
    <div>
      <div>
        <Navigation setNotification={setNotification} />
      </div>
      <div className="flex justify-center">
        {notification && (
          <div className="w-full sm:px-6 flex items-center lg:max-w-7xl lg:px-2 mb-4 mt-4">
            <div className="rounded-md flex items-center w-full bg-yellow-100 p-4 justify-between">
              <p className="text-sm w-full flex-1 font-medium text-yellow-800">
                {notification}
              </p>
              <button
                onClick={() => {
                  setNotification("");
                  if (!isSignedIn) navigate("/account/signin"); // redirect if user clicks dismiss
                }}
                className="ml-3 text-yellow-700 font-semibold hover:underline"
              >
                Sign In
              </button>
            </div>
          </div>
        )}
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
        <Route
          path="/payment/success/:id"
          element={<PaymentSuccessful />}
        ></Route>
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
