
import { GoogleGenAI, Type } from "@google/genai";
import type { Problem, Difficulty, Topic } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    question: {
      type: Type.STRING,
      description: "Die mathematische Fragestellung auf Deutsch."
    },
    solutionSteps: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Eine schrittweise Erklärung der Lösung auf Deutsch."
    },
    finalAnswer: {
      type: Type.STRING,
      description: "Die endgültige, kurze Antwort auf die Frage, inklusive Einheiten."
    },
    svgDiagram: {
      type: Type.STRING,
      description: "Optional: Ein SVG-String für geometrische Probleme. Das SVG sollte eine saubere, einfache Darstellung sein, die 'currentColor' für Linienfarben verwendet und eine viewBox hat."
    },
  },
  required: ["question", "solutionSteps", "finalAnswer"]
};

export const generateMathProblem = async (difficulty: Difficulty, topic: Topic): Promise<Problem> => {
  const prompt = `
    Du bist ein erfahrener Schweizer Mathematiklehrer, der Übungsaufgaben für 11-12-jährige Schüler erstellt, die sich auf die Aufnahmeprüfung für das Langgymnasium im Kanton Zürich (Gymi-Prüfung) vorbereiten. Dein Ton ist klar, motivierend und auf die Altersgruppe zugeschnitten.

    Erstelle eine einzelne Matheaufgabe basierend auf den folgenden Parametern:
    - Schwierigkeitsgrad: ${difficulty}
    - Thema: ${topic}
    - Sprache: Deutsch

    Wenn das Thema Geometrie ist, erstelle eine passende SVG-Grafik. Die Grafik sollte simpel sein, eine viewBox verwenden und 'currentColor' als stroke-Farbe nutzen. Ansonsten lasse das Feld 'svgDiagram' weg.
    
    Die Antwort muss ein einzelnes, valides JSON-Objekt sein, das dem vorgegebenen Schema entspricht.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.9
      },
    });
    
    const jsonString = response.text;
    const parsedProblem = JSON.parse(jsonString);
    return parsedProblem as Problem;
  } catch (error) {
    console.error("Error generating content from Gemini API:", error);
    throw new Error("Failed to generate math problem.");
  }
};
