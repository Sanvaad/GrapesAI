// src/components/medical/Prediction/AIPredictionProvider.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { wrap } from "comlink";
import type {
  PatientData,
  PredictionResult,
  RiskAssessment,
} from "../../../lib/types/medical";

interface PredictionContextType {
  predictions: PredictionResult[];
  riskAssessments: RiskAssessment[];
  isLoading: boolean;
  error: Error | null;
  runPrediction: (data: PatientData) => Promise<void>;
}

const PredictionContext = createContext<PredictionContextType | null>(null);

export const AIPredictionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [predictions, setPredictions] = useState<PredictionResult[]>([]);
  const [riskAssessments, setRiskAssessments] = useState<RiskAssessment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [worker, setWorker] = useState<any>(null);

  useEffect(() => {
    const workerInstance = new Worker(
      new URL("../../../lib/ai/predictionWorker.ts", import.meta.url),
      { type: "module" },
    );
    const workerApi =
      wrap<typeof import("../../../lib/ai/predictionWorker").workerApi>(
        workerInstance,
      );
    setWorker(workerApi);

    return () => workerInstance.terminate();
  }, []);

  const runPrediction = async (patientData: PatientData) => {
    if (!worker) return;

    setIsLoading(true);
    setError(null);

    try {
      const [predictionResults, riskResults] = await Promise.all([
        worker.predictDisease(patientData),
        worker.assessRisks(patientData),
      ]);

      setPredictions(predictionResults);
      setRiskAssessments(riskResults);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Prediction failed"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PredictionContext.Provider
      value={{
        predictions,
        riskAssessments,
        isLoading,
        error,
        runPrediction,
      }}
    >
      {children}
    </PredictionContext.Provider>
  );
};

export const usePrediction = () => {
  const context = useContext(PredictionContext);
  if (!context) {
    throw new Error(
      "usePrediction must be used within an AIPredictionProvider",
    );
  }
  return context;
};
