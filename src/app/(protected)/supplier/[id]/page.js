import SupplierDetails from "@/components/Shared/Supplier/tableSupplierDetails";
import Supplier from "@/data/supplier.json";

export default async function Page({ params }) {
  const dashboardId = await params;
  const supplier = Supplier.find((o) => o.id === dashboardId.id);

  if (!supplier) return <p>Tedarikçi bulunamadı</p>;

  return <SupplierDetails supplier={supplier} />;
}
