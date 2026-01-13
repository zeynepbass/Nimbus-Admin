import EmployeesDetails from "@/components/Shared/HumanResources/Employees/tableEmployeesDetails";
import Employees from "@/data/employees.json";

export default async function Page({ params }) {
  const dashboardId = await params;
  const employees = Employees.find((o) => o.id === dashboardId.id);

  if (!employees) return <p>Personel bulunamadı</p>;

  return <EmployeesDetails user={employees} />;
}
