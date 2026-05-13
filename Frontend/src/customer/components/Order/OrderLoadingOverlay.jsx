import React from "react";

const OrderLoadingOverlay = ({ message }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="rounded-2xl bg-white px-8 py-6 shadow-2xl">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-violet-600"></div>
          <p className="text-center text-sm font-medium text-gray-700">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderLoadingOverlay;
