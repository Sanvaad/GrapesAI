// src/components/medical/Prediction/predictionWorker.js
import { HfInference } from "@huggingface/inference";
import { pipeline } from "@xenova/transformers";

let classifier = null;
const hf = new HfInference(process.env.NEXT_PUBLIC_HUGGING_FACE_API_KEY);

async function initializeClassifier() {
  if (!classifier) {
    classifier = await pipeline("text-classification", "Xenova/clinical-bert");
  }
  return classifier;
}

self.onmessage = async (e) => {
  const { patientData } = e.data;

  try {
    // Initialize the classifier if not already done
    await initializeClassifier();

    // Convert symptoms to text
    const symptomText = patientData.symptoms.join(" ");

    // Local prediction using Transformers.js
    const localPrediction = await classifier(symptomText);

    // Remote prediction using Inference API
    const remotePrediction = await hf.textClassification({
      model: "medicalai/clinical-bert",
      inputs: symptomText,
    });

    // Combine predictions
    const results = {
      diseases: localPrediction.map((pred) => ({
        condition: pred.label,
        probability: (pred.score * 100).toFixed(1),
      })),
      risks: remotePrediction.map((pred) => ({
        factor: pred.label,
        score: (pred.score * 100).toFixed(1),
      })),
    };

    self.postMessage({ predictions: results });
  } catch (error) {
    self.postMessage({ error: error.message });
  }
};
