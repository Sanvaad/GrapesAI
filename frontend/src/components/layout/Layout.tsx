import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Activity,
  Calendar,
  FileText,
  Settings,
  PlusCircle,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  Brain,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import logo from "../../assets/logo.svg";

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

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex items-center mx-auto text-[#fff] gap-3">
        <img src={logo} alt="" className="h-10" />
      </div>
    </div>
  );
}

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0F1E]">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-[#141925] border-r border-[#1E2433] transform transition-transform duration-200 ease-in-out md:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Logo Section */}
        <div className="h-16 flex items-center px-6 border-b border-[#1E2433] gap-7">
          <Logo />
          <h1 className="bg-gradient-to-r from-[#60A5FA] to-[#3B82F6] bg-clip-text text-transparent font-bold text-[1.4rem] flex mt-2">
            GRAPES
          </h1>
        </div>

        {/* Quick Action */}
        <div className="p-4 mb-7">
          <Button
            className="w-full h-[50px] bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] text-white transition-all duration-200"
            size="lg"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            <p className="text-[18px]">New Patient</p>
          </Button>
        </div>

        {/* Navigation */}
        <nav className="px-3 space-y-1">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link key={item.href} to={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start mb-1",
                    isActive &&
                      "bg-[#1E2433] text-[#60A5FA] hover:bg-[#1E2433]",
                    !isActive && "hover:bg-[#1E2433] text-[#94A3B8]",
                  )}
                >
                  <item.icon
                    className={cn(
                      "mr-2 h-4 w-4",
                      isActive ? "text-[#60A5FA]" : "text-[#94A3B8]",
                    )}
                  />
                  <span
                    className={cn(
                      "text-[.99rem]",
                      isActive ? "text-[#60A5FA]" : "text-[#94A3B8]",
                    )}
                  >
                    {item.title}
                  </span>
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#1E2433] bg-[#141925]">
          <div className="flex items-center space-x-3 mb-3 px-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#2563EB] flex items-center justify-center">
              <span className="text-white font-medium">DS</span>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-white">Dr. Smith</h3>
              <p className="text-xs text-[#94A3B8]">Cardiologist</p>
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start text-[#94A3B8] hover:text-red-400 hover:bg-red-400/10"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={cn(
          "flex-1",
          isSidebarOpen ? "md:ml-64" : "md:ml-0",
          "transition-margin duration-200 ease-in-out",
        )}
      >
        {/* Top Bar */}
        <header className="h-16 bg-[#141925] border-b border-[#1E2433]">
          <div className="h-full px-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden text-[#94A3B8] hover:bg-[#1E2433]"
              >
                {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
              <div className="hidden md:flex items-center space-x-2">
                <Search className="h-4 w-4 text-[#94A3B8]" />
                <Input
                  placeholder="Search..."
                  className="w-64 bg-[#1E2433] border-[#2A3441] text-white placeholder:text-[#94A3B8] focus:border-[#3B82F6]"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-[#94A3B8] hover:bg-[#1E2433]"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-[#3B82F6] rounded-full text-[10px] text-white flex items-center justify-center">
                  3
                </span>
              </Button>
              <div className="h-8 w-[1px] bg-[#1E2433]" />
              <div className="font-medium text-white">Dr. Smith</div>
            </div>
          </div>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
