import SummaryDetailsClient from "@/components/Shared/Dashboards/LastOrders/tableLastOrdersDetails";
import Dashboard from "@/data/product.json";

export default async function Page({ params }) {
  const dashboardId = await params;
  const summary = Dashboard.find((o) => o.id === dashboardId.id);

  if (!summary) return <p className="text-center">Ürün bulunamadı</p>;

  return <SummaryDetailsClient order={summary} />;
}
