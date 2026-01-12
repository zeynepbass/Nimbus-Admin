import SummaryDetailsClient from "@/components/Shared/Dashboards/tableSummaryDetails";
import Dashboard from "@/data/product.json";

export default async function Page({ params }) {
  const dashboardId = await params;
  const summary = Dashboard.find((o) => o.id === dashboardId.id);

  if (!summary) return <p>Ürün bulunamadı</p>;

  return <SummaryDetailsClient order={summary} />;
}
