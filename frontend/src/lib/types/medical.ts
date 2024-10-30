export interface PatientData {
  id: string;
  demographics: {
    age: number;
    gender: string;
    ethnicity: string;
  };
  vitals: {
    bloodPressure: {
      systolic: number;
      diastolic: number;
    };
    heartRate: number;
    temperature: number;
    respiratoryRate: number;
  };
  symptoms: string[];
  medicalHistory: string[];
  currentMedications: string[];
}

export interface PredictionResult {
  condition: string;
  probability: number;
  severity: "Low" | "Medium" | "High" | "Critical";
  details: {
    relatedSymptoms: string[];
    suggestedTests: string[];
    differentialDiagnosis: string[];
  };
}

export interface RiskAssessment {
  organSystem: string;
  riskLevel: number;
  factors: string[];
  recommendations: string[];
}
