import React, { useState, useEffect } from "react";
import { 
  Search, BookOpen, User, Calendar, Plus, Trash2, Tag, 
  UploadCloud, FileText, Sparkles, Loader2, AlertTriangle, 
  CheckCircle2, Info, ChevronRight, HelpCircle, Cpu, X, Play, RefreshCw, AlertCircle, Sparkle,
  Eye, ExternalLink
} from "lucide-react";
import { Article } from "../types";
import Markdown from "react-markdown";

// Default/mock articles for first-time use
const DEFAULT_ARTICLES: Article[] = [
  {
    id: "mock-1",
    title: "Caracterização Mecânica e Térmica de Compósitos de ABS Reforçados com Fibras Curtas de Aço Inox 316",
    authors: "L. M. Silva, J. R. Cardoso, H. F. Santos",
    year: "2024",
    fileName: "caracterizacao_inox316_abs_2024.pdf",
    fileSize: "1.4 MB",
    abstract: "Este trabalho apresenta um estudo experimental detalhado sobre as propriedades de tração e flexão de compósitos polímeros-metal impressos via FDM (Fused Deposition Modeling). Utilizou-se como matriz o polímero ABS e como reforço fibras curtas de aço inoxidável AISI 316 em frações volumétricas variando de 5% a 25%. Os resultados demonstram que as fibras aumentam consideravelmente o limite elástico e o módulo de Young do material compósito final, reduzindo, todavia, a deformação na ruptura devido à restrição de movimento molecular imposta pelas partículas duras na matriz dúctil.",
    methodology: "Amostras de compósitos foram manufaturadas extrudando filamentos poliméricos carregados com partículas de inox 316. Corpos de prova normatizados ASTM D638 foram injetados e impressos em 3D. Os testes mecânicos de tração estática foram realizados em máquina universal EMIC com célula de carga de 50kN. Análises de MEV (Microscopia Eletrônica de Varredura) foram conduzidas nas fraturas dos corpos de prova para analisar o nível de adesão interfacial matriz-fibra.",
    keyFindings: [
      "O módulo de elasticidade longitudinal (E) aumentou em 145% para a fração volumétrica de 25% de Inox 316 em comparação com o ABS puro.",
      "A resistência à tração aumentou moderadamente (de 40 MPa para 49 MPa), limitada pela pequena adesão interfacial entre a fase metálica e o polímero.",
      "A microscopia revelou microvazios ao redor das fibras nas amostras de impressão 3D, indicando que a adesão interfacial é o fator limitante para a resistência máxima."
    ],
    relevanceToComposites: "O trabalho valida cientificamente que o reforço com Inox 316 aumenta consideravelmente a rigidez estrutural, porém o enfraquecimento devido à falta de agentes de acoplamento químico deve ser compensado quando submetido a tensões críticas transpassantes. Mostra que o modelo de Reuss ou Halpin-Tsai com fator de eficácia de orientação de 0.2 é excelente para descrever esse material.",
    suggestedTags: ["ABS", "Inox 316", "Mecanismo de Falha", "Impressão 3D", "Fração de Volume"],
    createdAt: new Date(Date.now() - 3600000 * 24 * 3).toISOString(),
    fullText: `# Caracterização Mecânica e Térmica de Compósitos de ABS Reforçados com Fibras Curtas de Aço Inox 316

**Agradecimentos:** Laboratório de Metalurgia Estrutural e Polímeros  
**Data:** Junho de 2024  

---

## 1. Introdução
A manufatura aditiva por modelagem por fusão e deposição (FDM) revolucionou a fabricação rápida de peças estruturais, permitindo geometrias complexas a baixo custo. No entanto, as propriedades mecânicas de polímeros termoplásticos puros (como o ABS) frequentemente limitam sua utilização em aplicações de engenharia de alta solicitação. Uma alternativa promissora reside no desenvolvimento de compósitos polímeros-metal, nos quais partículas ou fibras metálicas curtas são dispersas na matriz polimérica para aumentar a rigidez térmica e elástica. O objetivo deste trabalho é formular, caracterizar e avaliar o comportamento micromecânico do compósito de matriz ABS dopado com partículas/fibras de aço inoxidável AISI 316.

## 2. Materiais e Métodos Experimentais

### 2.1 Preparação de Materiais
A matriz polimérica utilizada foi o acrilonitrila-butadieno-estireno (ABS), com densidade de $1.05 \\text{ g/cm}^{3}$ e módulo de elasticidade nominal de $2.30 \\text{ GPa}$. O agente de reforço consistiu em fibras curtas de aço inoxidável AISI 316, com diâmetro médio de $15 \\mu\\text{m}$ e comprimento médio de $150 \\mu\\text{m}$ (razão de aspecto $L/D \\approx 10$), apresentando densidade de $8.00 \\text{ g/cm}^{3}$ e módulo de elasticidade de $193.00 \\text{ GPa}$.

Os filamentos carregados foram fabricados através de homogeneização mecânica em extrusora de rosca dupla co-rotacionante, operando sob uma taxa de cisalhamento constante a $230 \\text{ °C}$ nas frações volumétricas ($V_{r}$) de 5%, 10%, 15%, 20% e 25%.

### 2.2 Impressão 3D dos Corpos de Prova
Os corpos de prova foram impressos em impressora Creality Ender 3 S1 Pro adaptada para altas temperaturas, com bico de aço endurecido de $0.6 \\text{ mm}$ para evitar abrasão extrema de carga. Os parâmetros de deposição adotados foram:
* Temperatura do bico: $250 \\text{ °C}$
* Temperatura da mesa (aquecida): $110 \\text{ °C}$
* Altura de camada: $0.2 \\text{ mm}$
* Altura do preenchimento estrutural: $100\\%$ retilíneo
* Orientação de deposição: Direção longitudinal $[0^\\circ]$ (ASTM D638)

---

## 3. Resultados Mecânicos e Térmicos

Os testes mecânicos indicaram uma tendência marcante em relação ao aumento do módulo de elasticidade em detrimento da deforma de ruptura total do compósito polimérico-metal.

| Fração Metálica ($V_{r}$) | Módulo de Young Calculado ($E$) | Resistência à Tração Real ($\\sigma_{t}$) | Densidade Final ($g/cm^3$) |
| :---: | :---: | :---: | :---: |
| 0% (ABS Puro) | $2.30 \\text{ GPa}$ | $40.00 \\text{ MPa}$ | $1.05 \\text{ g/cm}^{3}$ |
| 5% | $3.58 \\text{ GPa}$ | $41.80 \\text{ MPa}$ | $1.40 \\text{ g/cm}^{3}$ |
| 15% | $6.91 \\text{ GPa}$ | $45.10 \\text{ MPa}$ | $2.09 \\text{ g/cm}^{3}$ |
| 25% | $11.83 \\text{ GPa}$ | $49.00 \\text{ MPa}$ | $2.79 \\text{ g/cm}^{3}$ |

### 3.1 Modelagem Micromecânica
A rigidez elástica longitudinal exibe excelente correlação com o modelo semi-empírico de Halpin-Tsai com coeficiente de ajuste $\\eta$:

$$\\eta = \\frac{(E_{r}/E_{m}) - 1}{(E_{r}/E_{m}) + \\zeta}$$

Para o módulo composto longitudinal obtido, o ajuste otimizado de fator de forma geométrico $\\zeta = 2 \\times (L/D) \\cdot \\eta_{dir}$ revelou que o escoamento real é severamente impactado pela falta de acoplamento interfacial. A microscopia eletrônica de varredura (MEV) evidenciou visivelmente a ocorrência de cavidades e descolamento mecânico fibra-matriz (*pull-out*) sob tensões superiores a $35 \\text{ MPa}$.

---

## 4. Discussões e Conclusão
A introdução de fibras de aço inox 316 em matriz de ABS aumenta de modo drástico a rigidez elástica do filamento depositado, tornando os compósitos candidatos excelentes a carcaças eletromagnéticas e aplicações automotivas estruturais sob baixas tensões dinâmicas. Contudo, sem a adição de um compatibilizante químico ativo (como anidrido maleico no ABS), a fragilidade interfacial dita a falha prematura, limitando a resistência prática da liga compósita a no máximo $49 \\text{ MPa}$ mesmo com alta carga metálica. Novos estudos devem avaliar o recobrimento superficial das fibras com organossilanos.`
  },
  {
    id: "mock-2",
    title: "Aplicação da Lei de Misturas e do Modelo de Halpin-Tsai em Termoplásticos Carregados com Partículas Metálicas de Aço 1045",
    authors: "Prof. Dr. Ricardo G. Mendes, Dr. Elaine F. Oliveira",
    year: "2023",
    fileName: "mendes_leidemisturas_aco1045_2023.pdf",
    fileSize: "850 KB",
    abstract: "Fórmulas clássicas de micro-mecânica como os limites superiores de Voigt (isodeformação), limites inferiores de Reuss (isotensão), e as equações semi-empíricas de Halpin-Tsai são confrontadas neste trabalho com dados experimentais de polímeros acrílicos e ABS dopados com finos pós atomizados de aço AISI 1045. O trabalho explora a aplicabilidade das previsões elásticas em matrizes homogêneas versus extrudadas, avaliando o fator de fator de forma (aspect ratio) das partículas metálicas esféricas.",
    methodology: "Simulação computacional baseada em elementos finitos (FEA) acoplada com testes reais de tração em chapas planas. Partículas de aço 1045 de granulometria média de 45µm foram dispersas mecanicamente em solução viscosa de ABS. Os volumes variaram de 0% a 30%. O ajuste matemático foi realizado nas curvas experimentais para calcular o parâmetro empírico 'zeta' de Halpin-Tsai.",
    keyFindings: [
      "Ligas de aço de alta resistência como o 1045 fornecem propriedades idênticas a aços macios em termos de Módulo de Elasticidade em volumes de até 15%, já que o módulo de Young de ambos os aços é praticamente idêntico (205-206 GPa).",
      "O modelo clássico de Voigt superestima grosseiramente as propriedades elásticas de compósitos em partículas, sendo o modelo de Halpin-Tsai com zeta = 2 o que melhor se ajustou à realidade microestrutural.",
      "Compósitos elastômeros com mais de 20% de pó metálico apresentaram alta fragilidade térmica e desprendimento de carga sob fadiga a 50°C."
    ],
    relevanceToComposites: "Relevante diretamente para o desenvolvimento de simulações com Lei de Misturas. O artigo prova que a dureza ou resistência superior do Aço 1045 sobre o 1020 só repercute na resistência máxima à tração do compósito se a interface ABS-Metal estiver protegida quimicamente, do contrário ambos os aços geram o mesmo incremento de módulo sob baixa fração de volume.",
    suggestedTags: ["ABS", "Aço 1045", "Lei de Misturas", "Halpin-Tsai", "Simulação"],
    createdAt: new Date(Date.now() - 3600000 * 24 * 7).toISOString(),
    fullText: `# Aplicação da Lei de Misturas e do Modelo de Halpin-Tsai em Termoplásticos Carregados com Partículas Metálicas de Aço 1045

**Autores:** Prof. Dr. Ricardo G. Mendes, Dr. Elaine F. Oliveira  
**Periódico:** Journal of Computational and Experimental Micro-mechanics  
**Ano:** 2023  

---

## 1. Fundamentos Teóricos da Micromecânica

Ao projetar e calcular componentes impressos baseados em compósitos particulados, engenheiros comumente recorrem às aproximações de limites clássicos.
A **Lei de Misturas Convencional (Modelo de Voigt)** pressupõe que a matriz do polímero e a fase dispersa metálica sustentam exatamente a mesma deformação ($\\epsilon_{comp} = \\epsilon_{m} = \\epsilon_{r}$):

$$E_{Voigt} = E_{m} \\cdot (1 - V_{r}) + E_{r} \\cdot V_{r}$$

Este limite superior funciona excelentemente para compósitos estruturados de fibras contínuas e alinhadas longitudinalmente na direção do esforço trator.
Entretanto, para esferas, partículas granuladas pulverizadas ou fibras curtas distribuídas de forma randômica, o modelo de Voigt falha de modo alarmante por superestimar as propriedades elásticas de modo extravagante.

O **Limite de Reuss (Isotensão)** pressupõe equilíbrio estático idêntico de pressões internas de tensão, sendo o limite elástico inferior absoluto:

$$E_{Reuss} = \\frac{E_{m} \\cdot E_{r}}{E_{m} \\cdot V_{r} + E_{r} \\cdot (1 - V_{r})}$$

Este trabalho foca em demonstrar o comportamento intermediário, capturado com perfeição pelas equações semi-empíricas formuladas por **Halpin e Tsai**, adaptadas por um fator geométrico ajustável $\\zeta$.

---

## 2. Metodologia de Simulação e Ensaios

Pós de aço ferramenta AISI 1045 foram atomizados em gás com granulometria de $45 \\mu \\text{m}$. A fração volumétrica experimental foi estabelecida de forma precisa em incremental de 5%, até o limite superior prático de 25% para manutenção da fluidez em manufatura por extrusão de filamentos termoplásticos.

Os modelos representativos de elementos finitos representavam células Unitárias Periódicas (RVE), onde esferas representativas de aço foram dispersas com posições estatisticamente randômicas em cubos deformáveis com as propriedades constitutivas do ABS.

---

## 3. Resultados Mecânicos e Validação Física

Os corpos de prova ensaiados sob taxa controlada de deformação linear demonstraram o comportamento limítrofe entre os extremos micromecânicos:

* **Para Abs Puro ($V_{r} = 0\\%$):** Módulo de $2.30 \\text{ GPa}$, Resistência à tração de $39.50 \\text{ MPa}$.
* **Para Compósito 10% Aço 1045 ($V_{r} = 10\\%$):** Módulo experimental obteve $3.12 \\text{ GPa}$, comparado a previsões de Voigt ($22.5 \\text{ GPa}$ - superestimação massiva) e Halpin-Tsai com $\\zeta = 2$ ($3.05 \\text{ GPa}$ - concordância quase absoluta).
* **Para Compósito 25% Aço 1045 ($V_{r} = 25\\%$):** Módulo experimental alcançou $6.02 \\text{ GPa}$.

### 3.1 Discussão do Comportamento sob Fadiga Térmica
Um dos pontos de inflexão documentados no estudo foi o descolamento precoce interfacial induzido pela diferença severa entre os coeficientes de expansão térmica (CTE) do ABS ($\\alpha \\approx 90 \\times 10^{-6} /\\text{K}$) e do Aço 1045 ($\\alpha \\approx 11 \\times 10^{-6} /\\text{K}$). Sob solicitações fatigantes em ambientes regulados a $50 \\text{ °C}$, o polímero tendeu a se dilatar consideravelmente mais do que as partículas esféricas de aço inertes, instigando pontos de concentração de microtrincas internas de cisalhamento.

---

## 4. Conclusão e Aplicações em Engenharia

Chega-se à conclusão inequívoca de que o emprego do Aço 1045 na preparação de filamentos extrudados traz um ganho sólido em tenacidade superficial de desgaste e eleva o módulo final do compósito de forma robusta e previsível pelo modelo de Halpin-Tsai. O cálculo de limites de escoamento e de propriedades mecânicas por simples lei linear de Voigt deve ser evitado como critério estrito de design industrial sob risco severo de fratura catastrófica.`
  }
];

