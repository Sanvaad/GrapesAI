import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, FileText, MoreHorizontal } from "lucide-react";

export function ReportsPage() {
  const reports = [
    {
      id: 1,
      title: "Monthly Patient Statistics",
      date: "March 2024",
      type: "Analytics",
      status: "Generated",
    },
    {
      id: 2,
      title: "Treatment Outcomes Report",
      date: "March 2024",
      type: "Medical",
      status: "Processing",
    },
    // Add more reports as needed
  ];

  return (
    <div className="p-8 space-y-8 bg-[#0A0F1E] min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Reports
          </h2>
          <p className="text-[#94A3B8]">View and generate reports</p>
        </div>
        <div className="flex space-x-4">
          <Button
            variant="outline"
            className="border-[#2A3441] text-[#94A3B8] hover:bg-[#2A3441]"
          >
            Export All
          </Button>
          <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white">
            Generate Report
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {reports.map((report) => (
          <Card
            key={report.id}
            className="bg-[#141925] border-[#1E2433] hover:bg-[#1A202F] transition-colors"
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h3 className="text-lg font-medium text-white">
                    {report.title}
                  </h3>
                  <div className="flex items-center text-[#94A3B8] space-x-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {report.date}
                    </div>
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 mr-2" />
                      {report.type}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      report.status === "Generated"
                        ? "bg-green-500/10 text-green-500"
                        : "bg-blue-500/10 text-blue-500"
                    }`}
                  >
                    {report.status}
                  </span>
                  <Button
                    variant="outline"
                    className="border-[#2A3441] text-[#94A3B8] hover:bg-[#2A3441]"
                  >
                    Download
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-[#94A3B8] hover:bg-[#2A3441]"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
