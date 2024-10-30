// src/components/medical/TestPrediction.tsx
import React, { useState } from "react";
import { HfInference } from "@huggingface/inference";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PredictionResult {
  label: string;
  score: number;
}

export function TestPrediction(): JSX.Element {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<PredictionResult[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const runTest = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const hf = new HfInference(process.env.REACT_APP_HUGGING_FACE_API_KEY);

      const result = await hf.textClassification({
        model: "medicalai/clinical-bert",
        inputs: input,
      });

      setResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Prediction error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 bg-[#0A0F1E] min-h-screen">
      <Card className="bg-[#141925] border-[#1E2433]">
        <CardHeader>
          <CardTitle className="text-white">Test Medical Prediction</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              value={input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInput(e.target.value)
              }
              placeholder="Enter symptoms..."
              className="bg-[#1E2433] border-[#2A3441] text-white"
            />

            <Button
              onClick={runTest}
              disabled={isLoading || !input}
              className="bg-[#3B82F6] hover:bg-[#2563EB] text-white w-full"
            >
              {isLoading ? "Processing..." : "Test Prediction"}
            </Button>

            {error && <div className="text-red-500 mt-2">Error: {error}</div>}

            {result && (
              <div className="mt-4 space-y-2">
                <h3 className="text-white font-medium">Results:</h3>
                <pre className="bg-[#1E2433] p-4 rounded-lg text-[#94A3B8] overflow-auto">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
