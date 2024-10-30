// src/lib/modelSetup.ts
import { HfInference } from "@huggingface/inference";
import type {
  PatientData,
  PredictionResult,
  RiskScore,
} from "../types/medical";

class MedicalPredictor {
  private hf: HfInference;

  constructor() {
    const apiKey = process.env.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;
    if (!apiKey) {
      throw new Error("Hugging Face API key is not configured");
    }
    this.hf = new HfInference(apiKey);
  }

  async predictDisease(symptoms: string[]): Promise<PredictionResult[]> {
    try {
      const result = await this.hf.textClassification({
        model: "medicalai/clinical-bert",
        inputs: symptoms.join(" "),
      });

      return result.map((prediction) => ({
        label: prediction.label,
        score: prediction.score,
        confidence: prediction.score,
        details: {
          symptoms,
          relatedConditions: [],
        },
      }));
    } catch (error) {
      console.error("Disease prediction error:", error);
      throw error;
    }
  }

  async calculateRiskScores(patientData: PatientData): Promise<RiskScore[]> {
    try {
      const result = await this.hf.textClassification({
        model: "biosimilars/Bio_ClinicalBERT_UMLS",
        inputs: JSON.stringify(patientData),
      });

      return result.map((risk) => ({
        condition: risk.label,
        score: risk.score * 100,
        severity: this.getSeverityLevel(risk.score * 100),
        factors: [],
      }));
    } catch (error) {
      console.error("Risk calculation error:", error);
      throw error;
    }
  }

  private getSeverityLevel(
    score: number,
  ): "Low" | "Medium" | "High" | "Critical" {
    if (score < 25) return "Low";
    if (score < 50) return "Medium";
    if (score < 75) return "High";
    return "Critical";
  }
}

export const medicalPredictor = new MedicalPredictor();

// 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