// IndexedDB core storage layer for multi-megabyte original PDFs
class PDFStorage {
  private static DB_NAME = "ScientificPDFsDB";
  private static STORE_NAME = "pdf_files";
  private static VERSION = 1;

  private static getDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.DB_NAME, this.VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(this.STORE_NAME)) {
          db.createObjectStore(this.STORE_NAME);
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  public static async savePDF(id: string, file: File | Blob): Promise<void> {
    const db = await this.getDB();
    return new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(this.STORE_NAME, "readwrite");
      const store = transaction.objectStore(this.STORE_NAME);
      const request = store.put(file, id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  public static async getPDF(id: string): Promise<Blob | null> {
    const db = await this.getDB();
    return new Promise<Blob | null>((resolve, reject) => {
      const transaction = db.transaction(this.STORE_NAME, "readonly");
      const store = transaction.objectStore(this.STORE_NAME);
      const request = store.get(id);
      request.onsuccess = () => resolve((request.result as Blob) || null);
      request.onerror = () => reject(request.error);
    });
  }

  public static async deletePDF(id: string): Promise<void> {
    const db = await this.getDB();
    return new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(this.STORE_NAME, "readwrite");
      const store = transaction.objectStore(this.STORE_NAME);
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
}

interface UploadQueueItem {
  id: string;
  file: File;
  status: "pending" | "processing" | "success" | "error";
  progressText: string;
  errorMsg?: string;
}

export default function ArticleRepository() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  // Modal / Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadType, setUploadType] = useState<"pdf" | "text">("pdf");
  const [inputText, setInputText] = useState("");
  
  // Multiple PDF Upload Queue
  const [uploadQueue, setUploadQueue] = useState<UploadQueueItem[]>([]);
  const [isProcessingQueue, setIsProcessingQueue] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const [activeTab, setActiveTab] = useState<"abstract" | "methodology" | "relevance" | "findings" | "fullText" | "pdf">("abstract");
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);

  // States to replace window.confirm (which can be blocked/disabled inside sandbox iframes)
  const [articleIdToDelete, setArticleIdToDelete] = useState<string | null>(null);
  const [pdfToUnlinkArticleId, setPdfToUnlinkArticleId] = useState<string | null>(null);

  useEffect(() => {
    let isSubscribed = true;
    let url: string | null = null;

    const loadPDF = async () => {
      if (!selectedArticle) {
        setPdfBlobUrl(null);
        return;
      }
      try {
        const blob = await PDFStorage.getPDF(selectedArticle.id);
        if (isSubscribed) {
          if (blob) {
            url = URL.createObjectURL(blob);
            setPdfBlobUrl(url);
          } else {
            setPdfBlobUrl(null);
          }
        }
      } catch (err) {
        console.error("Erro ao carregar PDF do IndexedDB:", err);
        if (isSubscribed) {
          setPdfBlobUrl(null);
        }
      }
    };

    loadPDF();

    return () => {
      isSubscribed = false;
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [selectedArticle]);

  // Manual input fields
  const [manualTitle, setManualTitle] = useState("");
  const [manualAuthors, setManualAuthors] = useState("");
  const [manualYear, setManualYear] = useState("");
  const [manualAbstract, setManualAbstract] = useState("");
  const [manualMethodology, setManualMethodology] = useState("");
  const [manualFindings, setManualFindings] = useState<string[]>([""]);
  const [manualRelevance, setManualRelevance] = useState("");
  const [manualTags, setManualTags] = useState("");
  const [manualFullText, setManualFullText] = useState("");

  // Immersive Article Reader Mode
  const [isImmersiveReaderOpen, setIsImmersiveReaderOpen] = useState(false);
  const [readerFontSize, setReaderFontSize] = useState<"sm" | "base" | "lg" | "xl">("base");
  const [readerFontFamily, setReaderFontFamily] = useState<"serif" | "sans" | "mono">("serif");
  const [readerTheme, setReaderTheme] = useState<"light" | "sepia" | "dark" | "charcoal">("charcoal");

  // Load articles from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("scientific_articles");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setArticles(parsed);
        if (parsed.length > 0) {
          setSelectedArticle(parsed[0]);
        }
      } catch (e) {
        setArticles(DEFAULT_ARTICLES);
        setSelectedArticle(DEFAULT_ARTICLES[0]);
      }
    } else {
      setArticles(DEFAULT_ARTICLES);
      setSelectedArticle(DEFAULT_ARTICLES[0]);
      localStorage.setItem("scientific_articles", JSON.stringify(DEFAULT_ARTICLES));
    }
  }, []);

  const saveArticles = (newArticles: Article[]) => {
    setArticles(newArticles);
    localStorage.setItem("scientific_articles", JSON.stringify(newArticles));
  };

  const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = (reader.result as string).split(",")[1];
        resolve(base64String);
      };
      reader.onerror = error => reject(error);
    });
  };

  // Drag & drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFilesToQueue(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addFilesToQueue(e.target.files);
    }
  };

  const addFilesToQueue = (fileList: FileList) => {
    const newItems: UploadQueueItem[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (file.type !== "application/pdf") {
        alert(`O arquivo "${file.name}" não é um PDF válido e foi ignorado.`);
        continue;
      }
      newItems.push({
        id: "q-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7),
        file: file,
        status: "pending",
        progressText: "Pendente na fila"
      });
    }

    if (newItems.length > 0) {
      setUploadQueue(prev => [...prev, ...newItems]);
    }
  };

  const removeFromQueue = (id: string) => {
    if (isProcessingQueue) return;
    setUploadQueue(prev => prev.filter(item => item.id !== id));
  };

  const clearQueue = () => {
    if (isProcessingQueue) return;
    setUploadQueue([]);
  };

  // Process the queue with Gemini AI (sequential execution to respect rates & order neatly)
  const handleAnalyzeQueue = async () => {
    if (uploadQueue.length === 0) return;
    
    setIsProcessingQueue(true);
    const updatedQueue = [...uploadQueue];

    // Process all pending or failed items
    for (let i = 0; i < updatedQueue.length; i++) {
      const item = updatedQueue[i];
      if (item.status === "success") continue;

      // Update row status
      setUploadQueue(prev => 
        prev.map(q => q.id === item.id ? { ...q, status: "processing", progressText: "Preparando buffer..." } : q)
      );

      try {
        setUploadQueue(prev => 
          prev.map(q => q.id === item.id ? { ...q, progressText: "Processando Base64..." } : q)
        );
        const base64Pdf = await getBase64(item.file);

        setUploadQueue(prev => 
          prev.map(q => q.id === item.id ? { ...q, progressText: "Analisando com Gemini..." } : q)
        );

        const response = await fetch("/api/summarize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileBase64: base64Pdf,
            mimeType: item.file.type,
            fileName: item.file.name
          })
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error || "Serviço indisponível.");
        }

        const summaryResult = await response.json();

        const newArticle: Article = {
          id: "art-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7),
          title: summaryResult.title || item.file.name.replace(".pdf", "") || "Artigo Analisado",
          authors: summaryResult.authors || "Não informado",
          year: summaryResult.year || new Date().getFullYear().toString(),
          fileName: item.file.name,
          fileSize: `${(item.file.size / 1024 / 1024).toFixed(2)} MB`,
          abstract: summaryResult.abstract || "Abstract vazio",
          methodology: summaryResult.methodology || "Metodologia vazia",
          keyFindings: summaryResult.keyFindings || [],
          relevanceToComposites: summaryResult.relevanceToComposites || "Não informado",
          suggestedTags: summaryResult.suggestedTags || ["ABS"],
          createdAt: new Date().toISOString(),
          fullText: summaryResult.fullText || ""
        };

        // Inject in articles at index 0 and save
        setArticles(prev => {
          const updated = [newArticle, ...prev];
          localStorage.setItem("scientific_articles", JSON.stringify(updated));
          return updated;
        });

        // Save original PDF to IndexedDB for interactive reading
        try {
          await PDFStorage.savePDF(newArticle.id, item.file);
        } catch (dbErr) {
          console.error("Falha ao salvar PDF no IndexedDB:", dbErr);
        }

        setSelectedArticle(newArticle);

        // Mark as success
        setUploadQueue(prev => 
          prev.map(q => q.id === item.id ? { ...q, status: "success", progressText: "Resolvido com sucesso!" } : q)
        );

      } catch (error: any) {
        console.error("Erro ao analisar arquivo na fila:", error);
        const msg = error.message || "Falha desconhecida";
        setUploadQueue(prev => 
          prev.map(q => q.id === item.id ? { ...q, status: "error", errorMsg: msg, progressText: `Erro: ${msg}` } : q)
        );
      }
    }

    setIsProcessingQueue(false);
  };

  // Submit manual text with single Gemini analysis
  const handleAnalyzeTextWithGemini = async () => {
    if (!inputText.trim()) {
      alert("Por favor, insira o texto do artigo de compósito para resumir.");
      return;
    }

    setIsProcessingQueue(true);
    
    try {
      // Fake queue item or general status for single text
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Erro de servidor.");
      }

      const summaryResult = await response.json();

      const newArticle: Article = {
        id: "art-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7),
        title: summaryResult.title || "Resumo de Texto Manual",
        authors: summaryResult.authors || "Não informado",
        year: summaryResult.year || new Date().getFullYear().toString(),
        abstract: summaryResult.abstract || "Abstract vazio",
        methodology: summaryResult.methodology || "Metodologia vazia",
        keyFindings: summaryResult.keyFindings || [],
        relevanceToComposites: summaryResult.relevanceToComposites || "Não informado",
        suggestedTags: summaryResult.suggestedTags || ["ABS"],
        createdAt: new Date().toISOString(),
        fullText: summaryResult.fullText || inputText
      };

      setArticles(prev => {
        const updated = [newArticle, ...prev];
        localStorage.setItem("scientific_articles", JSON.stringify(updated));
        return updated;
      });

      setSelectedArticle(newArticle);
      setIsModalOpen(false);
      setInputText("");

    } catch (error: any) {
      alert(`Falha ao resumir texto: ${error.message}`);
    } finally {
      setIsProcessingQueue(false);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualTitle.trim()) {
      alert("O título é obrigatório.");
      return;
    }

    const tagsArray = manualTags
      .split(",")
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const newArticle: Article = {
      id: "art-" + Date.now(),
      title: manualTitle,
      authors: manualAuthors || "Desconhecido",
      year: manualYear || new Date().getFullYear().toString(),
      abstract: manualAbstract || "Nenhum abstract especificado.",
      methodology: manualMethodology || "Metodologia não detalhada.",
      keyFindings: manualFindings.filter(f => f.trim().length > 0),
      relevanceToComposites: manualRelevance || "Não analisada.",
      suggestedTags: tagsArray.length > 0 ? tagsArray : ["Desenvolvimento"],
      createdAt: new Date().toISOString(),
      fullText: manualFullText || `# ${manualTitle}
${manualAbstract}`
    };

    const updatedList = [newArticle, ...articles];
    saveArticles(updatedList);
    setSelectedArticle(newArticle);
    setIsModalOpen(false);
    resetManualFields();
  };

  const resetManualFields = () => {
    setManualTitle("");
    setManualAuthors("");
    setManualYear("");
    setManualAbstract("");
    setManualMethodology("");
    setManualFindings([""]);
    setManualRelevance("");
    setManualTags("");
    setManualFullText("");
  };

  const handleDeleteArticle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setArticleIdToDelete(id);
  };

  const handleConfirmDeleteArticle = () => {
    if (!articleIdToDelete) return;
    const id = articleIdToDelete;
    const updated = articles.filter(a => a.id !== id);
    saveArticles(updated);
    
    // Clean up physical PDF if exists
    PDFStorage.deletePDF(id).catch(err => console.error("Falha ao deletar PDF do IndexedDB:", err));

    if (selectedArticle?.id === id) {
      setSelectedArticle(updated.length > 0 ? updated[0] : null);
    }
    setArticleIdToDelete(null);
  };

  const handleConfirmUnlinkPdf = async () => {
    if (!pdfToUnlinkArticleId) return;
    try {
      await PDFStorage.deletePDF(pdfToUnlinkArticleId);
      if (pdfBlobUrl) {
        URL.revokeObjectURL(pdfBlobUrl);
      }
      setPdfBlobUrl(null);
      
      const updatedArticles = articles.map(art => {
        if (art.id === pdfToUnlinkArticleId) {
          const { fileName, fileSize, ...rest } = art;
          return rest as Article;
        }
        return art;
      });
      setArticles(updatedArticles);
      localStorage.setItem("scientific_articles", JSON.stringify(updatedArticles));
      if (selectedArticle && selectedArticle.id === pdfToUnlinkArticleId) {
        setSelectedArticle(prev => {
          if (!prev) return null;
          const { fileName, fileSize, ...rest } = prev;
          return rest as Article;
        });
      }
    } catch (err) {
      console.error("Erro ao deletar PDF do IndexedDB:", err);
    }
    setPdfToUnlinkArticleId(null);
  };

  const handleAddFindingField = () => {
    setManualFindings([...manualFindings, ""]);
  };

  const handleFindingChange = (index: number, val: string) => {
    const updated = [...manualFindings];
    updated[index] = val;
    setManualFindings(updated);
  };

  // Tags filter list
  const allTags = Array.from(
    new Set(articles.flatMap(art => art.suggestedTags || []))
  );

  const filteredArticles = articles.filter(art => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      art.title.toLowerCase().includes(query) ||
      art.abstract.toLowerCase().includes(query) ||
      art.authors.toLowerCase().includes(query) ||
      art.suggestedTags.some(t => t.toLowerCase().includes(query));

    const matchesTag = !selectedTag || art.suggestedTags.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full" id="article-repository-container">
      {/* LEFT COLUMN: Clean article browser */}
      <div className="lg:col-span-5 flex flex-col gap-4" id="left-sidebar-panel">
        
        {/* Core scientific stats */}
        <div className="grid grid-cols-2 gap-3" id="repo-stats-grid">
          <div className="bg-zinc-900 border border-zinc-800/80 p-3.5 rounded-lg flex items-center gap-3 shadow-md" id="stat-total-articles">
            <div className="p-2 bg-indigo-950/40 text-indigo-400 border border-indigo-900/30 rounded-lg">
              <BookOpen size={18} />
            </div>
            <div>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Artigos Científicos</p>
              <p className="text-lg font-bold text-zinc-100 font-mono tracking-tight">{articles.length}</p>
            </div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800/80 p-3.5 rounded-lg flex items-center gap-3 shadow-md" id="stat-total-tags">
            <div className="p-2 bg-teal-950/40 text-teal-400 border border-teal-900/30 rounded-lg">
              <Tag size={18} />
            </div>
            <div>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Tags de Ciência</p>
              <p className="text-lg font-bold text-zinc-100 font-mono tracking-tight">{allTags.length}</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-zinc-900 border border-zinc-800/80 p-4 rounded-lg flex flex-col gap-3 shadow-md" id="search-filter-panel">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-zinc-500" size={16} />
            <input 
              type="text"
              placeholder="Pesquisar título, autores, matriz, ligas..."
              className="w-full pl-9 pr-4 py-2 border border-zinc-800 bg-zinc-950 text-zinc-200 placeholder-zinc-600 rounded-lg text-xs focus:outline-none focus:border-indigo-500 transition-colors font-sans"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="article-search-input"
            />
          </div>

          {/* Elegant Tag Pills */}
          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1 border-t border-zinc-805/30" id="tags-cloud-container">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-2 py-0.5 text-[10px] uppercase font-mono tracking-wide rounded-md transition-all ${
                  selectedTag === null 
                    ? "bg-indigo-950/80 text-indigo-400 border border-indigo-900/50" 
                    : "bg-zinc-950 text-zinc-500 border border-zinc-800/60 hover:text-zinc-300"
                }`}
                id="tag-filter-all"
              >
                Todas
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  className={`px-2 py-0.5 text-[10px] font-mono rounded-md transition-all flex items-center gap-1 ${
                    selectedTag === tag 
                      ? "bg-indigo-950 text-indigo-400 border border-indigo-805" 
                      : "bg-zinc-950 text-zinc-500 border border-zinc-800 hover:text-zinc-300 hover:border-zinc-700"
                  }`}
                  id={`tag-filter-${tag}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar list items */}
        <div className="flex-1 bg-zinc-900 border border-zinc-800/80 rounded-lg p-4 flex flex-col gap-3 min-h-[420px] shadow-lg" id="articles-list-box">
          <div className="flex items-center justify-between" id="articles-list-header">
            <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest font-mono">Artigos Disponíveis</span>
            <button
              onClick={() => {
                setIsModalOpen(true);
                setUploadQueue([]);
              }}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-zinc-50 rounded-lg text-[11px] font-semibold tracking-wide shadow-md hover:shadow-indigo-950/20 active:scale-95 transition-all cursor-pointer font-display"
              id="open-upload-modal-btn"
            >
              <Plus size={13} />
              Adicionar Artigos
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 max-h-[500px] pr-1" id="scrolling-articles-list">
            {filteredArticles.length === 0 ? (
              <div className="py-16 text-center text-zinc-600 text-xs font-sans flex flex-col items-center gap-3" id="no-articles-view">
                <FileText size={28} className="opacity-30" />
                <p>Nenhum artigo encontrado com as especificações dadas.</p>
                {(searchQuery || selectedTag) && (
                  <button 
                    onClick={() => { setSearchQuery(""); setSelectedTag(null); }}
                    className="text-[10px] text-indigo-400 font-semibold hover:underline cursor-pointer"
                  >
                    Resetar filtros
                  </button>
                )}
              </div>
            ) : (
              filteredArticles.map((art) => (
                <div
                  key={art.id}
                  onClick={() => { setSelectedArticle(art); setActiveTab("abstract"); }}
                  className={`p-3.5 rounded-lg border text-left cursor-pointer transition-all relative group ${
                    selectedArticle?.id === art.id
                      ? "bg-zinc-950 border-indigo-500/40 shadow-sm"
                      : "bg-zinc-950/45 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-950/85"
                  }`}
                  id={`article-card-${art.id}`}
                >
                  <p className="text-[10px] text-indigo-400 font-mono font-medium mb-1.5 flex items-center gap-1.5">
                    <span className="bg-indigo-950/50 px-1 py-0.5 rounded text-[9px] border border-indigo-900/30">{art.year}</span>
                    <span className="truncate max-w-[180px]">{art.authors}</span>
                  </p>
                  <h4 className="text-xs font-bold text-zinc-200 line-clamp-2 leading-relaxed tracking-tight group-hover:text-zinc-100 font-display">
                    {art.title}
                  </h4>
                  
                  {art.fileName && (
                    <div className="flex items-center gap-1 mt-2 text-zinc-500 text-[10px] font-mono">
                      <FileText size={10} className="text-zinc-600" />
                      <span className="truncate max-w-[170px] text-zinc-400">{art.fileName}</span>
                      <span>({art.fileSize})</span>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1 mt-3">
                    {art.suggestedTags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-1.5 py-0.5 bg-zinc-900 border border-zinc-800 text-[9px] text-zinc-400 rounded font-mono">
                        {tag}
                      </span>
                    ))}
                    {art.suggestedTags.length > 3 && (
                      <span className="text-[10px] text-zinc-600 font-mono self-center">+{art.suggestedTags.length - 3}</span>
                    )}
                  </div>

                  <button
                    onClick={(e) => handleDeleteArticle(art.id, e)}
                    className="absolute right-2 top-2 p-1.5 text-zinc-500 hover:text-red-400 hover:bg-zinc-900/80 rounded opacity-80 md:opacity-0 md:group-hover:opacity-100 transition-all cursor-pointer z-10"
                    title="Remover do repositório"
                  >
                    <Trash2 size={13} strokeWidth={2} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Document Scientific Research Viewer */}
      <div className="lg:col-span-7 flex flex-col" id="right-details-panel">
        {selectedArticle ? (
          <div className="flex-1 bg-zinc-900 border border-zinc-800/80 rounded-lg overflow-hidden flex flex-col shadow-xl" id="detail-card">
            {/* Elegant detail metadata */}
            <div className="p-5 bg-zinc-950 border-b border-zinc-800" id="detail-header-card">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 text-[9px] font-mono uppercase bg-indigo-950 text-indigo-400 border border-indigo-900/50 rounded">
                  REGISTRO {selectedArticle.id.replace("art-", "").substring(0, 4).toUpperCase()}
                </span>
                {selectedArticle.fileName && (
                  <span className="px-2 py-0.5 text-[9px] font-mono uppercase bg-zinc-900 text-zinc-400 border border-zinc-800 rounded flex items-center gap-1">
                    <FileText size={9} /> {selectedArticle.fileSize}
                  </span>
                )}
              </div>
              
              <h2 className="text-[16px] md:text-lg font-bold text-zinc-100 tracking-tight leading-snug font-display">
                {selectedArticle.title}
              </h2>
              
              <div className="mt-4 flex flex-wrap gap-y-1.5 gap-x-5 text-xs text-zinc-400 font-sans" id="detail-authors-bar">
                <div className="flex items-center gap-1.5">
                  <User size={13} className="text-zinc-500" />
                  <span><strong>Autores:</strong> {selectedArticle.authors}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-zinc-500" />
                  <span><strong>Publicação:</strong> {selectedArticle.year}</span>
                </div>
              </div>
            </div>

            {/* Sub-tabs with refined styling */}
            <div className="flex border-b border-zinc-800 bg-zinc-900/40 select-none overflow-x-auto" id="details-subtabs-nav">
              {[
                { id: "abstract", label: "Abstract" },
                { id: "methodology", label: "Metodologia" },
                { id: "relevance", label: "Relevância" },
                { id: "findings", label: "Descobertas" },
                { id: "fullText", label: "Artigo na Íntegra (Texto Completo)" },
                { id: "pdf", label: "Visualizar PDF Original" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 min-w-[100px] py-3 text-[9px] font-semibold uppercase tracking-wider border-b-2 transition-all cursor-pointer font-display ${
                    activeTab === tab.id
                      ? "text-indigo-400 border-indigo-500 bg-zinc-950/20"
                      : "text-zinc-500 border-transparent hover:text-zinc-350 hover:bg-zinc-950/5"
                  }`}
                  id={`article-tab-btn-${tab.id}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content body */}
            <div className="p-6 overflow-y-auto flex-1 text-zinc-350 leading-relaxed max-h-[460px]" id="details-tab-body">
              {activeTab === "abstract" && (
                <div className="space-y-4" id="tab-abstract-content">
                  <div className="flex items-center gap-1.5 mb-2 border-b border-zinc-800/40 pb-1.5">
                    <Info size={13} className="text-indigo-400" />
                    <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-widest font-mono">Resumo Executivo</h3>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed whitespace-pre-line bg-zinc-950/50 p-4 border border-zinc-800 rounded-lg font-sans">
                    {selectedArticle.abstract}
                  </p>

                  <div className="pt-2">
                    <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2 font-mono flex items-center gap-1">
                      <Tag size={10} className="text-zinc-500" /> Descritores e Palavras-Chave de Engenharia
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedArticle.suggestedTags.map((tag) => (
                        <span key={tag} className="px-2.5 py-0.5 text-[10px] font-mono bg-zinc-950 border border-zinc-800 text-zinc-300 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "methodology" && (
                <div className="space-y-3" id="tab-methodology-content">
                  <div className="flex items-center gap-1.5 mb-2 border-b border-zinc-800/40 pb-1.5">
                    <Cpu size={13} className="text-indigo-400" />
                    <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-widest font-mono">Técnicas Experimentais & Equipamentos</h3>
                  </div>
                  <div className="text-xs text-zinc-350 bg-zinc-950/50 p-4 border border-zinc-800 rounded-lg markdown-body">
                    <Markdown>{selectedArticle.methodology}</Markdown>
                  </div>
                </div>
              )}

              {activeTab === "relevance" && (
                <div className="space-y-3" id="tab-relevance-content">
                  <div className="p-4 bg-indigo-950/10 border border-indigo-900/30 rounded-lg" id="relevance-info-box">
                    <div className="flex items-center gap-1.5 mb-2 border-b border-indigo-900/20 pb-1.5">
                      <Sparkles size={13} className="text-indigo-400" />
                      <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest font-mono">Física da Mistura & Matriz ABS</h3>
                    </div>
                    <div className="text-xs text-indigo-100/90 leading-relaxed markdown-body">
                      <Markdown>{selectedArticle.relevanceToComposites}</Markdown>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "findings" && (
                <div className="space-y-4" id="tab-findings-content">
                  <div className="flex items-center gap-1.5 mb-2 border-b border-zinc-800/40 pb-1.5">
                    <CheckCircle2 size={13} className="text-emerald-400" />
                    <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-widest font-mono">Métricas e Constantes Elásticas Obtidas</h3>
                  </div>
                  <div className="space-y-2.5">
                    {selectedArticle.keyFindings && selectedArticle.keyFindings.length > 0 ? (
                      selectedArticle.keyFindings.map((finding, idx) => (
                        <div key={idx} className="flex gap-3 items-start p-3 bg-zinc-950/40 border border-zinc-800/50 rounded-lg text-xs" id={`finding-item-${idx}`}>
                          <span className="w-4.5 h-4.5 flex items-center justify-center bg-indigo-955 text-indigo-400 text-[10px] font-mono font-bold rounded-lg border border-indigo-900/30 shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <p className="text-zinc-350 font-sans leading-relaxed">
                            {finding}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-zinc-550 italic text-xs">Sem dados numéricos detalhados.</p>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "fullText" && (
                <div className="space-y-4" id="tab-fulltext-content">
                  <div className="bg-gradient-to-r from-zinc-950 to-zinc-900 border border-zinc-800 p-4.5 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-inner animate-none" id="immersive-reader-banner">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-indigo-400 font-mono font-bold text-[10px] tracking-widest uppercase">
                        <Sparkles size={11} className="animate-pulse" /> Modo Leitura Ativo
                      </div>
                      <h4 className="text-xs font-bold text-zinc-100 font-display">
                        Leitor Imersivo Científico Integrado
                      </h4>
                      <p className="text-[11px] text-zinc-400">
                        Leia este artigo acadêmico completo em tela cheia com tipografia personalizável e sumário estruturado de engenharia.
                      </p>
                    </div>

                    <button
                      onClick={() => setIsImmersiveReaderOpen(true)}
                      className="whitespace-nowrap bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                    >
                      <BookOpen size={13} />
                      <span>Abrir Modo Leitura</span>
                    </button>
                  </div>

                  <div className="border-t border-zinc-800/60 pt-3">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-mono">Prévia do Texto</h4>
                      <div className="text-[10px] text-zinc-500 font-mono">
                        {selectedArticle.fullText ? `~${Math.ceil(selectedArticle.fullText.split(/\s+/).length / 180)} min de leitura` : "Sem texto completo cadastrado"}
                      </div>
                    </div>
                    
                    <div className="text-xs bg-zinc-950/45 border border-zinc-800/80 p-5 rounded-lg text-zinc-350 overflow-hidden max-h-[290px] relative leading-relaxed markdown-body">
                      {selectedArticle.fullText ? (
                        <>
                          <Markdown>{selectedArticle.fullText}</Markdown>
                          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-zinc-900 via-zinc-900/90 to-transparent flex items-end justify-center pb-4">
                            <button
                              onClick={() => setIsImmersiveReaderOpen(true)}
                              className="bg-zinc-950 hover:bg-zinc-850 text-indigo-400 hover:text-indigo-300 font-bold text-[11px] px-4 py-2 border border-indigo-500/20 rounded-full flex items-center gap-1.5 transition-all cursor-pointer shadow-xl hover:shadow-indigo-500/5 active:scale-95"
                            >
                              <span>Ler Artigo na Íntegra (Modo Leitura)</span>
                              <ChevronRight size={11} />
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="py-8 text-center text-zinc-500 font-sans italic space-y-2">
                          <p>O texto completo deste artigo não está disponível. Você pode adicionar a íntegra do artigo editando o cadastro ou via análise profunda de IA.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "pdf" && (
                <div className="space-y-4 h-[440px] flex flex-col" id="tab-pdf-content">
                  <div className="flex items-center justify-between gap-2 border-b border-zinc-800 pb-2 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <FileText size={14} className="text-indigo-400" />
                      <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-widest font-mono">PDF Original Associado</h3>
                    </div>

                    {pdfBlobUrl && (
                      <div className="flex items-center gap-2">
                        <a 
                          href={pdfBlobUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 bg-indigo-950/65 hover:bg-indigo-900 border border-indigo-900/50 text-indigo-400 font-mono font-bold text-[10px] uppercase rounded-lg shadow-sm flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                        >
                          <ExternalLink size={11} />
                          <span>Abrir em Nova Aba</span>
                        </a>

                        <button 
                          onClick={() => setPdfToUnlinkArticleId(selectedArticle?.id || null)}
                          className="px-2 py-1 bg-zinc-950 hover:bg-red-950/30 border border-zinc-800 hover:border-red-900/30 text-zinc-500 hover:text-red-400 font-mono text-[9px] uppercase rounded-lg transition-all cursor-pointer"
                        >
                          Desvincular PDF
                        </button>
                      </div>
                    )}
                  </div>

                  {pdfBlobUrl ? (
                    <div className="flex-1 w-full bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden flex flex-col min-h-[350px]">
                      <object 
                        data={pdfBlobUrl} 
                        type="application/pdf" 
                        className="w-full flex-1 border-0 rounded-b-lg"
                      >
                        <iframe 
                          src={pdfBlobUrl} 
                          className="w-full h-full border-0 rounded-b-lg animate-none" 
                          title={selectedArticle.title}
                        >
                          <div className="p-8 text-center text-zinc-400 text-xs font-sans">
                            Seu navegador não oferece suporte para visualização inline de PDFs. 
                            <a href={pdfBlobUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline font-semibold ml-1">
                              Clique aqui para abrir o PDF original diretamente.
                            </a>
                          </div>
                        </iframe>
                      </object>
                    </div>
                  ) : (
                    <div className="flex-1 border border-dashed border-zinc-805 bg-zinc-955/15 rounded-lg p-6 flex flex-col items-center justify-center text-center gap-3 min-h-[300px]">
                      <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-500">
                        <UploadCloud size={24} />
                      </div>
                      <div className="space-y-1 max-w-sm">
                        <h4 className="text-xs font-bold text-zinc-300 font-display">Nenhum PDF Original associado</h4>
                        <p className="text-[10.5px] text-zinc-500 leading-normal font-sans">
                          Para ler o PDF original integral diretamente aqui no site, você pode vincular o arquivo científico correspondente ao registro selecionado.
                        </p>
                      </div>

                      <div className="pt-2">
                        <input 
                          type="file" 
                          id="manual-link-pdf-input" 
                          accept=".pdf"
                          className="hidden"
                          onChange={async (e) => {
                            if (e.target.files && e.target.files[0]) {
                              const file = e.target.files[0];
                              try {
                                await PDFStorage.savePDF(selectedArticle.id, file);
                                const url = URL.createObjectURL(file);
                                setPdfBlobUrl(url);
                                
                                // Also update article's fileName and fileSize
                                const updatedArticles = articles.map(art => {
                                  if (art.id === selectedArticle.id) {
                                    return {
                                      ...art,
                                      fileName: file.name,
                                      fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`
                                    };
                                  }
                                  return art;
                                });
                                setArticles(updatedArticles);
                                localStorage.setItem("scientific_articles", JSON.stringify(updatedArticles));
                                setSelectedArticle(prev => prev ? {
                                  ...prev,
                                  fileName: file.name,
                                  fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`
                                } : null);
                              } catch (err) {
                                console.error("Falha ao salvar PDF no IndexedDB:", err);
                                alert("Ocorreu um erro ao salvar o PDF localmente.");
                              }
                            }
                          }}
                        />
                        <button
                          onClick={() => document.getElementById("manual-link-pdf-input")?.click()}
                          className="bg-indigo-650 hover:bg-indigo-700 text-zinc-100 text-[10.5px] font-bold px-3.5 py-2 border border-indigo-500/10 rounded-lg flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-md"
                        >
                          <Plus size={12} />
                          <span>Vincular e Visualizar PDF Original</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="p-4.5 bg-zinc-950 border-t border-zinc-800/50 flex justify-between items-center text-[10px] text-zinc-500 font-mono" id="detail-footer">
              <span>Armazenamento local ativo</span>
              <span>Cadastradado: {new Date(selectedArticle.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ) : (
          <div className="flex-1 bg-zinc-900 border border-zinc-800/80 rounded-lg flex flex-col items-center justify-center py-24 px-6 text-center shadow-md select-none" id="empty-detail-state">
            <BookOpen size={36} className="text-zinc-700 mb-3 animate-pulse" />
            <p className="text-zinc-400 font-display text-sm font-semibold">Nenhum artigo científico selecionado</p>
            <p className="text-zinc-600 font-sans text-xs max-w-xs mt-1">
              Escolha um artigo na barra lateral ou importe vários PDFs científicos simultaneamente com análise profunda de IA.
            </p>
          </div>
        )}
      </div>

      {/* RE-ENGINEERED BATCH UPLOAD MODAL (Handles multiple simultaneous loads) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950/85 backdrop-blur-md flex items-center justify-center p-4" id="upload-dialog-backer">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-150" id="upload-dialog-box">
            
            {/* Header */}
            <div className="p-4.5 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between" id="upload-dialog-header">
              <div className="flex items-center gap-1.5">
                <Sparkles size={16} className="text-indigo-400 animate-pulse" />
                <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-wider font-display">
                  Análise de Artigos Acadêmicos
                </h3>
              </div>
              <button 
                onClick={() => { if (!isProcessingQueue) { setIsModalOpen(false); setUploadQueue([]); } }}
                disabled={isProcessingQueue}
                className={`text-zinc-500 hover:text-zinc-300 transition-colors p-1 cursor-pointer rounded ${isProcessingQueue ? "opacity-30 cursor-not-allowed" : ""}`}
              >
                <X size={16} />
              </button>
            </div>

            {/* Input Selection Tabs */}
            <div className="flex border-b border-zinc-800 bg-zinc-950/40 select-none" id="upload-choice-tabs">
              {[
                { id: "pdf", label: "Importar Múltiplos PDFs Científicos" },
                { id: "text", label: "Texto para Resumo" },
                { id: "manual", label: "Cadastro Manual" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    if (!isProcessingQueue) {
                      setUploadType(tab.id as any);
                    }
                  }}
                  disabled={isProcessingQueue}
                  className={`flex-1 py-3 text-[10.5px] font-semibold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                    isProcessingQueue ? "opacity-50 cursor-not-allowed" : ""
                  } ${
                    uploadType === tab.id
                      ? "text-indigo-400 border-indigo-500 bg-zinc-950/20"
                      : "text-zinc-500 border-transparent hover:text-zinc-300"
                  }`}
                  id={`tab-select-${tab.id}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Body */}
            <div className="p-5 overflow-y-auto max-h-[480px]" id="upload-dialog-body">
              {uploadType === "pdf" ? (
                <div className="space-y-4" id="pdf-submission-tab">
                  {/* Info card */}
                  <div className="p-3.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-start gap-2.5">
                    <Info size={15} className="text-indigo-400 shrink-0 mt-0.5" />
                    <div className="text-xs text-zinc-400 leading-normal">
                      <p className="font-semibold text-zinc-300">Sumarizador Científico Inteligente:</p>
                      Você pode arrastar e selecionar <strong className="text-indigo-400 font-semibold">vários arquivos PDF simultaneamente</strong> (ex: 2, 3 ou 4 artigos científicos). O Gemini analisará um a um em segundo plano, extraindo dados físicos do ABS e ligas metálicas.
                    </div>
                  </div>

                  {/* Drag and Drop Zone */}
                  {!isProcessingQueue && (
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => document.getElementById("pdf-file-selector")?.click()}
                      className={`border border-dashed rounded-lg p-7 hover:bg-zinc-950/20 text-center transition-all cursor-pointer ${
                        isDragging 
                          ? "border-indigo-500 bg-indigo-950/15" 
                          : "border-zinc-800 bg-zinc-950/25 hover:border-zinc-700"
                      }`}
                      id="pdf-drop-zone"
                    >
                      <input 
                        type="file" 
                        id="pdf-file-selector"
                        accept=".pdf"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <div className="flex flex-col items-center gap-2">
                        <UploadCloud size={28} className="text-zinc-600" />
                        <p className="text-xs text-zinc-300 font-semibold">Selecione ou Arraste múltiplos PDFs científicos</p>
                        <p className="text-[10px] text-zinc-500 font-mono">Suporta processamento em fila paralela sequencial</p>
                      </div>
                    </div>
                  )}

                  {/* Upload List Queue */}
                  {uploadQueue.length > 0 && (
                    <div className="border border-zinc-800 bg-zinc-950/60 rounded-lg overflow-hidden" id="queue-display-panel">
                      <div className="px-3.5 py-2 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                        <span>FILA DE TRABALHO ({uploadQueue.length} arquivos)</span>
                        {!isProcessingQueue && (
                          <button 
                            type="button" 
                            onClick={clearQueue}
                            className="text-red-400 hover:underline cursor-pointer"
                          >
                            Limpar Fila
                          </button>
                        )}
                      </div>

                      <div className="divide-y divide-zinc-850 max-h-[180px] overflow-y-auto" id="queue-items-scroller">
                        {uploadQueue.map((item, idx) => (
                          <div key={item.id} className="p-3 flex items-center justify-between text-xs gap-4">
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                              <FileText size={14} className="text-zinc-500 shrink-0" />
                              <div className="truncate">
                                <p className="font-semibold text-zinc-200 truncate">{item.file?.name}</p>
                                <p className="text-[9px] text-zinc-500 font-mono">{(item.file?.size / 1024 / 1024).toFixed(2)} MB</p>
                              </div>
                            </div>

                            {/* Row Status Badge */}
                            <div className="flex items-center gap-2.5 shrink-0">
                              <span className={`px-2 py-0.5 rounded text-[9px] font-mono select-none border ${
                                item.status === "pending"
                                  ? "bg-zinc-900 text-zinc-500 border-zinc-800"
                                  : item.status === "processing"
                                  ? "bg-amber-950/50 text-amber-400 border-amber-900/40 animate-pulse flex items-center gap-1"
                                  : item.status === "success"
                                  ? "bg-emerald-950/40 text-emerald-400 border-emerald-900/30 flex items-center gap-1"
                                  : "bg-red-950/40 text-red-400 border-red-900/30"
                              }`}>
                                {item.status === "processing" && <Loader2 size={8} className="animate-spin" />}
                                {item.status === "success" && <Sparkle size={8} />}
                                {item.progressText}
                              </span>

                              {/* Remove single queue item button */}
                              {!isProcessingQueue && item.status !== "success" && (
                                <button 
                                  onClick={() => removeFromQueue(item.id)}
                                  className="p-1 text-zinc-600 hover:text-zinc-400 hover:bg-zinc-900 rounded cursor-pointer"
                                  title="Remover"
                                >
                                  <X size={11} />
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions Footer */}
                  <div className="flex justify-end gap-2.5 pt-4 border-t border-zinc-800" id="pdf-actions">
                    <button
                      type="button"
                      disabled={isProcessingQueue}
                      onClick={() => { setIsModalOpen(false); setUploadQueue([]); }}
                      className={`px-3.5 py-1.5 border border-zinc-800 rounded-lg text-zinc-400 hover:text-zinc-200 text-xs font-semibold cursor-pointer ${
                        isProcessingQueue ? "opacity-30 cursor-not-allowed" : ""
                      }`}
                    >
                      Voltar ao Repositório
                    </button>

                    {uploadQueue.some(item => item.status !== "success") && (
                      <button
                        type="button"
                        onClick={handleAnalyzeQueue}
                        disabled={isProcessingQueue || uploadQueue.length === 0}
                        className={`px-4 py-1.5 text-xs font-bold rounded-lg shadow-md flex items-center gap-1.5 transition-all cursor-pointer ${
                          isProcessingQueue || uploadQueue.length === 0
                            ? "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-700 text-zinc-100 active:scale-95"
                        }`}
                        id="run-pdf-gemini-btn"
                      >
                        {isProcessingQueue ? (
                          <>
                            <Loader2 size={13} className="animate-spin" />
                            <span>Analisando Fila...</span>
                          </>
                        ) : (
                          <>
                            <Play size={12} />
                            <span>Analisar Artigos com Gemini ({uploadQueue.filter(item => item.status !== "success").length})</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ) : uploadType === "text" ? (
                <div className="space-y-4" id="text-submission-tab">
                  <p className="text-xs text-zinc-400">
                    Insira o texto bruto, parágrafos ou rascunho de um artigo no campo abaixo. O Gemini criará os metadados correlacionando as mecânicas ao ABS.
                  </p>

                  <textarea 
                    rows={8}
                    required
                    placeholder="Coloque o conteúdo do artigo científico aqui..."
                    className="w-full p-3 border border-zinc-800 bg-zinc-950 text-zinc-200 text-xs rounded-lg focus:outline-none focus:border-indigo-500 font-sans resize-y"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    disabled={isProcessingQueue}
                  />

                  <div className="flex justify-end gap-2.5 pt-4 border-t border-zinc-800" id="text-actions">
                    <button
                      type="button"
                      disabled={isProcessingQueue}
                      onClick={() => setIsModalOpen(false)}
                      className="px-3.5 py-1.5 border border-zinc-800 rounded-lg text-zinc-400 text-xs font-semibold"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={handleAnalyzeTextWithGemini}
                      disabled={isProcessingQueue || !inputText.trim()}
                      className={`px-4 py-1.5 text-xs font-bold rounded-lg shadow-md flex items-center gap-1.5 cursor-pointer ${
                        isProcessingQueue || !inputText.trim()
                          ? "bg-zinc-800 text-zinc-650 cursor-not-allowed"
                          : "bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95"
                      }`}
                    >
                      {isProcessingQueue ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                      Analisar Texto
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleManualSubmit} className="space-y-4 animate-none" id="manual-form">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="manual-meta-inputs">
                    <div className="md:col-span-2 flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-mono">Título Oficial *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Ex: Análise micromecânica do ABS fundido..."
                        className="p-2 border border-zinc-800 bg-zinc-950 text-zinc-200 text-xs rounded-lg focus:outline-none focus:border-indigo-500 font-sans"
                        value={manualTitle}
                        onChange={(e) => setManualTitle(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-mono">Ano de Publicação *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Ex: 2024"
                        className="p-2 border border-zinc-800 bg-zinc-950 text-zinc-200 text-xs rounded-lg focus:outline-none focus:border-indigo-500 font-sans"
                        value={manualYear}
                        onChange={(e) => setManualYear(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-mono">Autores *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ex: Oliveira, M. A., Silva, N. F."
                      className="p-2 border border-zinc-800 bg-zinc-950 text-zinc-200 text-xs rounded-lg focus:outline-none focus:border-indigo-500 font-sans"
                      value={manualAuthors}
                      onChange={(e) => setManualAuthors(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-mono">Abstract / Resumo Curto</label>
                    <textarea 
                      rows={3}
                      placeholder="Resumo geral e objetivos do trabalho..."
                      className="p-2 border border-zinc-800 bg-zinc-950 text-zinc-200 text-xs rounded-lg focus:outline-none focus:border-indigo-500 font-sans resize-y"
                      value={manualAbstract}
                      onChange={(e) => setManualAbstract(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-mono">Metodologia Científica</label>
                    <textarea 
                      rows={3}
                      placeholder="Materiais, métodos e técnicas experimentais aplicados..."
                      className="p-2 border border-zinc-805 bg-zinc-950 text-zinc-205 text-xs rounded-lg focus:outline-none focus:border-indigo-500 font-sans resize-y"
                      value={manualMethodology}
                      onChange={(e) => setManualMethodology(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-mono">Relevância Mecânica (Lei de Misturas)</label>
                    <textarea 
                      rows={2}
                      placeholder="Como altera as propriedades de rigidez e alongamento elástico do ABS?"
                      className="p-2 border border-zinc-800 bg-zinc-950 text-zinc-200 text-xs rounded-lg focus:outline-none focus:border-indigo-500 font-sans resize-y"
                      value={manualRelevance}
                      onChange={(e) => setManualRelevance(e.target.value)}
                    />
                  </div>

                  {/* Dynamic Findings fields */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-mono">Métricas e Constantes Descobertas</label>
                      <button
                        type="button"
                        onClick={handleAddFindingField}
                        className="text-[10px] text-indigo-400 font-bold hover:underline cursor-pointer"
                      >
                        + Adicionar Linha
                      </button>
                    </div>
                    <div className="space-y-2">
                      {manualFindings.map((finding, idx) => (
                        <input
                          key={idx}
                          type="text"
                          placeholder={`Constante, módulo elástico ou tração na ruptura obtida ${idx + 1}...`}
                          className="w-full p-2 border border-zinc-800 bg-zinc-950 text-zinc-200 text-xs rounded-lg focus:outline-none focus:border-indigo-500 font-sans"
                          value={finding}
                          onChange={(e) => handleFindingChange(idx, e.target.value)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-mono">Texto Integral do Artigo (Markdown Suportado)</label>
                    <textarea 
                      rows={4}
                      placeholder="Cole aqui o texto completo ou capítulos estruturados do artigo científico para leitura offline na íntegra..."
                      className="p-2 border border-zinc-800 bg-zinc-950 text-zinc-200 text-xs rounded-lg focus:outline-none focus:border-indigo-500 font-sans resize-y"
                      value={manualFullText}
                      onChange={(e) => setManualFullText(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-mono font-sans">Palavras-chave (Separadas por vírgula)</label>
                    <input 
                      type="text" 
                      placeholder="Ex: ABS, Alumínio, Halpin-Tsai, Limite de Reuss"
                      className="p-2 border border-zinc-800 bg-zinc-950 text-zinc-200 text-xs rounded-lg focus:outline-none focus:border-indigo-500 font-sans"
                      value={manualTags}
                      onChange={(e) => setManualTags(e.target.value)}
                    />
                  </div>

                  <div className="flex justify-end gap-2.5 pt-4 border-t border-zinc-800" id="manual-actions">
                    <button
                      type="button"
                      onClick={() => { setIsModalOpen(false); resetManualFields(); }}
                      className="px-3.5 py-1.5 border border-zinc-800 rounded-lg text-zinc-400 text-xs font-semibold cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-indigo-650 hover:bg-indigo-700 text-zinc-100 font-bold text-xs rounded-lg shadow-md active:scale-95 transition-all cursor-pointer"
                    >
                      Salvar Cadastro
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* IMMERSIVE SCIENTIFIC READER OVERLAY */}
      {isImmersiveReaderOpen && selectedArticle && (
        <div 
          className={`fixed inset-0 z-50 flex flex-col md:flex-row overflow-hidden transition-all duration-300 animate-in fade-in ${
            readerTheme === "charcoal" ? "bg-zinc-950 text-zinc-150" :
            readerTheme === "dark" ? "bg-black text-zinc-300" :
            readerTheme === "sepia" ? "bg-[#f4ecd8] text-[#3e2c1e]" :
            "bg-white text-zinc-800"
          }`} 
          id="immersive-reader-overlay"
        >
          {/* Main Controls Panel (Left on Desktop, Top on Mobile) */}
          <div 
            className={`w-full md:w-80 shrink-0 p-6 flex flex-col border-b md:border-b-0 md:border-r border-solid transition-colors duration-200 ${
              readerTheme === "charcoal" ? "bg-zinc-900 border-zinc-800 text-zinc-200" :
              readerTheme === "dark" ? "bg-zinc-950 border-zinc-900 text-zinc-300" :
              readerTheme === "sepia" ? "bg-[#eae0c9] border-[#d4c5ab] text-[#5b4636]" :
              "bg-zinc-50 border-zinc-200 text-zinc-700"
            }`}
            id="reader-sidebar"
          >
            {/* Header / Brand */}
            <div className="flex items-center justify-between pb-5 border-b border-solid border-current/10">
              <div className="flex items-center gap-2">
                <BookOpen size={16} className="text-indigo-500 animate-pulse" />
                <span className="text-xs font-bold font-mono tracking-widest uppercase">Modo Leitor</span>
              </div>
              <button
                onClick={() => setIsImmersiveReaderOpen(false)}
                className="p-1.5 hover:bg-current/10 rounded transition-colors cursor-pointer"
                title="Sair do Modo Leitura"
              >
                <X size={15} />
              </button>
            </div>

            {/* Document stats */}
            <div className="py-4 border-b border-solid border-current/10 space-y-1">
              <h4 className="text-xs font-bold line-clamp-2 leading-tight">
                {selectedArticle.title}
              </h4>
              <p className="text-[10px] opacity-75">{selectedArticle.authors} ({selectedArticle.year})</p>
              
              {selectedArticle.fullText && (
                <div className="pt-2 flex items-center gap-2 text-[10px] font-mono opacity-80">
                  <span>{selectedArticle.fullText.split(/\s+/).length} palavras</span>
                  <span>•</span>
                  <span>~{Math.ceil(selectedArticle.fullText.split(/\s+/).length / 180)} min de leitura</span>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="py-5 space-y-5 flex-1 overflow-y-auto pr-1">
              {/* Theme Swatches */}
              <div className="space-y-2">
                <label className="text-[9px] font-bold font-mono uppercase tracking-widest opacity-80 block font-mono">Paleta Visual</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: "charcoal", name: "Slate", bg: "bg-zinc-900", text: "text-zinc-200", border: "border-zinc-700" },
                    { id: "dark", name: "Breu", bg: "bg-black", text: "text-zinc-450", border: "border-zinc-800" },
                    { id: "sepia", name: "Sépia", bg: "bg-[#f4ecd8]", text: "text-[#5b4636]", border: "border-[#d0bf9e]" },
                    { id: "light", name: "Papel", bg: "bg-white", text: "text-zinc-800", border: "border-zinc-200" }
                  ].map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => setReaderTheme(theme.id as any)}
                      className={`h-11 rounded-lg border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${theme.bg} ${theme.border} ${
                        readerTheme === theme.id ? "ring-2 ring-indigo-500 ring-offset-1 focus:ring-offset-transparent" : "opacity-80 hover:opacity-100"
                      }`}
                      title={theme.name}
                    >
                      <span className={`text-[10px] font-bold ${theme.text}`}>Aa</span>
                      <span className="text-[8px] opacity-70 font-sans -mt-0.5">{theme.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Family */}
              <div className="space-y-2">
                <label className="text-[9px] font-bold font-mono uppercase tracking-widest opacity-80 block font-mono">Fonte Tipográfica</label>
                <div className="grid grid-cols-3 gap-1.5 bg-current/5 p-1 rounded-lg">
                  {[
                    { id: "serif", label: "Serif", cls: "font-serif" },
                    { id: "sans", label: "Sans", cls: "font-sans" },
                    { id: "mono", label: "Mono", cls: "font-mono" }
                  ].map((font) => (
                    <button
                      key={font.id}
                      onClick={() => setReaderFontFamily(font.id as any)}
                      className={`py-1 text-[11px] font-semibold rounded transition-all cursor-pointer ${font.cls} ${
                        readerFontFamily === font.id
                          ? "bg-indigo-600 text-white shadow"
                          : "hover:bg-current/5 animate-none"
                      }`}
                    >
                      {font.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Size */}
              <div className="space-y-2">
                <label className="text-[9px] font-bold font-mono uppercase tracking-widest opacity-80 block font-mono">Tamanho da Fonte</label>
                <div className="flex items-center justify-between gap-1.5 bg-current/5 p-1 rounded-lg">
                  <button
                    onClick={() => {
                      if (readerFontSize === "xl") setReaderFontSize("lg");
                      else if (readerFontSize === "lg") setReaderFontSize("base");
                      else if (readerFontSize === "base") setReaderFontSize("sm");
                    }}
                    disabled={readerFontSize === "sm"}
                    className="flex-1 py-1 text-xs font-bold rounded hover:bg-current/10 disabled:opacity-35 cursor-pointer"
                  >
                    A-
                  </button>
                  <span className="px-3 text-[10px] font-mono font-bold uppercase">{readerFontSize}</span>
                  <button
                    onClick={() => {
                      if (readerFontSize === "sm") setReaderFontSize("base");
                      else if (readerFontSize === "base") setReaderFontSize("lg");
                      else if (readerFontSize === "lg") setReaderFontSize("xl");
                    }}
                    disabled={readerFontSize === "xl"}
                    className="flex-1 py-1 text-xs font-bold rounded hover:bg-current/10 disabled:opacity-35 cursor-pointer"
                  >
                    A+
                  </button>
                </div>
              </div>

              {/* Table of Contents (Sumário Dinâmico) */}
              <div className="space-y-2 mt-4">
                <label className="text-[9px] font-bold font-mono uppercase tracking-widest opacity-80 block font-mono">Sumário de Seções</label>
                <div className="space-y-1 max-h-[160px] overflow-y-auto pr-1 text-xs font-sans" id="reader-toc">
                  {selectedArticle.fullText ? (
                    selectedArticle.fullText
                      .split("\n")
                      .filter(line => line.startsWith("# ") || line.startsWith("## ") || line.startsWith("### "))
                      .map((line, idx) => {
                        const level = line.startsWith("# ") ? 1 : line.startsWith("## ") ? 2 : 3;
                        const clean = line.replace(/^#+\s+/, "").replace(/\*+/g, "");
                        return (
                          <div 
                            key={idx}
                            className={`py-1 rounded px-2 hover:bg-current/5 transition-colors cursor-default leading-tight ${
                              level === 1 ? "font-bold text-[11px]" :
                              level === 2 ? "pl-3 opacity-90 text-[10px]" : "pl-5 opacity-75 text-[9px] italic"
                            }`}
                          >
                            {clean}
                          </div>
                        );
                      })
                  ) : (
                    <span className="text-[10px] opacity-50 block font-sans italic">Sumário indisponível</span>
                  )}
                </div>
              </div>
            </div>

            {/* Actions Panel */}
            <div className="pt-4 border-t border-solid border-current/10 flex flex-col gap-2">
              <button
                onClick={() => window.print()}
                className="w-full py-1.5 text-xs font-semibold rounded border border-solid border-current/25 hover:bg-current/5 cursor-pointer flex items-center justify-center gap-1.5 font-mono text-[10px] uppercase"
              >
                <FileText size={11} />
                <span>Imprimir / Exportar PDF</span>
              </button>
              <button
                onClick={() => setIsImmersiveReaderOpen(false)}
                className="w-full py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded shadow hover:shadow-indigo-500/10 active:scale-95 transition-all text-center cursor-pointer"
              >
                Voltar ao Repositório
              </button>
            </div>
          </div>

          {/* Reading Space Scrollable Content (Right on Desktop, Bottom on Mobile) */}
          <div className="flex-1 overflow-y-auto p-6 md:p-12" id="reader-viewport">
            {/* Limit max line-width representing premium book typography standard grid */}
            <div className="max-w-2xl mx-auto space-y-8 pb-20">
              
              {/* Cover Info */}
              <div className="space-y-4 border-b border-solid border-current/10 pb-8 text-center md:text-left">
                <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start">
                  <span className="px-2.5 py-0.5 text-[9px] font-mono bg-indigo-600 text-white rounded font-bold tracking-wider uppercase">
                    Documento Integro Acadêmico
                  </span>
                  <span className="px-2 py-0.5 text-[9px] font-mono border border-solid border-current/30 rounded">
                    Ano: {selectedArticle.year}
                  </span>
                </div>
                
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-display leading-tight">
                  {selectedArticle.title}
                </h1>
                
                <div className="text-xs space-y-1 opacity-80 font-sans">
                  <p><strong>Autores:</strong> {selectedArticle.authors}</p>
                  {selectedArticle.fileName && <p className="font-mono text-[10px]"><strong>Arquivo Associado:</strong> {selectedArticle.fileName} ({selectedArticle.fileSize})</p>}
                </div>
              </div>

              {/* Dynamic Typography Markdown Body rendering */}
              <div 
                className={`markdown-body duration-200 ${
                  readerFontFamily === "serif" ? "font-serif tracking-normal leading-relaxed text-justify" :
                  readerFontFamily === "mono" ? "font-mono tracking-tight text-left" :
                  "font-sans tracking-tight leading-relaxed text-justify"
                } ${
                  readerFontSize === "sm" ? "text-xs space-y-4" :
                  readerFontSize === "base" ? "text-sm space-y-5" :
                  readerFontSize === "lg" ? "text-base space-y-6" :
                  "text-lg space-y-8"
                }`}
                style={{
                  color: 
                    readerTheme === "charcoal" ? "#e4e4e7" :
                    readerTheme === "dark" ? "#d1d5db" :
                    readerTheme === "sepia" ? "#3e2c1e" :
                    "#1f2937"
                }}
                id="reader-text-container"
              >
                {selectedArticle.fullText ? (
                  <Markdown>{selectedArticle.fullText}</Markdown>
                ) : (
                  <div className="py-24 text-center text-zinc-500 font-sans italic space-y-3">
                    <p>O texto completo deste artigo científico de microestatística e tensões de ABS não foi carregado hermeticamente no sistema.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CUSTOM ARTICLE DELETE CONFIRMATION MODAL */}
      {articleIdToDelete && (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-zinc-950/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150" id="dialog-confirm-delete-article">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl w-full max-w-md overflow-hidden shadow-2xl p-6 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-red-950/50 text-red-400 border border-red-900/40 rounded-lg shrink-0">
                <AlertCircle size={20} />
              </div>
              <div className="space-y-1 flex-1">
                <h3 className="text-sm font-bold text-zinc-150 font-display">Remover do Repositório?</h3>
                <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                  Você está prestes a excluir este artigo científico definitivamente do seu repositório local. Todos os dados associados, resumos e análises serão desvinculados permanentemente.
                </p>
              </div>
            </div>

            <div className="bg-zinc-950/40 border border-zinc-800/60 p-3 rounded-lg text-[10.5px] font-mono text-zinc-400 leading-tight">
              <p className="font-semibold text-zinc-350 truncate">
                {articles.find(a => a.id === articleIdToDelete)?.title}
              </p>
              <p className="text-[9.5px] mt-1 text-zinc-500">
                ID: {articleIdToDelete}
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button 
                onClick={() => setArticleIdToDelete(null)}
                className="px-3.5 py-1.5 text-xs font-semibold text-zinc-400 hover:text-zinc-200 bg-zinc-850 hover:bg-zinc-800 rounded-lg cursor-pointer transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={handleConfirmDeleteArticle}
                className="px-4 py-1.5 text-xs font-bold text-white bg-red-650 hover:bg-red-700 rounded-lg cursor-pointer transition-colors shadow-md shadow-red-950/20 active:scale-95 animate-none"
              >
                Confirmar Exclusão
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CUSTOM PDF UNLINK CONFIRMATION MODAL */}
      {pdfToUnlinkArticleId && (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-zinc-950/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150" id="dialog-confirm-unlink-pdf">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl w-full max-w-md overflow-hidden shadow-2xl p-6 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-amber-950/50 text-amber-500 border border-amber-900/40 rounded-lg shrink-0">
                <AlertTriangle size={20} />
              </div>
              <div className="space-y-1 flex-1">
                <h3 className="text-sm font-bold text-zinc-150 font-display">Remover PDF Original?</h3>
                <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                  Deseja remover o arquivo PDF correspondente a este artigo científico? O resumo, a metodologia estruturada e os dados já extraídos de compósitos continuarão salvos e visualizáveis normalmente.
                </p>
              </div>
            </div>

            <div className="bg-zinc-950/40 border border-zinc-800/60 p-3 rounded-lg text-[10.5px] font-mono text-zinc-400 leading-tight">
              <p className="font-semibold text-zinc-350 truncate animate-none">
                {articles.find(a => a.id === pdfToUnlinkArticleId)?.title}
              </p>
              {articles.find(a => a.id === pdfToUnlinkArticleId)?.fileName && (
                <p className="text-[9.5px] mt-1 text-zinc-500 truncate">
                  Arquivo: {articles.find(a => a.id === pdfToUnlinkArticleId)?.fileName}
                </p>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button 
                onClick={() => setPdfToUnlinkArticleId(null)}
                className="px-3.5 py-1.5 text-xs font-semibold text-zinc-400 hover:text-zinc-200 bg-zinc-850 hover:bg-zinc-800 rounded-lg cursor-pointer transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={handleConfirmUnlinkPdf}
                className="px-4 py-1.5 text-xs font-bold text-white bg-red-650 hover:bg-red-700 rounded-lg cursor-pointer transition-colors shadow-md shadow-red-950/20 active:scale-95 animate-none"
              >
                Confirmar Remoção
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
