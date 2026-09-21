import ProductDetails from "@/components/features/products/ProductDetails";
import products from "@/data/product.json";

export default async function Page({ params }) {
  const { id } = await params;
  const product = products.find((item) => item.id === id);

  if (!product) return <p className="text-center">Ürün bulunamadı</p>;

  return <ProductDetails product={product} />;
}
