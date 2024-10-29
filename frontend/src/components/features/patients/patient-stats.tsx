import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Activity, Heart, Thermometer, Clock } from "lucide-react";
import { usePatientStore } from "@/store/usePatientStore";
import type { Patient } from "@/types/patient";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";

interface StatsCardProps {
  title: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  trend: string;
}

const StatsCard = ({ title, value, unit, icon, trend }: StatsCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">
        {value}
        {unit}
      </div>
      <p className="text-xs text-muted-foreground">{trend} from last reading</p>
    </CardContent>
  </Card>
);

export function PatientStats() {
  const { currentPatient, selectedTimeRange, setTimeRange } = usePatientStore();

  if (!currentPatient) return null;

  const vitals = currentPatient.vitals;
  const timeRanges: ("24h" | "7d" | "30d" | "90d")[] = [
    "24h",
    "7d",
    "30d",
    "90d",
  ];

  const currentStats = [
    {
      title: "Heart Rate",
      value: vitals.heartRate[vitals.heartRate.length - 1]?.value ?? 0,
      unit: "bpm",
      icon: <Heart className="h-4 w-4 text-red-500" />,
      trend: "+2%",
    },
    {
      title: "Blood Pressure",
      value: vitals.bloodPressure[vitals.bloodPressure.length - 1]?.value ?? 0,
      unit: "mmHg",
      icon: <Activity className="h-4 w-4 text-blue-500" />,
      trend: "-1%",
    },
    {
      title: "Temperature",
      value: vitals.temperature[vitals.temperature.length - 1]?.value ?? 0,
      unit: "°F",
      icon: <Thermometer className="h-4 w-4 text-orange-500" />,
      trend: "stable",
    },
    {
      title: "Oxygen Level",
      value: vitals.oxygenLevel[vitals.oxygenLevel.length - 1]?.value ?? 0,
      unit: "%",
      icon: <Activity className="h-4 w-4 text-green-500" />,
      trend: "+1%",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Time Range Selector */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Patient Vitals</h2>
        <div className="flex gap-2">
          {timeRanges.map((range) => (
            <Button
              key={range}
              variant={selectedTimeRange === range ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange(range)}
            >
              {range}
            </Button>
          ))}
        </div>
      </div>

      {/* Current Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentStats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Detailed Charts */}
      <Card className="pt-6">
        <Tabs defaultValue="heartRate" className="w-full">
          <CardHeader>
            <TabsList>
              <TabsTrigger value="heartRate">Heart Rate</TabsTrigger>
              <TabsTrigger value="bloodPressure">Blood Pressure</TabsTrigger>
              <TabsTrigger value="temperature">Temperature</TabsTrigger>
              <TabsTrigger value="oxygenLevel">Oxygen Level</TabsTrigger>
            </TabsList>
          </CardHeader>
          <CardContent>
            <TabsContent value="heartRate">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={vitals.heartRate}>
                  <XAxis dataKey="timestamp" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#ef4444"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="bloodPressure">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={vitals.bloodPressure}>
                  <XAxis dataKey="timestamp" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3b82f6"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="temperature">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={vitals.temperature}>
                  <XAxis dataKey="timestamp" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#f97316"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="oxygenLevel">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={vitals.oxygenLevel}>
                  <XAxis dataKey="timestamp" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#22c55e"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
}
