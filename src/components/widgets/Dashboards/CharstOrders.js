import { Bar, BarChart } from "recharts"

import { ChartContainer, ChartTooltipContent,ChartTooltip } from "@/components/ui/chart"

export function MyChart({data}) {
  return (
    <ChartContainer>
      <BarChart data={data}>
        <Bar dataKey="value" />
        <ChartTooltip content={<ChartTooltipContent />} />
      </BarChart>
    </ChartContainer>
  )
}