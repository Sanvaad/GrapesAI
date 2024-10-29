import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Brain, Activity, Microscope, AlertCircle } from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const AnalysisPage = () => {
  // Mock data remains the same
  const riskData = [
    { name: "Cardiovascular", score: 75, threshold: 60 },
    { name: "Diabetes", score: 45, threshold: 50 },
    { name: "Respiratory", score: 30, threshold: 40 },
    { name: "Neurological", score: 60, threshold: 55 },
  ];

  const treatmentData = [
    { month: "Jan", effectiveness: 65, adherence: 80 },
    { month: "Feb", effectiveness: 75, adherence: 85 },
    { month: "Mar", effectiveness: 85, adherence: 90 },
    { month: "Apr", effectiveness: 80, adherence: 88 },
  ];

  // Riddle UI inspired color palette
  const colors = {
    background: "linear-gradient(180deg, #0A0F1E 0%, #1A1F2E 100%)",
    cardBg: "#141925",
    border: "#1E2433",
    primary: "#3B82F6",
    accent: "#60A5FA",
    success: "#34D399",
    text: {
      primary: "#FFFFFF",
      secondary: "#94A3B8",
      muted: "#64748B",
    },
    chart: {
      primary: "#3B82F6",
      secondary: "#60A5FA",
      tertiary: "#93C5FD",
      background: "#1E2433",
    },
  };

  return (
    <div
      className="p-6 space-y-6 min-h-screen text-white"
      style={{ background: colors.background }}
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
            Analytics Dashboard
          </h2>
          <p className="text-[#94A3B8] mt-2">
            Advanced patient analytics and predictions
          </p>
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
          <AlertCircle className="mr-2 h-4 w-4" />
          Run Analysis
        </Button>
      </div>

      <Tabs defaultValue="risk" className="space-y-6">
        <TabsList className="bg-[#141925] border border-[#1E2433] p-1 rounded-lg inline-flex space-x-2">
          <TabsTrigger
            value="risk"
            className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-[#94A3B8] px-4 py-2 rounded-md transition-all"
          >
            Risk Analysis
          </TabsTrigger>
          <TabsTrigger
            value="treatment"
            className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-[#94A3B8] px-4 py-2 rounded-md transition-all"
          >
            Treatment
          </TabsTrigger>
          <TabsTrigger
            value="prediction"
            className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-[#94A3B8] px-4 py-2 rounded-md transition-all"
          >
            Predictions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="risk" className="space-y-6">
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            <Card className="bg-[#141925] border-[#1E2433] shadow-lg">
              <CardHeader className="border-b border-[#1E2433]">
                <CardTitle className="text-white flex items-center gap-2 text-lg">
                  <Brain className="h-5 w-5 text-blue-500" />
                  Risk Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={riskData} barGap={8}>
                    <XAxis
                      dataKey="name"
                      axisLine={{ stroke: "#1E2433" }}
                      tickLine={false}
                      tick={{ fill: "#94A3B8" }}
                    />
                    <YAxis
                      axisLine={{ stroke: "#1E2433" }}
                      tickLine={false}
                      tick={{ fill: "#94A3B8" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#141925",
                        border: "1px solid #1E2433",
                        borderRadius: "8px",
                        color: "#FFFFFF",
                      }}
                    />
                    <Bar
                      dataKey="score"
                      fill={colors.chart.primary}
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="threshold"
                      fill={colors.chart.background}
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-[#141925] border-[#1E2433] shadow-lg">
              <CardHeader className="border-b border-[#1E2433]">
                <CardTitle className="text-white flex items-center gap-2 text-lg">
                  <Activity className="h-5 w-5 text-blue-500" />
                  Treatment Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={treatmentData}>
                    <defs>
                      <linearGradient
                        id="colorEffectiveness"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor={colors.chart.primary}
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor={colors.chart.primary}
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorAdherence"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor={colors.chart.secondary}
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor={colors.chart.secondary}
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="month"
                      axisLine={{ stroke: "#1E2433" }}
                      tickLine={false}
                      tick={{ fill: "#94A3B8" }}
                    />
                    <YAxis
                      axisLine={{ stroke: "#1E2433" }}
                      tickLine={false}
                      tick={{ fill: "#94A3B8" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#141925",
                        border: "1px solid #1E2433",
                        borderRadius: "8px",
                        color: "#FFFFFF",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="effectiveness"
                      stroke={colors.chart.primary}
                      fill="url(#colorEffectiveness)"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="adherence"
                      stroke={colors.chart.secondary}
                      fill="url(#colorAdherence)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-[#141925] border-[#1E2433] shadow-lg">
            <CardHeader className="border-b border-[#1E2433]">
              <CardTitle className="text-white flex items-center gap-2 text-lg">
                <Microscope className="h-5 w-5 text-blue-500" />
                Detailed Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {riskData.map((risk, index) => (
                  <div key={risk.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-white">
                        {risk.name}
                      </span>
                      <span className="text-[#94A3B8]">{risk.score}%</span>
                    </div>
                    <div className="h-2 bg-[#1E2433] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${risk.score}%`,
                          background: `linear-gradient(90deg, ${colors.chart.primary} 0%, ${colors.chart.secondary} 100%)`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalysisPage;
