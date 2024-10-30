// src/types/analysis.ts
export interface AnalysisPoint {
  id: string;
  label: string;
  value: number;
  risk: "low" | "medium" | "high";
  details: string;
  position: [number, number, number];
}

export interface ModelAnalysisProps {
  patientId?: string;
  onAnalysisComplete?: (results: AnalysisPoint[]) => void;
}

export interface HighlightPoint {
  position: [number, number, number];
  label: string;
  value: number;
  color: string;
}
