import React, { useState, useEffect } from "react";
import { MaterialProps } from "../types";
import { MATRIX_ABS, REINFORCEMENTS } from "../data/materials";
import { 
  FileText, Plus, Database, Upload, ArrowRight, Trash2, Cpu, TestTube, Thermometer,
  Wrench, Layers, AlertCircle, RefreshCw, Eye, Sparkles, Scale, CheckCircle2, ChevronDown
} from "lucide-react";
import Markdown from "react-markdown";

// Default rich datasheets database combining polymers (matrices) and metal alloys (reinforcements)
const DEFAULT_DATASHEETS: MaterialProps[] = [
  // Matrices
  {
    ...MATRIX_ABS,
    type: "matrix",
    glassTransition: "105°C",
    printNozzleTemp: "230°C - 250°C",
    printBedTemp: "90°C - 110°C",
    disadvantages: ["Alta taxa de empenamento (warping)", "Emite vapores de estireno no processo de fusão"]
  },
  {
    name: "PLA (Poliácido Lático)",
    key: "pla_pure",
    type: "matrix",
    elasticModulus: 3.50,
    tensileStrength: 60.0,
    density: 1.24,
    poissonRatio: 0.36,
    description: "Polímero biodegradável de fonte renovável (amido de milho). É o material mais popular na impressão 3D FDM devido à facilidade de impressão, baixíssima contração e alta rigidez estrutural, mas com baixa resistência a impactos.",
    advantages: ["Facílima adesão à mesa sem empenamentos", "Alta rigidez física elástica", "Excelente fidelidade dimensional de detalhes"],
    disadvantages: ["Frágil a impactos mecânicos repentinos", "Baixa estabilidade térmica (amolece a partir de 55°C)"],
    glassTransition: "58°C",
    printNozzleTemp: "195°C - 215°C",
    printBedTemp: "50°C - 60°C"
  },
  {
    name: "PETG (Polietileno Tereftalato)",
    key: "petg_pure",
    type: "matrix",
    elasticModulus: 2.10,
    tensileStrength: 50.0,
    density: 1.27,
    poissonRatio: 0.37,
    description: "Copolímero termoplástico que une a facilidade de processamento do PLA com as ótimas propriedades de tenacidade química e mecânica do ABS. Quase não empena e tem espetacular adesão entre camadas.",
    advantages: ["Elevada tenacidade e resistência ao impacto", "Resistência a compostos químicos e ácidos", "Baixa suscetibilidade a warping"],
    disadvantages: ["Gera muitos fios finos (stringing) de extrusão", "Adesão excessiva na mesa (risco de quebrar vidros)"],
    glassTransition: "80°C",
    printNozzleTemp: "235°C - 250°C",
    printBedTemp: "75°C - 85°C"
  },
  {
    name: "PA12 (Nylon 12)",
    key: "nylon_12",
    type: "matrix",
    elasticModulus: 1.50,
    tensileStrength: 45.0,
    density: 1.01,
    poissonRatio: 0.40,
    description: "Poliamida linear semicristalina sintética. Oferece flexibilidade elástica aliada a uma fadiga mecânica incrível, resistência abrasiva absurda e baixíssimo coeficiente de atrito. Muito sensível à umidade do ar.",
    advantages: ["Excelente resistência mecânica à fratura por fadiga", "Baixíssimo desgaste por atrito (engrenagens)", "Excelente tenacidade elástica contínua"],
    disadvantages: ["Altamente higroscópico (requer secagem antes do print)", "Incompatível com extrusão em mesas muito frias"],
    glassTransition: "42°C",
    printNozzleTemp: "250°C - 270°C",
    printBedTemp: "90°C - 100°C"
  },
  // Reinforcements
  {
    ...REINFORCEMENTS[0],
    type: "reinforcement",
    glassTransition: "N/A",
    printNozzleTemp: "N/A",
    printBedTemp: "N/A",
    disadvantages: ["Grande aumento na densidade bruta", "Suscetível a oxidação se exposto diretamente sem resina"]
  },
  {
    ...REINFORCEMENTS[1],
    type: "reinforcement",
    glassTransition: "N/A",
    printNozzleTemp: "N/A",
    printBedTemp: "N/A",
    disadvantages: ["Excelente dureza dificulta cisalhamento de filamentos", "Exige bico reforçado de carbeto de tungstênio"]
  },
  {
    ...REINFORCEMENTS[2],
    type: "reinforcement",
    glassTransition: "N/A",
    printNozzleTemp: "N/A",
    printBedTemp: "N/A",
    disadvantages: ["Baixa adesão física superficial em interfaces poliméricas", "Menor tenacidade ao escoamento em relação aos aços"]
  },
  {
    ...REINFORCEMENTS[3],
    type: "reinforcement",
    glassTransition: "N/A",
    printNozzleTemp: "N/A",
    printBedTemp: "N/A",
    disadvantages: ["Densidade extrema (8.00 g/cm³)", "Custo de aquisição elevado de ligas atomizadas"]
  },
  {
    name: "Fibra de Carbono (Curta/Picada)",
    key: "carbon_fiber_chopped",
    type: "reinforcement",
    elasticModulus: 230.0,
    tensileStrength: 3500.0,
    density: 1.76,
    poissonRatio: 0.20,
    description: "Fios curtos de carbono atomizado com espessura microestrutural. Permite um ganho de rigidez extraordinário (módulo extremamente alto) com adição muito leve de massa ao compósito.",
    advantages: ["Rigidez mecânica astronômica e tenacidade ao warping", "Extremamente leve em massa específica", "Reduz o coeficiente de expansão térmica do polímero"],
    disadvantages: ["Muito frágil a cisalhamentos transversais agudos", "Extremamente abrasivo (destrói bico de latão sob poucos prints)"],
    glassTransition: "N/A",
    printNozzleTemp: "N/A",
    printBedTemp: "N/A"
  },
  {
    name: "Pó Atomizado de Bronze",
    key: "bronze_atomized_powder",
    type: "reinforcement",
    elasticModulus: 115.0,
    tensileStrength: 220.0,
    density: 8.80,
    poissonRatio: 0.34,
    description: "Liga cúbica metálica de cobre e estanho em partículas microesféricas de altíssima finura. Usada na fabricação de filamentos metálicos para posterior sinterização (debind & sinter) ou polimento metálico estético pesado.",
    advantages: ["Excelente condutividade térmica", "Visual metálico espetacular após lixamento/polimento", "Baixo coeficiente de atrito de contato"],
    disadvantages: ["Massa volumétrica elevadíssima (causa empuxo de queda do filamento)", "Baixo módulo real obtível se sem acoplador silano"],
    glassTransition: "N/A",
    printNozzleTemp: "N/A",
    printBedTemp: "N/A"
  }
];

