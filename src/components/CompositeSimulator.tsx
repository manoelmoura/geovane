import React, { useState, useRef, useEffect } from "react";
import { 
  REINFORCEMENTS, MATRIX_ABS 
} from "../data/materials";
import { MaterialProps } from "../types";
import { 
  Sliders, Activity, Cpu, ShieldAlert, CornerDownRight, 
  Send, Sparkles, MessageSquare, RefreshCw, BarChart2, Info, ArrowUpRight, Loader2
} from "lucide-react";
import Markdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function CompositeSimulator() {
  // Pre-load static lists
  const [matrices, setMatrices] = useState<MaterialProps[]>([
    MATRIX_ABS,
    {
      name: "PLA (Poliácido Lático)",
      key: "pla_pure",
      type: "matrix",
      elasticModulus: 3.50,
      tensileStrength: 60.0,
      density: 1.24,
      poissonRatio: 0.36,
      description: "Polímero biodegradável de alta rigidez estrutural.",
      advantages: []
    },
    {
      name: "PETG (Polietileno Tereftalato)",
      key: "petg_pure",
      type: "matrix",
      elasticModulus: 2.10,
      tensileStrength: 50.0,
      density: 1.27,
      poissonRatio: 0.37,
      description: "Copolímero termoplástico tenaz e fácil de processar.",
      advantages: []
    },
    {
      name: "PA12 (Nylon 12)",
      key: "nylon_12",
      type: "matrix",
      elasticModulus: 1.50,
      tensileStrength: 45.0,
      density: 1.01,
      poissonRatio: 0.40,
      description: "Poliamida linear semicristalina sintética resiliente.",
      advantages: []
    }
  ]);

  const [reinforcements, setReinforcements] = useState<MaterialProps[]>([
    ...REINFORCEMENTS,
    {
      name: "Fibra de Carbono (Curta/Picada)",
      key: "carbon_fiber_chopped",
      type: "reinforcement",
      elasticModulus: 230.0,
      tensileStrength: 3500.0,
      density: 1.76,
      poissonRatio: 0.20,
      description: "Fios curtos de carbono de altíssimo módulo.",
      advantages: []
    },
    {
      name: "Pó Atomizado de Bronze",
      key: "bronze_atomized_powder",
      type: "reinforcement",
      elasticModulus: 115.0,
      tensileStrength: 220.0,
      density: 8.80,
      poissonRatio: 0.34,
      description: "Liga de bronze para compósitos metálicos densos.",
      advantages: []
    }
  ]);

  const [selectedMatrix, setSelectedMatrix] = useState<MaterialProps>(MATRIX_ABS);
  const [selectedAlloy, setSelectedAlloy] = useState<MaterialProps>(REINFORCEMENTS[0]);
  const [volumeFraction, setVolumeFraction] = useState(0.20); // 20%
  const [orientation, setOrientation] = useState<"longitudinal" | "transverse" | "random" | "particles">("random");
  const [bondQuality, setBondQuality] = useState(0.5); // 0 to 1 representing interfacial bonding

  // Load custom added materials from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("athenaeum_custom_materials");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as MaterialProps[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          const customMatrices = parsed.filter(m => m.type === "matrix");
          const customReinforcements = parsed.filter(m => m.type === "reinforcement");

          setMatrices(prev => {
            const list = [...prev];
            customMatrices.forEach(cm => {
              const idx = list.findIndex(l => l.key === cm.key);
              if (idx !== -1) list[idx] = cm;
              else list.push(cm);
            });
            return list;
          });

          setReinforcements(prev => {
            const list = [...prev];
            customReinforcements.forEach(cr => {
              const idx = list.findIndex(l => l.key === cr.key);
              if (idx !== -1) list[idx] = cr;
              else list.push(cr);
            });
            return list;
          });
        }
      } catch (err) {
        console.error("Erro ao integrar customizados:", err);
      }
    }
  }, []);

  // Chat States
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Olá! Sou o seu Consultor Científico em Ciência dos Materiais. Analisando os parâmetros atuais do seu compósito, posso orientar você sobre o comportamento de rigidez interfacial, limites físico-elásticos de Voigt/Reuss ou otimização de filamentos para impressão FDM com sua matriz e reforço selecionados. Qual dúvida teórica ou prática gostaria de discutir?"
    }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Active chart metric ("modulus" or "strength")
  const [activeMetric, setActiveMetric] = useState<"modulus" | "strength">("modulus");

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Calculations for chosen parameters
  const E_m = selectedMatrix?.elasticModulus ?? MATRIX_ABS.elasticModulus;
  const E_r = selectedAlloy?.elasticModulus ?? REINFORCEMENTS[0].elasticModulus;
  const S_m = selectedMatrix?.tensileStrength ?? MATRIX_ABS.tensileStrength;
  const S_r = selectedAlloy?.tensileStrength ?? REINFORCEMENTS[0].tensileStrength;
  const rho_m = selectedMatrix?.density ?? MATRIX_ABS.density;
  const rho_r = selectedAlloy?.density ?? REINFORCEMENTS[0].density;

  // 1. Voigt Bound (Longitudinal Modulus, parallel fibers)
  const calculateVoigtModulus = (Vr: number) => {
    return (1 - Vr) * E_m + Vr * E_r;
  };

  // 2. Reuss Bound (Transverse Modulus, perpendicular)
  const calculateReussModulus = (Vr: number) => {
    if (Vr === 0) return E_m;
    if (Vr === 1) return E_r;
    return (E_m * E_r) / ((1 - Vr) * E_r + Vr * E_m);
  };

  // 3. Halpin-Tsai Modulus
  const calculateHalpinTsai = (Vr: number, geomType: typeof orientation) => {
    const getModulusForXi = (xiValue: number) => {
      const eta = (E_r / E_m - 1) / (E_r / E_m + xiValue);
      return E_m * ((1 + xiValue * eta * Vr) / (1 - eta * Vr));
    };

    if (geomType === "particles") {
      return getModulusForXi(2); // xi = 2 for spheres
    } else if (geomType === "longitudinal") {
      return calculateVoigtModulus(Vr); // Longitudinal fibers match Voigt perfectly
    } else if (geomType === "transverse") {
      return calculateReussModulus(Vr); // Transverse fibers match Reuss
    } else {
      // Random: In-plane orientation factor. Semi-empirical compromise for random fibers
      const E_long = getModulusForXi(12);
      const E_trans = getModulusForXi(2);
      return 0.375 * E_long + 0.625 * E_trans;
    }
  };

  // actual Modulus based on state
  const compModulus = calculateHalpinTsai(volumeFraction, orientation);

  // 4. Density (linear exact ROM)
  const compDensity = (1 - volumeFraction) * rho_m + volumeFraction * rho_r;

  // 5. Tensile Strength Model
  const calculateStrength = (Vr: number) => {
    let alignmentFactor = 1.0;
    if (orientation === "transverse") alignmentFactor = 0.2;
    if (orientation === "random") alignmentFactor = 0.45;
    if (orientation === "particles") alignmentFactor = 0.3;

    // Voigt Strength Bound
    const S_voigt = (1 - Vr) * S_m + Vr * S_r;
    
    // Realistic particulate/fiber strength accounting for debonding voids and adhesion quality
    const S_matrix_load = S_m * (1 - Math.pow(Vr, 0.67));
    const S_reinforcement_load = S_r * Vr * bondQuality * alignmentFactor;
    
    const S_real = S_matrix_load + S_reinforcement_load;

    // Safety clamps
    return {
      voigt: S_voigt,
      reuss: S_m * (1 - Vr), // minimum strength considering particles carry 0 load
      real: Math.max(Math.min(S_real, S_voigt), S_m * 0.4)
    };
  };

  const compStrength = calculateStrength(volumeFraction);

  // Calculate mass reduction or gain vs solid ABS
  const densityChange = ((compDensity - rho_m) / rho_m) * 100;
  // Specific Modulus
  const specificModulusMatrix = E_m / rho_m;
  const specificModulusComp = compModulus / compDensity;
  const specificRigidityImprovement = ((specificModulusComp - specificModulusMatrix) / specificModulusMatrix) * 100;

  // Generate chart coordinates: Vr from 0 to 0.5 in steps of 0.025
  const points: { vr: number; voigt: number; reuss: number; real: number }[] = [];
  for (let vrVal = 0; vrVal <= 0.51; vrVal += 0.025) {
    let y_voigt = 0;
    let y_reuss = 0;
    let y_real = 0;

    if (activeMetric === "modulus") {
      y_voigt = calculateVoigtModulus(vrVal);
      y_reuss = calculateReussModulus(vrVal);
      y_real = calculateHalpinTsai(vrVal, orientation);
    } else {
      const strVals = calculateStrength(vrVal);
      y_voigt = strVals.voigt;
      y_reuss = strVals.reuss;
      y_real = strVals.real;
    }

    points.push({
      vr: vrVal,
      voigt: y_voigt,
      reuss: y_reuss,
      real: y_real
    });
  }

  // Map coordinates to SVG ViewBox (W: 500, H: 250)
  const mapX = (vr: number) => 55 + (vr / 0.5) * 415;
  
  // Calculate metric limits for plotting
  let minMetric = 0;
  let maxMetric = 0;
  if (activeMetric === "modulus") {
    minMetric = 0;
    maxMetric = calculateVoigtModulus(0.5); // max possible is at Vr=0.5
  } else {
    minMetric = 0;
    maxMetric = calculateStrength(0.5).voigt;
  }

  const mapY = (val: number) => 210 - (val / maxMetric) * 175;

  // Make line path strings for the SVG
  const makePath = (key: "voigt" | "reuss" | "real") => {
    return points.map((p, idx) => {
      const x = mapX(p.vr);
      const y = mapY(p[key]);
      return `${idx === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(" ");
  };

  const voigtPath = makePath("voigt");
  const reussPath = makePath("reuss");
  const realPath = makePath("real");

  // Send message to materials advisor API
  const handleSendMessage = async (e?: React.FormEvent, presetText?: string) => {
    if (e) e.preventDefault();
    const query = presetText || userInput;
    if (!query.trim() || isSending) return;

    const newUserMessage: Message = { role: "user", content: query };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setUserInput("");
    setIsSending(true);

    try {
      // Pack parameters as context to feed Gemini
      const compositeSpecsContext = `\n\n[CONTEXTO DO EXPERIMENTO ATUAL: Compósito de Matriz ${selectedMatrix.name} (E=${E_m} GPa, Resistência=${S_m} MPa, densidade=${rho_m}g/cm³) com reforço de ${selectedAlloy.name} (Modulador E=${E_r} GPa, Tração Resistência=${S_r} MPa, densidade=${rho_r} g/cm³). Parâmetros: Fração Volumétrica (Vr)=${(volumeFraction*100).toFixed(1)}%, Orientação dadas fibras=${orientation}, Adesão Interfacial=${(bondQuality*100).toFixed(0)}%. Compósito obtido tem escoamento real calculado de ${compStrength.real.toFixed(1)} MPa, módulo elástico de ${compModulus.toFixed(2)} GPa e densidade final de ${compDensity.toFixed(2)} g/cm³].`;

      const response = await fetch("/api/materials-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query + compositeSpecsContext,
          history: messages
        })
      });

      if (!response.ok) {
        throw new Error("Serviço fora do ar.");
      }

      const data = await response.json();
      setMessages([...updatedMessages, { role: "assistant", content: data.text }]);
    } catch (err: any) {
      console.error(err);
      setMessages([...updatedMessages, { 
        role: "assistant", 
        content: "Erro ao consultar modelo de física. Verifique suas conexões e chaves secretas para simulações completas com IA." 
      }]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 h-full" id="composite-simulator-container">
      
      {/* LEFT COLUMN: Controls & Sliders */}
      <div className="xl:col-span-5 flex flex-col gap-5" id="simulation-configurator-box">
        
        {/* Core Material Configurator */}
        <div className="bg-zinc-900 border border-zinc-805 p-5 rounded-lg shadow-md" id="alloy-selector-badge">
          <div className="flex items-center gap-1.5 border-b border-zinc-800 pb-3 mb-4">
            <Sliders size={15} className="text-indigo-400" />
            <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-widest font-mono">
              Parâmetros Básicos da Mistura
            </h3>
          </div>

          <div className="space-y-4">
            
            {/* 1. Matrix selection */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-mono">Fase Matriz (Termoplástico)</label>
              <select
                className="w-full p-2 border border-zinc-800 bg-zinc-950 text-zinc-200 text-xs rounded-lg focus:outline-none focus:border-indigo-550 font-sans transition-colors cursor-pointer"
                value={selectedMatrix.key}
                onChange={(e) => {
                  const found = matrices.find(m => m.key === e.target.value);
                  if (found) setSelectedMatrix(found);
                }}
                id="matrix-polymer-selector"
              >
                {matrices.map(m => (
                  <option key={m.key} value={m.key}>{m.name}</option>
                ))}
              </select>
              <p className="text-[10.5px] text-zinc-500 italic leading-relaxed font-sans">
                {selectedMatrix.description || "Matriz do compósito para fixação das propriedades mecânicas básicas."}
              </p>
            </div>

            {/* 2. Reinforcement Dropdown selection */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-mono font-bold">Fase Reforço (Liga / Carga)</label>
              <select
                className="w-full p-2 border border-zinc-800 bg-zinc-950 text-zinc-200 text-xs rounded-lg focus:outline-none focus:border-indigo-500 font-sans transition-colors cursor-pointer"
                value={selectedAlloy.key}
                onChange={(e) => {
                  const found = reinforcements.find(r => r.key === e.target.value);
                  if (found) setSelectedAlloy(found);
                }}
                id="reinforcement-alloy-selector"
              >
                {reinforcements.map(r => (
                  <option key={r.key} value={r.key}>{r.name}</option>
                ))}
              </select>
              <p className="text-[10.5px] text-zinc-500 italic leading-relaxed font-sans">
                {selectedAlloy.description}
              </p>
            </div>

            {/* Compared Micro datasheets */}
            <div className="grid grid-cols-2 gap-2" id="micro-sheet-comparison">
              <div className="border border-zinc-850 bg-zinc-950 rounded-md p-2 font-mono text-[9px] text-center space-y-1">
                <span className="text-indigo-400 uppercase tracking-wide font-sans font-bold text-[8.5px] block">Parâmetros da Matriz</span>
                <div className="flex flex-col text-zinc-400 gap-0.5">
                  <div>E: <strong className="text-zinc-200">{E_m} GPa</strong></div>
                  <div>Tração: <strong className="text-zinc-200">{S_m} MPa</strong></div>
                  <div>Dens: <strong className="text-zinc-200">{rho_m.toFixed(2)} g/cm³</strong></div>
                </div>
              </div>
              
              <div className="border border-zinc-850 bg-zinc-950 rounded-md p-2 font-mono text-[9px] text-center space-y-1">
                <span className="text-teal-400 uppercase tracking-wide font-sans font-bold text-[8.5px] block">Parâmetros do Reforço</span>
                <div className="flex flex-col text-zinc-400 gap-0.5">
                  <div>E: <strong className="text-zinc-200">{E_r} GPa</strong></div>
                  <div>Tração: <strong className="text-zinc-200">{S_r} MPa</strong></div>
                  <div>Dens: <strong className="text-zinc-200">{rho_r.toFixed(2)} g/cm³</strong></div>
                </div>
              </div>
            </div>

            {/* 2. Volume Fraction Slider */}
            <div className="flex flex-col gap-1.5 pt-1">
              <div className="flex justify-between items-center text-[10px]">
                <span className="font-bold text-zinc-400 uppercase tracking-widest font-mono">Fração Volumétrica ($V_r$)</span>
                <span className="font-mono text-indigo-400 font-bold bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-900/30 text-[10px]">
                  {(volumeFraction * 100).toFixed(1)}%
                </span>
              </div>
              <input 
                type="range"
                min="0"
                max="0.50"
                step="0.01"
                className="w-full h-1 bg-zinc-950 rounded cursor-pointer accent-indigo-500"
                value={volumeFraction}
                onChange={(e) => setVolumeFraction(parseFloat(e.target.value))}
                id="vol-fraction-slider"
              />
              <div className="flex justify-between text-[9px] text-zinc-500 font-mono select-none">
                <span>0% ({selectedMatrix?.name.split(" ")[0] || "Matriz"} Puro)</span>
                <span>25%</span>
                <span>50% (Limite FDM)</span>
              </div>

              {/* FDM Warning */}
              {volumeFraction > 0.35 && (
                <div className="flex gap-2 p-2.5 bg-amber-950/10 border border-amber-900/35 rounded-lg text-[10.5px] text-amber-200/90 leading-relaxed font-sans" id="processing-limit-warn">
                  <ShieldAlert size={14} className="text-amber-500 shrink-0 mt-0.5" />
                  <p>
                    <strong>Limite Experimental FDM:</strong> Frações superiores a 35% causam desgaste acelerado no bico extrusor de latão e entupimentos frequentes por cisalhamento de filamento polimérico.
                  </p>
                </div>
              )}
            </div>

            {/* 3. Fiber orientation toggles */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-mono">Arranjo Espacial do Reforço</label>
              <div className="grid grid-cols-2 gap-1.5" id="orientation-grid">
                {[
                  { id: "particles", label: "Partículas Esféricas" },
                  { id: "random", label: "Curtas Aleatórias" },
                  { id: "longitudinal", label: "Longitudinais" },
                  { id: "transverse", label: "Transversais" }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setOrientation(item.id as any)}
                    className={`p-2 rounded-lg text-[10.5px] font-semibold border text-left transition-all cursor-pointer flex items-center justify-between ${
                      orientation === item.id 
                        ? "bg-zinc-950 border-indigo-505 text-indigo-400 shadow-inner"
                        : "bg-zinc-950/40 border-zinc-800 text-zinc-500 hover:text-zinc-350 hover:border-zinc-700"
                    }`}
                    id={`orientation-toggle-${item.id}`}
                  >
                    <span>{item.label}</span>
                    {orientation === item.id && <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Interface bonding quality slider */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-[10px]">
                <span className="font-bold text-zinc-400 uppercase tracking-widest font-mono">Adesão Interfacial Matriz-Reforço</span>
                <span className="font-mono text-teal-400 font-bold bg-teal-950/30 px-2 py-0.5 rounded border border-teal-900/20 text-[10px]">
                  {bondQuality < 0.3 ? "Apenas Física (Baixa)" : bondQuality < 0.7 ? "Moderada" : "Excelente (Acoplada)"}
                </span>
              </div>
              <input 
                type="range"
                min="0.05"
                max="0.9"
                step="0.05"
                className="w-full h-1 bg-zinc-950 rounded cursor-pointer accent-teal-500"
                value={bondQuality}
                onChange={(e) => setBondQuality(parseFloat(e.target.value))}
                id="bond-quality-slider"
              />
              <p className="text-[10px] text-zinc-500 leading-normal font-sans pr-2">
                Qualifica a transmissão de esforços cortantes. Agentes silanos evitam o deslizamento mecânico e preservam a integridade elástica da fratura plástica.
              </p>
            </div>

          </div>
        </div>

        {/* Predições Físicas do Compósito */}
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-lg shadow-md" id="calcs-results-card">
          <div className="flex items-center gap-1.5 border-b border-zinc-800/80 pb-3 mb-4">
            <Activity size={15} className="text-teal-400" />
            <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-widest font-mono">
              Predição Mecânica do Compósito
            </h3>
          </div>

          <div className="space-y-2.5 animate-none" id="pred-properties-stack">
            
            <div className="flex justify-between items-center p-2 border border-zinc-800 bg-zinc-950/60 rounded-md" id="prop-result-em">
              <span className="text-[11px] text-zinc-400 font-sans">{"Módulo elástico previsto ($E_{comp}$):"}</span>
              <span className="text-xs font-bold text-indigo-400 font-mono">{compModulus.toFixed(2)} GPa</span>
            </div>

            <div className="flex justify-between items-center p-2 border border-zinc-800 bg-zinc-950/60 rounded-md" id="prop-result-strength">
              <span className="text-[11px] text-zinc-400 font-sans">{"Resistência à Tração prevista ($\\sigma_{comp}$):"}</span>
              <span className={`text-xs font-bold font-mono ${compStrength.real > S_m ? "text-teal-400" : "text-amber-500"}`}>
                {compStrength.real.toFixed(1)} MPa
              </span>
            </div>

            <div className="flex justify-between items-center p-2 border border-zinc-800 bg-zinc-950/60 rounded-md" id="prop-result-density">
              <span className="text-[11px] text-zinc-400 font-sans">{"Densidade resultante ($\\rho_{comp}$):"}</span>
              <span className="text-xs font-bold font-mono text-zinc-300">{compDensity.toFixed(3)} g/cm³</span>
            </div>

            {/* Performance Indicators */}
            <div className="p-3 bg-zinc-950 border border-zinc-805 rounded-md space-y-1.5 text-[10.5px] font-sans" id="perf-metrics-bullets">
              <div className="flex justify-between items-center">
                <span className="text-zinc-500">Aumento de Peso Relativo:</span>
                <span className="font-mono text-red-400 font-medium font-semibold">+{densityChange.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500">Melhoria na Rigidez Específica:</span>
                <span className="font-mono text-teal-450 font-bold text-teal-400">+{specificRigidityImprovement.toFixed(0)}%</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: Chart Plotter & AI Consultant Chat Interface */}
      <div className="xl:col-span-7 flex flex-col gap-5" id="simulation-graphics-and-chat">
        
        {/* UPPER: Web Interactive SVG Chart */}
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-lg shadow-md flex flex-col" id="chart-panel">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4" id="chart-header">
            <div className="flex items-center gap-1.5">
              <BarChart2 size={15} className="text-indigo-400" />
              <h3 className="text-xs font-bold text-zinc-350 uppercase tracking-widest font-mono">
                Análise Física Microestrutural (Lei das Misturas)
              </h3>
            </div>
            
            {/* Metric Switcher buttons */}
            <div className="flex bg-zinc-950 p-1 rounded border border-zinc-800 text-[9px] font-mono select-none" id="chart-metric-selector">
              <button
                onClick={() => setActiveMetric("modulus")}
                className={`px-3 py-1 font-bold rounded transition-all cursor-pointer ${
                  activeMetric === "modulus"
                    ? "bg-indigo-950 text-indigo-405 border border-indigo-900/40"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
                id="select-modulus-plot"
              >
                Módulo Elástico (GPa)
              </button>
              <button
                onClick={() => setActiveMetric("strength")}
                className={`px-3 py-1 font-bold rounded transition-all cursor-pointer ${
                  activeMetric === "strength"
                    ? "bg-indigo-950 text-indigo-405 border border-indigo-900/40"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
                id="select-strength-plot"
              >
                Tensão Elástica (MPa)
              </button>
            </div>
          </div>

          {/* Render Vector Graph */}
          <div className="relative flex-1 bg-zinc-950 border border-zinc-850 rounded p-2" id="svg-stage">
            
            {/* Legend indicators */}
            <div className="absolute top-2.5 left-3.5 flex flex-wrap gap-x-4 gap-y-1 text-[9px] font-mono text-zinc-500 select-none pointer-events-none" id="chart-labels-legend">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-0.5 bg-indigo-500 border-t border-dashed border-indigo-500/50" />
                <span>Limite Superior Voigt</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-0.5 bg-red-400 border-t border-dashed border-red-500/50" />
                <span>Limite Inferior Reuss</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-0.5 bg-teal-400" />
                <span className="text-zinc-350">Previsão Compósito (Halpin-Tsai)</span>
              </div>
            </div>

            {/* Coordinate SVG */}
            <svg viewBox="0 0 500 250" className="w-full h-auto overflow-visible select-none" id="svg-graph">
              {/* Vertical grids */}
              {Array.from({ length: 6 }).map((_, i) => {
                const xVal = 55 + (i / 5) * 415;
                const percentLabel = (i * 10).toString() + "%";
                return (
                  <g key={`grid-v-${i}`}>
                    <line x1={xVal} y1={25} x2={xVal} y2={205} stroke="#1e1e24" strokeWidth="0.5" strokeDasharray="3,3" />
                    <text x={xVal} y={220} fill="#52525b" fontSize="8.5" textAnchor="middle" fontFamily="monospace">
                      {percentLabel}
                    </text>
                  </g>
                );
              })}

              {/* Horizontal grids */}
              {Array.from({ length: 5 }).map((_, i) => {
                const yVal = 205 - (i / 4) * 175;
                const tickValue = (i / 4) * maxMetric;
                return (
                  <g key={`grid-h-${i}`}>
                    <line x1={55} y1={yVal} x2={470} y2={yVal} stroke="#1e1e24" strokeWidth="0.5" strokeDasharray="3,3" />
                    <text x={48} y={yVal + 3} fill="#52525b" fontSize="8.5" textAnchor="end" fontFamily="monospace">
                      {tickValue.toFixed(0)}
                    </text>
                  </g>
                );
              })}

              {/* Axis bars */}
              <line x1={55} y1={205} x2={470} y2={205} stroke="#27272a" strokeWidth="1" />
              <line x1={55} y1={25} x2={55} y2={205} stroke="#27272a" strokeWidth="1" />

              {/* Labels */}
              <text x={262} y={235} fill="#71717a" fontSize="9" textAnchor="middle" fontWeight="bold">
                Frações de Reforço Volumétrico ($V_r$)
              </text>
              <text x={18} y={115} fill="#71717a" fontSize="9" transform="rotate(-90 18 115)" textAnchor="middle" fontWeight="bold">
                {activeMetric === "modulus" ? "Módulo Elástico Longitudinal - E (GPa)" : "Resistência Máxima à Tração (MPa)"}
              </text>

              {/* Curves */}
              <path d={voigtPath} fill="none" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="4,4" className="opacity-50" />
              <path d={reussPath} fill="none" stroke="#f87171" strokeWidth="1.5" strokeDasharray="4,4" className="opacity-50" />
              <path d={realPath} fill="none" stroke="#14b8a6" strokeWidth="2" />

              {/* Selected point highlight */}
              {volumeFraction >= 0 && (
                <g id="intersection-indicator">
                  <line 
                    x1={mapX(volumeFraction)} 
                    y1={25} 
                    x2={mapX(volumeFraction)} 
                    y2={205} 
                    stroke="#4338ca" 
                    strokeWidth="1.2" 
                    strokeDasharray="2,2" 
                    className="opacity-50 animate-pulse" 
                  />
                  {/* Point circle */}
                  <circle 
                    cx={mapX(volumeFraction)} 
                    cy={mapY(activeMetric === "modulus" ? compModulus : compStrength.real)} 
                    r="5" 
                    fill="#14b8a6" 
                    stroke="#ffffff" 
                    strokeWidth="1.5" 
                  />
                  <rect
                    x={mapX(volumeFraction) > 340 ? mapX(volumeFraction) - 100 : mapX(volumeFraction) + 10}
                    y={mapY(activeMetric === "modulus" ? compModulus : compStrength.real) - 12}
                    width="90"
                    height="24"
                    rx="3"
                    fill="#09090b"
                    stroke="#27272a"
                    strokeWidth="1"
                    className="opacity-90"
                  />
                  <text
                    x={mapX(volumeFraction) > 340 ? mapX(volumeFraction) - 55 : mapX(volumeFraction) + 55}
                    y={mapY(activeMetric === "modulus" ? compModulus : compStrength.real) + 3}
                    fill="#2dd4bf"
                    fontSize="8.5"
                    fontWeight="bold"
                    fontFamily="monospace"
                    textAnchor="middle"
                  >
                    {volumeFraction * 100}%: {activeMetric === "modulus" ? compModulus.toFixed(2) + " GPa" : compStrength.real.toFixed(0) + " MPa"}
                  </text>
                </g>
              )}
            </svg>
          </div>
          
          <div className="flex gap-2 items-center text-[10px] text-zinc-500 mt-2 bg-zinc-950 p-2 border border-zinc-800/60 rounded">
            <Info size={11} className="text-zinc-400 shrink-0" />
            <p className="leading-snug">
              <strong>Micromecânica Preditiva:</strong> O limite superior de Voigt prevê comportamento ideal de isodeformação. O limite de Reuss prevê comportamento crítico sob matriz de isotensão transversal. A curva verde exprime o comportamento micromecânico previsto por Halpin-Tsai com base geométrica.
            </p>
          </div>
        </div>

        {/* LOWER: AI Materials Science Specialist Consultant */}
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-lg shadow-md flex flex-col flex-1" id="chat-consultant-panel">
          
          {/* Header */}
          <div className="flex items-center gap-2 border-b border-zinc-800/80 pb-3 mb-4 select-none" id="consultant-header">
            <MessageSquare size={15} className="text-teal-400" />
            <div className="flex-1">
              <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-widest font-mono">
                Consultor de Engenharia de Materiais
              </h3>
              <p className="text-[10px] text-zinc-500">Módulo Científico integrado às rotinas clássicas (Gemini 3.5 Active)</p>
            </div>
            
            <button
              onClick={() => {
                setMessages([{
                  role: "assistant",
                  content: "Olá! Nova sessão de consultoria mecânica de compósitos iniciada. No que posso ajudar em sua pesquisa de ABS e reforços metálicos hoje?"
                }]);
              }}
              className="text-xs p-1 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-950 rounded cursor-pointer transition-colors"
              title="Reiniciar chat"
            >
              <RefreshCw size={12} />
            </button>
          </div>

          {/* Quick presets queries */}
          <div className="flex flex-wrap gap-1.5 pb-2.5 border-b border-zinc-805/30 mb-3" id="quick-preset-questions">
            {[
              "Qual a principal diferença entre aço 1020 e inox 316 no reforço?",
              "Por que Voigt superestima o módulo elástico de esferas?",
              "Como melhorar a adesão interfacial do ABS com o metal?"
            ].map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(undefined, preset)}
                className="px-2.5 py-1 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 rounded text-[9.5px] text-left transition-all cursor-pointer flex items-center gap-1 shrink-0"
              >
                <ArrowUpRight size={10} className="text-zinc-650 shrink-0" />
                {preset}
              </button>
            ))}
          </div>

          {/* Chat scrolling list */}
          <div className="space-y-3.5 overflow-y-auto max-h-[160px] min-h-[110px] flex-1 pr-1 bg-zinc-950/25 p-2 border border-zinc-800/60 rounded mb-3.5" id="scrolling-chat-box">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex gap-2 max-w-[92%] text-xs rounded-lg p-3 leading-relaxed border ${
                  msg.role === "user"
                    ? "ml-auto bg-indigo-950/15 text-zinc-200 border-indigo-900/30"
                    : "bg-zinc-950 text-zinc-300 border-zinc-850/60"
                }`}
                id={`chat-msg-${idx}`}
              >
                <div>
                  <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider font-mono mb-1 text-zinc-500 select-none">
                    {msg.role === "user" ? "Pesquisador" : "Professor Catedrático"}
                  </div>
                  <div className="markdown-body prose prose-invert prose-xs text-xs text-zinc-300">
                    <Markdown>{msg.content}</Markdown>
                  </div>
                </div>
              </div>
            ))}
            {isSending && (
              <div className="flex items-center gap-2 p-2.5 bg-zinc-950 border border-zinc-800 rounded max-w-[80%] text-[11px]" id="chat-loading-bubble">
                <Loader2 size={11} className="text-teal-400 animate-spin" />
                <span className="text-zinc-500 font-mono italic">Processando constante interfacial...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Form */}
          <form onSubmit={(e) => handleSendMessage(e)} className="flex gap-2" id="chat-message-form">
            <input 
              type="text"
              placeholder="Pergunte sobre fatores micromecânicos, Halpin-Tsai ou limites elásticos..."
              className="flex-1 p-2 bg-zinc-950 border border-zinc-800 focus:border-teal-500 text-zinc-300 placeholder-zinc-650 rounded-lg text-xs focus:outline-none transition-colors"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              disabled={isSending}
              id="chat-user-input"
            />
            <button
              type="submit"
              disabled={isSending || !userInput.trim()}
              className={`p-2 rounded-lg text-white font-semibold flex items-center justify-center transition-all cursor-pointer ${
                isSending || !userInput.trim()
                  ? "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                  : "bg-teal-600 hover:bg-teal-700 active:scale-95"
              }`}
              id="send-chat-btn"
            >
              <Send size={13} />
            </button>
          </form>

        </div>

      </div>

    </div>
  );
}
