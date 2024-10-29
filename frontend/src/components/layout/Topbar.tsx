import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

export function Topbar() {
  return (
    <div className="border-b border-[#1E2433] bg-[#141925]">
      <div className="flex h-16 items-center px-4">
        {/* Search */}
        <div className="ml-auto flex items-center space-x-4">
          <div className="hidden md:flex items-center">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-[#94A3B8]" />
              <Input
                placeholder="Search..."
                className="w-[300px] pl-8 bg-[#1E2433] border-[#2A3441] text-white placeholder:text-[#94A3B8] focus:border-blue-500"
              />
            </div>
          </div>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative text-[#94A3B8] hover:text-white"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-0.5 -right-0.5 h-2 w-2 bg-blue-500 rounded-full" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-[300px] bg-[#141925] border-[#1E2433] text-white"
            >
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-[#1E2433]" />
              {/* Notification items */}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/doctor.png" alt="Doctor" />
                  <AvatarFallback className="bg-blue-500 text-white">
                    DS
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-[#141925] border-[#1E2433] text-white"
            >
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-[#1E2433]" />
              <DropdownMenuItem className="focus:bg-[#1E2433]">
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-[#1E2433]">
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-[#1E2433]">
                Help
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[#1E2433]" />
              <DropdownMenuItem className="text-red-400 focus:bg-[#1E2433]">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
