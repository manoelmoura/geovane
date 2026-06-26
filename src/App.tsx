import { useState } from "react";
import ArticleRepository from "./components/ArticleRepository";
import CompositeSimulator from "./components/CompositeSimulator";
import MaterialDatasheets from "./components/MaterialDatasheets";
import { 
  BookOpen, Layers, Atom, Sparkles, FileText
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<"repo" | "datasheet" | "sim">("datasheet");

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col font-sans selection:bg-indigo-550/30 selection:text-indigo-200">
      
      {/* High-End Academic/Technical Header */}
      <header className="border-b border-zinc-900 bg-zinc-950/70 backdrop-blur-md sticky top-0 z-40 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo Brand Title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-zinc-904 border border-zinc-800 flex items-center justify-center shadow-lg bg-zinc-900 shadow-zinc-950/20">
              <Atom size={18} className="text-indigo-400 rotate-12 transition-transform duration-500" />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-sm font-extrabold tracking-wider uppercase text-zinc-100 flex items-center gap-1.5 justify-center sm:justify-start font-display">
                Athenaeum Compósitos
                <span className="text-[9px] bg-zinc-850 text-indigo-400 px-1.5 py-0.5 rounded font-mono font-bold border border-zinc-800">C-1.5</span>
              </h1>
              <p className="text-[10px] text-zinc-500 font-sans tracking-wide">
                Repositório Científico Avançado & Simulação Micromecânica Polímero-Metal
              </p>
            </div>
          </div>

          {/* Navigation Tab controllers with refined industrial look */}
          <nav className="flex bg-zinc-900/60 p-1 rounded-lg border border-zinc-800/80 max-w-lg w-full sm:w-auto" id="application-nav">
            <button
              onClick={() => setActiveTab("repo")}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3.5 py-1.5 text-[10.5px] font-bold uppercase tracking-widest rounded transition-all cursor-pointer font-display ${
                activeTab === "repo"
                  ? "bg-zinc-950 text-indigo-400 border border-zinc-800 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-350"
              }`}
              id="nav-tab-repo"
            >
              <BookOpen size={12} />
              Artigos & IA
            </button>
            <button
              onClick={() => setActiveTab("datasheet")}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3.5 py-1.5 text-[10.5px] font-bold uppercase tracking-widest rounded transition-all cursor-pointer font-display ${
                activeTab === "datasheet"
                  ? "bg-zinc-950 text-indigo-400 border border-zinc-800 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-350"
              }`}
              id="nav-tab-datasheet"
            >
              <FileText size={11} />
              Datasheet Materiais
            </button>
            <button
              onClick={() => setActiveTab("sim")}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3.5 py-1.5 text-[10.5px] font-bold uppercase tracking-widest rounded transition-all cursor-pointer font-display ${
                activeTab === "sim"
                  ? "bg-zinc-950 text-indigo-400 border border-zinc-800 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-350"
              }`}
              id="nav-tab-sim"
            >
              <Layers size={11} />
              Simulador Micromecânico
            </button>
          </nav>

        </div>
      </header>

      {/* Main Container Sandbox */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Active router panel */}
        <div className="h-full">
          {activeTab === "repo" ? (
            <ArticleRepository />
          ) : activeTab === "datasheet" ? (
            <MaterialDatasheets />
          ) : (
            <CompositeSimulator />
          )}
        </div>

      </main>

      {/* Structured precise footer */}
      <footer className="border-t border-zinc-900 py-3.5 bg-zinc-950 text-center select-none text-[10px] text-zinc-600 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-2">
          <span className="font-sans">
            Athenaeum Compósitos — Laboratório Virtual & Engenharia Computacional de Materiais
          </span>
          <div className="flex gap-4 items-center mt-1.5 md:mt-0 font-mono">
            <span>Matriz ABS: E ≈ 2.3 GPa | Partículas e Fibras Curtas Metálicas</span>
            <span>•</span>
            <span className="text-indigo-400 flex items-center gap-1 font-semibold">
              <Sparkles size={11} /> Gemini Científico 3.5 Flash
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
