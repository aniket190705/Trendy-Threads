import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import CustomerRouter from "./Routes/CustomerRouter";

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
