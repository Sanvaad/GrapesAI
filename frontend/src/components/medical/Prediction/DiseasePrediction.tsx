// src/components/medical/Prediction/DiseasePrediction.jsx
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Brain } from "lucide-react";
import { HfInference } from "@huggingface/inference";

export function DiseasePrediction({ patientData }) {
  const [predictions, setPredictions] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const runPrediction = async () => {
    setIsProcessing(true);

    try {
      const hf = new HfInference(process.env.NEXT_PUBLIC_HUGGING_FACE_API_KEY);

      // Run prediction using Inference API
      const result = await hf.textClassification({
        model: "medicalai/clinical-bert",
        inputs: patientData.symptoms.join(" "),
      });

      setPredictions(
        result.map((pred) => ({
          condition: pred.label,
          probability: (pred.score * 100).toFixed(1),
        })),
      );
    } catch (error) {
      console.error("Prediction error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="bg-[#141925] border-[#1E2433]">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Brain className="h-5 w-5 text-blue-500" />
          Disease Prediction
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {predictions.map((prediction, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">{prediction.condition}</span>
                <span className="text-white">{prediction.probability}%</span>
              </div>
              <Progress
                value={parseFloat(prediction.probability)}
                className="h-2"
              />
            </div>
          ))}
          <Button
            onClick={runPrediction}
            disabled={isProcessing}
            className="bg-[#3B82F6] hover:bg-[#2563EB] text-white w-full"
          >
            {isProcessing ? "Processing..." : "Run Prediction"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// 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
