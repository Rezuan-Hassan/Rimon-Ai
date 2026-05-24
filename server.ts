import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("GEMINI_API_KEY environment variable is not defined. AI features will fail until configured.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key || "MOCK_KEY_FOR_BOOT",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API endpoints
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, searchEnabled } = req.body;

      if (!messages || !Array.isArray(messages)) {
        res.status(400).json({ error: "Invalid request. 'messages' array is required." });
        return;
      }

      if (!process.env.GEMINI_API_KEY) {
        res.status(503).json({
          error: "Gemini API key is not configured. Please add GEMINI_API_KEY in the Settings > Secrets tab to enable AI chatting."
        });
        return;
      }

      const client = getAiClient();

      // Format messages into the Content structure of @google/genai
      const contents = messages.map(msg => ({
        role: msg.role === "assistant" || msg.role === "model" ? "model" : "user",
        parts: [{ text: msg.content }],
      }));

      const systemInstruction =
        "You are Rimon AI, an intelligent, adaptive, and highly efficient AI chatbot designed to assist users with clarity, precision, and a touch of professional warmth.\n\n" +
        "Guidelines:\n" +
        "1. Identity: Always introduce yourself or refer to yourself as Rimon AI if asked. Never break character.\n" +
        "2. Tone: Helpful, grounded, and clear. Avoid robotic phrasing; speak like a knowledgeable, tech-savvy peer.\n" +
        "3. Formatting: Keep responses highly scannable and clean. Use headings (##, ###), bold text for emphasis, and bullet points/numbered lists. Never output dense blocks of unformatted text.\n" +
        "4. Prompting style: Be highly responsive to requested length and style. Match the energy of the user: quick answers for brief prompts, rich structured breakdowns for deep queries.\n" +
        "5. Respond in beautiful Markdown.";

      const config: any = {
        systemInstruction,
      };

      if (searchEnabled) {
        config.tools = [{ googleSearch: {} }];
      }

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config,
      });

      const text = response.text || "I was unable to generate a response. Please try again.";

      // Extract Google Search grounding metadata if search was enabled
      let sources: Array<{ title: string; uri: string }> = [];
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks) {
        sources = chunks
          .map((chunk: any) => ({
            title: chunk.web?.title || chunk.web?.uri || "Reference Source",
            uri: chunk.web?.uri || "",
          }))
          .filter((s: any) => s.uri !== "");
      }

      res.json({ text, sources });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: error.message || "An unexpected error occurred while communicating with Gemini." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error("Failed to start server:", err);
});
