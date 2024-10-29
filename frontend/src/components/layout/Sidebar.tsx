import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Activity,
  Calendar,
  FileText,
  Settings,
  PlusCircle,
  LogOut,
  Heartbeat,
  Brain,
} from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

interface SidebarItem {
  title: string;
  icon: any;
  href: string;
}

const sidebarItems: SidebarItem[] = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/" },
  { title: "Patients", icon: Users, href: "/patients" },
  { title: "Appointments", icon: Calendar, href: "/appointments" },
  { title: "Analytics", icon: Activity, href: "/analytics" },
  { title: "Reports", icon: FileText, href: "/reports" },
  { title: "Settings", icon: Settings, href: "/settings" },
];

// Logo component
function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex items-center">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
          <Activity className="h-6 w-6 text-white stroke-[2.5]" />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-lg flex items-center justify-center">
            <Brain className="h-3 w-3 text-white" />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-bold text-gray-900 leading-none tracking-tight">
          MediCore
        </span>
        <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent leading-none">
          AI Healthcare
        </span>
      </div>
    </div>
  );
}

export function Sidebar({ className }: { className?: string }) {
  const location = useLocation();

  return (
    <div
      className={cn("pb-12 border-r border-[#1E2433] bg-[#141925]", className)}
    >
      {/* Logo Section */}
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <div className="h-16 flex items-center">
            <Logo />
          </div>
          <Button
            className="w-full justify-start mt-4 bg-blue-500 hover:bg-blue-600 text-white"
            size="sm"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            New Patient
          </Button>
        </div>

        {/* Navigation */}
        <div className="px-3 space-y-1">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link key={item.href} to={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    isActive && "bg-[#1E2433] text-blue-400",
                    !isActive &&
                      "text-[#94A3B8] hover:bg-[#1E2433] hover:text-white",
                  )}
                >
                  <item.icon
                    className={cn(
                      "mr-2 h-4 w-4",
                      isActive ? "text-blue-400" : "text-[#94A3B8]",
                    )}
                  />
                  {item.title}
                </Button>
              </Link>
            );
          })}
        </div>
      </div>

      {/* User Profile Section */}
      <div className="absolute bottom-4 px-4 w-full">
        <div className="p-4 rounded-lg bg-[#1E2433]">
          <div className="flex items-center space-x-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/avatars/doctor.png" />
              <AvatarFallback className="bg-blue-500 text-white">
                DS
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-white">Dr. Smith</p>
              <p className="text-xs text-[#94A3B8]">Cardiologist</p>
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start mt-3 text-[#94A3B8] hover:text-red-400 hover:bg-red-400/10"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
}
