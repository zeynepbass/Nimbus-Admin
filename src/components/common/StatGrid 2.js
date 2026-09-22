import StatCard from "@/components/common/StatCard";

export default function StatGrid({ stats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map(({ title, value }) => (
        <StatCard key={title} title={title} value={value} />
      ))}
    </div>
  );
}
