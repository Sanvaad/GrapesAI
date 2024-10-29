import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  User,
  Clock,
  Activity,
  Users,
  Calendar as CalendarIcon,
  TrendingUp,
  AlertCircle,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

// Mock data

const activityData = Array.from({ length: 7 }, (_, i) => ({
  date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(
    "en-US",
    {
      weekday: "short",
    },
  ),
  patients: Math.floor(Math.random() * 50) + 30,
  appointments: Math.floor(Math.random() * 30) + 10,
})).reverse();

const upcomingAppointments = [
  {
    id: 1,
    patientName: "Sarah Johnson",
    time: "10:00 AM",
    type: "Check-up",
    status: "Confirmed",
    avatar: "/avatar1.jpg",
  },
  {
    id: 2,
    patientName: "Michael Chen",
    time: "11:30 AM",
    type: "Follow-up",
    status: "Pending",
    avatar: "/avatar2.jpg",
  },
  {
    id: 3,
    patientName: "Emma Davis",
    time: "2:15 PM",
    type: "Consultation",
    status: "Confirmed",
    avatar: "/avatar3.jpg",
  },
];

const scheduleAppointments = [
  {
    id: 1,
    name: "Patient Review 1",
    time: "09:00 AM",
  },
  {
    id: 2,
    name: "Patient Review 2",
    time: "11:30 AM",
  },
  {
    id: 3,
    name: "Patient Review 3",
    time: "02:00 PM",
  },
];

const quickStats = [
  {
    title: "Total Patients",
    value: "1,234",
    change: "+12.3%",
    icon: Users,
    trend: "up",
  },
  {
    title: "Appointments Today",
    value: "48",
    change: "+5.2%",
    icon: CalendarIcon,
    trend: "up",
  },
  {
    title: "Recovery Rate",
    value: "92.8%",
    change: "-2.1%",
    icon: Activity,
    trend: "down",
  },
  {
    title: "Patient Growth",
    value: "23.5%",
    change: "+8.4%",
    icon: TrendingUp,
    trend: "up",
  },
];

function Dashboard() {
  const [timeRange, setTimeRange] = useState("7days");

  const getStatusColor = (status) => {
    return status === "Confirmed"
      ? "text-emerald-400 bg-emerald-400/10"
      : "text-amber-400 bg-amber-400/10";
  };

  return (
    <div className="min-h-screen bg-[#0A0F1E] p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Dashboard
          </h2>
          <p className="text-[#94A3B8]">Welcome back, Dr. Smith</p>
        </div>
        <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white">
          <AlertCircle className="mr-2 h-4 w-4" />
          New Alert
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickStats.map((stat) => (
          <Card
            key={stat.title}
            className="bg-[#141925] border-[#1E2433] hover:bg-[#1A202F] transition-colors"
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[#94A3B8] text-sm">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-white mt-1">
                    {stat.value}
                  </h3>
                </div>
                <div className="h-10 w-10 rounded-full bg-[#3B82F6]/10 flex items-center justify-center">
                  <stat.icon className="h-5 w-5 text-[#3B82F6]" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                {stat.trend === "up" ? (
                  <ChevronUp className="h-4 w-4 text-emerald-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-red-400" />
                )}
                <span
                  className={`text-sm ${
                    stat.trend === "up" ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-[#94A3B8] text-sm ml-1">
                  vs last week
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Activity Chart */}
        <Card className="bg-[#141925] border-[#1E2433]">
          <CardHeader>
            <CardTitle className="text-white">Activity Overview</CardTitle>
            <CardDescription className="text-[#94A3B8]">
              Patient visits and appointments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData}>
                  <XAxis
                    dataKey="date"
                    stroke="#94A3B8"
                    strokeWidth={0.5}
                    tickLine={false}
                  />
                  <YAxis stroke="#94A3B8" strokeWidth={0.5} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#141925",
                      border: "1px solid #1E2433",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="patients"
                    stroke="#3B82F6"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="appointments"
                    stroke="#60A5FA"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card className="bg-[#141925] border-[#1E2433]">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-white">
                Upcoming Appointments
              </CardTitle>
              <CardDescription className="text-[#94A3B8]">
                Your schedule for today
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="bg-[#1E2433] border-[#2A3441] text-[#94A3B8] hover:bg-[#2A3441]"
            >
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-[#1E2433] hover:border-[#2A3441] hover:bg-[#1E2433] transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-[#3B82F6]/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-[#3B82F6]" />
                    </div>
                    <div>
                      <p className="font-medium text-white">
                        {appointment.patientName}
                      </p>
                      <div className="flex items-center text-sm text-[#94A3B8]">
                        <Clock className="mr-1 h-4 w-4" />
                        {appointment.time} - {appointment.type}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      appointment.status,
                    )}`}
                  >
                    {appointment.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Schedule */}
      <Card className="bg-[#141925] border-[#1E2433]">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-white">Today's Schedule</CardTitle>
            <CardDescription className="text-[#94A3B8]">
              Your appointments and reviews
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="bg-[#1E2433] border-[#2A3441] text-[#94A3B8] hover:bg-[#2A3441]"
          >
            <Calendar className="mr-2 h-4 w-4" />
            View Calendar
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scheduleAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-4 rounded-lg border border-[#1E2433] hover:border-[#2A3441] hover:bg-[#1E2433] transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-[#3B82F6]/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-[#3B82F6]" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{appointment.name}</p>
                    <div className="flex items-center text-sm text-[#94A3B8]">
                      <Clock className="mr-1 h-4 w-4" />
                      {appointment.time}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-amber-400 border-amber-400/20 hover:bg-amber-400/10"
                  >
                    Reschedule
                  </Button>
                  <Button
                    size="sm"
                    className="bg-[#3B82F6] hover:bg-[#2563EB] text-white"
                  >
                    Start
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Dashboard;
