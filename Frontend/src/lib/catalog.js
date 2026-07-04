import { mens_kurta } from "@/data/mensKurta";
import { dressPage1 } from "../../../ecommerceData/ecommerce-products-data-master/dress/page1";
import { mensShoesPage1 } from "../../../ecommerceData/ecommerce-products-data-master/shoes/shoes";

export const homeCatalog = [
  ...mens_kurta.map((product) => ({ ...product, category: "Men" })),
  ...dressPage1.map((product) => ({ ...product, category: "Women" })),
  ...mensShoesPage1.map((product) => ({ ...product, category: "Shoes" })),
];

export const storefrontCatalog = mens_kurta;

export const findProductById = (productId) =>
  homeCatalog.find((product) => String(product.productId) === String(productId));
