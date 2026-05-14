"use client"

import { useEffect, useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { OverviewCards } from "@/components/overview-cards"
import { RecentReports } from "@/components/recent-reports"
import { MapSection } from "@/components/map-section"
import { TeamsSection } from "@/components/teams-section"
import { ReportedIssuesPage } from "@/components/reported-issues-page"
import { VerifyIssuesPage } from "@/components/verify-issues-page"
import { ResolvedCasesPage } from "@/components/resolved-cases-page"
import { DepartmentTeamPage } from "@/components/department-team-page"
import { AnalyticsPage } from "@/components/analytics-page"

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState("/")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Update document title based on the current internal page
  useEffect(() => {
    const map: Record<string, string> = {
      "/": "Dashboard",
      "/issues": "Issues",
      "/verify": "Verify",
      "/resolved": "Resolved",
      "/team": "Team",
      "/analytics": "Analytics",
    }
    const label = map[currentPage] ?? "Dashboard"
    document.title = `${label} | जनसेतु`
  }, [currentPage])

  const handleNavigation = (href: string) => {
    setCurrentPage(href)
    setSidebarOpen(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "/issues":
        return <ReportedIssuesPage />
      case "/verify":
        return <VerifyIssuesPage />
      case "/resolved":
        return <ResolvedCasesPage />
      case "/team":
        return <DepartmentTeamPage />
      case "/analytics":
        return <AnalyticsPage />
      default:
        return (
          <main className="flex-1 p-4 md:p-6 space-y-4 md:space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Public Works Department</h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Monitor and manage civic issues across your jurisdiction
              </p>
            </div>

            <OverviewCards />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <RecentReports />
              <MapSection />
            </div>

            <div className="w-full">
              <TeamsSection />
            </div>
          </main>
        )
    }
  }

  return (
    <>
      <div className="flex min-h-screen bg-white">
        <DashboardSidebar
          onNavigate={handleNavigation}
          currentPage={currentPage}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <div className="flex-1 flex flex-col md:ml-64">
          <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
          <div className="flex-1">{renderCurrentPage()}</div>
        </div>
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
        )}
      </div>
    </>
  )
}
