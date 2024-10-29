import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { PatientStats } from "@/components/features/patients/patient-stats";
import { usePatientStore } from "@/store/usePatientStore";
import { Patient } from "@/types/patient";

// Mock data - replace with actual API call
const mockPatient: Patient = {
  id: "1",
  name: "John Doe",
  age: 45,
  gender: "Male",
  vitals: {
    heartRate: Array.from({ length: 24 }, (_, i) => ({
      timestamp: new Date(Date.now() - i * 3600000).toISOString(),
      value: 70 + Math.random() * 10,
    })),
    bloodPressure: Array.from({ length: 24 }, (_, i) => ({
      timestamp: new Date(Date.now() - i * 3600000).toISOString(),
      value: 120 + Math.random() * 10,
    })),
    temperature: Array.from({ length: 24 }, (_, i) => ({
      timestamp: new Date(Date.now() - i * 3600000).toISOString(),
      value: 98.6 + Math.random(),
    })),
    oxygenLevel: Array.from({ length: 24 }, (_, i) => ({
      timestamp: new Date(Date.now() - i * 3600000).toISOString(),
      value: 95 + Math.random() * 5,
    })),
  },
};

export function PatientDetailPage() {
  const { id } = useParams();
  const setCurrentPatient = usePatientStore((state) => state.setCurrentPatient);

  useEffect(() => {
    // In real app, fetch patient data here
    setCurrentPatient(mockPatient);
    return () => setCurrentPatient(null);
  }, [id, setCurrentPatient]);

  return (
    <div className="p-6">
      <PatientStats />
    </div>
  );
}
