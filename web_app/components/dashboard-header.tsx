"use client"

import { Search, Bell, Globe, Shield, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface DashboardHeaderProps {
  onMenuClick?: () => void
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const isHead = true
  const department = "Public Works Department"
  const officerName = "Rajesh Kumar"
  const officerEmail = "rajesh.kumar@pwd.gov.in"

  return (
    <header className="bg-background border-b px-4 md:px-6 py-3 md:py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 md:space-x-4 flex-1">
          <Button variant="ghost" size="sm" className="md:hidden p-2" onClick={onMenuClick}>
            <Menu className="w-5 h-5" />
          </Button>

          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search issues, locations, or reports..."
                className="pl-10 bg-muted/50 border-input focus:bg-background"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          <Button variant="ghost" size="sm" className="md:hidden p-2">
            <Search className="w-4 h-4" />
          </Button>

          <Button variant="ghost" size="sm" className="relative p-2">
            <Bell className="w-4 h-4" />
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 p-0 flex items-center justify-center text-xs font-medium"
            >
              3
            </Badge>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="hidden md:flex">
                <Globe className="w-4 h-4 mr-2" />
                EN
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>हिंदी</DropdownMenuItem>
              <DropdownMenuItem>বাংলা</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
<Avatar className="h-10 w-10">
  <AvatarImage
    src="https://img.freepik.com/free-photo/closeup-young-hispanic-man-casuals-studio_662251-600.jpg"
    alt="Profile"
    style={{ transform: "scale(1.18)" }}
  />
  <AvatarFallback>RK</AvatarFallback>
</Avatar>
                {isHead && (
                  <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center bg-primary text-primary-foreground">
                    <Shield className="w-2 h-2" />
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 md:w-64" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium leading-none">{officerName}</p>
                    {isHead && (
                      <Badge variant="secondary" className="text-xs">
                        <Shield className="w-3 h-3 mr-1" />
                        Head
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs leading-none text-muted-foreground">{officerEmail}</p>
                  <p className="text-xs leading-none text-muted-foreground">{department}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Department Settings</DropdownMenuItem>
              <DropdownMenuItem className="md:hidden">Language</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
