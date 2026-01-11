import { FileText } from "lucide-react"

export default function StatCard({ title, value }) {
  return (
    <div className="rounded-xl border p-4 bg-white">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{title}</p>
        <FileText className="w-5 h-5 text-muted-foreground" />
      </div>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  )
}
