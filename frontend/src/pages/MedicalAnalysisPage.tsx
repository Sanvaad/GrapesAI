// src/pages/MedicalAnalysisPage.tsx
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Activity, Microscope } from "lucide-react";

import type { PatientData, RiskScore, PredictionResult } from "@/types/medical";
import { BodyVisualization } from "@/components/medical/BodyMapping/BodyModel";
import { TestPrediction } from "@/components/medical/TestPrediction";

function MedicalAnalysisPage(): JSX.Element {
  const [selectedPatient, setSelectedPatient] = useState<PatientData | null>(
    null,
  );
  const [predictions, setPredictions] = useState<PredictionResult[]>([]);
  const [riskScores, setRiskScores] = useState<RiskScore[]>([]);

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Medical Analysis
        </h2>
        <p className="text-[#94A3B8]">
          AI-Powered Medical Analysis and Prediction
        </p>
      </div>

      <Tabs defaultValue="visualization" className="space-y-6">
        <TabsList className="bg-[#141925] border border-[#1E2433] p-1">
          <TabsTrigger
            value="visualization"
            className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-[#94A3B8] px-4 py-2"
          >
            <Brain className="w-4 h-4 mr-2" />
            3D Visualization
          </TabsTrigger>
          <TabsTrigger
            value="prediction"
            className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-[#94A3B8] px-4 py-2"
          >
            <Activity className="w-4 h-4 mr-2" />
            Disease Prediction
          </TabsTrigger>
          <TabsTrigger
            value="risk"
            className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-[#94A3B8] px-4 py-2"
          >
            <Microscope className="w-4 h-4 mr-2" />
            Risk Assessment
          </TabsTrigger>
        </TabsList>

        <TabsContent value="visualization">
          <Card className="bg-[#141925] border-[#1E2433]">
            <CardHeader>
              <CardTitle className="text-white">3D Body Mapping</CardTitle>
            </CardHeader>
            <CardContent>
              <BodyVisualization
                highlightedParts={riskScores.map((risk) => ({
                  id: risk.condition,
                  risk: risk.score,
                }))}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prediction">
          <Card className="bg-[#141925] border-[#1E2433]">
            <CardHeader>
              <CardTitle className="text-white">Disease Prediction</CardTitle>
            </CardHeader>
            <CardContent>
              <TestPrediction
                onPredictionComplete={setPredictions}
                patientData={selectedPatient}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk">
          <Card className="bg-[#141925] border-[#1E2433]">
            <CardHeader>
              <CardTitle className="text-white">Risk Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <RiskAssessment
                patientData={selectedPatient}
                onRiskUpdate={setRiskScores}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default MedicalAnalysisPage;
