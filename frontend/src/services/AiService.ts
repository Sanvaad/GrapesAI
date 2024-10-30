import axios from "axios";
import { config } from "./config";
import type { PatientData, PredictionResult } from "../types/medical.ts";

export class AIService {
  private readonly apiKey: string;

  constructor() {
    this.apiKey = config.apiKey || "";
    if (!this.apiKey) {
      console.warn("Hugging Face API key is not configured");
    }
  }

  async predictDisease(patientData: PatientData): Promise<PredictionResult[]> {
    try {
      const response = await axios.post(
        `${config.apiBaseUrl}${config.modelEndpoint}`,
        {
          inputs: this.formatPatientData(patientData),
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
        },
      );

      return this.processResults(response.data);
    } catch (error) {
      console.error("Prediction error:", error);
      throw new Error("Failed to get prediction results");
    }
  }

  private formatPatientData(data: PatientData): string {
    return `
      Patient Information:
      Age: ${data.demographics.age}
      Gender: ${data.demographics.gender}
      Symptoms: ${data.symptoms.join(", ")}
      Vitals: BP ${data.vitals.bloodPressure.systolic}/${data.vitals.bloodPressure.diastolic}
      HR: ${data.vitals.heartRate}
    `;
  }

  private processResults(rawResults: any[]): PredictionResult[] {
    return rawResults.map((result) => ({
      condition: result.label,
      probability: result.score * 100,
      severity: this.calculateSeverity(result.score),
      details: {
        relatedSymptoms: this.getRelatedSymptoms(result.label),
        suggestedTests: this.getSuggestedTests(result.label),
        differentialDiagnosis: this.getDifferentialDiagnosis(result.label),
      },
    }));
  }

  private calculateSeverity(
    score: number,
  ): "Low" | "Medium" | "High" | "Critical" {
    if (score < 0.25) return "Low";
    if (score < 0.5) return "Medium";
    if (score < 0.75) return "High";
    return "Critical";
  }

  private getRelatedSymptoms(condition: string): string[] {
    // Implement symptom correlation logic
    return [];
  }

  private getSuggestedTests(condition: string): string[] {
    // Implement test suggestion logic
    return [];
  }

  private getDifferentialDiagnosis(condition: string): string[] {
    // Implement differential diagnosis logic
    return [];
  }
}
