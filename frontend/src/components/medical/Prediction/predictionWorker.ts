// src/components/medical/Prediction/predictionWorker.js
import * as tf from "@tensorflow/tfjs";
import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HUGGING_FACE_API_KEY);

// Initialize TensorFlow
tf.setBackend("webgl");

let model = null;

// Load model
async function loadModel() {
  try {
    model = await tf.loadLayersModel("/models/disease_prediction.json");
    return true;
  } catch (error) {
    console.error("Error loading model:", error);
    return false;
  }
}

self.onmessage = async (e) => {
  const { patientData } = e.data;

  if (!model) {
    await loadModel();
  }

  try {
    // Process patient data
    const tensorInput = tf.tensor2d([patientData.symptoms]);

    // Run prediction
    const predictions = await model.predict(tensorInput).array();

    // Map predictions to conditions
    const results = predictions[0].map((prob, index) => ({
      condition: `Condition ${index + 1}`,
      probability: (prob * 100).toFixed(1),
    }));

    self.postMessage({ predictions: results });
  } catch (error) {
    self.postMessage({ error: error.message });
  }
};
