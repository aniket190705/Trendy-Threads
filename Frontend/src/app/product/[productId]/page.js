import ProductDetail from "@/customer/components/ProductDetails/ProductDetail";
import { homeCatalog } from "@/lib/catalog";

export function generateStaticParams() {
  return Array.from(
    new Set(homeCatalog.map((product) => String(product.productId))),
  ).map((productId) => ({
    productId,
  }));
}

export default async function ProductDetailPage({ params }) {
  const { productId } = await params;

  return <ProductDetail productId={productId} />;
}
