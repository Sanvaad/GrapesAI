// src/lib/testAPI.ts
import { medicalPredictor } from "./modelSetup";
import type { PatientData } from "../types/medical";

export async function testHuggingFaceAPI(): Promise<boolean> {
  try {
    const testPatient: PatientData = {
      id: "test-001",
      age: 45,
      gender: "M",
      symptoms: ["headache", "fever"],
      vitals: {
        bloodPressure: "120/80",
        heartRate: 75,
        temperature: 98.6,
        oxygenSaturation: 98,
      },
    };

    // Test disease prediction
    const predictions = await medicalPredictor.predictDisease(
      testPatient.symptoms,
    );
    console.log("Test Predictions:", predictions);

    // Test risk scoring
    const risks = await medicalPredictor.calculateRiskScores(testPatient);
    console.log("Test Risk Scores:", risks);

    return true;
  } catch (error) {
    console.error("API Test Error:", error);
    return false;
  }
}
