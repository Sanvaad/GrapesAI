import React, { createContext, useContext, useState } from "react";
import { AIService } from "../services/AiService";
import type {
  PatientData,
  PredictionResult,
  RiskAssessment,
} from "../types/medical.ts";

interface AIPredictionContextType {
  predictions: PredictionResult[];
  isLoading: boolean;
  error: string | null;
  runPrediction: (data: PatientData) => Promise<void>;
}

const AIPredictionContext = createContext<AIPredictionContextType | null>(null);

export const AIPredictionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [predictions, setPredictions] = useState<PredictionResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const aiService = new AIService();

  const runPrediction = async (patientData: PatientData) => {
    setIsLoading(true);
    setError(null);

    try {
      const results = await aiService.predictDisease(patientData);
      setPredictions(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AIPredictionContext.Provider
      value={{
        predictions,
        isLoading,
        error,
        runPrediction,
      }}
    >
      {children}
    </AIPredictionContext.Provider>
  );
};

export const usePrediction = () => {
  const context = useContext(AIPredictionContext);
  if (!context) {
    throw new Error(
      "usePrediction must be used within an AIPredictionProvider",
    );
  }
  return context;
};
