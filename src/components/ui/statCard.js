import { FileText } from "lucide-react"

export default function StatCard({ title, value }) {
  return (
    <div className="rounded-xl border p-4 bg-[#102E46]">
      <div className="flex items-center justify-between">
        <p className="text-sm text-white">{title}</p>
        <FileText className="w-5 h-5 text-white" />
      </div>
      <p className="text-2xl font-bold mt-2 text-white">{value}</p>
    </div>
  )
}
