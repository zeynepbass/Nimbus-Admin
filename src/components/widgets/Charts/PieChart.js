"use client";

import dynamic from "next/dynamic";
import initialOrders from "@/data/orders";
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function PieChart({initialOrders}) {
  const pending = initialOrders.filter(order => {
    const lastStatus = order.timeline.at(-1); 
    return lastStatus?.key === "pending";
  }).length;
  const created = initialOrders.filter(order => {
    const lastStatus = order.timeline.at(-1); 
    return lastStatus?.key === "completed";
  }).length;
  const cancelled = initialOrders.filter(order => {
    const lastStatus = order.timeline.at(-1); 
    return lastStatus?.key === "cancelled";
  }).length;
  
console.log(pending, created, cancelled)
  const series = [pending, created, cancelled];

  const options = {
    chart: {
      type: "pie",
    },

    labels: ["Satılan", "İptal/İade", "Bekleyen"],

    colors: [
      "#102E46", 
      "#DEE6F1",
      "#628DD0", 
    ],

    legend: {
      position: "bottom",
      fontSize: "13px",
      markers: {
        radius: 6,
      },
    },

    dataLabels: {
      enabled: true,
      style: {
        fontSize: "12px",
        fontWeight: "600",
      },
    },

    tooltip: {
      y: {
        formatter: (val) => `${val} adet`,
      },
    },
  };

  return (
    <div className="p-6">

      <Chart
        options={options}
        series={series}
        type="pie"
        height={300}
      />
    </div>
  );
}
