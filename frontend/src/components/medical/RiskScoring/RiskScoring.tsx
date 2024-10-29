// src/components/medical/RiskScoring/RiskScoring.jsx
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Activity } from "lucide-react";
import * as d3 from "d3";

export function RiskScoring({ patientData }) {
  const [riskScores, setRiskScores] = useState({});
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    calculateRiskScores(patientData);
  }, [patientData]);

  const calculateRiskScores = async (data) => {
    setIsCalculating(true);

    // Example risk calculation using D3 for data processing
    const ageRisk = d3.scaleLinear().domain([0, 100]).range([0, 1]);

    const bpRisk = d3.scaleLinear().domain([90, 200]).range([0, 1]);

    const scores = {
      cardiovascular: Math.round(bpRisk(data.systolicBP) * 100),
      diabetes: Math.round(ageRisk(data.age) * 100),
      respiratory: Math.round(Math.random() * 100), // Replace with actual calculation
    };

    setRiskScores(scores);
    setIsCalculating(false);
  };

  return (
    <Card className="bg-[#141925] border-[#1E2433]">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-500" />
          Risk Assessment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(riskScores).map(([condition, score]) => (
            <div key={condition} className="space-y-2">
              <div className="flex justify-between">
                <span className="text-[#94A3B8] capitalize">{condition}</span>
                <span className="text-white">{score}%</span>
              </div>
              <Progress
                value={score}
                className="h-2"
                indicatorClassName={`bg-gradient-to-r from-blue-500 to-${
                  score > 70 ? "red" : "blue"
                }-600`}
              />
            </div>
          ))}
          {isCalculating && (
            <div className="text-[#94A3B8] text-sm">
              Calculating risk scores...
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Usage:
// <RiskScoring patientData={{
//   age: 45,
//   systolicBP: 120,
//   diastolicBP: 80,
//   // Add other risk factors
// }} />
