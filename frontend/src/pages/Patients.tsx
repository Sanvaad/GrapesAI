import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, Plus, Filter, User, MoreHorizontal, Eye } from "lucide-react";

// Enhanced mock data
const patients = [
  {
    id: 1,
    name: "John Doe",
    age: 45,
    condition: "Diabetes Type 2",
    lastVisit: "2024-03-15",
    status: "Active",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    age: 32,
    condition: "Hypertension",
    lastVisit: "2024-03-14",
    status: "Active",
  },
  {
    id: 3,
    name: "Michael Chen",
    age: 58,
    condition: "Arthritis",
    lastVisit: "2024-03-10",
    status: "Recovery",
  },
  {
    id: 4,
    name: "Emma Davis",
    age: 28,
    condition: "Anxiety",
    lastVisit: "2024-03-08",
    status: "Pending",
  },
  {
    id: 5,
    name: "Robert Wilson",
    age: 62,
    condition: "Heart Disease",
    lastVisit: "2024-03-05",
    status: "Critical",
  },
];

const getStatusStyle = (status) => {
  const styles = {
    Active: "bg-emerald-400/10 text-emerald-400",
    Recovery: "bg-blue-400/10 text-blue-400",
    Pending: "bg-amber-400/10 text-amber-400",
    Critical: "bg-red-400/10 text-red-400",
  };
  return styles[status] || "bg-gray-400/10 text-gray-400";
};

export function PatientsPage() {
  return (
    <div className="p-8 space-y-8">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Patients
          </h2>
          <p className="text-[#94A3B8]">Manage your patients</p>
        </div>
        <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white">
          <Plus className="mr-2 h-4 w-4" />
          Add Patient
        </Button>
      </div>

      {/* Search Section */}
      <div className="flex space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-[#94A3B8]" />
          <Input
            placeholder="Search patients..."
            className="pl-8 bg-[#1E2433] border-[#2A3441] text-white placeholder:text-[#94A3B8] focus:border-[#3B82F6]"
          />
        </div>
        <Button
          variant="outline"
          className="bg-[#1E2433] border-[#2A3441] text-[#94A3B8] hover:bg-[#2A3441]"
        >
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Patients Table */}
      <Card className="bg-[#141925] border-[#1E2433]">
        <CardHeader>
          <CardTitle className="text-white">Patient List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-[#1E2433]">
                <TableHead className="text-[#94A3B8]">Name</TableHead>
                <TableHead className="text-[#94A3B8]">Age</TableHead>
                <TableHead className="text-[#94A3B8]">Condition</TableHead>
                <TableHead className="text-[#94A3B8]">Last Visit</TableHead>
                <TableHead className="text-[#94A3B8]">Status</TableHead>
                <TableHead className="text-[#94A3B8]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => (
                <TableRow
                  key={patient.id}
                  className="border-[#1E2433] hover:bg-[#1E2433] transition-colors"
                >
                  <TableCell className="text-white">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-[#3B82F6]/10 rounded-full">
                        <User className="h-4 w-4 text-[#3B82F6]" />
                      </div>
                      <span>{patient.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-[#94A3B8]">
                    {patient.age}
                  </TableCell>
                  <TableCell className="text-[#94A3B8]">
                    {patient.condition}
                  </TableCell>
                  <TableCell className="text-[#94A3B8]">
                    {patient.lastVisit}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(patient.status)}`}
                    >
                      {patient.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#94A3B8] hover:bg-[#2A3441] hover:text-white"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-[#94A3B8] hover:bg-[#2A3441] hover:text-white"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
