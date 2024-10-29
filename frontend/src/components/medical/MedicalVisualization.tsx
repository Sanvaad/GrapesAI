// src/components/medical/MedicalVisualization.jsx
import React, { useState } from "react";
import { BodyVisualization } from "./BodyMapping/BodyModel";
import { DiseasePrediction } from "./Prediction/DiseasePrediction";
import { RiskScoring } from "./RiskScoring/RiskScoring";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export function MedicalVisualization() {
  const [highlightedParts, setHighlightedParts] = useState({});
  const [patientData, setPatientData] = useState({
    age: 45,
    systolicBP: 120,
    diastolicBP: 80,
    symptoms: [1, 0, 1, 0, 1], // Example symptom vector
  });

  return (
    <div className="min-h-screen bg-[#0A0F1E] p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 3D Visualization */}
        <div className="lg:col-span-2">
          <BodyVisualization
            highlightedParts={highlightedParts}
            riskScores={{}}
          />
        </div>

        {/* Analysis Panel */}
        <div className="space-y-6">
          <RiskScoring patientData={patientData} />
          <DiseasePrediction patientData={patientData} />

          <Alert className="bg-red-500/10 border-red-500/20">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            <AlertTitle className="text-red-500">Risk Alert</AlertTitle>
            <AlertDescription className="text-red-200">
              Elevated cardiovascular risk detected.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
}

// Usage:
// <MedicalVisualization />
