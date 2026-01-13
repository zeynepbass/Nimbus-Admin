import { FileText } from "lucide-react"

export default function StatCard({ title, value }) {
  return (
    <div className="rounded-xl border p-4 bg-zinc-100 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">{title}</p>
        <FileText className="w-5 h-5 text-gray-600" />
      </div>
      <p className="text-2xl font-bold mt-2 text-gray-600">{value}</p>
    </div>
  )
}
