"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Home, AlertTriangle, CheckCircle, FileCheck, BarChart3, Users, Settings, UserPlus, Shield, Globe } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Reported Issues", href: "/issues", icon: AlertTriangle },
  { name: "Verify Issues", href: "/verify", icon: FileCheck },
  { name: "Resolved Cases", href: "/resolved", icon: CheckCircle },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Department Team", href: "/teams", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
]

const headOnlyNavigation = [
  { name: "Add Junior Officer", href: "/add-officer", icon: UserPlus },
  { name: "Department Admin", href: "/admin", icon: Shield },
]

interface DashboardSidebarProps {
  onNavigate?: (href: string) => void
  currentPage?: string
  sidebarOpen?: boolean
  setSidebarOpen?: (open: boolean) => void
}

export function DashboardSidebar({
  onNavigate,
  currentPage = "/",
  sidebarOpen = false,
  setSidebarOpen,
}: DashboardSidebarProps) {
  const isHead = true

  return (
    <div
      className={cn(
        "fixed left-0 top-0 h-screen bg-background border-r flex flex-col transition-all duration-300 z-40",
        "w-64 md:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="p-4 border-b">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center overflow-hidden">
            <Image src="/menulogo.png" alt="jansetu logo" width={32} height={32} />
          </div>
          <Link
            href="/"
            className="font-semibold text-foreground bg-transparent border-none p-0 m-0 cursor-pointer"
            style={{ background: "none" }}
            tabIndex={0}
            aria-label="Go to Home"
          >
            जनसेतु
          </Link>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = currentPage === item.href
          return (
            <Button
              key={item.name}
              variant={isActive ? "default" : "ghost"}
              className="w-full justify-start px-3"
              onClick={() => onNavigate?.(item.href)}
            >
              <Icon className="w-4 h-4 mr-3" />
              <span>{item.name}</span>
            </Button>
          )
        })}

        {isHead && (
          <>
            <div className="pt-4 pb-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-2">Head Privileges</p>
            </div>
            {headOnlyNavigation.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.name}
                  variant="ghost"
                  className="w-full justify-start px-3 text-muted-foreground hover:text-foreground"
                  onClick={() => onNavigate?.(item.href)}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  <span>{item.name}</span>
                </Button>
              )
            })}
          </>
        )}
      </nav>
    </div>
  )
}
