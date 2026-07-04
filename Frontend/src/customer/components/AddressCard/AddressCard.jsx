"use client";

const AddressCard = ({ address = {} }) => {
  return (
    <div className="space-y-2 text-sm text-stone-600">
      <p className="font-semibold text-brand-900">
        {address.firstName} {address.lastName}
      </p>
      <p>
        {address.address}, {address.city}, {address.zipCode}
      </p>
      <div className="space-y-1">
        <p className="font-semibold text-stone-700">Phone Number</p>
        <p>{address.mobile}</p>
      </div>
    </div>
  );
};

export default AddressCard;
