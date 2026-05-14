import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, CheckCircle, Clock, TrendingUp, TrendingDown } from "lucide-react"

const stats = [
  {
    title: "Total Reported Issues",
    value: "2,847",
    change: "+12%",
    trend: "up",
    icon: AlertTriangle,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    title: "Verified Issues",
    value: "1,923",
    change: "+8%",
    trend: "up",
    icon: CheckCircle,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Resolved Cases",
    value: "1,456",
    change: "+15%",
    trend: "up",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Pending Issues",
    value: "467",
    change: "-5%",
    trend: "down",
    icon: Clock,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
]

export function OverviewCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon
        const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown

        return (
          <Card key={stat.title} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-600 leading-tight">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor} flex-shrink-0`}>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</div>
                <div
                  className={`flex items-center text-xs sm:text-sm ${stat.trend === "up" ? "text-green-600" : "text-red-600"} flex-shrink-0`}
                >
                  <TrendIcon className="w-3 h-3 mr-1" />
                  {stat.change}
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
