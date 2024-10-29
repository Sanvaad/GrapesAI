import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";

function Appointments() {
  const appointments = [
    {
      id: 1,
      patientName: "Sarah Johnson",
      date: "2024-03-20",
      time: "10:00 AM",
      type: "Check-up",
      status: "Confirmed",
    },
    {
      id: 2,
      patientName: "Michael Chen",
      date: "2024-03-20",
      time: "11:30 AM",
      type: "Follow-up",
      status: "Pending",
    },
    // Add more appointments as needed
  ];

  return (
    <div className="p-8 space-y-8 bg-[#0A0F1E] min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Appointments
          </h2>
          <p className="text-[#94A3B8]">Manage your schedule</p>
        </div>
        <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white">
          New Appointment
        </Button>
      </div>

      <div className="grid gap-6">
        {appointments.map((appointment) => (
          <Card
            key={appointment.id}
            className="bg-[#141925] border-[#1E2433] hover:bg-[#1A202F] transition-colors"
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h3 className="text-lg font-medium text-white">
                    {appointment.patientName}
                  </h3>
                  <div className="flex items-center text-[#94A3B8] space-x-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {appointment.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {appointment.time}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      appointment.status === "Confirmed"
                        ? "bg-green-500/10 text-green-500"
                        : "bg-amber-500/10 text-amber-500"
                    }`}
                  >
                    {appointment.status}
                  </span>
                  <Button
                    variant="outline"
                    className="border-[#2A3441] text-[#94A3B8] hover:bg-[#2A3441]"
                  >
                    View Details
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

export default Appointments;
