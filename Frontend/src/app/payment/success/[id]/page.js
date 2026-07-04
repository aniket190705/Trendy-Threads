import PaymentSuccessful from "@/customer/PaymentUpdate/PaymentSuccessful";

export default function PaymentSuccessPage({ params }) {
  return <PaymentSuccessful orderId={params.id} />;
}
