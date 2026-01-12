"use client";

import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function SalesChart({ orders }) {
  const series = [
    {
      name: "Satış",
      data: orders.map((o) => o.sold),
    },
  ];

  const options = {
    chart: {
      type: "line",
      toolbar: { show: false },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    xaxis: {
      categories: orders.map((o) =>
        new Date(o.createdAt).toLocaleDateString("tr-TR", {
          day: "2-digit",
          month: "short",
        })
      ),
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      strokeDashArray: 4,
    },

    colors: [
     "#6C120B"

    ],
    tooltip: {
      y: {
        formatter: (val) => `${val} adet`,
      },
    },
  };

  return (
    <Chart
      options={options}
      series={series}
      type="line"
      height={300}
    />
  );
}
