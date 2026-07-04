"use client";

const OrderLoadingOverlay = ({ message }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="rounded-[28px] bg-white px-8 py-6 shadow-2xl">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-stone-200 border-t-brand-700" />
          <p className="text-center text-sm font-medium text-stone-700">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderLoadingOverlay;
