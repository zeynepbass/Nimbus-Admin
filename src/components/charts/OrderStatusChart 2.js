"use client";

import ApexChart from "@/components/charts/ApexChart";
import { countByLastStep } from "@/helper/orders";

const options = {
  chart: { type: "pie" },
  labels: ["Satılan", "İptal/İade", "Bekleyen"],
  colors: ["#102E46", "#DEE6F1", "#628DD0"],
  legend: { position: "bottom", fontSize: "13px", markers: { radius: 6 } },
  dataLabels: { enabled: true, style: { fontSize: "12px", fontWeight: "600" } },
  tooltip: { y: { formatter: (value) => `${value} adet` } },
};

export default function OrderStatusChart({ orders }) {
  const series = [
    countByLastStep(orders, "completed"),
    countByLastStep(orders, "cancelled"),
    countByLastStep(orders, "pending"),
  ];

  return (
    <div className="p-6">
      <ApexChart options={options} series={series} type="pie" height={300} />
    </div>
  );
}
