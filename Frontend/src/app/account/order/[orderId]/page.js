import OrderDetails from "@/customer/components/Order/OrderDetails";

export default function OrderDetailsPage({ params }) {
  return <OrderDetails orderId={params.orderId} />;
}
