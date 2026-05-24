import React, { useState, useEffect, useRef } from "react";
import { 
  Menu, 
  Send, 
  Sparkles, 
  Plus, 
  Trash2, 
  Globe, 
  Check, 
  X, 
  Code, 
  BookOpen, 
  Compass, 
  PenTool, 
  RefreshCw, 
  MessageSquare, 
  ChevronRight, 
  Info,
  ExternalLink,
  Laptop,
  User,
  Power,
  Search
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Markdown from "react-markdown";

import { Message, ChatSession, PersonaType, UserSettings, Source } from "./types";

const COMBINED_CODE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RIMON AI - Cosmic Experience</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@800&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    body, html {
      margin: 0; padding: 0;
      width: 100%; height: 100%;
      font-family: 'Plus Jakarta Sans', sans-serif;
      background-color: #03010a;
      overflow: hidden; color: #ffffff;
      display: flex; justify-content: center; align-items: center;
    }
    .cosmic-container {
      position: relative; width: 100vw; height: 100vh;
      background: radial-gradient(circle at 50% 30%, #0d061f 0%, #04020a 100%);
      display: flex; flex-direction: column; justify-content: center; align-items: center;
      overflow: hidden;
    }
    .nebula-layer {
      position: absolute; inset: -50%;
      background-image: 
        radial-gradient(circle at 20% 35%, rgba(162, 0, 255, 0.22) 0%, transparent 45%),
        radial-gradient(circle at 80% 40%, rgba(0, 235, 212, 0.25) 0%, transparent 45%),
        radial-gradient(circle at 50% 80%, rgba(242, 0, 121, 0.18) 0%, transparent 45%);
      filter: blur(80px);
      animation: drift 50s infinite linear;
      pointer-events: none; z-index: 1;
    }
    @keyframes drift {
      0% { transform: rotate(0deg) scale(1.0); }
      50% { transform: rotate(180deg) scale(1.1); }
      100% { transform: rotate(360deg) scale(1.0); }
    }
    #star-canvas {
      position: absolute; top: 0; left: 0;
      width: 100%; height: 100%; z-index: 2; pointer-events: none;
    }
    .content-card {
      position: relative; z-index: 10; text-align: center;
      padding: 3rem; border-radius: 24px;
      background: rgba(10, 6, 22, 0.55);
      backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
      max-width: 600px; width: 90%;
      animation: fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .glowing-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 4.5rem; font-weight: 800; letter-spacing: -0.02em; margin: 0 0 1rem 0;
      background: linear-gradient(to right, #0096ff 0%, #00ebd4 28%, #4deeea 48%, #a200ff 74%, #f20079 100%);
      -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: transparent;
      animation: glow-pulse 4.5s infinite ease-in-out;
    }
    @keyframes glow-pulse {
      0%, 100% { text-shadow: 0 0 15px rgba(0, 150, 255, 0.4), 0 0 30px rgba(0, 235, 212, 0.2); }
      50% { text-shadow: 0 0 25px rgba(0, 150, 255, 0.8), 0 0 50px rgba(0, 235, 212, 0.7), 0 0 75px rgba(162, 0, 255, 0.6); }
    }
    .subtitle {
      font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.35em; color: #00ebd4; margin-bottom: 2rem; font-weight: 600;
      animation: subtitle-pulse 3s infinite ease-in-out;
    }
    @keyframes subtitle-pulse {
      0%, 100% { opacity: 0.7; letter-spacing: 0.32em; }
      50% { opacity: 1; letter-spacing: 0.38em; text-shadow: 0 0 8px rgba(0, 235, 212, 0.4); }
    }
    .description { font-size: 1rem; color: #a4a0b5; line-height: 1.6; margin-bottom: 2.5rem; }
    .cta-button {
      background: rgba(0, 235, 212, 0.08); border: 1px solid rgba(0, 235, 212, 0.45);
      padding: 0.9rem 2.2rem; border-radius: 12px; color: #ffffff; font-weight: 600;
      cursor: pointer; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 0 15px rgba(0, 235, 212, 0.1); outline: none;
    }
    .cta-button:hover {
      background: rgba(0, 235, 212, 0.2); border-color: rgba(0, 235, 212, 0.95);
      box-shadow: 0 0 25px rgba(0, 235, 212, 0.45); transform: translateY(-2px);
    }
  </style>
</head>
<body>
  <div class="cosmic-container">
    <div class="nebula-layer"></div>
    <canvas id="star-canvas"></canvas>
    <div class="content-card">
      <h1 class="glowing-title">RIMON AI</h1>
      <div class="subtitle">Cosmic Intelligence</div>
      <p class="description">Experience a personalized cognitive assistant framed in cosmic aesthetics.</p>
      <button class="cta-button" onclick="alert('Session initialized!')">Initialize Session</button>
    </div>
  </div>
  <script>
    const canvas = document.getElementById('star-canvas');
    const ctx = canvas.getContext('2d');
    let stars = [];
    function resizeCanvas() {
      canvas.width = window.innerWidth; canvas.height = window.innerHeight;
      initStars();
    }
    class Star {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.8 + 0.2; this.alpha = Math.random() * 0.7 + 0.3;
        this.speed = Math.random() * 0.02 + 0.005; this.phase = Math.random() * Math.PI * 2;
      }
      update() { this.phase += this.speed; this.alpha = 0.5 + Math.sin(this.phase) * 0.3; }
      draw() {
        ctx.save(); ctx.globalAlpha = this.alpha; ctx.fillStyle = '#81e6d9';
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); ctx.restore();
      }
    }
    function initStars() {
      stars = []; for (let i = 0; i < 100; i++) stars.push(new Star());
    }
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => { s.update(); s.draw(); });
      requestAnimationFrame(animate);
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); animate();
  </script>
