"use client";

import ApexChart from "@/components/charts/ApexChart";

export default function SalesChart({ products }) {
  const series = [{ name: "Satış", data: products.map((product) => product.sold) }];

  const options = {
    chart: { type: "line", toolbar: { show: false } },
    stroke: { curve: "smooth", width: 3 },
    xaxis: {
      categories: products.map((product) =>
        new Date(product.createdAt).toLocaleDateString("tr-TR", {
          day: "2-digit",
          month: "short",
        })
      ),
    },
    dataLabels: { enabled: false },
    grid: { strokeDashArray: 4 },
    colors: ["#6C120B"],
    tooltip: { y: { formatter: (value) => `${value} adet` } },
  };

  return <ApexChart options={options} series={series} type="line" height={300} />;
}
