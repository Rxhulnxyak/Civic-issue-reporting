"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Home, AlertTriangle, CheckCircle, FileCheck, BarChart3, Users, Settings, UserPlus, Shield } from "lucide-react"
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
];

const headOnlyNavigation = [
  { name: "Add Junior Officer", href: "/add-officer", icon: UserPlus },
  { name: "Department Admin", href: "/admin", icon: Shield },
];

interface DashboardSidebarProps {
  onNavigate?: (href: string) => void
  currentPage?: string
  sidebarOpen?: boolean
}

export function DashboardSidebar({
  onNavigate,
  currentPage = "/",
  sidebarOpen = false,
}: DashboardSidebarProps) {
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-10 w-64 transform overflow-y-auto bg-white dark:bg-gray-900 p-4 transition-transform duration-300",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex items-center mb-6">
        <Image src="/logo.png" alt="Logo" width={40} height={40} />
        <h2 className="ml-2 text-xl font-semibold text-gray-800 dark:text-gray-100">
          Civic Issues
        </h2>
      </div>
      <nav>
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => {
              onNavigate?.(item.href);
            }}
            className={cn(
              "flex items-center p-2 rounded-md my-1 hover:bg-gray-200 dark:hover:bg-gray-800",
              currentPage === item.href && "bg-gray-200 dark:bg-gray-800 font-medium"
            )}
          >
            <item.icon className="mr-2 h-5 w-5" />
            {item.name}
          </Link>
        ))}
        <hr className="my-4 border-gray-300 dark:border-gray-600" />
        {headOnlyNavigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => {
              onNavigate?.(item.href);
            }}
            className={cn(
              "flex items-center p-2 rounded-md my-1 hover:bg-gray-200 dark:hover:bg-gray-800",
              currentPage === item.href && "bg-gray-200 dark:bg-gray-800 font-medium"
            )}
          >
            <item.icon className="mr-2 h-5 w-5" />
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