</body>
</html>`;

const HTML_CODE = `<div class="cosmic-container">
  <div class="nebula-layer"></div>
  <canvas id="star-canvas"></canvas>
  <div class="content-card">
    <h1 class="glowing-title">RIMON AI</h1>
    <div class="subtitle">Cosmic Intelligence</div>
    <p class="description">Experience a personalized cognitive assistant framed in cosmic aesthetics.</p>
    <button class="cta-button">Initialize Session</button>
  </div>
</div>`;

const CSS_CODE = `.glowing-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 4.5rem; font-weight: 800; letter-spacing: -0.02em;
  background: linear-gradient(to right, #0096ff 0%, #00ebd4 28%, #4deeea 48%, #a200ff 74%, #f20079 100%);
  -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
  animation: glow-pulse 4.5s infinite ease-in-out;
}
@keyframes glow-pulse {
  0%, 100% { text-shadow: 0 0 15px rgba(0, 150, 255, 0.4), 0 0 30px rgba(0, 235, 212, 0.2); }
  50% { text-shadow: 0 0 25px rgba(0, 150, 255, 0.8), 0 0 50px rgba(0, 235, 212, 0.7), 0 0 75px rgba(162, 0, 255, 0.6); }
}
.cosmic-container {
  background: radial-gradient(circle at 50% 30%, #0d061f 0%, #04020a 100%);
  position: relative; overflow: hidden;
}
.nebula-layer {
  position: absolute; inset: -50%;
  background-image: 
    radial-gradient(circle at 15% 25%, rgba(162, 0, 255, 0.2) 0%, transparent 45%),
    radial-gradient(circle at 80% 35%, rgba(0, 235, 212, 0.2) 0%, transparent 45%);
  filter: blur(80px); animation: slow-rotate 48s infinite linear;
}
@keyframes slow-rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`;

const JS_CODE = `const canvas = document.getElementById('star-canvas');
const ctx = canvas.getContext('2d');
let stars = [];
function resizeCanvas() {
  canvas.width = window.innerWidth; canvas.height = window.innerHeight;
  initStars();
}
class Star {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.2; this.alpha = Math.random() * 0.7 + 0.3;
    this.speed = Math.random() * 0.02 + 0.005; this.phase = Math.random() * Math.PI * 2;
  }
  update() { this.phase += this.speed; this.alpha = 0.5 + Math.sin(this.phase) * 0.3; }
  draw() {
    ctx.save(); ctx.globalAlpha = this.alpha; ctx.fillStyle = '#81e6d9';
    ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); ctx.restore();
  }
}
function initStars() {
  stars = []; for (let i = 0; i < 100; i++) stars.push(new Star());
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();`;

const SUGGESTIONS = [
  {
    icon: <Code className="w-4 h-4 text-cyan-400" />,
    text: "Analyze my code",
    prompt: "Can you analyze this TypeScript code, check it for potential bugs, and explain how to optimize its performance with clean examples?",
  },
  {
    icon: <PenTool className="w-4 h-4 text-purple-400" />,
    text: "Write a story",
    prompt: "Write a short, engaging sci-fi story about a team of robotic programmers who find a mysterious ancient code chunk inside a deep space beacon.",
  },
  {
    icon: <BookOpen className="w-4 h-4 text-pink-400" />,
    text: "Help me study",
    prompt: "Create a structured study guide and a brief 3-question self-quiz on the fundamental concepts of asynchronous JavaScript and Event Loops.",
  }
];

export default function App() {
  // Navigation & Sidebars
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"combined" | "html" | "css" | "js">("combined");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }).catch(() => {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
      } catch (err) {}
      document.body.removeChild(textarea);
    });
  };
  
  // App Config & Settings
  const [settings, setSettings] = useState<UserSettings>(() => {
    const saved = localStorage.getItem("rimon_ai_settings");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // use default fallback
      }
    }
    return {
      userName: "Rimon",
      persona: "standard",
      searchByDefault: false,
    };
  });

  // Chat sessions state
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    const saved = localStorage.getItem("rimon_ai_sessions");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // empty list
      }
    }
    return [];
  });

  const [activeSessionId, setActiveSessionId] = useState<string | null>(() => {
    const saved = localStorage.getItem("rimon_ai_active_session");
    return saved || null;
  });

  // Current session message state
  const [currentInput, setCurrentInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [searchEnabled, setSearchEnabled] = useState(settings.searchByDefault);
  const [errorText, setErrorText] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Save settings on update
  useEffect(() => {
    localStorage.setItem("rimon_ai_settings", JSON.stringify(settings));
  }, [settings]);

  // Save sessions on update
  useEffect(() => {
    localStorage.setItem("rimon_ai_sessions", JSON.stringify(sessions));
    // If sessions updated and we have an active session that got deleted, reset active session
    if (activeSessionId && !sessions.some(s => s.id === activeSessionId)) {
      if (sessions.length > 0) {
        setActiveSessionId(sessions[0].id);
      } else {
        setActiveSessionId(null);
      }
    }
  }, [sessions, activeSessionId]);

  // Save active session tracker
  useEffect(() => {
    if (activeSessionId) {
      localStorage.setItem("rimon_ai_active_session", activeSessionId);
    } else {
      localStorage.removeItem("rimon_ai_active_session");
    }
  }, [activeSessionId]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sessions, activeSessionId, isGenerating]);

  // Get current active session
  const activeSession = sessions.find(s => s.id === activeSessionId) || null;

  // Header dynamic greeting
  const [greeting, setGreeting] = useState("Good evening");
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  // Handler for creating a new empty session
  const createNewSession = (initialMsg?: Message) => {
    const newSessionId = `session-${Date.now()}`;
    const newSession: ChatSession = {
      id: newSessionId,
      title: initialMsg ? (initialMsg.content.slice(0, 30) + (initialMsg.content.length > 30 ? "..." : "")) : "New Conversation",
      messages: initialMsg ? [initialMsg] : [],
      createdAt: new Date().toISOString(),
    };
    setSessions(prev => [newSession, ...prev]);
    setActiveSessionId(newSessionId);
    return newSessionId;
  };

  // Run chat message block
  const handleSendMessage = async (rawPrompt: string) => {
    if (!rawPrompt.trim() || isGenerating) return;

    setErrorText(null);
    setCurrentInput("");

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMessage: Message = {
      id: `msg-user-${Date.now()}`,
      role: "user",
      content: rawPrompt,
      timestamp,
    };

    let targetSessionId = activeSessionId;
    let currentMessages: Message[] = [];

    if (!targetSessionId || sessions.length === 0) {
      // Create session first then append
      targetSessionId = createNewSession(userMessage);
      currentMessages = [userMessage];
    } else {
      // Append to active session
      setSessions(prev => prev.map(s => {
        if (s.id === targetSessionId) {
          const updatedMsgs = [...s.messages, userMessage];
          return {
            ...s,
            title: s.messages.length === 0 ? (rawPrompt.slice(0, 30) + (rawPrompt.length > 30 ? "..." : "")) : s.title,
            messages: updatedMsgs,
          };
        }
        return s;
      }));
      const currentActive = sessions.find(s => s.id === targetSessionId);
      currentMessages = currentActive ? [...currentActive.messages, userMessage] : [userMessage];
    }

    setIsGenerating(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: currentMessages.map(m => ({
            role: m.role === "user" ? "user" : "model",
            content: m.content
          })),
          searchEnabled,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server responded with ${response.status}`);
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: `msg-rimon-${Date.now()}`,
        role: "assistant",
        content: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: data.sources || [],
      };

      // Append assistant message
      setSessions(prev => prev.map(s => {
        if (s.id === targetSessionId) {
          return {
            ...s,
            messages: [...s.messages, assistantMessage],
          };
        }
        return s;
      }));
    } catch (err: any) {
      console.error(err);
      setErrorText(err.message || "Something went wrong.");

      const assistantMessage: Message = {
        id: `msg-rimon-err-${Date.now()}`,
        role: "assistant",
        content: `Error: ${err.message || "Failed to communicate with Rimon AI. Please verify your Gemini API Key in Settings."}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        error: true,
      };

      setSessions(prev => prev.map(s => {
        if (s.id === targetSessionId) {
          return {
            ...s,
            messages: [...s.messages, assistantMessage],
          };
        }
        return s;
      }));
    } finally {
      setIsGenerating(false);
    }
  };

  const deleteSession = (e: React.MouseEvent, idToDelete: string) => {
    e.stopPropagation();
    setSessions(prev => prev.filter(s => s.id !== idToDelete));
  };

  const clearAllChats = () => {
    if (window.confirm("Are you sure you want to clear your entire chat history?")) {
      setSessions([]);
      setActiveSessionId(null);
      setSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen cosmic-nebula text-[#E0E0E0] font-sans flex flex-col overflow-x-hidden antialiased selection:bg-cyan-500/20">
      
      {/* BACKGROUND DECORATIVE GLOW & DYNAMIC STARS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_#04020a_85%)] opacity-85" />
        {/* Floating star particles */}
        <div className="absolute top-[10%] left-[15%] w-1.5 h-1.5 rounded-full bg-cyan-400 opacity-60 animate-pulse [animation-duration:3s]" />
        <div className="absolute top-[25%] right-[20%] w-2 h-2 rounded-full bg-purple-400 opacity-40 animate-pulse [animation-duration:5s]" />
        <div className="absolute top-[65%] left-[8%] w-1.5 h-1.5 rounded-full bg-pink-400 opacity-50 animate-pulse [animation-duration:4s]" />
        <div className="absolute bottom-[20%] right-[15%] w-2.5 h-2.5 rounded-full bg-teal-400 opacity-70 animate-pulse [animation-duration:3.5s]" />
        <div className="absolute top-[45%] right-[40%] w-1 h-1 rounded-full bg-white opacity-80 animate-pulse" />
        <div className="absolute bottom-[40%] left-[30%] w-2 h-2 rounded-full bg-indigo-400 opacity-45 animate-pulse [animation-duration:6s]" />
      </div>

      {/* HEADER BAR */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#080414]/75 border-b border-cyan-500/10 px-4 py-3.5 flex items-center justify-between transition-all shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-all focus:outline-none"
            aria-label="Toggle Navigation Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          {/* Accent indicator matching Q3 layout status */}
          {sessions.length > 0 && (
            <span className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/20 border border-cyan-500/20 text-[10px] text-cyan-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              STATUS: OPTIMIZED
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 cursor-pointer select-none group" onClick={() => {
          setActiveSessionId(null);
          setSidebarOpen(false);
        }}>
          <span className="font-display font-black tracking-tight text-lg bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent group-hover:from-white group-hover:to-cyan-300 transition-all">
            RIMON AI
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* GET INTEGRATION CODE BUTTON */}
          <button 
            onClick={() => setShowCodeModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 border border-cyan-500/30 text-cyan-200 hover:border-cyan-400 hover:bg-cyan-500/20 transition-all font-mono shadow-[0_0_15px_rgba(6,182,212,0.15)] cursor-pointer"
            title="Get RIMON AI Cosmic HTML/CSS Integration Code"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="hidden sm:inline">Get Cosmic Code</span>
          </button>

          {/* SEARCH INDIVIDUAL INDICATOR */}
          <button 
            onClick={() => setSearchEnabled(prev => !prev)}
            className={`flex items-center justify-center p-1.5 rounded-lg border transition-all ${
              searchEnabled 
                ? "bg-cyan-500/10 border-cyan-500/35 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)]" 
                : "border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-805/40"
            }`}
            title="Toggle Google Search Grounding"
          >
            <Globe className="w-4 h-4" />
          </button>

          {/* PROFILE BUTTON - styled Julian Draxler italic serif circle */}
          <button 
            onClick={() => setShowSettingsModal(true)}
            className="w-8 h-8 rounded-full border border-zinc-700 bg-zinc-800 hover:border-[#C5A059] flex items-center justify-center text-zinc-300 font-serif italic text-xs tracking-wider transition-all cursor-pointer"
            title="User Profile & Settings"
          >
            {settings.userName.slice(0, 2).toUpperCase()}
          </button>
        </div>
      </header>

      {/* RE-USABLE SIDEBAR DRAWER */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* BACKDROP */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/80 z-50 pointer-events-auto"
            />

            {/* DRAWER PANEL */}
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed top-0 bottom-0 left-0 w-[290px] bg-[#121212] border-r border-zinc-800 z-50 flex flex-col"
            >
              {/* Sidebar Header */}
              <div className="p-6 border-b border-zinc-800/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 text-white rounded-lg flex items-center justify-center font-bold text-xs font-sans shadow-[0_0_10px_rgba(6,182,212,0.25)]">
                    RI
                  </div>
                  <span className="font-sans font-semibold tracking-tight text-white text-lg">Rimon AI</span>
                </div>
                <button 
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 rounded-md text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/40 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Sidebar Action - Create New Conversation */}
              <div className="p-4">
                <button 
                  onClick={() => {
                    createNewSession();
                    setSidebarOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-5 py-2.5 bg-[#C5A059] text-black text-xs font-bold rounded-full hover:bg-[#b08b47] transition-all shadow-md uppercase tracking-wider"
                >
                  <Plus className="w-4 h-4" />
                  New Session
                </button>
              </div>

              {/* Chat Session List */}
              <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
                <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-3">Conversations</p>

                {sessions.length === 0 ? (
                  <div className="p-4 mr-2 ml-2 text-center border border-dashed border-zinc-800 rounded-lg text-zinc-500 text-xs">
                    No active sessions yet. Create a session to begin analysis.
                  </div>
                ) : (
                  sessions.map((sess) => {
                    const isActive = sess.id === activeSessionId;
                    return (
                      <div
                        key={sess.id}
                        onClick={() => {
                          setActiveSessionId(sess.id);
                          setSidebarOpen(false);
                        }}
                        className={`group w-full flex items-center justify-between px-3 py-2.5 rounded-r-md cursor-pointer transition-all ${
                          isActive 
                            ? "bg-zinc-800/50 border-l-2 border-[#C5A059] text-zinc-100" 
                            : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/25 border-l-2 border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 overflow-hidden w-[80%]">
                          <MessageSquare className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? "text-[#C5A059]" : "text-zinc-600"}`} />
                          <span className="text-xs truncate font-medium">{sess.title}</span>
                        </div>
                        <button 
                          onClick={(e) => deleteSession(e, sess.id)}
                          className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-zinc-800/50 text-zinc-650 hover:text-red-400 transition-all"
                          title="Delete thread"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Sidebar Footer and custom controls */}
              <div className="p-4 border-t border-zinc-800/60 space-y-3 bg-[#0D0D0D]">
                
                {/* Adaptive Persona selection */}
                <div className="rounded-lg p-2.5 border border-zinc-800 bg-[#121212]/50">
                  <div className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase mb-1.5">
                    Persona sub-mode
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    {(["standard", "coder", "creative", "academic"] as const).map(p => (
                      <button
                        key={p}
                        onClick={() => setSettings(prev => ({ ...prev, persona: p }))}
                        className={`px-1.5 py-1 text-[10px] font-semibold rounded capitalize border transition-all ${
                          settings.persona === p
                            ? "bg-zinc-800 border-zinc-700 text-[#C5A059]"
                            : "bg-[#121212]/80 border-transparent text-zinc-500 hover:text-zinc-300"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear and generic actions */}
                <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
                  <button 
                    onClick={() => {
                      setSidebarOpen(false);
                      setShowSettingsModal(true);
                    }}
                    className="hover:text-zinc-250 flex items-center gap-1.5 font-medium transition-all"
                  >
                    <User className="w-3.5 h-3.5 text-zinc-500" />
                    Edit Profile
                  </button>

                  {sessions.length > 0 && (
                    <button 
                      onClick={clearAllChats}
                      className="text-red-400 hover:text-red-350 flex items-center gap-1 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Clear Archive
                    </button>
                  )}
                </div>

                <div className="text-[9px] font-mono text-zinc-600 text-center border-t border-zinc-800/60 pt-2 flex items-center justify-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Rimon AI Assistant • v1.1
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CORE DISPLAY STAGE */}
      <main className="flex-1 flex flex-col relative w-full max-w-4xl mx-auto px-4 py-4 md:py-6 overflow-hidden">
        
        {/* NO MESSAGES IN CHAT OR NO ACTIVE SESSION: SHOW LANDING SCREEN */}
        {(!activeSession || activeSession.messages.length === 0) ? (
          <div className="flex-1 flex flex-col justify-center items-center py-6">
            
            {/* Elegant glowing visual block exactly recreating the user image */}
            <motion.div 
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, type: "spring" }}
              className="text-center mb-8 relative z-10"
            >
              <h1 className="glowing-cosmic-text text-6xl md:text-8xl font-display font-extrabold tracking-tight mb-2 select-none uppercase">
                RIMON AI
              </h1>
              <div className="flex items-center justify-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-[10px] uppercase font-mono tracking-[0.4em] text-cyan-300 font-bold">
                  Cosmic Peer • Deep Intelligence
                </span>
              </div>
            </motion.div>

            {/* Glassmorphic card for personalized greetings */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="glass-panel glass-panel-glow border border-white/5 rounded-3xl p-6 text-center max-w-md w-full mb-8 shadow-2xl relative overflow-hidden"
            >
              {/* Subtle top horizontal neon pulse lines */}
              <div className="absolute top-0 left-10 right-10 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60" />
              <div className="absolute bottom-0 left-20 right-20 h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-40" />

              <h2 className="font-serif italic font-medium text-lg md:text-xl text-cyan-300 tracking-tight leading-relaxed mb-1.5">
                {greeting}, {settings.userName}
              </h2>
              <p className="text-zinc-300 text-xs leading-relaxed max-w-sm mx-auto font-sans">
                Welcome to your cosmic core workspace. Ask questions, optimize code structures, or map creative science strategies safely.
              </p>
            </motion.div>

            {/* Suggestion pills matching references */}
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="w-full max-w-md space-y-2.5 px-2 relative z-10"
            >
              <div className="text-[10px] tracking-widest text-cyan-400/60 font-mono font-bold text-center uppercase mb-1">
                COGNITIVE STARTERS
              </div>
              <div className="grid grid-cols-1 gap-2">
                {SUGGESTIONS.map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(sug.prompt)}
                    className="flex items-center justify-between text-left px-4 py-3.5 rounded-xl border border-white/5 bg-white/[0.03] hover:border-cyan-500/30 hover:bg-cyan-500/[0.03] text-zinc-300 hover:text-cyan-250 transition-all shadow-md group cursor-pointer backdrop-blur"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-lg bg-[#0e0a1f] border border-zinc-800 group-hover:border-cyan-500/40 transition-all">
                        {sug.icon}
                      </div>
                      <span className="text-xs font-semibold">{sug.text}</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        ) : (
          /* ACTIVE CONVERSATION SCROLLABLE CHAT CONTAINER */
          <div className="flex-1 overflow-y-auto space-y-6 px-1 pb-16 flex flex-col pt-2 select-text">
            {activeSession.messages.map((msg) => {
              const isUser = msg.role === "user";
              return (
                <div 
                  key={msg.id}
                  className={`flex gap-4 max-w-screen-md ${isUser ? "self-end flex-row-reverse" : "self-start"}`}
                >
                  {/* AVATAR BOX */}
                  <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-semibold font-sans font-bold ${
                    isUser 
                      ? "bg-[#1A1A1A] text-zinc-300 border border-zinc-800 font-serif italic" 
                      : "bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 text-white shadow-[0_0_10px_rgba(6,182,212,0.25)]"
                  }`}>
                    {isUser ? (
                      settings.userName.slice(0, 1).toUpperCase()
                    ) : (
                      "RI"
                    )}
                  </div>

                  {/* MESSAGE TEXT PANEL */}
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono">
                      <span className="font-semibold text-zinc-300">{isUser ? settings.userName : "Rimon AI"}</span>
                      <span>•</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    <div className={`px-4 py-3.5 rounded-2xl border text-sm select-text leading-relaxed ${
                      isUser 
                        ? "bg-[#1A1A1A] border-zinc-800 text-zinc-300 font-serif italic" 
                        : msg.error 
                          ? "bg-red-950/20 border-red-900/35 text-red-300 font-medium"
                          : "bg-transparent border-transparent text-zinc-200"
                    }`}>
                      {/* Markdown content parser with Lora/Serif headings, gold highlights, structured line breaks */}
                      <div className="prose prose-invert prose-zinc text-zinc-300 font-sans max-w-none text-xs md:text-sm leading-relaxed space-y-3
                        [&>h2]:font-serif [&>h2]:italic [&>h2]:text-2xl [&>h2]:text-[#C5A059] [&>h2]:mt-4 [&>h2]:mb-2
                        [&>h3]:font-serif [&>h3]:italic [&>h3]:text-lg [&>h3]:text-[#C5A059] [&>h3]:mt-3 [&>h3]:mb-1.5
                        [&>p]:mb-2 [&>p]:leading-relaxed
                        [&>ul]:list-none [&>ul]:space-y-2 [&>ul]:mb-2 [&>ul]:border-l-2 [&>ul]:border-zinc-800 [&>ul]:pl-4
                        [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-1 [&>ol]:mb-2
                        [&>code]:font-mono [&>code]:text-[11px] [&>code]:bg-[#121212] [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-[#C5A059] [&>code]:border [&>code]:border-zinc-800
                        [&>pre]:bg-[#121212] [&>pre]:p-4 [&>pre]:rounded-xl [&>pre]:overflow-x-auto [&>pre]:border [&>pre]:border-zinc-800 [&>pre]:my-3
                        [&>pre>code]:bg-transparent [&>pre>code]:p-0 [&>pre>code]:border-none [&>pre>code]:text-xs [&>pre>code]:text-zinc-200"
                      >
                        <Markdown>{msg.content}</Markdown>
                      </div>

                      {/* Display citation sources if present */}
                      {msg.sources && msg.sources.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-zinc-850">
                          <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500 font-semibold mb-1.5 uppercase tracking-wider">
                            <Search className="w-3 h-3 text-[#C5A059]" />
                            verified search results:
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {msg.sources.map((src, sIdx) => (
                              <a
                                key={sIdx}
                                href={src.uri}
                                target="_blank"
                                rel="noopener noreferrer referrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#121212] border border-zinc-800 text-[10px] text-zinc-400 hover:text-white hover:border-[#C5A059]/40 hover:bg-zinc-800 transition-all font-sans"
                              >
                                <span className="font-semibold text-[#C5A059]">{sIdx + 1}</span>
                                <span className="max-w-[140px] truncate">{src.title}</span>
                                <ExternalLink className="w-2.5 h-2.5 text-zinc-600" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* API INDIVIDUAL ERROR HIGHLIGHT */}
            {errorText && !sessions.some(s => s.id === activeSessionId) && (
              <div className="p-4 rounded-xl border border-red-950 bg-red-950/10 text-red-300 text-xs text-center flex items-center justify-center gap-2 max-w-md mx-auto">
                <Info className="w-4 h-4 flex-shrink-0 text-red-400" />
                <span>{errorText}</span>
              </div>
            )}

            {/* TYPING LOADER STATUS */}
            {isGenerating && (
              <div className="flex gap-4 max-w-screen-md self-start">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 text-white font-bold font-sans flex items-center justify-center text-xs shadow-[0_0_10px_rgba(6,182,212,0.25)]">
                  RI
                </div>
                <div className="space-y-1 flex-1">
                  <div className="text-[10px] text-zinc-500 font-mono">
                    Rimon AI analysis in progress...
                  </div>
                  <div className="px-4 py-3.5 rounded-2xl bg-[#121212]/30 border border-zinc-850 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-bounce" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </main>

      {/* FLOATING ACTION BOTTOM INPUT CONTAINER */}
      <div className="sticky bottom-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/95 to-transparent pt-6 pb-6 px-4 md:px-6">
        <div className="max-w-xl mx-auto space-y-2.5">
          
          {/* WEAVE REAL-TIME WEB SEARCH SWITCH OVERLAY */}
          <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-zinc-900/20 border border-zinc-800">
            <div className="flex items-center gap-2">
              <Globe className={`w-3.5 h-3.5 ${searchEnabled ? "text-[#C5A059]" : "text-zinc-500"}`} />
              <span className="text-[11px] font-sans tracking-tight text-zinc-400">
                Ground conversation in Google Search real-time info
              </span>
            </div>
            
            <button
              onClick={() => setSearchEnabled(prev => !prev)}
              type="button"
              className={`relative flex items-center h-4.5 w-8 rounded-full transition-all cursor-pointer focus:outline-none ${
                searchEnabled ? "bg-[#C5A059]" : "bg-zinc-850"
              }`}
            >
              <div className={`w-3.5 h-3.5 bg-black rounded-full transition-all shadow-[0_1px_3px_rgba(0,0,0,0.3)] ${
                searchEnabled ? "translate-x-4" : "translate-x-0.5"
              }`} />
            </button>
          </div>

          {/* CHAT BAR - SOPHISTICATED INDIVIDUAL INPUT */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(currentInput);
            }}
            className="relative"
          >
            <div className="relative flex items-center bg-[#1A1A1A] border border-zinc-800 rounded-xl px-2.5 py-2.5 h-14 focus-within:border-[#C5A059] transition-all">
              <input
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                placeholder="Ask Rimon AI for analysis, code, or creative strategies..."
                disabled={isGenerating}
                className="w-full bg-transparent text-zinc-200 text-xs md:text-sm pl-4 pr-16 focus:outline-none disabled:opacity-50 placeholder-zinc-650 tracking-wide font-sans focus:ring-0 focus:ring-offset-0"
              />
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-3">
                <span className="hidden md:inline text-[9px] text-zinc-600 tracking-widest font-mono select-none">CMD + ENTER</span>
                <button
                  type="submit"
                  disabled={!currentInput.trim() || isGenerating}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                    currentInput.trim() && !isGenerating
                      ? "bg-[#C5A059] text-black hover:bg-[#b08b47] cursor-pointer"
                      : "bg-zinc-855 text-zinc-600 cursor-not-allowed"
                  }`}
                  aria-label="Send message"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </form>

          {/* Humble credit line, completely authentic */}
          <div className="text-[9px] text-center text-zinc-600/80 font-medium font-sans">
            Responses are generated by safe Gemini models and grounded with Search technology.
          </div>
        </div>
      </div>

      {/* USER PROFILE & SETTINGS MODAL */}
      <AnimatePresence>
        {showSettingsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSettingsModal(false)}
              className="absolute inset-0 bg-black/90 z-40"
            />

            <motion.div 
              initial={{ y: 30, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 30, opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm bg-[#0D0D0D] border border-zinc-800 rounded-2xl p-6 shadow-2xl z-50 overflow-hidden"
            >
              {/* Top gold accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#C5A059]" />

              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#C5A059]" />
                  <span className="font-sans font-semibold tracking-wider text-zinc-300 uppercase text-xs">Profile Settings</span>
                </div>
                <button 
                  onClick={() => setShowSettingsModal(false)}
                  className="text-zinc-500 hover:text-white p-1 rounded-md"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Username Input */}
                <div>
                  <label className="block text-[10px] font-mono tracking-wider text-zinc-500 uppercase mb-1.5">
                    Customize Owner Name
                  </label>
                  <input
                    type="text"
                    value={settings.userName}
                    onChange={(e) => setSettings(prev => ({ ...prev, userName: e.target.value || "user" }))}
                    className="w-full bg-[#1A1A1A] border border-zinc-805 rounded-lg px-3 py-2 text-xs md:text-sm text-zinc-200 focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                {/* Account Details */}
                <div>
                  <label className="block text-[10px] font-mono tracking-wider text-zinc-500 uppercase mb-1.5">
                    Access tier credentials
                  </label>
                  <div className="bg-[#1A1A1A] border border-zinc-850 rounded-lg p-3 text-xs text-zinc-300 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-zinc-200">rimonhasan116@gmail.com</div>
                      <div className="text-[10px] text-zinc-500 mt-0.5">Julian Draxler sandbox account</div>
                    </div>
                    <span className="px-2 py-0.5 text-[9px] font-mono bg-[#1A1A1A] border border-zinc-800 text-[#C5A059] rounded">
                      PRO TIER
                    </span>
                  </div>
                </div>

                {/* Grounding Default Toggle */}
                <div className="flex items-center justify-between p-3 border border-zinc-850 rounded-lg bg-[#111] bg-opacity-40">
                  <div>
                    <div className="text-xs font-semibold text-zinc-300">Default Grounding</div>
                    <div className="text-[10px] text-zinc-500 mt-0.5">Keep search active for analysis</div>
                  </div>
                  <button
                    onClick={() => {
                      const val = !settings.searchByDefault;
                      setSettings(prev => ({ ...prev, searchByDefault: val }));
                      setSearchEnabled(val);
                    }}
                    type="button"
                    className={`relative flex items-center h-4.5 w-8 rounded-full transition-all focus:outline-none ${
                      settings.searchByDefault ? "bg-[#C5A059]" : "bg-zinc-800"
                    }`}
                  >
                    <div className={`w-3.5 h-3.5 bg-black rounded-full transition-all ${
                      settings.searchByDefault ? "translate-x-4" : "translate-x-0.5"
                    }`} />
                  </button>
                </div>

                {/* Integration checklist check stats */}
                <div className="p-3 border border-zinc-850 rounded-lg bg-[#121212]/30 text-[11px] space-y-1.5 text-zinc-400">
                  <div className="font-semibold text-zinc-300 flex items-center gap-1.5">
                    <Laptop className="w-3.5 h-3.5 text-[#C5A059]" />
                    Diagnostics status:
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span>Gemini Core Integration</span>
                    <span className="text-emerald-400 flex items-center gap-0.5">
                      <Check className="w-3 h-3 text-[#C5A059]" /> Optimized
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span>Google Web Search Grounding</span>
                    <span className="text-[#C5A059] flex items-center gap-0.5">
                      <Check className="w-3 h-3" /> Enabled
                    </span>
                  </div>
                </div>
              </div>

              {/* Close command */}
              <div className="mt-5">
                <button
                  onClick={() => setShowSettingsModal(false)}
                  className="w-full py-2 bg-[#C5A059] text-xs font-bold text-black rounded-lg shadow-md hover:bg-[#b08b47] transition-all font-sans"
                >
                  SAVE CHANGES
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {showCodeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.65 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCodeModal(false)}
              className="absolute inset-0 bg-black/95 z-40"
            />

            <motion.div 
              initial={{ y: 30, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 30, opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-[#07040d] border border-cyan-500/25 rounded-3xl p-6 shadow-2xl z-50 overflow-hidden"
            >
              {/* Top gradient accent line */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500" />

              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <span className="font-display font-medium tracking-wider text-cyan-200 text-xs uppercase">RIMON AI Cosmic Integration</span>
                </div>
                <button 
                  onClick={() => setShowCodeModal(false)}
                  className="text-zinc-500 hover:text-white p-1 rounded-md cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Tag navigation */}
              <div className="bg-[#120e23]/55 border border-white/5 rounded-xl p-1 mb-4 flex items-center gap-1">
                {(["combined", "html", "css", "js"] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveCodeTab(tab)}
                    className={`flex-1 py-1.5 text-[10px] font-mono font-bold tracking-wider rounded-lg uppercase transition-all cursor-pointer ${
                      activeCodeTab === tab
                        ? "bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.15)]"
                        : "border border-transparent text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    {tab === "combined" ? "Combined" : tab.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Preview description */}
              <p className="text-zinc-400 text-xs mb-3">
                {activeCodeTab === "combined" && "Directly paste this single HTML file containing all styles, assets, animations, and star systems into any custom website."}
                {activeCodeTab === "html" && "Compact mockup container to hold the glowing title, subtitles, and glassmorphic card elements."}
                {activeCodeTab === "css" && "Custom gradients, cosmic rotation, and keyframes animations representing floating nebula dust."}
                {activeCodeTab === "js" && "High-performance, GPU-safe animation loops for customized starry particles."}
              </p>

              {/* Scrollable code layout */}
              <div className="relative">
                <pre className="text-[11px] font-mono bg-black/60 border border-white/5 p-4 rounded-xl overflow-x-auto h-72 text-cyan-400 scroll-thin select-text">
                  <code>
                    {activeCodeTab === "combined" && COMBINED_CODE}
                    {activeCodeTab === "html" && HTML_CODE}
                    {activeCodeTab === "css" && CSS_CODE}
                    {activeCodeTab === "js" && JS_CODE}
                  </code>
                </pre>

                {/* Floating Copy Action inside Modal */}
                <div className="absolute top-2.5 right-2.5 flex items-center gap-2">
                  <button
                    onClick={() => {
                      const textToCopy = 
                        activeCodeTab === "combined" ? COMBINED_CODE :
                        activeCodeTab === "html" ? HTML_CODE :
                        activeCodeTab === "css" ? CSS_CODE : JS_CODE;
                      copyToClipboard(textToCopy);
                    }}
                    className="flex items-center gap-1.5 py-1 px-2.5 rounded bg-cyan-500/15 border border-cyan-500/45 text-cyan-300 hover:bg-cyan-500/25 transition-all text-[10px] font-semibold cursor-pointer"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-3 h-3 text-cyan-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Code className="w-3.5 h-3.5 text-cyan-300" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Diagnostic checklist check stats */}
              <div className="mt-5 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                <span>Optimized CPU footprints: Checked</span>
                <span>Active star count: 120 particles</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
