export interface VitalSign {
  timestamp: string;
  value: number;
}

export interface PatientVitals {
  heartRate: VitalSign[];
  bloodPressure: VitalSign[];
  temperature: VitalSign[];
  oxygenLevel: VitalSign[];
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  vitals: PatientVitals;
}
