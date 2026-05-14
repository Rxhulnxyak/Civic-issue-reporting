"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, MapPin, Clock, User, Filter, Search, Eye, Forward } from "lucide-react"

const reportedIssues = [
  {
    id: "RPT-2024-001",
    title: "Large pothole on MG Road",
    description: "Deep pothole causing traffic disruption and vehicle damage near City Mall junction",
    category: "Road Infrastructure",
    priority: "High",
    status: "Under Review",
    source: "Public",
    location: "MG Road, Sector 14",
    reportedBy: "Rajesh Kumar",
    reportedAt: "2024-01-15 09:30 AM",
    department: "Public Works",
    images: 3,
    upvotes: 24,
  },
  {
    id: "RPT-2024-002",
    title: "Overflowing garbage bins",
    description: "Multiple garbage bins overflowing in residential area, causing hygiene issues",
    category: "Waste Management",
    priority: "Medium",
    status: "Assigned",
    source: "Government",
    location: "Green Park Colony",
    reportedBy: "Municipal Inspector",
    reportedAt: "2024-01-15 11:45 AM",
    department: "Sanitation",
    images: 2,
    upvotes: 18,
  },
  {
    id: "RPT-2024-003",
    title: "Street light not working",
    description: "Multiple street lights not functioning on main road, safety concern during night",
    category: "Public Lighting",
    priority: "High",
    status: "New",
    source: "Public",
    location: "Park Street",
    reportedBy: "Priya Sharma",
    reportedAt: "2024-01-15 02:15 PM",
    department: "Electrical",
    images: 1,
    upvotes: 31,
  },
  {
    id: "RPT-2024-004",
    title: "Water logging in underpass",
    description: "Severe water logging in subway underpass after recent rains",
    category: "Drainage",
    priority: "Critical",
    status: "Escalated",
    source: "Government",
    location: "Railway Underpass, Station Road",
    reportedBy: "Traffic Police",
    reportedAt: "2024-01-15 04:20 PM",
    department: "Public Works",
    images: 4,
    upvotes: 45,
  },
  {
    id: "RPT-2024-005",
    title: "Broken pedestrian footbridge",
    description: "Footbridge near central bus stand has broken steps and loose railings, posing safety risks.",
    category: "Infrastructure",
    priority: "High",
    status: "Assigned",
    source: "Public",
    location: "Central Bus Stand",
    reportedBy: "Amit Verma",
    reportedAt: "2024-01-16 08:10 AM",
    department: "Public Works",
    images: 2,
    upvotes: 19,
  },
  {
    id: "RPT-2024-006",
    title: "Uncovered manhole",
    description: "Open manhole on main street, risk of accidents especially at night.",
    category: "Sanitation",
    priority: "Critical",
    status: "Escalated",
    source: "Government",
    location: "Main Street, Block B",
    reportedBy: "Municipal Worker",
    reportedAt: "2024-01-16 10:25 AM",
    department: "Sanitation",
    images: 1,
    upvotes: 27,
  },
  {
    id: "RPT-2024-007",
    title: "Illegal dumping of construction debris",
    description: "Construction debris dumped illegally in vacant plot, blocking access and causing pollution.",
    category: "Waste Management",
    priority: "Medium",
    status: "Under Review",
    source: "Public",
    location: "Plot 22, Industrial Area",
    reportedBy: "Sunita Rao",
    reportedAt: "2024-01-16 12:40 PM",
    department: "Sanitation",
    images: 3,
    upvotes: 14,
  },
]

export function ReportedIssuesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sourceFilter, setSourceFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredIssues = reportedIssues.filter((issue) => {
    const matchesSearch =
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSource = sourceFilter === "all" || issue.source.toLowerCase() === sourceFilter
    const matchesPriority = priorityFilter === "all" || issue.priority.toLowerCase() === priorityFilter
    const matchesStatus = statusFilter === "all" || issue.status.toLowerCase().replace(" ", "-") === statusFilter

    return matchesSearch && matchesSource && matchesPriority && matchesStatus
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "destructive"
      case "High":
        return "destructive"
      case "Medium":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "outline"
      case "Under Review":
        return "secondary"
      case "Assigned":
        return "default"
      case "Escalated":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <main className="flex-1 p-3 sm:p-6 space-y-4 sm:space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Reported Issues</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Manage and track all civic issues reported by citizens and government officials
        </p>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-5 sm:gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search issues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="public">Public Reports</SelectItem>
                <SelectItem value="government">Government Forwarded</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="under-review">Under Review</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="escalated">Escalated</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              className="w-full sm:w-auto bg-transparent"
              onClick={() => {
                setSearchTerm("")
                setSourceFilter("all")
                setPriorityFilter("all")
                setStatusFilter("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Issues List */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-lg sm:text-xl font-semibold">Issues ({filteredIssues.length})</h2>
          <Tabs defaultValue="list" className="w-auto hidden sm:block">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {filteredIssues.map((issue) => (
            <Card key={issue.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-3 sm:p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                        <h3 className="font-semibold text-base sm:text-lg leading-tight">{issue.title}</h3>
                        <Badge variant={issue.source === "Government" ? "default" : "secondary"} className="w-fit">
                          {issue.source}
                        </Badge>
                      </div>
                      <p className="text-sm sm:text-base text-muted-foreground mb-3 leading-relaxed">
                        {issue.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 text-xs sm:text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                          <span className="truncate">{issue.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                          <span className="truncate">{issue.reportedBy}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                          <span className="truncate">{issue.reportedAt}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Category:</span>
                          <span className="font-medium truncate">{issue.category}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t sm:border-t-0 sm:pt-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant={getPriorityColor(issue.priority)} className="text-xs">
                        {issue.priority}
                      </Badge>
                      <Badge variant={getStatusColor(issue.status)} className="text-xs">
                        {issue.status}
                      </Badge>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground ml-auto sm:ml-0">
                        <span>{issue.images} images</span>
                        <span>•</span>
                        <span>{issue.upvotes} upvotes</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 sm:flex-none bg-transparent">
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        <span className="hidden sm:inline">View Details</span>
                        <span className="sm:hidden">View</span>
                      </Button>
                      <Button size="sm" className="flex-1 sm:flex-none">
                        <Forward className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        <span className="hidden sm:inline">Take Action</span>
                        <span className="sm:hidden">Action</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
