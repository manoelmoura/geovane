import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Set up generous body limits for base64 encoded PDF articles
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // Initialize Gemini Client
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("Aviso: GEMINI_API_KEY não foi configurada. Funcionalidades de IA estarão inativas.");
  }

  const ai = new GoogleGenAI({
    apiKey: apiKey || "MOCK_KEY",
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });

  // REST API: Summarize Article
  app.post("/api/summarize", async (req, res) => {
    try {
      if (!apiKey) {
        throw new Error("A chave GEMINI_API_KEY não está configurada no ambiente. Adicione-a na aba de Secrets.");
      }

      const { text, fileBase64, mimeType, fileName } = req.body;

      if (!text && !fileBase64) {
        return res.status(400).json({ error: "Nenhum texto ou arquivo PDF foi fornecido para resumo." });
      }

      let contents: any[] = [];
      let basePrompt = "Você é um assistente de pesquisa científica. Analise o artigo científico fornecido e extraia metadados e um resumo altamente estruturado em PORTUGUÊS. Seja preciso nas terminologias científicas.";

      if (fileBase64) {
        contents = [
          {
            inlineData: {
              mimeType: mimeType || "application/pdf",
              data: fileBase64,
            },
          },
          basePrompt,
        ];
      } else {
        contents = [
          `${basePrompt}\n\nTexto do artigo:\n${text}`,
        ];
      }

      // Schema for structured output
      const responseSchema = {
        type: Type.OBJECT,
        properties: {
          title: {
            type: Type.STRING,
            description: "O título oficial do artigo científico. Se ausente, infira o melhor título baseado no conteúdo.",
          },
          authors: {
            type: Type.STRING,
            description: "Nomes dos autores principais e co-autores. Se ausentes, digite 'Não informado'.",
          },
          year: {
            type: Type.STRING,
            description: "O ano de publicação do artigo. Se indisponível, infira ou coloque 'N/D'.",
          },
          abstract: {
            type: Type.STRING,
            description: "Um resumo geral executivo ou abstract estruturado do artigo, detalhando o objetivo, a contribuição e as principais teorias discutidas.",
          },
          methodology: {
            type: Type.STRING,
            description: "Detalhes sobre a metodologia experimental, simulação computacional, materiais estudados ou abordagens teóricas aplicadas.",
          },
          keyFindings: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Lista com os 3 a 5 principais resultados, métricas, valores experimentais alcançados ou conclusões-chave do artigo.",
          },
          relevanceToComposites: {
            type: Type.STRING,
            description: "Análise específica de como este artigo ou seus conceitos se relacionam com compósitos de matriz ABS carregados com ligas metálicas (Aço 1020, 1045, Alumínio ou Inox 316) ou regras de comportamento mecânico de misturas.",
          },
          suggestedTags: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Lista de 4 a 6 palavras-chave técnicas relevantes (ex: 'ABS', 'Inox 316', 'Lei de Misturas', 'Limite de Voigt', 'Módulo de Young').",
          },
          fullText: {
            type: Type.STRING,
            description: "Texto completo do artigo científico reconstituído de forma detalhada e extensiva em português usando formatação Markdown rica. Deve conter Introdução, Fundamentação Teórica de Micromecânica de Compósitos, Metodologia Experimental detalhada, Resultados com tabelas ou dados, Discussão Teórica detalhada das interações e frações volumétricas, e Conclusão. Mínimo de 800-1200 palavras para representar o artigo completo em sua totalidade.",
          },
        },
        required: [
          "title",
          "authors",
          "year",
          "abstract",
          "methodology",
          "keyFindings",
          "relevanceToComposites",
          "suggestedTags",
          "fullText",
        ],
      };

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          responseMimeType: "application/json",
          responseSchema: responseSchema,
          temperature: 0.2, // Low temperature for factual analysis
        },
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("O modelo Gemini retornou uma resposta vazia.");
      }

      const parsedData = JSON.parse(responseText.trim());
      return res.json(parsedData);
    } catch (err: any) {
      console.error("Erro no processamento do resumo:", err);
      return res.status(500).json({ error: err.message || "Falha ao gerar o resumo do artigo." });
    }
  });

  // REST API: Extract Material Datasheet Structured Data
  app.post("/api/parse-datasheet", async (req, res) => {
    try {
      if (!apiKey) {
        throw new Error("A chave GEMINI_API_KEY não está configurada no ambiente. Adicione-a na aba de Secrets.");
      }

      const { text, fileBase64, mimeType } = req.body;

      if (!text && !fileBase64) {
        return res.status(400).json({ error: "Nenhum texto de datasheet ou arquivo foi fornecido." });
      }

      let contents: any[] = [];
      let basePrompt = `Você é um robô de extração científica especializado em Ciência de Materiais e Manufatura Aditiva (Impressão 3D). 
      Analise o documento, artigo ou texto de especificações fornecido sobre esse material e extraia todos os seus coeficientes mecânicos, térmicos e recomendações de impressão de forma estruturada. 
      Certifique-se de retornar as unidades corretamente (Módulo de Young em GPa, Tensão Máxima em MPa, Densidade em g/cm³).
      Atente-se para classificar o material adequadamente como 'matrix' (polímeros como ABS, PLA, PETG, Nylon, PC) ou 'reinforcement' (metais como bronze, aço, alumínio ou fibras de carbono).
      Responda em PORTUGUÊS de forma exata e coerente com a física real dos materiais.`;

      if (fileBase64) {
        contents = [
          {
            inlineData: {
              mimeType: mimeType || "application/pdf",
              data: fileBase64,
            },
          },
          basePrompt,
        ];
      } else {
        contents = [
          `${basePrompt}\n\nTexto do Datasheet do Material:\n${text}`,
        ];
      }

      const datasheetSchema = {
        type: Type.OBJECT,
        properties: {
          name: {
            type: Type.STRING,
            description: "Nome comercial ou técnico do material (ex: 'ABS Premium Esun', 'Aço Ferramento H13', etc.)"
          },
          key: {
            type: Type.STRING,
            description: "Identificador curto em minúsculas, usando underscores (ex: 'abs_esun_premium', 'aço_h13')"
          },
          type: {
            type: Type.STRING,
            description: "Classificação estrita do material: 'matrix' para termoplásticos base ou 'reinforcement' para materiais metálicos ou fibras de carga"
          },
          elasticModulus: {
            type: Type.NUMBER,
            description: "Módulo elástico de Young em GPa. Se fornecido em MPa no texto original, converta para GPa dividindo por 1000 (ex: 2.3 GPa para ABS, 210 GPa para aço)"
          },
          tensileStrength: {
            type: Type.NUMBER,
            description: "Resistência máxima à tração (Tensile Strength) em MPa (ex: 45 MPa para ABS, 550 MPa para aço)"
          },
          density: {
            type: Type.NUMBER,
            description: "Densidade física em g/cm³. Caso indicado em kg/m³, divida por 1000 (ex: 1.05 g/cm³ para ABS, 7.85 g/cm³ para aço, 2.7 g/cm³ para alumínio)"
          },
          poissonRatio: {
            type: Type.NUMBER,
            description: "Coeficiente de Poisson aproximado (ex: 0.35 para polímeros de matriz, 0.29 para aços, 0.33 para alumínio)"
          },
          glassTransition: {
            type: Type.STRING,
            description: "Temperatura de transição vítrea (Tg) se for polímero (ex: '105°C'). Caso seja liga metálica ou fibra, coloque 'N/A'"
          },
          printNozzleTemp: {
            type: Type.STRING,
            description: "Temperatura padrão do bico de extrusão se aplicável para impressão 3D (ex: '230°C - 260°C'). Para metais puros ou de reforço, coloque 'N/A'"
          },
          printBedTemp: {
            type: Type.STRING,
            description: "Temperatura recomendada para a mesa da impressora 3D (ex: '90°C - 110°C'). Para metais ou cargas puras de reforço, coloque 'N/A'"
          },
          description: {
            type: Type.STRING,
            description: "Descrição detalhada condensada em português contemplando as propriedades e contexto de aplicação do material no mercado."
          },
          advantages: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Três principais vantagens competitivas do material de forma sintética."
          },
          disadvantages: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Duas principais desvantagens, restrições ou desafios de modelagem do material."
          }
        },
        required: [
          "name",
          "key",
          "type",
          "elasticModulus",
          "tensileStrength",
          "density",
          "poissonRatio",
          "description",
          "advantages",
          "disadvantages"
        ]
      };

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          responseMimeType: "application/json",
          responseSchema: datasheetSchema,
          temperature: 0.1,
        },
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("O modelo Gemini não conseguiu processar ou estruturar as informações deste material.");
      }

      const parsedData = JSON.parse(responseText.trim());
      return res.json(parsedData);
    } catch (err: any) {
      console.error("Erro na extração de dados do material:", err);
      return res.status(500).json({ error: err.message || "Erro de rede ao analisar o datasheet do material." });
    }
  });

  // REST API: Materials Consultant Chat
  app.post("/api/materials-chat", async (req, res) => {
    try {
      if (!apiKey) {
        throw new Error("A chave GEMINI_API_KEY não está configurada no ambiente. Adicione-a na aba de Secrets.");
      }

      const { message, history } = req.body;

      if (!message) {
        return res.status(400).json({ error: "Nenhuma mensagem enviada." });
      }

      // Format incoming history to match GoogleGenAI format helper
      // `{ role: string, parts: [{ text: string }] }`
      const formattedHistory = (history || []).map((msg: any) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content || msg.text || "" }],
      }));

      const chat = ai.chats.create({
        model: "gemini-3.5-flash",
        config: {
          systemInstruction: `Você é um professor catedrático e consultor especialista em Ciência dos Materiais e Engenharia Mecânica.
          Seu foco exclusivo é apoiar pesquisas sobre Compósitos Poliméricos (especialmente com matriz de ABS) reforçados com ligas de metais em partículas ou fibras curtas/contínuas (Aço 1020, Aço 1045, Alumínio, Inox 316).
          Você domina com maestria:
          - A Lei de Misturas (comportamento de limites superiores de Voigt [carregamento isodeformação] e modelo de Reuss [limite inferior, isotensão])
          - Propriedades físicas e mecânicas do ABS (polímero Amorfo, condutividade, módulo de elasticidade E ≈ 2-3 GPa, limite de escoamento ≈ 40 MPa, densidade ≈ 1.04-1.07 g/cm³)
          - Propriedades do Aço 1020 (E ≈ 205 GPa, Resistência à Tração pífia/moderada ≈ 420 MPa, densidade ≈ 7.87 g/cm³)
          - Propriedades do Aço 1045 (E ≈ 206 GPa, Resistência ≈ 585 MPa, maior teor de carbono, dureza superior, densidade ≈ 7.85 g/cm³)
          - Propriedades do Alumínio (E ≈ 69 GPa, leveza ≈ 2.7 g/cm³, alta manufaturabilidade e condutividade térmica)
          - Propriedades do Inox 316 (E ≈ 193 GPa, Resistência ≈ 515 MPa, excelente resistência contra corrosão, densidade ≈ 8.0 g/cm³)
          - Modelos micro-estruturais (Halpin-Tsai, fatores de orientação de fibras curtas, cálculo empírico de escoamento e densidade do compósito)

          Responda SEMPRE em português (do Brasil), adotando um tom profundamente pedagógico, estimulante, rigoroso, porém muito acessível e moderno.
          Use listas, tabelas e equações formatadas em Markdown sempre que enriquecer a resposta teórica ou prática do aluno.`,
        },
        history: formattedHistory,
      });

      const response = await chat.sendMessage({ message: message });
      const responseText = response.text;

      return res.json({ text: responseText });
    } catch (err: any) {
      console.error("Erro no chat de simulação:", err);
      return res.status(500).json({ error: err.message || "Falha ao processar solicitação no consultor de IA." });
    }
  });

  // Serve static assets and Vite development middleware
  if (process.env.NODE_ENV !== "production") {
    // Development mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite Development Middleware montado com sucesso.");
  } else {
    // Production mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log(`Modo de Produção ativado. Servindo arquivos de: ${distPath}`);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Falha fatal na inicialização do servidor:", err);
});
