"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, TrendingDown, MapPin, Clock, Users, CheckCircle, AlertTriangle } from "lucide-react"

const districtData = [
  {
    name: "Central District",
    totalIssues: 1247,
    resolved: 1089,
    pending: 158,
    avgResolutionTime: 4.2,
    performance: 87.3,
    population: 450000,
    area: 125,
    departments: 8,
  },
  {
    name: "North District",
    totalIssues: 892,
    resolved: 756,
    pending: 136,
    avgResolutionTime: 3.8,
    performance: 84.8,
    population: 320000,
    area: 98,
    departments: 6,
  },
  {
    name: "South District",
    totalIssues: 1156,
    resolved: 934,
    pending: 222,
    avgResolutionTime: 5.1,
    performance: 80.8,
    population: 380000,
    area: 142,
    departments: 7,
  },
  {
    name: "East District",
    totalIssues: 743,
    resolved: 612,
    pending: 131,
    avgResolutionTime: 4.6,
    performance: 82.4,
    population: 280000,
    area: 89,
    departments: 5,
  },
  {
    name: "West District",
    totalIssues: 965,
    resolved: 823,
    pending: 142,
    avgResolutionTime: 3.9,
    performance: 85.3,
    population: 340000,
    area: 115,
    departments: 6,
  },
]

const monthlyTrends = [
  { month: "Jan", issues: 245, resolved: 198, pending: 47 },
  { month: "Feb", issues: 289, resolved: 234, pending: 55 },
  { month: "Mar", issues: 312, resolved: 267, pending: 45 },
  { month: "Apr", issues: 298, resolved: 278, pending: 20 },
  { month: "May", issues: 334, resolved: 301, pending: 33 },
  { month: "Jun", issues: 367, resolved: 329, pending: 38 },
]

const issueCategories = [
  { name: "Road Maintenance", value: 35, color: "#3b82f6" },
  { name: "Water Supply", value: 25, color: "#06b6d4" },
  { name: "Waste Management", value: 20, color: "#10b981" },
  { name: "Street Lighting", value: 12, color: "#f59e0b" },
  { name: "Others", value: 8, color: "#8b5cf6" },
]

export function AnalyticsPage() {
  const [selectedDistrict, setSelectedDistrict] = useState("all")
  const [timeRange, setTimeRange] = useState("6months")

  const filteredDistrictData =
    selectedDistrict === "all" ? districtData : districtData.filter((d) => d.name === selectedDistrict)

  return (
    <main className="flex-1 p-4 md:p-6 space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-sm md:text-base text-muted-foreground">District performance and civic issue analytics</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select District" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Districts</SelectItem>
              {districtData.map((district) => (
                <SelectItem key={district.name} value={district.name}>
                  {district.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">1 Month</SelectItem>
              <SelectItem value="3months">3 Months</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="districts">Districts</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Overall Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Issues</p>
                    <p className="text-2xl font-bold">5,003</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +12% from last month
                    </p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Resolved</p>
                    <p className="text-2xl font-bold">4,214</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +8% from last month
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg Resolution</p>
                    <p className="text-2xl font-bold">4.3 days</p>
                    <p className="text-xs text-red-600 flex items-center mt-1">
                      <TrendingDown className="h-3 w-3 mr-1" />
                      +0.2 days from last month
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Efficiency</p>
                    <p className="text-2xl font-bold">84.2%</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +2.1% from last month
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Issue Categories Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Issue Categories</CardTitle>
                <CardDescription>Distribution of civic issues by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={issueCategories}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {issueCategories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {issueCategories.map((category) => (
                    <div key={category.name} className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                      <span className="text-sm">{category.name}</span>
                      <span className="text-sm font-semibold">{category.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Trends</CardTitle>
                <CardDescription>Issues reported and resolved over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="issues" stroke="#3b82f6" strokeWidth={2} name="Issues Reported" />
                      <Line
                        type="monotone"
                        dataKey="resolved"
                        stroke="#10b981"
                        strokeWidth={2}
                        name="Issues Resolved"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="districts" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:gap-6">
            {filteredDistrictData.map((district) => (
              <Card key={district.name}>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <MapPin className="h-5 w-5" />
                        <span>{district.name}</span>
                      </CardTitle>
                      <CardDescription>
                        Population: {district.population.toLocaleString()} | Area: {district.area} km²
                      </CardDescription>
                    </div>
                    <Badge
                      variant={
                        district.performance > 85 ? "default" : district.performance > 80 ? "secondary" : "destructive"
                      }
                    >
                      {district.performance}% Performance
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">{district.totalIssues}</p>
                      <p className="text-sm text-muted-foreground">Total Issues</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">{district.resolved}</p>
                      <p className="text-sm text-muted-foreground">Resolved</p>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <p className="text-2xl font-bold text-orange-600">{district.pending}</p>
                      <p className="text-sm text-muted-foreground">Pending</p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <p className="text-2xl font-bold text-purple-600">{district.avgResolutionTime}</p>
                      <p className="text-sm text-muted-foreground">Avg Days</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Resolution Rate</span>
                      <span>{((district.resolved / district.totalIssues) * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={(district.resolved / district.totalIssues) * 100} className="h-2" />
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="outline">{district.departments} Departments</Badge>
                    <Badge variant="outline">
                      {(district.totalIssues / (district.population / 1000)).toFixed(1)} issues per 1K population
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>District Comparison</CardTitle>
              <CardDescription>Compare performance across all districts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={districtData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} fontSize={12} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="resolved" fill="#10b981" name="Resolved Issues" />
                    <Bar dataKey="pending" fill="#f59e0b" name="Pending Issues" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Key performance indicators by district</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {districtData.map((district) => (
                    <div key={district.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{district.name}</span>
                        <span className="text-sm text-muted-foreground">{district.performance}%</span>
                      </div>
                      <Progress value={district.performance} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resolution Time Analysis</CardTitle>
                <CardDescription>Average resolution time by district</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={districtData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={100} fontSize={12} />
                      <Tooltip />
                      <Bar dataKey="avgResolutionTime" fill="#3b82f6" name="Avg Resolution Time (days)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  )
}
