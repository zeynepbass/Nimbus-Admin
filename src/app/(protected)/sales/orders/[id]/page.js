import OrderDetailsClient from "@/components/Shared/Orders/tableOrderDetails";
import orders from "@/data/orders.json";

export default async function Page({ params }) {
  const orderId = await params;
  const order = orders.find((o) => o.id === orderId.id);

  if (!order) return <p>Sipariş bulunamadı</p>;

  return <OrderDetailsClient order={order} />;
}
