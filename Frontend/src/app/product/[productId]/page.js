import ProductDetail from "@/customer/components/ProductDetails/ProductDetail";

export default function ProductDetailPage({ params }) {
  return <ProductDetail productId={params.productId} />;
}
