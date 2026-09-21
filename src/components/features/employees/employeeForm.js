export const EMPTY_EMPLOYEE = {
  firstName: "",
  lastName: "",
  department: "",
  position: "",
  email: "",
  phone: "",
  address: { city: "", district: "", fullAddress: "" },
  education: { university: "", faculty: "", degree: "" },
  employment: { startDate: "", contractType: "", workType: "" },
  status: "active",
  performanceScore: 0,
};

export const withFullName = (employee) => ({
  ...employee,
  fullName: `${employee.firstName} ${employee.lastName}`,
});
