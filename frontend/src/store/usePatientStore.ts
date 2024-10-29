import { create } from "zustand";

interface PatientStore {
  selectedTimeRange: "24h" | "7d" | "30d" | "90d";
  setTimeRange: (range: "24h" | "7d" | "30d" | "90d") => void;
  currentPatient: Patient | null;
  setCurrentPatient: (patient: Patient | null) => void;
}

export const usePatientStore = create<PatientStore>((set) => ({
  selectedTimeRange: "24h",
  setTimeRange: (range) => set({ selectedTimeRange: range }),
  currentPatient: null,
  setCurrentPatient: (patient) => set({ currentPatient: patient }),
}));
