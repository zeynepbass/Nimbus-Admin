"use client";

import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function PieChart() {
  const series = [45, 25, 15];

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
      <h3 className="text-sm font-semibold text-[#6C120B] mb-4">
        Sipariş Durumları
      </h3>

      <Chart
        options={options}
        series={series}
        type="pie"
        height={300}
      />
    </div>
  );
}
