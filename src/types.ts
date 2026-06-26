export interface Article {
  id: string;
  title: string;
  authors: string;
  year: string;
  abstract: string;
  methodology: string;
  keyFindings: string[];
  relevanceToComposites: string;
  suggestedTags: string[];
  fileName?: string;
  fileSize?: string;
  createdAt: string;
  fullText?: string;
}

export interface MaterialProps {
  name: string;
  key: string;
  elasticModulus: number; // in GPa
  tensileStrength: number; // in MPa
  density: number; // in g/cm³
  poissonRatio: number;
  description: string;
  advantages: string[];
  type?: "matrix" | "reinforcement";
  glassTransition?: string;
  printNozzleTemp?: string;
  printBedTemp?: string;
  disadvantages?: string[];
}

export interface SimulationResult {
  volumeFraction: number; // fraction 0 to 1
  elasticModulusVoigt: number; // Parallel upper bound GPa
  elasticModulusReuss: number; // Transverse lower bound GPa
  elasticModulusHalpinTsai: number; // GPa (semi-empirical for random/short fibers)
  tensileStrengthVoigt: number; // MPa
  tensileStrengthReuss: number; // MPa
  compositeDensity: number; // g/cm³
}

export type FiberOrientation = "longitudinal" | "transverse" | "random";