export default function MaterialDatasheets() {
  const [materials, setMaterials] = useState<MaterialProps[]>(DEFAULT_DATASHEETS);
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialProps>(DEFAULT_DATASHEETS[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "matrix" | "reinforcement">("all");
  
  // Dynamic creation state
  const [isAdding, setIsAdding] = useState(false);
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [aiInputText, setAiInputText] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);

  // Manual Form States
  const [formData, setFormData] = useState<Partial<MaterialProps>>({
    name: "",
    key: "",
    type: "matrix",
    elasticModulus: 2.50,
    tensileStrength: 45.0,
    density: 1.10,
    poissonRatio: 0.35,
    glassTransition: "",
    printNozzleTemp: "",
    printBedTemp: "",
    description: "",
    advantages: ["", "", ""],
    disadvantages: ["", ""]
  });

  // Load merged list of materials
  useEffect(() => {
    const saved = localStorage.getItem("athenaeum_custom_materials");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as MaterialProps[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge defaults and stored materials, keeping stored updates
          const merged = [...DEFAULT_DATASHEETS];
          parsed.forEach(custom => {
            const index = merged.findIndex(o => o.key === custom.key);
            if (index !== -1) {
              merged[index] = custom; // Replace default with customized
            } else {
              merged.push(custom); // Add new custom material
            }
          });
          setMaterials(merged);
          setSelectedMaterial(merged[0]);
        }
      } catch (err) {
        console.error("Erro ao reconstruir base de materiais:", err);
      }
    } else {
      // Inicia o localStorage com os valores padrão para sincronizar
      localStorage.setItem("athenaeum_custom_materials", JSON.stringify([]));
    }
  }, []);

  const saveMaterialsList = (updated: MaterialProps[]) => {
    setMaterials(updated);
    // Filtramos apenas materiais que diferem ou foram criados pelo usuário
    // Mas para facilitar, salvamos a lista customizada contendo tudo que é novo ou editado
    const defaultKeys = DEFAULT_DATASHEETS.map(d => d.key);
    const customOnly = updated.filter(u => !defaultKeys.includes(u.key) || JSON.stringify(u) !== JSON.stringify(DEFAULT_DATASHEETS.find(d => d.key === u.key)));
    localStorage.setItem("athenaeum_custom_materials", JSON.stringify(customOnly));
  };

  const notify = (type: "success" | "error" | "info", text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 5000);
  };

  // Handle preset dynamic changes
  const handleInputChange = (field: keyof MaterialProps, val: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: val
    }));
  };

  const handleArrayChange = (field: "advantages" | "disadvantages", idx: number, val: string) => {
    const arr = [...(formData[field] || [])];
    arr[idx] = val;
    setFormData(prev => ({ ...prev, [field]: arr }));
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.key) {
      notify("error", "Preencha o nome do material e um identificador para salvar.");
      return;
    }

    const newMaterial: MaterialProps = {
      name: formData.name,
      key: formData.key.toLowerCase().replace(/\s+/g, "_"),
      type: formData.type || "matrix",
      elasticModulus: Number(formData.elasticModulus) || 2.0,
      tensileStrength: Number(formData.tensileStrength) || 40.0,
      density: Number(formData.density) || 1.10,
      poissonRatio: Number(formData.poissonRatio) || 0.35,
      description: formData.description || "Sem descrição informada.",
      advantages: (formData.advantages || []).filter(a => a.trim() !== ""),
      disadvantages: (formData.disadvantages || []).filter(d => d.trim() !== ""),
      glassTransition: formData.glassTransition || "N/A",
      printNozzleTemp: formData.printNozzleTemp || "N/A",
      printBedTemp: formData.printBedTemp || "N/A"
    };

    const updatedList = [...materials];
    const existingIndex = updatedList.findIndex(m => m.key === newMaterial.key);

    if (existingIndex !== -1) {
      updatedList[existingIndex] = newMaterial;
      notify("success", `Material '${newMaterial.name}' atualizado com sucesso!`);
    } else {
      updatedList.push(newMaterial);
      notify("success", `Novo material '${newMaterial.name}' injetado no repositório!`);
    }

    saveMaterialsList(updatedList);
    setSelectedMaterial(newMaterial);
    setIsAdding(false);
    
    // Reset Form
    setFormData({
      name: "",
      key: "",
      type: "matrix",
      elasticModulus: 2.50,
      tensileStrength: 45.0,
      density: 1.10,
      poissonRatio: 0.35,
      glassTransition: "",
      printNozzleTemp: "",
      printBedTemp: "",
      description: "",
      advantages: ["", "", ""],
      disadvantages: ["", ""]
    });
  };

  // AI Automatic Extraction via Gemini endpoint
  const handleAiExtract = async () => {
    if (!aiInputText.trim()) {
      notify("error", "Copie e cole o texto do datasheet primeiro para extrair.");
      return;
    }

    setIsAiProcessing(true);
    notify("info", "Iniciando inteligência de extração. Analisando as curvas térmicas e mecânicas...");

    try {
      const response = await fetch("/api/parse-datasheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: aiInputText })
      });

      if (!response.ok) {
        throw new Error("Erro na solicitação ao servidor.");
      }

      const data = await response.json();
      
      // Populate manual form with AI findings
      setFormData({
        name: data.name || "",
        key: data.key || "",
        type: data.type || "matrix",
        elasticModulus: data.elasticModulus || 2.0,
        tensileStrength: data.tensileStrength || 40.0,
        density: data.density || 1.1,
        poissonRatio: data.poissonRatio || 0.35,
        glassTransition: data.glassTransition || "N/A",
        printNozzleTemp: data.printNozzleTemp || "N/A",
        printBedTemp: data.printBedTemp || "N/A",
        description: data.description || "",
        advantages: data.advantages || ["", "", ""],
        disadvantages: data.disadvantages || ["", ""]
      });

      notify("success", "O Gemini realizou a extração micromecânica com sucesso! Verifique e clique em Salvar.");
      // Auto-switch to manual review state inside UI
      setAiInputText("");
    } catch (err: any) {
      console.error(err);
      notify("error", "Falha de processamento por IA. Verifique as credenciais da API ou tente inserir manualmente.");
    } finally {
      setIsAiProcessing(false);
    }
  };

  // Drag and drop handler
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFileAnalysis(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileAnalysis(e.target.files[0]);
    }
  };

  const handleFileAnalysis = (file: File) => {
    notify("info", `Lendo arquivo '${file.name}' de ${file.size} bytes...`);
    
    // Simple text readers or prompt mock
    const reader = new FileReader();
    reader.onload = async (event) => {
      const fileText = event.target?.result as string;
      if (fileText) {
        setAiInputText(prev => prev + `\n\n[DADOS LIDOS DO ARQUIVO ${file.name}]:\n` + fileText.substring(0, 10000));
        notify("success", `Arquivo '${file.name}' carregado no buffer de análise. Agora clique em "Processar com IA"!`);
      }
    };
    reader.readAsText(file);
  };

  const deleteCustomMaterial = (key: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Verifica se é um padrão do sistema
    const isDefault = DEFAULT_DATASHEETS.some(d => d.key === key);
    if (isDefault) {
      notify("error", "Não é permitido excluir materiais padrões de fábrica.");
      return;
    }

    const confirm = window.confirm(`Deseja realmente excluir este datasheet customizado da sua biblioteca Athenaeum?`);
    if (confirm) {
      const filtered = materials.filter(m => m.key !== key);
      saveMaterialsList(filtered);
      notify("success", "Datasheet removido com sucesso.");
      if (selectedMaterial.key === key) {
        setSelectedMaterial(filtered[0] || DEFAULT_DATASHEETS[0]);
      }
    }
  };

  const resetToDefault = () => {
    const confirm = window.confirm("Isso excluirá todos os seus materiais criados ou editados e reiniciará a biblioteca técnica. Deseja continuar?");
    if (confirm) {
      localStorage.setItem("athenaeum_custom_materials", JSON.stringify([]));
      setMaterials(DEFAULT_DATASHEETS);
      setSelectedMaterial(DEFAULT_DATASHEETS[0]);
      notify("success", "Biblioteca redefinida para os padrões de fábrica.");
    }
  };

  // Filtration logic
  const filteredMaterials = materials.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          m.key.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          m.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === "all") return matchesSearch;
    return matchesSearch && m.type === activeFilter;
  });

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 h-full font-sans" id="materials-datasheet-root">
      
      {/* STATUS AND CONTEXT HIGHLIGHT TOAST */}
      {statusMessage && (
        <div className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 p-4 rounded-lg border shadow-xl transition-all duration-300 transform translate-y-0 ${
          statusMessage.type === "success" 
            ? "bg-teal-950/90 border-teal-500/50 text-teal-200"
            : statusMessage.type === "error"
            ? "bg-red-950/90 border-red-500/50 text-red-200"
            : "bg-zinc-900/95 border-indigo-500/50 text-zinc-100"
        }`} id="datasheet-toast-notification">
          <AlertCircle size={18} className={statusMessage.type === "success" ? "text-teal-400" : statusMessage.type === "error" ? "text-red-400" : "text-indigo-400"} />
          <p className="text-xs font-semibold leading-relaxed max-w-sm">{statusMessage.text}</p>
        </div>
      )}

      {/* LEFT COLUMN: LIBRARY SHELF (FILTERING AND LIST) */}
      <div className="xl:col-span-5 flex flex-col gap-4" id="datasheet-shelf-section">
        
        {/* Search & Meta Control Board */}
        <div className="bg-zinc-900 border border-zinc-800 p-4.5 rounded-lg shadow-md flex flex-col gap-3" id="filters-board">
          <div className="flex items-center justify-between border-b border-zinc-850 pb-2">
            <div className="flex items-center gap-1.5">
              <Database size={15} className="text-indigo-400" />
              <h3 className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-widest">
                Biblioteca de Materiais (Athenaeum)
              </h3>
            </div>
            
            <button 
              onClick={resetToDefault}
              className="text-[9.5px] text-zinc-500 hover:text-zinc-350 flex items-center gap-1 transition-colors cursor-pointer border border-zinc-800 rounded px-1.5 py-0.5 bg-zinc-950"
              title="Restaurar originais de fábrica"
            >
              <RefreshCw size={10} />
              Resetar
            </button>
          </div>

          {/* Search inputs */}
          <input 
            type="text"
            placeholder="Filtrar por nome, descrição, matriz..."
            className="w-full p-2 bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs rounded-lg focus:outline-none focus:border-indigo-550 placeholder-zinc-600 transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Type filters row */}
          <div className="grid grid-cols-3 gap-1 bg-zinc-950/60 p-1 border border-zinc-855 rounded-md text-[9.5px] font-mono font-bold uppercase tracking-wider select-none">
            <button
              onClick={() => setActiveFilter("all")}
              className={`p-1.5 rounded transition-colors cursor-pointer text-center ${
                activeFilter === "all" ? "bg-indigo-950/50 text-indigo-400 border border-indigo-900/30 font-extrabold" : "text-zinc-500 hover:text-zinc-350"
              }`}
            >
              Todos ({materials.length})
            </button>
            <button
              onClick={() => setActiveFilter("matrix")}
              className={`p-1.5 rounded transition-colors cursor-pointer text-center ${
                activeFilter === "matrix" ? "bg-indigo-950/50 text-indigo-400 border border-indigo-900/30 font-extrabold" : "text-zinc-500 hover:text-zinc-350"
              }`}
            >
              Matrizes ({materials.filter(m => m.type === "matrix").length})
            </button>
            <button
              onClick={() => setActiveFilter("reinforcement")}
              className={`p-1.5 rounded transition-colors cursor-pointer text-center ${
                activeFilter === "reinforcement" ? "bg-indigo-950/50 text-indigo-400 border border-indigo-900/30 font-extrabold" : "text-zinc-500 hover:text-zinc-350"
              }`}
            >
              Reforços ({materials.filter(m => m.type === "reinforcement").length})
            </button>
          </div>

          {/* Action to create new */}
          <button
            onClick={() => setIsAdding(prev => !prev)}
            className="w-full flex items-center justify-center gap-2 p-2 bg-indigo-600 hover:bg-indigo-700 font-semibold rounded-lg text-xs tracking-wider uppercase transition-colors text-white cursor-pointer"
          >
            <Plus size={14} />
            {isAdding ? "Cancelar Cadastro de Material" : "Cadastrar Novo Material"}
          </button>
        </div>

        {/* Floating Addition Form Box */}
        {isAdding && (
          <div className="bg-zinc-900 border border-indigo-505/30 p-5 rounded-lg shadow-lg flex flex-col gap-4" id="material-adder-panel">
            <div className="flex items-center gap-1.5 border-b border-zinc-800 pb-2.5">
              <Sparkles size={14} className="text-teal-400 animate-pulse" />
              <h4 className="text-xs font-mono font-bold text-zinc-300">
                Assistente de Entrada & Extração por IA
              </h4>
            </div>

            {/* AI Parsing Container */}
            <div className="flex flex-col gap-2 p-3.5 bg-zinc-950 border border-zinc-805 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono font-bold text-teal-400 uppercase tracking-wide flex items-center gap-1">
                  <Cpu size={12} /> Sugestão: Extração em 3 Segundos
                </span>
                <span className="text-[9px] text-zinc-500 text-right">PDF ou Texto Colado</span>
              </div>
              <p className="text-[10px] text-zinc-400 leading-relaxed leading-snug">
                Copie e cole abaixo as especificações técnicas, dados do fabricante ou datasheet bruto e deixe o Gemini estruturar o material em português.
              </p>

              <textarea
                placeholder="Cole o datasheet bruto aqui (ex: 'ABS Filament, E-Modulus = 2.4 GPa, Tensile Strength = 43 MPa, Extruder 230C-245C...')"
                className="w-full h-20 p-2 border border-zinc-850 bg-black text-zinc-300 text-xs rounded placeholder-zinc-700 focus:outline-none focus:border-teal-500 font-sans mt-1 resize-none"
                value={aiInputText}
                onChange={(e) => setAiInputText(e.target.value)}
              />

              {/* Drag and drop panel for files */}
              <div 
                className={`border-2 border-dashed rounded p-3 text-center transition-colors ${
                  dragActive ? "border-teal-500 bg-teal-950/10 text-teal-200" : "border-zinc-850 bg-black/40 hover:border-zinc-700 text-zinc-500"
                }`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center justify-center gap-1 font-sans text-[10px]">
                  <Upload size={14} className={dragActive ? "text-teal-400" : "text-zinc-600"} />
                  <p>Arraste datasheet PDF/TXT ou clique abaixo para enviar</p>
                  <label className="text-teal-400 hover:text-teal-350 cursor-pointer font-bold block mt-0.5 font-mono">
                    PROCURAR ARQUIVO LOCAL
                    <input 
                      type="file" 
                      accept=".txt,.pdf,.csv" 
                      className="hidden" 
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </div>

              {/* AI action button */}
              <button
                type="button"
                onClick={handleAiExtract}
                disabled={isAiProcessing || !aiInputText.trim()}
                className={`w-full p-2 rounded text-xs tracking-wider font-extrabold uppercase animate-none cursor-pointer flex items-center justify-center gap-1.5 ${
                  isAiProcessing || !aiInputText.trim()
                    ? "bg-zinc-800 text-zinc-650 cursor-not-allowed"
                    : "bg-teal-600 hover:bg-teal-700 text-white"
                }`}
                id="ai-parse-trigger"
              >
                {isAiProcessing ? (
                  <>
                    <RefreshCw size={12} className="animate-spin text-teal-300" />
                    Extraindo Coeficientes Micromecânicos...
                  </>
                ) : (
                  <>
                    <Sparkles size={12} />
                    Processar com IA
                  </>
                )}
              </button>
            </div>

            <div className="w-full border-t border-zinc-850 my-1 self-center" />

            {/* Manual Form Structure */}
            <form onSubmit={handleManualSubmit} className="space-y-3.5 mt-1 text-xs">
              <h5 className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1">
                <Wrench size={12} /> Ajuste Fino Manual dos Atributos
              </h5>

              <div className="flex flex-col gap-1">
                <label className="text-[9.5px] font-mono text-zinc-400 font-bold uppercase">Nome Científico / Comercial</label>
                <input 
                  type="text"
                  placeholder="Ex: ABS Premium Solúvel, Aço Inox 400"
                  className="p-1.5 bg-zinc-950 border border-zinc-850 rounded text-zinc-300 focus:outline-none"
                  value={formData.name || ""}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-[9.5px] font-mono text-zinc-400 font-bold uppercase">Chave (Identificador Único)</label>
                  <input 
                    type="text"
                    placeholder="Ex: abs_soluvel"
                    className="p-1.5 bg-zinc-950 border border-zinc-850 rounded text-zinc-300 focus:outline-none lowercase"
                    value={formData.key || ""}
                    onChange={(e) => handleInputChange("key", e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9.5px] font-mono text-zinc-400 font-bold uppercase">Papel na Mistura</label>
                  <select 
                    className="p-1.5 bg-zinc-950 border border-zinc-850 rounded text-zinc-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
                    value={formData.type || "matrix"}
                    onChange={(e) => handleInputChange("type", e.target.value)}
                  >
                    <option value="matrix">Matriz Termoplástica (Polímero)</option>
                    <option value="reinforcement">Fase Reforço (Metal/Carga)</option>
                  </select>
                </div>
              </div>

              {/* Constants Grid */}
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-[9.5px] font-mono text-zinc-400 font-bold uppercase">Modulo Elástico (E - GPa)</label>
                  <input 
                    type="number"
                    step="0.01"
                    className="p-1.5 bg-zinc-950 border border-zinc-850 rounded text-zinc-300 focus:outline-none"
                    value={formData.elasticModulus || ""}
                    onChange={(e) => handleInputChange("elasticModulus", parseFloat(e.target.value))}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9.5px] font-mono text-zinc-400 font-bold uppercase">Resistência Tração (MPa)</label>
                  <input 
                    type="number"
                    step="0.1"
                    className="p-1.5 bg-zinc-950 border border-zinc-850 rounded text-zinc-300 focus:outline-none"
                    value={formData.tensileStrength || ""}
                    onChange={(e) => handleInputChange("tensileStrength", parseFloat(e.target.value))}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-[9.5px] font-mono text-zinc-400 font-bold uppercase">Densidade ($\rho$ - g/cm³)</label>
                  <input 
                    type="number"
                    step="0.001"
                    className="p-1.5 bg-zinc-950 border border-zinc-850 rounded text-zinc-300 focus:outline-none"
                    value={formData.density || ""}
                    onChange={(e) => handleInputChange("density", parseFloat(e.target.value))}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9.5px] font-mono text-zinc-400 font-bold uppercase">Coef. Poisson ($\nu$)</label>
                  <input 
                    type="number"
                    step="0.01"
                    className="p-1.5 bg-zinc-950 border border-zinc-850 rounded text-zinc-300 focus:outline-none"
                    value={formData.poissonRatio || ""}
                    onChange={(e) => handleInputChange("poissonRatio", parseFloat(e.target.value))}
                    required
                  />
                </div>
              </div>

              {/* Thermal / FDM recommendations */}
              <div className="border border-zinc-850 p-2.5 rounded bg-zinc-950/40 space-y-2">
                <span className="text-[9.5px] font-mono font-bold text-indigo-400 uppercase tracking-wider block">FDM & Configurações da Impressora 3D</span>
                
                <div className="grid grid-cols-3 gap-1.5 text-[9px]">
                  <div className="flex flex-col gap-1">
                    <span className="text-zinc-500 uppercase">Transição Vítrea Tg</span>
                    <input 
                      type="text" 
                      placeholder="105°C ou N/A"
                      className="p-1 bg-zinc-950 border border-zinc-850 rounded text-zinc-300 focus:outline-none text-[10px]"
                      value={formData.glassTransition || ""}
                      onChange={(e) => handleInputChange("glassTransition", e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-zinc-500 uppercase">Bico Extrusor</span>
                    <input 
                      type="text" 
                      placeholder="230°C - 250°C"
                      className="p-1 bg-zinc-950 border border-zinc-850 rounded text-zinc-300 focus:outline-none text-[10px]"
                      value={formData.printNozzleTemp || ""}
                      onChange={(e) => handleInputChange("printNozzleTemp", e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-zinc-500 uppercase">Temp. da Mesa</span>
                    <input 
                      type="text" 
                      placeholder="90°C - 110°C"
                      className="p-1 bg-zinc-950 border border-zinc-850 rounded text-zinc-300 focus:outline-none text-[10px]"
                      value={formData.printBedTemp || ""}
                      onChange={(e) => handleInputChange("printBedTemp", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9.5px] font-mono text-zinc-400 font-bold uppercase">Descrição Curta</label>
                <textarea 
                  placeholder="Escreva as características principais do material..."
                  className="p-1.5 bg-zinc-950 border border-zinc-850 rounded text-zinc-300 h-16 text-xs resize-none focus:outline-none"
                  value={formData.description || ""}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                />
              </div>

              {/* Array advantages and disadvantages */}
              <div className="space-y-2">
                <span className="text-[9.5px] font-mono text-zinc-400 font-bold uppercase tracking-wider block">Vantagens & Limitações</span>
                <div className="space-y-1">
                  <input 
                    type="text" 
                    placeholder="Vantagem 1" 
                    className="w-full p-1 bg-zinc-950 border border-zinc-850 rounded text-xs focus:outline-none" 
                    value={formData.advantages?.[0] || ""} 
                    onChange={(e) => handleArrayChange("advantages", 0, e.target.value)}
                  />
                  <input 
                    type="text" 
                    placeholder="Vantagem 2" 
                    className="w-full p-1 bg-zinc-950 border border-zinc-850 rounded text-xs focus:outline-none" 
                    value={formData.advantages?.[1] || ""} 
                    onChange={(e) => handleArrayChange("advantages", 1, e.target.value)}
                  />
                  <input 
                    type="text" 
                    placeholder="Limitação / Desvantagem 1" 
                    className="w-full p-1 bg-zinc-950 border border-zinc-850 rounded text-xs focus:outline-none text-red-400" 
                    value={formData.disadvantages?.[0] || ""} 
                    onChange={(e) => handleArrayChange("disadvantages", 0, e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full p-2.5 bg-indigo-650 hover:bg-indigo-700 text-white font-extrabold uppercase rounded-lg text-xs cursor-pointer shadow-md tracking-wider transition-colors mt-2"
                id="save-material-btn"
              >
                Salvar Material na Biblioteca
              </button>
            </form>
          </div>
        )}

        {/* Shelf display of actual documents */}
        <div className="flex-1 overflow-y-auto max-h-[480px] space-y-2 bg-zinc-950/20 p-2 border border-zinc-850 rounded-lg shadow-inner" id="shelf-items-scroller">
          {filteredMaterials.length === 0 ? (
            <div className="text-center py-10 font-sans text-xs text-zinc-500">
              Nenhum material encontrado com os filtros atuais.
            </div>
          ) : (
            filteredMaterials.map((mat) => (
              <div
                key={mat.key}
                onClick={() => setSelectedMaterial(mat)}
                className={`p-3.5 rounded-lg border text-left transition-all cursor-pointer relative group flex items-start gap-3 ${
                  selectedMaterial.key === mat.key
                    ? "bg-zinc-900 border-indigo-550 shadow-md"
                    : "bg-zinc-950/50 border-zinc-850 hover:border-zinc-750 hover:bg-zinc-950"
                }`}
                id={`datasheet-item-${mat.key}`}
              >
                {/* Visual Category Badge */}
                <div className={`w-8 h-8 rounded border flex items-center justify-center shrink-0 ${
                  mat.type === "matrix" 
                    ? "bg-indigo-950/30 border-indigo-900 text-indigo-400"
                    : "bg-teal-950/30 border-teal-900 text-teal-400"
                }`}>
                  {mat.type === "matrix" ? <Layers size={14} /> : <Wrench size={13} />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center gap-2">
                    <h4 className="text-[11.5px] font-bold text-zinc-200 truncate pr-4">
                      {mat.name}
                    </h4>
                    
                    {/* Exclude option for custom added materials */}
                    {!DEFAULT_DATASHEETS.some(e => e.key === mat.key) && (
                      <button
                        onClick={(e) => deleteCustomMaterial(mat.key, e)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-zinc-600 hover:text-red-400 rounded cursor-pointer transition-opacity absolute right-2 top-2"
                        title="Deletar da biblioteca"
                      >
                        <Trash2 size={11} />
                      </button>
                    )}
                  </div>

                  <p className="text-[10px] text-zinc-500 font-mono mt-0.5 uppercase tracking-wider flex items-center gap-1">
                    <span>ID: {mat.key}</span>
                    <span>•</span>
                    <span className={mat.type === "matrix" ? "text-indigo-450" : "text-teal-400"}>
                      {mat.type === "matrix" ? "Matriz" : "Metal/Carga"}
                    </span>
                  </p>
                  
                  {/* Micro mechanical metadata */}
                  <div className="grid grid-cols-3 gap-1 mt-2 text-[9px] font-mono text-zinc-400 border-t border-zinc-900/40 pt-1.5 leading-none">
                    <div>E: <strong className="text-zinc-200">{mat.elasticModulus} GPa</strong></div>
                    <div>Strength: <strong className="text-zinc-200">{mat.tensileStrength} MPa</strong></div>
                    <div>Density: <strong className="text-zinc-200">{mat.density.toFixed(2)}</strong></div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>

      {/* RIGHT COLUMN: INTERACTIVE INSPECTOR AND DATASHEET REPORT */}
      <div className="xl:col-span-7 flex flex-col gap-4" id="datasheet-inspector-board">
        
        {/* Dynamic High-End scientific material report card */}
        <div className="bg-zinc-900 border border-zinc-805 rounded-xl p-5 shadow-md flex-1 flex flex-col justify-between" id="datasheet-inspector-card">
          
          <div className="space-y-5 flex-1" id="scrolling-inspector-content">
            
            {/* Header branding of the material */}
            <div className="flex items-start justify-between border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 border rounded-lg flex items-center justify-center shadow-inner ${
                  selectedMaterial.type === "matrix"
                    ? "bg-indigo-950/40 border-indigo-500/30 text-indigo-400"
                    : "bg-teal-950/40 border-teal-500/30 text-teal-400"
                }`}>
                  {selectedMaterial.type === "matrix" ? <Layers size={20} /> : <Wrench size={18} />}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[8.5px] font-mono font-bold tracking-widest px-1.5 py-0.5 rounded border ${
                      selectedMaterial.type === "matrix"
                        ? "bg-indigo-950/40 border-indigo-900 text-indigo-400"
                        : "bg-teal-950/40 border-teal-900 text-teal-400"
                    }`}>
                      {selectedMaterial.type === "matrix" ? "MATRIZ TERMOPLÁSTICA" : "REFORÇO METAL-MECÂNICO"}
                    </span>
                    {!DEFAULT_DATASHEETS.some(e => e.key === selectedMaterial.key) && (
                      <span className="text-[8.5px] bg-teal-950 text-teal-400 border border-teal-900 px-1.5 py-0.5 rounded font-mono font-bold">
                        DADOS USUÁRIO
                      </span>
                    )}
                  </div>

                  <h2 className="text-base font-extrabold text-zinc-100 font-display mt-1">
                    {selectedMaterial.name}
                  </h2>
                  <p className="text-[10px] font-mono text-zinc-500 mt-0.5">
                    Identificador de Injeção: <strong className="text-zinc-350">{selectedMaterial.key}</strong>
                  </p>
                </div>
              </div>

              {/* Status or printability checklist icon */}
              <div className="text-right flex flex-col items-end">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Sincronizado</span>
                <span className="text-[11px] text-teal-400 font-bold flex items-center gap-1 mt-1 font-mono">
                  <CheckCircle2 size={12} /> Apto para Simular
                </span>
              </div>
            </div>

            {/* Scientific Properties Table & Scale comparison */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
                Parâmetros Mecânicos Decisivos (Lei de Misturas)
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                
                <div className="bg-zinc-950 border border-zinc-850 rounded-lg p-3 text-center flex flex-col justify-between" id="inspect-em">
                  <span className="text-[9px] text-zinc-500 uppercase font-bold tracking-wider">Módulo Young ($E$)</span>
                  <p className="text-base font-extrabold text-indigo-400 mt-1.5 font-mono">
                    {selectedMaterial.elasticModulus} <span className="text-[10px] text-zinc-500">GPa</span>
                  </p>
                  <span className="text-[8px] text-zinc-600 font-mono mt-1">Resistência elástica</span>
                </div>

                <div className="bg-zinc-950 border border-zinc-850 rounded-lg p-3 text-center flex flex-col justify-between" id="inspect-[#ts]">
                  <span className="text-[9px] text-zinc-500 uppercase font-bold tracking-wider">Resistência Tração</span>
                  <p className="text-base font-extrabold text-teal-400 mt-1.5 font-mono">
                    {selectedMaterial.tensileStrength} <span className="text-[10px] text-zinc-500">MPa</span>
                  </p>
                  <span className="text-[8px] text-zinc-600 font-mono mt-1">Ponto de ruptura</span>
                </div>

                <div className="bg-zinc-950 border border-zinc-850 rounded-lg p-3 text-center flex flex-col justify-between" id="inspect-[#rho]">
                  <span className="text-[9px] text-zinc-500 uppercase font-bold tracking-wider">Massa Reduzida ($\rho$)</span>
                  <p className="text-base font-extrabold text-amber-500 mt-1.5 font-mono">
                    {selectedMaterial.density.toFixed(2)} <span className="text-[10px] text-zinc-500">g/cm³</span>
                  </p>
                  <span className="text-[8px] text-zinc-600 font-mono mt-1">Valores brutos</span>
                </div>

                <div className="bg-zinc-950 border border-zinc-850 rounded-lg p-3 text-center flex flex-col justify-between" id="inspect-poisson">
                  <span className="text-[9px] text-zinc-500 uppercase font-bold tracking-wider">Coef. Poisson ($\nu$)</span>
                  <p className="text-base font-extrabold text-zinc-200 mt-1.5 font-mono">
                    {selectedMaterial.poissonRatio}
                  </p>
                  <span className="text-[8px] text-zinc-600 font-mono mt-1">Contração transversal</span>
                </div>

              </div>

              {/* Dynamic Property visual comparison gauges */}
              <div className="bg-zinc-950 border border-zinc-850 rounded-lg p-3.5 space-y-3.5">
                <span className="text-[9.5px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">Comparação com Escala de Referência Global</span>
                
                {/* Young Modulus logarithmic view progress bar */}
                <div className="space-y-1 text-[9.5px]">
                  <div className="flex justify-between font-mono text-zinc-500">
                    <span>Rigidez Relativa (Módulo de Elasticidade)</span>
                    <span className="text-zinc-300 font-bold">{selectedMaterial.elasticModulus} GPa</span>
                  </div>
                  <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-indigo-500 h-full rounded-full" 
                      style={{ width: `${Math.min((selectedMaterial.elasticModulus / 230) * 100, 100)}%` }} 
                    />
                  </div>
                  <div className="flex justify-between text-[8px] text-zinc-600 font-mono">
                    <span>Polímeros (2 GPa)</span>
                    <span>Ligas Alumínio (70 GPa)</span>
                    <span>Fibra Carbono/Aços (230 GPa)</span>
                  </div>
                </div>

                {/* Ultimate Tensile Strength progress bar */}
                <div className="space-y-1 text-[9.5px]">
                  <div className="flex justify-between font-mono text-zinc-500">
                    <span>Resistência Mecânica à Ruptura</span>
                    <span className="text-zinc-300 font-bold">{selectedMaterial.tensileStrength} MPa</span>
                  </div>
                  <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-teal-555 bg-teal-500 h-full rounded-full" 
                      style={{ width: `${Math.min((selectedMaterial.tensileStrength / 600) * 100, 100)}%` }} 
                    />
                  </div>
                  <div className="flex justify-between text-[8px] text-zinc-600 font-mono">
                    <span>ABS Frágil (40 MPa)</span>
                    <span>Inox Modulado (500 MPa)</span>
                    <span>Alta Carga (600+ MPa)</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Thermal transition and printer recommendations */}
            <div className="bg-zinc-950 border border-zinc-850 rounded-lg p-4 space-y-3 font-sans">
              <div className="flex items-center gap-1.5 border-b border-zinc-900 pb-2">
                <Thermometer size={14} className="text-red-400" />
                <h4 className="text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-widest">
                  Comportamento Térmico & Parâmetros FDM
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs text-zinc-450 leading-relaxed font-sans mt-1">
                <div className="p-2 border border-zinc-900 bg-zinc-950 rounded">
                  <span className="font-mono text-[9px] text-zinc-500 block uppercase">Transição Vítrea ($T_g$)</span>
                  <p className="font-bold text-zinc-200 mt-0.5">{selectedMaterial.glassTransition || "N/A"}</p>
                </div>
                <div className="p-2 border border-zinc-900 bg-zinc-950 rounded">
                  <span className="font-mono text-[9px] text-zinc-500 block uppercase">Bico Extrusor Extrusão</span>
                  <p className="font-bold text-zinc-200 mt-0.5">{selectedMaterial.printNozzleTemp || "N/A"}</p>
                </div>
                <div className="p-2 border border-zinc-900 bg-zinc-950 rounded">
                  <span className="font-mono text-[9px] text-zinc-500 block uppercase">Temp. Mesa Aquecida</span>
                  <p className="font-bold text-zinc-200 mt-0.5">{selectedMaterial.printBedTemp || "N/A"}</p>
                </div>
              </div>

              {selectedMaterial.type === "matrix" ? (
                <div className="flex gap-2 p-2 bg-indigo-950/10 border border-indigo-900/30 rounded-md text-[10px] text-indigo-200 font-sans leading-normal">
                  <AlertCircle size={13} className="text-indigo-400 shrink-0 mt-0.5" />
                  <p>
                    <strong>Diretiva de Manufatura Additive FDM:</strong> Polímero qualificado para Matriz Principal. As propriedades físicas expressas correspondem ao corpo de prova usinado sem compensação de vazios (void ratio) do infill de impressão.
                  </p>
                </div>
              ) : (
                <div className="flex gap-2 p-2 bg-teal-950/10 border border-teal-900/30 rounded-md text-[10px] text-teal-200 font-sans leading-normal">
                  <AlertCircle size={13} className="text-teal-400 shrink-0 mt-0.5" />
                  <p>
                    <strong>Diretiva Metal-Carga:</strong> Este ingrediente atua exclusivamente como Fase Dispersa de Reforço no simulador de Halpin-Tsai. Não pode ser impresso de forma pura sem uma matriz polimérica base de termoplástico.
                  </p>
                </div>
              )}
            </div>

            {/* Comprehensive text description */}
            <div className="space-y-2">
              <h3 className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
                Análise Física e Micromecânica do Material
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                {selectedMaterial.description}
              </p>
            </div>

            {/* Bullet list of advantages & disadvantages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              {/* Advantages column */}
              <div className="p-4.5 bg-zinc-950 border border-zinc-905 rounded-xl space-y-3">
                <div className="flex items-center gap-1 text-teal-400 font-bold uppercase tracking-wider text-[10px] font-mono">
                  <CheckCircle2 size={13} />
                  <span>Pontos Fortes (Vantagens)</span>
                </div>
                <ul className="space-y-2 text-[10.5px] font-sans text-zinc-350">
                  {selectedMaterial.advantages && selectedMaterial.advantages.length > 0 ? (
                    selectedMaterial.advantages.map((adv, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-teal-500 font-bold leading-none select-none shrink-0 mt-1">•</span>
                        <span>{adv}</span>
                      </li>
                    ))
                  ) : (
                    <span className="text-zinc-650 italic">Nenhuma informada.</span>
                  )}
                </ul>
              </div>

              {/* Limitations column */}
              <div className="p-4.5 bg-zinc-950 border border-zinc-905 rounded-xl space-y-3">
                <div className="flex items-center gap-1 text-red-400 font-bold uppercase tracking-wider text-[10px] font-mono">
                  <AlertCircle size={13} className="shrink-0" />
                  <span>Desafiostécnicos & Limitações</span>
                </div>
                <ul className="space-y-2 text-[10.5px] font-sans text-zinc-350">
                  {selectedMaterial.disadvantages && selectedMaterial.disadvantages.length > 0 ? (
                    selectedMaterial.disadvantages.map((dis, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-red-500 font-bold leading-none select-none shrink-0 mt-1">•</span>
                        <span>{dis}</span>
                      </li>
                    ))
                  ) : (
                    <span className="text-zinc-650 italic">Sem restrições documentadas.</span>
                  )}
                </ul>
              </div>
            </div>

          </div>

          {/* Quick instructions Footer banner linking to Simulator tab */}
          <div className="mt-6 border-t border-zinc-800 pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs bg-zinc-950/20 -mx-5 -mb-5 p-5 rounded-b-xl" id="datasheet-sync-footer">
            <div className="flex items-center gap-2">
              <Database size={13} className="text-indigo-400" />
              <p className="text-zinc-400 text-[10.5px]">
                Este material está sincronizado localmente. Seus parâmetros físicos irão alimentar as leis de misturas na aba do <strong>Simulador Micromecânico</strong>.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
