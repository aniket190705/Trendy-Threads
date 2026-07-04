"use client";

const OrderSummary = () => {
  return (
    <div className="rounded-[28px] border border-dashed border-stone-300 bg-stone-50 px-6 py-12 text-center">
      <p className="font-serif text-2xl text-brand-900">Order summary preview</p>
      <p className="mt-3 text-sm text-stone-500">
        The current checkout flow still advances to the delivery address step via
        `?step=2`, matching the existing application behavior.
      </p>
    </div>
  );
};

export default OrderSummary;
