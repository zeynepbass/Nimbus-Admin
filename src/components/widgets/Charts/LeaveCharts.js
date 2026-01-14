"use client";

import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function LeaveChart({ employees }) {
  // Bugünden itibaren son 7 günü oluştur
  const today = new Date();
  const last7Days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    last7Days.push(d.toISOString().slice(0, 10));
  }

  const leaveCounts = last7Days.map(date => {
    return employees.reduce((count, emp) => {
      const isOnLeave = emp.leaveDates.some(leave => {
        const from = new Date(leave.from);
        const to = new Date(leave.to);
        const current = new Date(date);
        return current >= from && current <= to;
      });
      return count + (isOnLeave ? 1 : 0); 
    }, 0);
  });
  

  return (
    <Chart
      type="bar"
      height={350}
      series={[{ name: "İzinli Personel", data: leaveCounts }]}
      options={{
        chart: { toolbar: { show: false } },
        colors: ['#6C120B'],
        xaxis: {
          categories: last7Days,
          title: { text: "Tarih" },
        },
        yaxis: {
          title: { text: "İzinli Personel Sayısı" },
          min: 0,
          forceNiceScale: true
        },
        tooltip: {
          y: {
            formatter: (val) => `${val} kişi izinli`,
          },
        },
        title: {
          text: "Son 7 Gün İzinli Personeller",
        },
      }}
    />
  );
}
