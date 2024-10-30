import React from "react";
import { usePrediction } from "./AIPredictionProvider";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PredictionAnalysisProps {
  patientId: string;
}

export const PredictionAnalysis: React.FC<PredictionAnalysisProps> = ({
  patientId,
}) => {
  const { predictions, isLoading, error, runPrediction } = usePrediction();

  const handleAnalysis = async () => {
    const patientData = {
      id: patientId,
      demographics: {
        age: 45,
        gender: "male",
        ethnicity: "caucasian",
      },
      vitals: {
        bloodPressure: {
          systolic: 120,
          diastolic: 80,
        },
        heartRate: 75,
        temperature: 98.6,
        respiratoryRate: 16,
      },
      symptoms: ["headache", "fatigue"],
      medicalHistory: [],
      currentMedications: [],
    };

    await runPrediction(patientData);
  };

  return (
    <Card className="bg-[#141925] border-[#1E2433]">
      <div className="p-4">
        <h2 className="text-white text-xl font-semibold mb-4">AI Analysis</h2>
        <div className="space-y-4">
          <Button
            onClick={handleAnalysis}
            disabled={isLoading}
            className="bg-[#3B82F6] hover:bg-[#2563EB] text-white w-full"
          >
            {isLoading ? "Analyzing..." : "Run Analysis"}
          </Button>

          {error && <div className="text-red-500 mt-2">Error: {error}</div>}

          {predictions.length > 0 && (
            <div className="space-y-4">
              {predictions.map((prediction, index) => (
                <div key={index} className="p-4 bg-[#1E2433] rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-white font-medium">
                      {prediction.condition}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        prediction.severity === "High" ||
                        prediction.severity === "Critical"
                          ? "bg-red-500/10 text-red-500"
                          : prediction.severity === "Medium"
                            ? "bg-yellow-500/10 text-yellow-500"
                            : "bg-green-500/10 text-green-500"
                      }`}
                    >
                      {prediction.severity}
                    </span>
                  </div>
                  <div className="text-[#94A3B8] text-sm">
                    Probability: {prediction.probability.toFixed(1)}%
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
