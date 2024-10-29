// src/components/medical/Prediction/DiseasePrediction.jsx
import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Brain } from "lucide-react";

// Create a worker for predictions
const predictionWorker = new Worker(
  new URL("./predictionWorker.js", import.meta.url),
  { type: "module" },
);

export function DiseasePrediction({ patientData }) {
  const [predictions, setPredictions] = useState([]);
  const [model, setModel] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Initialize TensorFlow model
    const loadModel = async () => {
      try {
        const loadedModel = await tf.loadLayersModel(
          "/models/disease_prediction.json",
        );
        setModel(loadedModel);
      } catch (error) {
        console.error("Error loading model:", error);
      }
    };

    loadModel();

    // Set up worker message handler
    predictionWorker.onmessage = (event) => {
      setPredictions(event.data.predictions);
      setIsProcessing(false);
    };

    return () => {
      predictionWorker.terminate();
    };
  }, []);

  const runPrediction = () => {
    setIsProcessing(true);
    predictionWorker.postMessage({ patientData });
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
              <Progress value={prediction.probability} className="h-2" />
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

// Usage:
// <DiseasePrediction patientData={{
//   age: 45,
//   symptoms: ['fever', 'cough'],
//   vitals: { bloodPressure: '120/80', temperature: 98.6 }
// }} />
