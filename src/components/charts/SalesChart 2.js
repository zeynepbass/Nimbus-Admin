"use client";

import ApexChart from "@/components/charts/ApexChart";
import { formatShortDate } from "@/helper/formatDate";

export default function SalesChart({ products }) {
  const series = [{ name: "Satış", data: products.map((product) => product.sold) }];

  const options = {
    chart: { type: "line", toolbar: { show: false } },
    stroke: { curve: "smooth", width: 3 },
    xaxis: {
      categories: products.map((product) => formatShortDate(product.createdAt)),
    },
    dataLabels: { enabled: false },
    grid: { strokeDashArray: 4 },
    colors: ["#6C120B"],
    tooltip: { y: { formatter: (value) => `${value} adet` } },
  };

  return <ApexChart options={options} series={series} type="line" height={300} />;
}
