import EmployeeDetails from "@/components/features/employees/EmployeeDetails";
import employees from "@/data/employees.json";

export default async function Page({ params }) {
  const { id } = await params;
  const employee = employees.find((item) => item.id === id);

  if (!employee) return <p className="text-center">Personel bulunamadı</p>;

  return <EmployeeDetails employee={employee} />;
}
