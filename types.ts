
export enum Difficulty {
  Easy = "Leicht",
  Medium = "Mittel",
  Hard = "Schwer",
}

export enum Topic {
  Mixed = "Gemischt",
  Arithmetic = "Arithmetik",
  Fractions = "Bruchrechnen",
  Geometry = "Geometrie",
  WordProblems = "Textaufgaben",
  Logic = "Logik & Knobeln",
}

export interface Problem {
  question: string;
  solutionSteps: string[];
  finalAnswer: string;
  svgDiagram?: string;
}
