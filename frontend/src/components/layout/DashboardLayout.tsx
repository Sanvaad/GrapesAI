import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0A0F1E]">
      <Topbar />
      <div className="flex">
        <Sidebar className="w-64 hidden md:block" />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
