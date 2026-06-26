import { MaterialProps } from "../types";

export const MATRIX_ABS: MaterialProps = {
  name: "ABS (Matriz)",
  key: "abs",
  elasticModulus: 2.3, // GPa
  tensileStrength: 40, // MPa
  density: 1.05, // g/cm³
  poissonRatio: 0.35,
  description: "Acrilonitrila Butadieno Estireno. Termoplástico amorfo comum em manufatura aditiva (impressão 3D FDM), conhecido por sua tenacidade e facilidade de moldagem, mas com baixa resistência e rigidez comparado a metais.",
  advantages: ["Excelente tenacidade ao impacto", "Fácil processabilidade em FDM", "Baixo custo e densidade reduzida"]
};

export const REINFORCEMENTS: MaterialProps[] = [
  {
    name: "Aço Carbono 1020",
    key: "steel_1020",
    elasticModulus: 205.0, // GPa
    tensileStrength: 420.0, // MPa
    density: 7.87, // g/cm³
    poissonRatio: 0.29,
    description: "Aço de baixo carbono, altamente dúctil e soldável. Usado para fabricar eixos, tubulações e peças estruturais comuns. Oferece um incremento drástico de rigidez (módulo elástico ≈ 90 vezes superior ao ABS).",
    advantages: ["Excelente soldabilidade", "Alta ductilidade", "Excelente relação rigidez/custo"]
  },
  {
    name: "Aço Carbono 1045",
    key: "steel_1045",
    elasticModulus: 206.0, // GPa
    tensileStrength: 585.0, // MPa
    density: 7.85, // g/cm³
    poissonRatio: 0.29,
    description: "Aço de médio carbono com excelente resistência mecânica e dureza. Amplamente utilizado em engrenagens, virabrequins e peças estruturais que exigem maior resistência ao desgaste do que o aço 1020.",
    advantages: ["Maior resistência à tração", "Excelente dureza e tenacidade mecânica", "Excelente usinabilidade"]
  },
  {
    name: "Alumínio (Liga Comercial/6061)",
    key: "aluminum",
    elasticModulus: 69.0, // GPa
    tensileStrength: 310.0, // MPa
    density: 2.70, // g/cm³
    poissonRatio: 0.33,
    description: "Metal leve, com excelente resistência à corrosão, elevada condutividade térmica e elétrica. Ideal para compósitos aeroespaciais ou de baixo peso relativo, mantendo a densidade total do compósito muito inferior à dos aços.",
    advantages: ["Extremamente leve (baixa densidade)", "Ótima condutividade térmica", "Excelente resistência à corrosão"]
  },
  {
    name: "Aço Inox 316",
    key: "inox_316",
    elasticModulus: 193.0, // GPa
    tensileStrength: 515.0, // MPa
    density: 8.00, // g/cm³
    poissonRatio: 0.27,
    description: "Aço inoxidável austenítico com adição de molibdênio. Oferece alta resistência mecânica aliada a uma excepcional resistência à oxidação química e corrosão por pites em ambientes salinos de cloreto.",
    advantages: ["Resistência excepcional à corrosão corrosiva", "Propriedades mecânicas elevadas", "Comportamento não magnético"]
  }
];
