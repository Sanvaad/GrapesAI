import { HfInference } from "@huggingface/inference";
import * as tf from "@tensorflow/tfjs";
import type {
  PatientData,
  PredictionResult,
  RiskAssessment,
} from "../types/medical.ts";

export class MedicalAIManager {
  private hf: HfInference;
  private tfModel: tf.LayersModel | null = null;
  private modelCache: Map<string, any> = new Map();

  constructor(apiKey: string) {
    this.hf = new HfInference(apiKey);
    this.initializeTFModel();
  }

  private async initializeTFModel() {
    try {
      // Load local TensorFlow.js model for real-time analysis
      this.tfModel = await tf.loadLayersModel(
        "/models/medical_analysis/model.json",
      );
    } catch (error) {
      console.error("Error loading TF model:", error);
      throw new Error("Failed to initialize TensorFlow model");
    }
  }

  public async predictDisease(
    patientData: PatientData,
  ): Promise<PredictionResult[]> {
    try {
      // Create a formatted input for the clinical-bert model
      const formattedInput = this.formatPatientData(patientData);

      // Run prediction using Hugging Face model
      const result = await this.hf.textClassification({
        model: "medicalai/clinical-bert",
        inputs: formattedInput,
      });

      // Process and enhance the results
      return this.processResults(result, patientData);
    } catch (error) {
      console.error("Disease prediction error:", error);
      throw error;
    }
  }

  public async assessRisks(
    patientData: PatientData,
  ): Promise<RiskAssessment[]> {
    if (!this.tfModel) {
      throw new Error("TensorFlow model not initialized");
    }

    try {
      // Prepare data for TensorFlow model
      const tensorData = this.prepareTensorData(patientData);

      // Run real-time risk assessment
      const predictions = (await this.tfModel.predict(tensorData)) as tf.Tensor;

      return this.formatRiskAssessment(predictions, patientData);
    } catch (error) {
      console.error("Risk assessment error:", error);
      throw error;
    }
  }

  private formatPatientData(data: PatientData): string {
    // Format patient data for the model
    return `
      Patient Presentation:
      Age: ${data.demographics.age}
      Gender: ${data.demographics.gender}
      Symptoms: ${data.symptoms.join(", ")}
      Medical History: ${data.medicalHistory.join(", ")}
      Current Medications: ${data.currentMedications.join(", ")}
      Vitals:
      - BP: ${data.vitals.bloodPressure.systolic}/${data.vitals.bloodPressure.diastolic}
      - HR: ${data.vitals.heartRate}
      - Temp: ${data.vitals.temperature}
      - RR: ${data.vitals.respiratoryRate}
    `;
  }

  private prepareTensorData(data: PatientData): tf.Tensor {
    // Convert patient data to tensor format
    const features = [
      data.demographics.age,
      data.vitals.bloodPressure.systolic,
      data.vitals.bloodPressure.diastolic,
      data.vitals.heartRate,
      data.vitals.temperature,
      data.vitals.respiratoryRate,
      // Add more features as needed
    ];

    return tf.tensor2d([features], [1, features.length]);
  }

  private async processResults(
    rawResults: any[],
    patientData: PatientData,
  ): Promise<PredictionResult[]> {
    return rawResults.map((result) => ({
      condition: result.label,
      probability: result.score * 100,
      severity: this.calculateSeverity(result.score),
      details: {
        relatedSymptoms: this.findRelatedSymptoms(
          result.label,
          patientData.symptoms,
        ),
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

  private findRelatedSymptoms(condition: string, symptoms: string[]): string[] {
    // Implement symptom correlation logic
    return symptoms.filter((symptom) =>
      this.modelCache
        .get("symptom_correlations")
        ?.[condition]?.includes(symptom),
    );
  }

  private getSuggestedTests(condition: string): string[] {
    // Implement test suggestion logic based on condition
    return this.modelCache.get("suggested_tests")?.[condition] || [];
  }

  private getDifferentialDiagnosis(condition: string): string[] {
    // Implement differential diagnosis logic
    return this.modelCache.get("differential_diagnosis")?.[condition] || [];
  }

  private async formatRiskAssessment(
    predictions: tf.Tensor,
    patientData: PatientData,
  ): Promise<RiskAssessment[]> {
    const riskValues = await predictions.array();
    const organSystems = [
      "Cardiovascular",
      "Respiratory",
      "Neurological",
      "Gastrointestinal",
    ];

    return organSystems.map((system, index) => ({
      organSystem: system,
      riskLevel: riskValues[0][index] * 100,
      factors: this.getRiskFactors(system, patientData),
      recommendations: this.getRecommendations(system, riskValues[0][index]),
    }));
  }

  private getRiskFactors(system: string, data: PatientData): string[] {
    // Implement risk factor identification logic
    return this.modelCache.get("risk_factors")?.[system] || [];
  }

  private getRecommendations(system: string, riskLevel: number): string[] {
    // Implement recommendation logic based on risk level
    return (
      this.modelCache.get("recommendations")?.[system]?.[
        this.calculateSeverity(riskLevel)
      ] || []
    );
  }
}
