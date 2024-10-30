import { expose } from "comlink";
import { MedicalAIManager } from "./modelManager";

const manager = new MedicalAIManager(
  process.env.NEXT_PUBLIC_HUGGING_FACE_API_KEY!,
);

const workerApi = {
  async predictDisease(patientData: PatientData) {
    return await manager.predictDisease(patientData);
  },

  async assessRisks(patientData: PatientData) {
    return await manager.assessRisks(patientData);
  },
};
