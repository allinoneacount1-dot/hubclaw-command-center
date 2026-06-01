import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Search, Plus, Star, GitFork, Clock, Sparkles, Cpu, Activity,
  ArrowLeft, Copy, Check, Rocket, Send, Beaker, Globe, Code2,
  Github as GithubIcon, MessageSquare, Settings, Box, Layers,
  TrendingUp, Zap, AlertTriangle, CircleCheck, CircleX, ChevronDown,
} from "lucide-react";
import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid,
} from "recharts";

/* ----------------------------- Logo ----------------------------- */
function HubClawLogo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="30%" stopColor="#0ea5e9" />
          <stop offset="70%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <filter id="logo-glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Outer ring */}
      <circle cx="100" cy="100" r="60" stroke="rgba(255,255,255,0.8)" strokeWidth="8" filter="url(#logo-glow)"/>
      
      {/* Diagonal slash */}
      <rect x="30" y="150" width="150" height="12" rx="4" transform="rotate(-45 100 100)" fill="url(#logo-gradient)" filter="url(#logo-glow)"/>
      
      {/* Accent lines */}
      <line x1="30" y1="60" x2="80" y2="60" stroke="#a3e635" strokeWidth="6" strokeLinecap="round" filter="url(#logo-glow)"/>
      <line x1="140" y1="140" x2="190" y2="140" stroke="#a855f7" strokeWidth="6" strokeLinecap="round" filter="url(#logo-glow)"/>
    </svg>
  );
}

/* ----------------------------- Shared primitives ----------------------------- */

const spring = { type: "spring" as const, mass: 0.6, damping: 15, stiffness: 180 };

/* ---------------------------- Documentation Page --------------------------- */

function Documentation() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
      transition={spring}
      className="mx-auto max-w-[1400px] px-4 md:px-8 py-10"
    >
      <div className="mb-10">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">// docs · guide</div>
        <h1 className="mt-2 font-display text-4xl md:text-5xl font-semibold">
            HubClawb <span className="text-gradient-brand">Documentation</span>
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Complete guide to getting started and using HubClawb effectively.
          </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px,1fr]">
        {/* Sidebar Navigation */}
        <div className="lg:sticky lg:top-24 lg:h-fit">
          <Panel title="Table of Contents" icon={<MessageSquare className="h-4 w-4 text-[var(--cyan-glow)]" />}>
            <nav className="space-y-1">
              {[
                { id: "getting-started", label: "Getting Started" },
                { id: "dashboard", label: "Dashboard" },
                { id: "workspace", label: "Workspace" },
                { id: "agents", label: "Creating Agents" },
                { id: "analytics", label: "Analytics" },
                { id: "faq", label: "FAQ" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    const el = document.getElementById(item.id);
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </Panel>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          <section id="getting-started">
            <Panel title="Getting Started" icon={<Rocket className="h-4 w-4 text-[var(--violet-glow)]" />}>
              <div className="space-y-4 text-sm text-foreground/90">
                <p>
                  Welcome to HubClawb! Platform for creating and managing autonomous AI agents.
                </p>
                <h3 className="font-semibold text-base mt-6">Step 1: Exploring the Dashboard</h3>
                <p>
                  Open the Dashboard page to view all available agents. You can filter agents using the All, Mine, or Starred buttons.
                </p>
                <h3 className="font-semibold text-base mt-4">Step 2: Opening an Agent Workspace</h3>
                <p>
                  Click on any agent to open its Workspace. Here you can configure the agent, edit the system prompt, and test the agent in the sandbox.
                </p>
              </div>
            </Panel>
          </section>

          <section id="dashboard">
            <Panel title="Dashboard" icon={<Activity className="h-4 w-4 text-[var(--cyan-glow)]" />}>
              <div className="space-y-4 text-sm text-foreground/90">
                <p className="font-semibold text-base">Dashboard Features:</p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>Displays all available agents</li>
                  <li>Agent filters: All, Mine, or Starred</li>
                  <li>Search bar to quickly find agents</li>
                  <li>Shows star count, forks, and last update time</li>
                </ul>
              </div>
            </Panel>
          </section>

          <section id="workspace">
            <Panel title="Workspace" icon={<Code2 className="h-4 w-4 text-[var(--violet-glow)]" />}>
              <div className="space-y-4 text-sm text-foreground/90">
                <p className="font-semibold text-base">Workspace Tabs:</p>
                <ul className="space-y-4 ml-2">
                  <li>
                    <span className="font-semibold">Prompt & Config:</span> AI model configuration, temperature, max tokens, and system prompt.
                  </li>
                  <li>
                    <span className="font-semibold">Versions:</span> Agent change history.
                  </li>
                  <li>
                    <span className="font-semibold">Tools:</span> Additional tools configuration (Web Search, Python Sandbox, etc.).
                  </li>
                  <li>
                    <span className="font-semibold">Settings:</span> General agent settings and security.
                  </li>
                </ul>
                <p className="font-semibold text-base mt-4">How to Use the Sandbox:</p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>Type a message in the input box</li>
                  <li>Press Enter to send</li>
                  <li>View agent responses in the chat log</li>
                </ul>
              </div>
            </Panel>
          </section>

          <section id="agents">
            <Panel title="Creating Agents" icon={<Plus className="h-4 w-4 text-[var(--cyan-glow)]" />}>
              <div className="space-y-4 text-sm text-foreground/90">
                <p className="font-semibold text-base">Steps to Create an Agent:</p>
                <ol className="list-decimal list-inside space-y-2 ml-2">
                  <li>Determine agent name and description</li>
                  <li>Choose an AI model to use (Gemini, GPT-4, Claude, etc.)</li>
                  <li>Set temperature and max tokens</li>
                  <li>Write a clear and specific system prompt</li>
                  <li>Enable required tools</li>
                  <li>Test the agent in the sandbox</li>
                </ol>
              </div>
            </Panel>
          </section>

          <section id="analytics">
            <Panel title="Analytics" icon={<TrendingUp className="h-4 w-4 text-[var(--violet-glow)]" />}>
              <div className="space-y-4 text-sm text-foreground/90">
                <p className="font-semibold text-base">What You Can See in Analytics:</p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>Token usage over the last 28 days</li>
                  <li>Estimated costs</li>
                  <li>Per-function latency</li>
                  <li>Live execution logs</li>
                </ul>
              </div>
            </Panel>
          </section>

          <section id="faq">
            <Panel title="FAQ" icon={<AlertTriangle className="h-4 w-4 text-[var(--amber-glow)]" />}>
              <div className="space-y-4 text-sm text-foreground/90">
                <div>
                  <h3 className="font-semibold text-base">Is HubClawb free?</h3>
                  <p className="mt-1 text-muted-foreground">Currently, HubClawb is in alpha stage and can be used for free.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-base">Which AI models are supported?</h3>
                  <p className="mt-1 text-muted-foreground">HubClawb supports various AI models like Gemini, GPT-4, Claude, Llama, and more.</p>
                </div>
              </div>
            </Panel>
          </section>
        </div>
      </div>
    </motion.div>
  );
}

function StatusDot({ tone = "success" }: { tone?: "success" | "warning" | "danger" }) {
  const color = tone === "success" ? "bg-[var(--success)]" : tone === "warning" ? "bg-[var(--warning)]" : "bg-[var(--danger)]";
  return (
    <span className="relative inline-flex h-2 w-2">
      <span className={`absolute inset-0 rounded-full ${color} animate-pulse-dot`} />
      <span className={`relative inline-block h-2 w-2 rounded-full ${color}`} />
    </span>
  );
}

function GlowBadge({ children, tone = "cyan" }: { children: React.ReactNode; tone?: "cyan" | "violet" | "amber" }) {
  const map = {
    cyan: "text-[var(--cyan-glow)] border-[color-mix(in_oklab,var(--cyan-glow)_40%,transparent)] shadow-[0_0_24px_-8px_var(--cyan-glow)]",
    violet: "text-[var(--violet-glow)] border-[color-mix(in_oklab,var(--violet-glow)_40%,transparent)] shadow-[0_0_24px_-8px_var(--violet-glow)]",
    amber: "text-[var(--warning)] border-[color-mix(in_oklab,var(--warning)_40%,transparent)] shadow-[0_0_24px_-8px_var(--warning)]",
  } as const;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium font-mono tracking-wide bg-card/40 ${map[tone]}`}>
      {children}
    </span>
  );
}

/* --------------------------------- Top Bar --------------------------------- */

function TopBar({
  view, setView, onInit, searchQuery, onSearchChange,
}: { view: "dashboard" | "analytics" | "workspace" | "docs"; setView: (v: "dashboard" | "analytics" | "docs") => void; onInit: () => void; searchQuery: string; onSearchChange: (q: string) => void }) {
  return (
    <div className="sticky top-0 z-40 border-b border-border/60 backdrop-blur-xl bg-background/60">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-4 px-4 md:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <HubClawLogo className="h-9 w-9" />
          <div className="font-display text-xl font-bold tracking-tight text-gradient-brand animate-breathe">
            HubClawb
          </div>
          <span className="ml-2 hidden md:inline rounded-md border border-border/60 px-1.5 py-0.5 text-[10px] font-mono uppercase text-muted-foreground">v0.4 · alpha</span>
        </div>

        {/* Search */}
        <div className="ml-4 hidden flex-1 max-w-md md:flex items-center gap-2 rounded-full border border-border/60 bg-card/30 px-3 py-1.5 backdrop-blur-md focus-within:border-[color-mix(in_oklab,var(--cyan-glow)_60%,transparent)] focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--cyan-glow)_15%,transparent)] transition-all">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search agents, tools, telemetry…"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-transparent text-sm placeholder:text-muted-foreground/70 outline-none"
          />
          <span className="font-mono text-[10px] text-muted-foreground border border-border/60 rounded px-1.5 py-0.5">⌘K</span>
        </div>

        {/* Tabs */}
        <nav className="ml-auto flex items-center gap-1 rounded-full border border-border/60 bg-card/30 p-1 backdrop-blur-md">
          {(["dashboard", "analytics", "docs"] as const).map((t) => {
            const active = view === t || (t === "dashboard" && view === "workspace");
            return (
              <button
                key={t}
                onClick={() => setView(t)}
                className="relative px-3 py-1.5 text-xs font-medium rounded-full"
              >
                {active && (
                  <motion.span
                    layoutId="topnav-pill"
                    transition={spring}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[color-mix(in_oklab,var(--cyan-glow) 20%,transparent)] to-[color-mix(in_oklab,var(--violet-glow) 20%,transparent)] border border-[color-mix(in_oklab,var(--cyan-glow) 30%,transparent)]"
                  />
                )}
                <span className={`relative ${active ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                  {t === "dashboard" ? "Dashboard" : t === "analytics" ? "Global Analytics" : "Docs"}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Init Agent */}
        <motion.button
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
          onClick={onInit}
          className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-[color-mix(in_oklab,var(--cyan-glow)_40%,transparent)] bg-gradient-to-r from-[color-mix(in_oklab,var(--cyan-glow)_15%,transparent)] to-[color-mix(in_oklab,var(--violet-glow)_15%,transparent)] px-3 py-1.5 text-xs font-semibold glow-cyan"
        >
          <Plus className="h-3.5 w-3.5" /> Initialize Agent
        </motion.button>


      </div>
    </div>
  );
}

/* -------------------------------- AGENT DATA -------------------------------- */

type Agent = {
  id: string; name: string; owner: string; description: string;
  model: string;
  stars: number; forks: number; updated: string; tags: string[];
};

const AGENTS: (Agent & { starred?: boolean; mine?: boolean })[] = [
  { id: "a1", name: "data-analyst-agent", owner: "operator", description: "Pandas + SQL reasoning agent with chart synthesis and CSV ingestion.", model: "Gemini 1.5 Pro", stars: 1248, forks: 92, updated: "3m ago", tags: ["analytics", "python"], starred: true, mine: true },
  { id: "a2", name: "research-scout", owner: "operator", description: "Multi-hop web research with citation graphs and bias scoring.", model: "Gemini 1.5 Flash", stars: 842, forks: 51, updated: "1h ago", tags: ["search", "research"], starred: false, mine: true },
  { id: "a3", name: "devops-sentinel", owner: "operator", description: "Cluster health monitor with autonomous rollback playbooks.", model: "Gemini 1.5 Pro", stars: 2104, forks: 187, updated: "12m ago", tags: ["devops"], starred: true, mine: true },
  { id: "a4", name: "shader-architect", owner: "community", description: "WebGL/GLSL composer with real-time material previews.", model: "Gemini 1.5 Flash", stars: 567, forks: 34, updated: "2d ago", tags: ["graphics"], starred: false, mine: false },
  { id: "a5", name: "claim-arbiter", owner: "community", description: "Insurance claim triage with policy retrieval and risk scoring.", model: "Gemini 1.5 Pro", stars: 311, forks: 19, updated: "5h ago", tags: ["finance"], starred: true, mine: false },
  { id: "a6", name: "orbit-translator", owner: "operator", description: "Real-time multilingual translator tuned for technical jargon.", model: "Gemini 1.5 Flash", stars: 904, forks: 76, updated: "47m ago", tags: ["language"], starred: false, mine: true },
  { id: "a7", name: "code-review-bot", owner: "operator", description: "Automated PR reviewer with security vulnerability detection.", model: "Claude 3.5 Sonnet", stars: 678, forks: 42, updated: "15m ago", tags: ["coding", "security"], starred: true, mine: true },
  { id: "a8", name: "content-writer", owner: "community", description: "SEO-optimized blog post and marketing copy generator.", model: "GPT-4o", stars: 2341, forks: 312, updated: "1d ago", tags: ["writing", "marketing"], starred: false, mine: false },
  { id: "a9", name: "meeting-summarizer", owner: "operator", description: "Real-time meeting transcription and key point extraction.", model: "Gemini 1.5 Pro", stars: 445, forks: 28, updated: "8m ago", tags: ["productivity", "audio"], starred: false, mine: true },
  { id: "a10", name: "api-assistant", owner: "community", description: "REST and GraphQL API design and documentation helper.", model: "Claude 3 Opus", stars: 1892, forks: 234, updated: "6h ago", tags: ["api", "documentation"], starred: true, mine: false },
  { id: "a11", name: "game-ai-buddy", owner: "operator", description: "Game mechanics, level design, and NPC dialogue creator.", model: "Gemini 1.5 Flash", stars: 1023, forks: 87, updated: "30m ago", tags: ["gaming", "creative"], starred: false, mine: true },
  { id: "a12", name: "legal-advisor", owner: "community", description: "Contract analysis and legal document summarization.", model: "GPT-4o", stars: 789, forks: 65, updated: "12h ago", tags: ["legal", "analysis"], starred: false, mine: false },
  { id: "a13", name: "math-tutor-pro", owner: "community", description: "Step-by-step math problem solver from basic to advanced calculus.", model: "Llama 3.1 70B", stars: 1567, forks: 123, updated: "4h ago", tags: ["education", "math"], starred: true, mine: false },
  { id: "a14", name: "image-designer", owner: "operator", description: "AI-powered image editor and graphic design assistant.", model: "Gemini 1.5 Pro", stars: 890, forks: 67, updated: "18m ago", tags: ["design", "image"], starred: false, mine: true },
  { id: "a15", name: "email-assistant", owner: "operator", description: "Smart email composer, organizer, and responder.", model: "GPT-4o Mini", stars: 543, forks: 38, updated: "10m ago", tags: ["productivity", "email"], starred: true, mine: true },
  { id: "a16", name: "recipe-creator", owner: "community", description: "Personalized recipe generator based on available ingredients.", model: "Mixtral 8x7B", stars: 1234, forks: 98, updated: "2h ago", tags: ["cooking", "life"], starred: false, mine: false },
  { id: "a17", name: "fitness-coach", owner: "operator", description: "Custom workout plan creator and fitness tracker advisor.", model: "Claude 3 Haiku", stars: 765, forks: 54, updated: "25m ago", tags: ["health", "fitness"], starred: false, mine: true },
  { id: "a18", name: "stock-analyst", owner: "community", description: "Stock market trend analyzer and investment insight generator.", model: "DeepSeek V3", stars: 2100, forks: 289, updated: "30m ago", tags: ["finance", "stocks"], starred: true, mine: false },
  { id: "a19", name: "language-learner", owner: "operator", description: "Interactive language tutor with conversation practice.", model: "Qwen 2.5 72B", stars: 987, forks: 76, updated: "1h ago", tags: ["language", "education"], starred: true, mine: true },
  { id: "a20", name: "bug-hunter", owner: "community", description: "Automated bug detector and code quality analyzer.", model: "Claude 3.5 Sonnet", stars: 1456, forks: 167, updated: "5h ago", tags: ["coding", "debugging"], starred: false, mine: false },
  { id: "a21", name: "story-weaver", owner: "operator", description: "Creative story and plot generator for writers.", model: "Gemini 1.5 Flash", stars: 678, forks: 54, updated: "40m ago", tags: ["creative", "writing"], starred: false, mine: true },
  { id: "a22", name: "travel-planner", owner: "community", description: "Personalized travel itinerary and budget planner.", model: "GPT-4o", stars: 1987, forks: 234, updated: "1d ago", tags: ["travel", "planning"], starred: true, mine: false },
  { id: "a23", name: "music-composer", owner: "operator", description: "AI music generator and lyric writer assistant.", model: "Gemini 1.5 Pro", stars: 543, forks: 45, updated: "15m ago", tags: ["music", "creative"], starred: true, mine: true },
  { id: "a24", name: "psychologist-ai", owner: "community", description: "Mental health companion and emotional support.", model: "Claude 3 Opus", stars: 876, forks: 67, updated: "7h ago", tags: ["health", "mental"], starred: false, mine: false },
  { id: "a25", name: "resume-builder", owner: "community", description: "AI-powered resume and cover letter creator optimized for ATS.", model: "Claude 3.5 Sonnet", stars: 1654, forks: 178, updated: "3h ago", tags: ["career", "productivity"], starred: false, mine: false },
  { id: "a26", name: "video-script-writer", owner: "operator", description: "YouTube/TikTok video script generator with hook optimization.", model: "Gemini 1.5 Flash", stars: 876, forks: 65, updated: "20m ago", tags: ["content", "video"], starred: true, mine: true },
  { id: "a27", name: "podcast-editor", owner: "community", description: "Audio transcription, clip suggestions, and show notes generator.", model: "Whisper + GPT-4o", stars: 1432, forks: 145, updated: "5h ago", tags: ["audio", "content"], starred: false, mine: false },
  { id: "a28", name: "social-media-manager", owner: "operator", description: "Multi-platform social media content scheduler and caption writer.", model: "GPT-4o", stars: 1876, forks: 210, updated: "1d ago", tags: ["marketing", "social"], starred: true, mine: true },
  { id: "a29", name: "ui-ux-critic", owner: "community", description: "UI/UX design analyzer with actionable improvement suggestions.", model: "Claude 3 Opus", stars: 1345, forks: 123, updated: "4h ago", tags: ["design", "product"], starred: false, mine: false },
  { id: "a30", name: "database-architect", owner: "operator", description: "Database schema designer and query optimization assistant.", model: "Gemini 1.5 Pro", stars: 1123, forks: 98, updated: "1h ago", tags: ["database", "coding"], starred: true, mine: true },
  { id: "a31", name: "crypto-analyst", owner: "community", description: "Cryptocurrency market tracker and trend prediction assistant.", model: "DeepSeek V3", stars: 2012, forks: 267, updated: "30m ago", tags: ["finance", "crypto"], starred: false, mine: false },
  { id: "a32", name: "nutritionist-ai", owner: "operator", description: "Personalized meal plan creator with macro tracking.", model: "Llama 3.1 70B", stars: 987, forks: 78, updated: "45m ago", tags: ["health", "nutrition"], starred: false, mine: true },
  { id: "a33", name: "career-coach", owner: "community", description: "Interview prep, salary negotiation, and career path advisor.", model: "GPT-4o", stars: 1765, forks: 198, updated: "8h ago", tags: ["career", "coaching"], starred: true, mine: false },
  { id: "a34", name: "data-visualizer", owner: "operator", description: "Automated chart and dashboard generator from raw data.", model: "Gemini 1.5 Flash", stars: 1234, forks: 112, updated: "2h ago", tags: ["analytics", "visualization"], starred: true, mine: true },
  { id: "a35", name: "book-summarizer", owner: "community", description: "Book and paper summarizer with key takeaways extraction.", model: "Claude 3.5 Sonnet", stars: 2456, forks: 289, updated: "1d ago", tags: ["education", "reading"], starred: false, mine: false },
  { id: "a36", name: "code-refactorer", owner: "operator", description: "Code refactoring assistant with best practice suggestions.", model: "Gemini 1.5 Pro", stars: 1567, forks: 134, updated: "30m ago", tags: ["coding", "quality"], starred: true, mine: true },
  { id: "a37", name: "market-researcher", owner: "community", description: "Market trend analysis and competitor research agent.", model: "GPT-4o", stars: 1890, forks: 210, updated: "5h ago", tags: ["business", "research"], starred: true, mine: false },
  { id: "a38", name: "poet-writer", owner: "operator", description: "Poem generator with customizable style and theme options.", model: "Gemini 1.5 Flash", stars: 765, forks: 56, updated: "15m ago", tags: ["creative", "writing"], starred: false, mine: true },
  { id: "a39", name: "product-manager", owner: "community", description: "Product requirements document (PRD) and roadmap generator.", model: "Claude 3 Opus", stars: 2123, forks: 256, updated: "6h ago", tags: ["product", "business"], starred: false, mine: false },
  { id: "a40", name: "personal-shopper", owner: "operator", description: "Personalized shopping recommendations based on style and budget.", model: "GPT-4o", stars: 987, forks: 89, updated: "1h ago", tags: ["shopping", "life"], starred: true, mine: true },
  { id: "a41", name: "cloud-architect", owner: "community", description: "AWS/Azure/GCP infrastructure designer and cost optimizer.", model: "Gemini 1.5 Pro", stars: 1654, forks: 178, updated: "4h ago", tags: ["cloud", "devops"], starred: true, mine: false },
  { id: "a42", name: "language-polisher", owner: "operator", description: "Writing style and grammar checker with clarity improvements.", model: "Claude 3 Haiku", stars: 890, forks: 67, updated: "20m ago", tags: ["writing", "language"], starred: false, mine: true },
  { id: "a43", name: "pet-care-advisor", owner: "community", description: "Pet health, training, and care recommendations.", model: "Mixtral 8x7B", stars: 1234, forks: 109, updated: "3h ago", tags: ["pets", "life"], starred: false, mine: false },
  { id: "a44", name: "motion-designer", owner: "operator", description: "After Effects and animation script generator for motion graphics.", model: "Gemini 1.5 Flash", stars: 789, forks: 56, updated: "45m ago", tags: ["design", "animation"], starred: true, mine: true },
];

/* ------------------------------ AGENT CARD --------------------------------- */

function AgentCard({ agent, onOpen }: { agent: Agent; onOpen: (a: Agent) => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [spot, setSpot] = useState({ x: -200, y: -200 });

  return (
    <motion.button
      ref={ref}
      layoutId={`card-${agent.id}`}
      onClick={() => onOpen(agent)}
      whileHover={{ y: -2, scale: 1.01 }}
      transition={spring}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        setSpot({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      onMouseLeave={() => setSpot({ x: -200, y: -200 })}
      className="group relative text-left overflow-hidden rounded-2xl glass-panel p-5 hover:border-[color-mix(in_oklab,var(--cyan-glow)_40%,transparent)] transition-colors"
    >
      {/* radial spotlight */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(220px circle at ${spot.x}px ${spot.y}px, color-mix(in oklab, var(--cyan-glow) 22%, transparent), transparent 60%)` }}
      />
      <span aria-hidden className="pointer-events-none absolute inset-0 grid-noise opacity-40" />

      <div className="relative flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-card/80">
            <Sparkles className="h-4 w-4 text-[var(--violet-glow)]" />
          </div>
          <div>
            <div className="font-mono text-[11px] text-muted-foreground">{agent.owner} /</div>
            <div className="font-display text-base font-semibold">{agent.name}</div>
          </div>
        </div>
        <GlowBadge tone={agent.model.includes("Pro") ? "violet" : "cyan"}>
          <Cpu className="h-3 w-3" /> {agent.model.replace("Gemini 1.5 ", "G1.5·")}
        </GlowBadge>
      </div>

      <p className="relative mt-3 text-sm text-muted-foreground line-clamp-2">{agent.description}</p>

      <div className="relative mt-5 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1"><Star className="h-3 w-3" />{agent.stars.toLocaleString()}</span>
          <span className="inline-flex items-center gap-1"><GitFork className="h-3 w-3" />{agent.forks}</span>
        </div>
        <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{agent.updated}</span>
      </div>
    </motion.button>
  );
}

/* ------------------------------ VIEW 1: DASH ------------------------------ */

function Dashboard({ onOpen, searchQuery }: { onOpen: (a: Agent) => void; searchQuery: string }) {
  const [filter, setFilter] = useState<"All" | "Mine" | "Starred">("All");
  
  const filteredAgents = AGENTS.filter((a) => {
    const matchesFilter = filter === "All" ? true : filter === "Mine" ? a.mine : a.starred;
    const matchesSearch = searchQuery.trim() === "" ? true : 
      [a.name, a.description, ...a.tags, a.model].some(text => 
        text.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesFilter && matchesSearch;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
      transition={spring}
      className="mx-auto max-w-[1400px] px-4 md:px-8 py-10"
    >
      {/* Ambient welcome */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">// session · 0x4f12a</div>
          <h1 className="mt-2 font-display text-4xl md:text-5xl font-semibold">
            Welcome back, <span className="text-gradient-brand">Operator.</span>
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Your agent mesh is online. Telemetry stream is nominal across all regions.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <GlowBadge tone="cyan"><Activity className="h-3 w-3" /> {AGENTS.length} Agents Active</GlowBadge>
          <GlowBadge tone="violet"><Zap className="h-3 w-3" /> 4.2k Telemetry Calls</GlowBadge>
          <GlowBadge tone="amber"><Layers className="h-3 w-3" /> 3 Pending Reviews</GlowBadge>
        </div>
      </div>

      {/* Section header */}
      <div className="mt-10 mb-4 flex items-center justify-between">
        <h2 className="font-display text-sm uppercase tracking-[0.18em] text-muted-foreground">Agent Registry</h2>
        <div className="flex gap-1 rounded-full border border-border bg-card/30 p-1 text-[11px] font-mono">
          {["All", "Mine", "Starred"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-2.5 py-1 rounded-full transition-colors ${filter === f ? "bg-foreground/10 text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredAgents.map((a) => <AgentCard key={a.id} agent={a} onOpen={onOpen} />)}
      </div>
    </motion.div>
  );
}

/* --------------------------- VIEW 2: WORKSPACE ---------------------------- */

const WORKSPACE_TABS = ["Prompt & Config", "Versions", "Tools", "Settings"] as const;

const MODELS = [
  "Gemini 1.5 Pro",
  "Gemini 1.5 Flash",
  "Gemini 1.5 Flash-8B",
  "Claude 3.5 Sonnet",
  "Claude 3 Opus",
  "Claude 3 Haiku",
  "GPT-4o",
  "GPT-4o Mini",
  "GPT-4 Turbo",
  "Llama 3.1 405B",
  "Llama 3.1 70B",
  "Llama 3.1 8B",
  "Mistral Large 2",
  "Mixtral 8x7B",
  "Qwen 2.5 72B",
  "Qwen 2.5 32B",
  "DeepSeek V3",
  "Cohere Command R+",
];

function Workspace({ agent, onBack }: { agent: Agent; onBack: () => void }) {
  const [tab, setTab] = useState<(typeof WORKSPACE_TABS)[number]>("Prompt & Config");
  const [copied, setCopied] = useState(false);
  const [model, setModel] = useState(agent.model);
  const [openModel, setOpenModel] = useState(false);
  const [temp, setTemp] = useState(0.7);
  const [maxTok, setMaxTok] = useState(8192);
  const [tools, setTools] = useState({ web: true, py: true, gh: false, dc: true });
  const [prompt, setPrompt] = useState(
    `You are ${agent.name}, an autonomous reasoning entity.\nObjective: deliver precise, source-grounded analysis.\nWhen invoking tools, narrate the plan first.\nAlways return structured JSON when possible.`
  );

  // chat state
  type Msg = { role: "user" | "agent" | "log"; text: string; id: number };
  const [msgs, setMsgs] = useState<Msg[]>([
    { id: 1, role: "user", text: "Plot last quarter's revenue by region." },
    { id: 2, role: "log", text: `Initializing system functions [Web Search API → Python Sandbox] · routing through ${model}` },
    { id: 3, role: "agent", text: "Pulled FY24-Q4 ledger. North America led with $4.21M (+18%). EMEA stable at $3.07M. APAC accelerating at $2.41M (+34%). Rendering chart now." },
  ]);
  const [input, setInput] = useState("");
  const [running, setRunning] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [synthesizedAnswer, setSynthesizedAnswer] = useState<string | null>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [msgs, running]);

  const copyEndpoint = () => {
    navigator.clipboard?.writeText(`https://api.hubclaw.dev/v1/agents/${agent.id}/invoke`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const send = () => {
    if (!input.trim()) return;
    const id = Date.now();
    setMsgs((m) => [...m, { id, role: "user", text: input }]);
    setInput("");
    setRunning(true);
    setTimeout(() => {
      setMsgs((m) => [...m, { id: id + 1, role: "log", text: "Initializing system functions [Web Search API]…" }]);
    }, 400);
    setTimeout(() => {
      setMsgs((m) => [...m, { id: id + 2, role: "agent", text: "Synthesizing response… data fused from 3 sources, latency 240ms. Returning structured payload." }]);
      setSynthesizedAnswer("Based on analysis, Q4 revenue grew 12% YoY with strong performance in APAC. Recommended next step: increase marketing budget in SEA by 15%.");
      setRunning(false);
    }, 2000);
  };

  const stopExecution = () => {
    setRunning(false);
  };

  return (
    <motion.div
      key="workspace"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="relative mx-auto max-w-[1400px] px-4 md:px-8 py-8"
    >
      {/* Return */}
      <motion.button
        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={spring}
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1.5 text-xs font-mono text-muted-foreground hover:text-foreground hover:border-[color-mix(in_oklab,var(--cyan-glow)_40%,transparent)] backdrop-blur-md"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Terminal Dashboard
      </motion.button>

      {/* Repo header */}
      <motion.div layoutId={`card-${agent.id}`} transition={spring} className="glass-panel rounded-2xl p-5 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <div className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card/80">
                <Sparkles className="h-5 w-5 text-[var(--violet-glow)]" />
              </div>
              <div className="font-display text-2xl md:text-3xl font-semibold">
                <span className="text-muted-foreground">{agent.owner}</span>
                <span className="text-muted-foreground/60"> / </span>
                <span>{agent.name}</span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-border bg-background/50 pl-2 pr-3 py-1 overflow-hidden max-w-[260px]">
                <StatusDot tone="success" />
                <div className="relative overflow-hidden font-mono text-[11px] text-muted-foreground whitespace-nowrap">
                  <div className="flex gap-8 animate-marquee w-max">
                    <span>🔄 Synced with GitHub main branch · commit 8a4f12</span>
                    <span>🔄 Synced with GitHub main branch · commit 8a4f12</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground max-w-2xl">{agent.description}</p>
          </div>

          {/* Action cluster */}
          <div className="flex flex-wrap items-center gap-2">
            <ActionPill onClick={copyEndpoint} icon={copied ? <Check className="h-3.5 w-3.5 text-[var(--success)]" /> : <Copy className="h-3.5 w-3.5" />} label={copied ? "Copied" : "Endpoint"} accent="cyan" />
            <ActionPill icon={<Rocket className="h-3.5 w-3.5" />} label="Deploy · Vercel" accent="violet" primary />
            <ActionPill icon={<Star className="h-3.5 w-3.5" />} label={`${agent.stars}`} />
            <ActionPill icon={<GitFork className="h-3.5 w-3.5" />} label={`${agent.forks}`} />
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 flex gap-1 border-b border-border">
          {WORKSPACE_TABS.map((t) => {
            const active = tab === t;
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="relative px-3 py-2.5 text-sm font-medium"
              >
                <span className={active ? "text-foreground" : "text-muted-foreground hover:text-foreground"}>{t}</span>
                {active && (
                  <motion.span layoutId="ws-tab" transition={spring} className="absolute inset-x-2 -bottom-px h-[2px] rounded-full bg-gradient-to-r from-[var(--cyan-glow)] to-[var(--violet-glow)] shadow-[0_0_12px_var(--cyan-glow)]" />
                )}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Tab Content */}
      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={spring}
        className="mt-5"
      >
        {tab === "Prompt & Config" && (
          <div className="grid gap-5 lg:grid-cols-[5fr_7fr]">
            {/* ---- LEFT: Architect Suite ---- */}
            <div className="flex flex-col gap-5">
              {/* Model & Parameters */}
              <Panel title="Model & Parameters" icon={<Cpu className="h-4 w-4 text-[var(--cyan-glow)]" />}>
                <div className="space-y-5">
                  <div>
                    <Label>AI Engine</Label>
                    <div className="relative mt-1.5">
                      <button
                        onClick={() => setOpenModel((o) => !o)}
                        className="flex w-full items-center justify-between rounded-lg border border-border bg-background/50 px-3 py-2.5 text-sm hover:border-[color-mix(in_oklab,var(--cyan-glow)_40%,transparent)]"
                      >
                        <span className="font-mono">{model}</span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${openModel ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {openModel && (
                          <motion.div
                            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                            className="absolute z-20 mt-1 w-full max-h-80 overflow-y-auto rounded-lg border border-border bg-popover/95 backdrop-blur-xl shadow-2xl"
                          >
                            {MODELS.map((m) => (
                              <button key={m} onClick={() => { setModel(m); setOpenModel(false); }} className="block w-full px-3 py-2 text-left text-sm font-mono hover:bg-foreground/5">
                                {m}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <SliderRow label="Temperature" value={temp} min={0} max={1} step={0.05} onChange={setTemp} format={(v) => v.toFixed(2)} />
                  <SliderRow label="Max Tokens" value={maxTok} min={512} max={32768} step={128} onChange={setMaxTok} format={(v) => v.toLocaleString()} />
                </div>
              </Panel>

              {/* System Prompt */}
              <Panel
                title="System Prompt Directive"
                icon={<Code2 className="h-4 w-4 text-[var(--violet-glow)]" />}
                right={
                  <button className="inline-flex items-center gap-1.5 rounded-full border border-[color-mix(in_oklab,var(--success)_40%,transparent)] bg-[color-mix(in_oklab,var(--success)_10%,transparent)] px-2.5 py-1 text-[11px] font-mono text-[var(--success)]">
                    <StatusDot /> Commit Changes
                  </button>
                }
              >
                <textarea
                  value={prompt} onChange={(e) => setPrompt(e.target.value)}
                  rows={7}
                  className="w-full resize-none rounded-lg border border-border bg-background/60 p-3 font-mono text-[12.5px] leading-relaxed text-foreground/90 outline-none focus:border-[color-mix(in_oklab,var(--cyan-glow)_60%,transparent)] focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--cyan-glow)_12%,transparent)] transition-all"
                />
              </Panel>

              {/* Tools */}
              <Panel title="Neural Interconnects & Tools" icon={<Layers className="h-4 w-4 text-[var(--cyan-glow)]" />}>
                <div className="grid gap-2">
                  <Toggle label="Web Search" desc="Live external information retrieval" icon={<Globe className="h-4 w-4" />} on={tools.web} onChange={(v) => setTools((t) => ({ ...t, web: v }))} />
                  <Toggle label="Python Sandbox" desc="Isolated code execution environment" icon={<Code2 className="h-4 w-4" />} on={tools.py} onChange={(v) => setTools((t) => ({ ...t, py: v }))} />
                  <Toggle label="GitHub Repo Manager" desc="Branch ops, PRs, and diff analysis" icon={<GithubIcon className="h-4 w-4" />} on={tools.gh} onChange={(v) => setTools((t) => ({ ...t, gh: v }))} />
                  <Toggle label="Discord Webhook Logs" desc="Event-stream notifications to channels" icon={<MessageSquare className="h-4 w-4" />} on={tools.dc} onChange={(v) => setTools((t) => ({ ...t, dc: v }))} />
                </div>
              </Panel>
            </div>

            {/* ---- RIGHT: Sandbox ---- */}
            <Panel
              title={<span className="inline-flex items-center gap-2"><Beaker className="h-4 w-4 text-[var(--cyan-glow)]" /> Live Sandbox Testbed</span>}
              icon={null}
              right={<span className="font-mono text-[10px] text-muted-foreground">session · {agent.id.toUpperCase()}·{Date.now().toString(36).slice(-4)}</span>}
              dense
            >
              <div className="flex h-[560px] flex-col">
                <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto rounded-lg border border-border bg-background/60 p-4 scrollbar-hidden">
                  <AnimatePresence initial={false}>
                    {msgs.map((m) => (
                      <ChatBubble key={m.id} m={m} />
                    ))}
                    {running && (
                      <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 font-mono text-[12px] text-[var(--cyan-glow)]">
                        <span className="relative inline-grid h-3 w-3 place-items-center">
                          <span className="absolute inset-0 rounded-full bg-[var(--cyan-glow)]/40 animate-ping" />
                          <span className="relative h-1.5 w-1.5 rounded-full bg-[var(--cyan-glow)]" />
                        </span>
                        reasoning<span className="animate-cursor">_</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Synthesized Answer Section */}
                {synthesizedAnswer && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-3 rounded-lg border border-[color-mix(in_oklab,var(--cyan-glow)_30%,transparent)] bg-gradient-to-r from-[color-mix(in_oklab,var(--cyan-glow)_10%,transparent)] to-[color-mix(in_oklab,var(--violet-glow)_10%,transparent)] p-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <CircleCheck className="h-4 w-4 text-[var(--success)]" />
                      <span className="text-xs font-mono uppercase tracking-wide text-foreground/70">Synthesized Answer</span>
                    </div>
                    <p className="text-sm leading-relaxed text-foreground">
                      {synthesizedAnswer}
                    </p>
                  </motion.div>
                )}

                {/* Input */}
                <div className="mt-3 flex items-center gap-2 rounded-xl border border-border bg-background/60 px-3 py-2 focus-within:border-[color-mix(in_oklab,var(--cyan-glow)_60%,transparent)] focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--cyan-glow)_12%,transparent)] transition-all">
                  <span className="font-mono text-xs text-[var(--cyan-glow)]">›</span>
                  <input
                    value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()}
                    placeholder="Issue directive to agent…"
                    className="flex-1 bg-transparent font-mono text-sm outline-none placeholder:text-muted-foreground/60"
                  />
                  {running && (
                    <motion.button
                      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      onClick={stopExecution}
                      className="grid h-8 w-8 place-items-center rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
                    >
                      <X className="h-3.5 w-3.5" />
                    </motion.button>
                  )}
                  {!running && (
                    <motion.button
                      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      onClick={send}
                      className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[var(--cyan-glow)] to-[var(--violet-glow)] text-background shadow-[0_0_12px_-2px_var(--cyan-glow)]"
                    >
                      <Send className="h-3.5 w-3.5" />
                    </motion.button>
                  )}
                </div>
              </div>
            </Panel>
          </div>
        )}

        {tab === "Versions" && (
          <Panel title="Version History" icon={<GitFork className="h-4 w-4 text-[var(--cyan-glow)]" />}>
            <div className="space-y-4">
              {[
                { hash: "8a4f12", date: "2 minutes ago", author: "operator", message: "Updated system prompt with compliance checks" },
                { hash: "3b7c99", date: "1 hour ago", author: "operator", message: "Added Python sandbox tool configuration" },
                { hash: "f2d1e5", date: "Yesterday", author: "operator", message: "Initial agent creation" },
              ].map((v) => (
                <div key={v.hash} className="flex items-start gap-4 p-3 rounded-lg border border-border hover:border-[color-mix(in_oklab,var(--cyan-glow)_30%,transparent)] transition-colors">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-card/60 text-[var(--violet-glow)]">
                    <GitFork className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm text-foreground">{v.hash}</span>
                      <span className="text-xs text-muted-foreground">· {v.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{v.message}</p>
                    <div className="text-xs font-mono text-muted-foreground mt-1">by {v.author}</div>
                  </div>
                  <button className="px-3 py-1 text-xs font-mono rounded border border-border hover:border-[color-mix(in_oklab,var(--cyan-glow)_40%,transparent)] text-muted-foreground hover:text-foreground transition-colors">
                    Restore
                  </button>
                </div>
              ))}
            </div>
          </Panel>
        )}

        {tab === "Tools" && (
          <Panel title="Tool Configuration" icon={<Layers className="h-4 w-4 text-[var(--cyan-glow)]" />}>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 rounded-lg border border-border bg-card/40">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="h-5 w-5 text-[var(--cyan-glow)]" />
                  <h3 className="font-medium text-foreground">Web Search</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Live external information retrieval</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Enabled</span>
                    <span className={tools.web ? "text-[var(--success)]" : "text-[var(--danger)]"}>{tools.web ? "Yes" : "No"}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Max Results</span>
                    <span className="font-mono">5</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-border bg-card/40">
                <div className="flex items-center gap-2 mb-2">
                  <Code2 className="h-5 w-5 text-[var(--violet-glow)]" />
                  <h3 className="font-medium text-foreground">Python Sandbox</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Isolated code execution</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Enabled</span>
                    <span className={tools.py ? "text-[var(--success)]" : "text-[var(--danger)]"}>{tools.py ? "Yes" : "No"}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Timeout</span>
                    <span className="font-mono">30s</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-border bg-card/40">
                <div className="flex items-center gap-2 mb-2">
                  <GithubIcon className="h-5 w-5 text-foreground" />
                  <h3 className="font-medium text-foreground">GitHub Repo Manager</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">GitHub operations & sync</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Enabled</span>
                    <span className={tools.gh ? "text-[var(--success)]" : "text-[var(--danger)]"}>{tools.gh ? "Yes" : "No"}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Repo</span>
                    <span className="font-mono">{agent.name}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-border bg-card/40">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="h-5 w-5 text-[var(--amber-glow)]" />
                  <h3 className="font-medium text-foreground">Discord Webhook</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Event notifications to channels</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Enabled</span>
                    <span className={tools.dc ? "text-[var(--success)]" : "text-[var(--danger)]"}>{tools.dc ? "Yes" : "No"}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Channel</span>
                    <span className="font-mono">#agent-logs</span>
                  </div>
                </div>
              </div>
            </div>
          </Panel>
        )}

        {tab === "Settings" && (
          <div className="grid gap-5 lg:grid-cols-2">
            <Panel title="General Settings" icon={<Settings className="h-4 w-4 text-[var(--cyan-glow)]" />}>
              <div className="space-y-4">
                <div>
                  <Label>Agent Name</Label>
                  <input
                    value={agent.name}
                    className="w-full mt-1.5 rounded-lg border border-border bg-background/60 px-3 py-2 text-sm outline-none focus:border-[color-mix(in_oklab,var(--cyan-glow)_60%,transparent)] focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--cyan-glow)_12%,transparent)] transition-all"
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <textarea
                    value={agent.description}
                    rows={3}
                    className="w-full mt-1.5 rounded-lg border border-border bg-background/60 px-3 py-2 text-sm outline-none focus:border-[color-mix(in_oklab,var(--cyan-glow)_60%,transparent)] focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--cyan-glow)_12%,transparent)] transition-all"
                  />
                </div>
              </div>
            </Panel>

            <Panel title="Security & Permissions" icon={<AlertTriangle className="h-4 w-4 text-[var(--amber-glow)]" />}>
              <div className="space-y-4">
                <div className="p-3 rounded-lg border border-border bg-card/40">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-foreground">Public Visibility</h4>
                      <p className="text-xs text-muted-foreground">Allow others to discover this agent</p>
                    </div>
                    <button className="px-3 py-1 text-xs font-mono rounded border border-border bg-foreground/10 text-foreground">
                      Toggle
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-border bg-card/40">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-foreground">API Key Rotation</h4>
                      <p className="text-xs text-muted-foreground">Rotate your AI API key</p>
                    </div>
                    <button className="px-3 py-1 text-xs font-mono rounded border border-[color-mix(in_oklab,var(--danger)_40%,transparent)] bg-[color-mix(in_oklab,var(--danger)_10%,transparent)] text-[var(--danger)] hover:bg-[color-mix(in_oklab,var(--danger)_20%,transparent)] transition-colors">
                      Rotate
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-[color-mix(in_oklab,var(--danger)_30%,transparent)] bg-[color-mix(in_oklab,var(--danger)_5%,transparent)]">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-[var(--danger)]">Delete Agent</h4>
                      <p className="text-xs text-muted-foreground">Permanently delete this agent</p>
                    </div>
                    <button className="px-3 py-1 text-xs font-mono rounded border border-[color-mix(in_oklab,var(--danger)_40%,transparent)] bg-[color-mix(in_oklab,var(--danger)_10%,transparent)] text-[var(--danger)] hover:bg-[color-mix(in_oklab,var(--danger)_20%,transparent)] transition-colors">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </Panel>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function ChatBubble({ m }: { m: { role: "user" | "agent" | "log"; text: string; id: number } }) {
  if (m.role === "log") {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="my-2 flex items-center gap-2 font-mono text-[11.5px] text-[var(--cyan-glow)]/90">
        <span className="rounded border border-[color-mix(in_oklab,var(--cyan-glow)_30%,transparent)] bg-[color-mix(in_oklab,var(--cyan-glow)_10%,transparent)] px-1.5 py-0.5 text-[10px]">log</span>
        <TypedText text={m.text} />
      </motion.div>
    );
  }
  const isUser = m.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, x: isUser ? 30 : -30, y: 4 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={spring}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm border ${
        isUser
          ? "bg-gradient-to-br from-[color-mix(in_oklab,var(--cyan-glow)_18%,transparent)] to-[color-mix(in_oklab,var(--violet-glow)_18%,transparent)] border-[color-mix(in_oklab,var(--cyan-glow)_30%,transparent)]"
          : "bg-card/60 border-border"
      }`}>
        <div className={`mb-1 font-mono text-[10px] uppercase tracking-wider ${isUser ? "text-[var(--cyan-glow)]" : "text-muted-foreground"}`}>
          {isUser ? "operator" : "agent"}
        </div>
        <div className="leading-relaxed">{m.text}</div>
      </div>
    </motion.div>
  );
}

function TypedText({ text }: { text: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    setI(0);
    const id = setInterval(() => setI((v) => (v < text.length ? v + 2 : v)), 18);
    return () => clearInterval(id);
  }, [text]);
  return <span>{text.slice(0, i)}<span className="animate-cursor">▍</span></span>;
}

/* ---- Workspace primitives ---- */

function Panel({
  title, icon, right, children, dense = false, className = "",
}: { title: React.ReactNode; icon?: React.ReactNode; right?: React.ReactNode; children: React.ReactNode; dense?: boolean; className?: string }) {
  return (
    <div className={`glass-panel rounded-2xl overflow-hidden ${className}`}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/60">
        <div className="flex items-center gap-2 font-display text-sm font-semibold">
          {icon}{title}
        </div>
        {right}
      </div>
      <div className={dense ? "p-3" : "p-4"}>{children}</div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">{children}</div>;
}

function SliderRow({
  label, value, min, max, step, onChange, format,
}: { label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; format: (v: number) => string }) {
  const [drag, setDrag] = useState(false);
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <Label>{label}</Label>
        <motion.span
          animate={{ scale: drag ? 1.08 : 1, color: drag ? "var(--cyan-glow)" : "var(--foreground)" }}
          className="font-mono text-sm tabular-nums"
          style={drag ? { textShadow: "0 0 12px var(--cyan-glow)" } : {}}
        >
          {format(value)}
        </motion.span>
      </div>
      <div className="relative mt-2 h-8 flex items-center">
        <div className="absolute inset-x-0 h-1 rounded-full bg-border" />
        <div className="absolute h-1 rounded-full bg-gradient-to-r from-[var(--cyan-glow)] to-[var(--violet-glow)] shadow-[0_0_12px_var(--cyan-glow)]" style={{ width: `${pct}%` }} />
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          onMouseDown={() => setDrag(true)} onMouseUp={() => setDrag(false)}
          onTouchStart={() => setDrag(true)} onTouchEnd={() => setDrag(false)}
          className="absolute inset-0 w-full appearance-none bg-transparent cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-foreground [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_color-mix(in_oklab,var(--cyan-glow)_25%,transparent),0_0_18px_var(--cyan-glow)]"
        />
      </div>
    </div>
  );
}

function Toggle({
  label, desc, icon, on, onChange,
}: { label: string; desc: string; icon: React.ReactNode; on: boolean; onChange: (v: boolean) => void }) {
  const [ripple, setRipple] = useState(0);
  return (
    <button
      onClick={() => { onChange(!on); setRipple((r) => r + 1); }}
      className="group relative flex items-center justify-between gap-3 rounded-lg border border-border bg-background/50 p-3 text-left hover:border-[color-mix(in_oklab,var(--cyan-glow)_40%,transparent)] transition-colors overflow-hidden"
    >
      <AnimatePresence>
        {on && (
          <motion.span
            key={ripple}
            initial={{ opacity: 0.6, scale: 0 }} animate={{ opacity: 0, scale: 2.2 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="pointer-events-none absolute left-6 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full bg-[color-mix(in_oklab,var(--cyan-glow)_40%,transparent)]"
          />
        )}
      </AnimatePresence>
      <div className="relative flex items-center gap-3">
        <div className={`grid h-8 w-8 place-items-center rounded-md border border-border ${on ? "text-[var(--cyan-glow)]" : "text-muted-foreground"}`}>{icon}</div>
        <div>
          <div className="text-sm font-medium">{label}</div>
          <div className="text-[11px] text-muted-foreground">{desc}</div>
        </div>
      </div>
      <motion.span
        className={`relative h-6 w-11 rounded-full p-0.5 ${on ? "bg-gradient-to-r from-[var(--cyan-glow)] to-[var(--violet-glow)]" : "bg-border"}`}
      >
        <motion.span
          animate={{ x: on ? 20 : 0 }} transition={spring}
          className={`block h-5 w-5 rounded-full bg-background shadow-md ${on ? "shadow-[0_0_12px_var(--cyan-glow)]" : ""}`}
        />
      </motion.span>
    </button>
  );
}

function ActionPill({
  icon, label, onClick, accent, primary,
}: { icon: React.ReactNode; label: string; onClick?: () => void; accent?: "cyan" | "violet"; primary?: boolean }) {
  const accentCls = accent === "cyan"
    ? "hover:border-[color-mix(in_oklab,var(--cyan-glow)_50%,transparent)] hover:text-[var(--cyan-glow)] hover:shadow-[0_0_18px_-4px_var(--cyan-glow)]"
    : accent === "violet"
    ? "hover:border-[color-mix(in_oklab,var(--violet-glow)_50%,transparent)] hover:text-[var(--violet-glow)] hover:shadow-[0_0_18px_-4px_var(--violet-glow)]"
    : "hover:border-foreground/30";
  const base = primary
    ? "bg-gradient-to-r from-[color-mix(in_oklab,var(--violet-glow)_25%,transparent)] to-[color-mix(in_oklab,var(--cyan-glow)_18%,transparent)] border-[color-mix(in_oklab,var(--violet-glow)_50%,transparent)] glow-violet"
    : "bg-card/40";
  return (
    <motion.button
      whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium font-mono backdrop-blur-md transition-all ${base} ${accentCls}`}
    >
      {icon}{label}
    </motion.button>
  );
}

/* --------------------------- VIEW 3: ANALYTICS --------------------------- */

const tokenSeries = Array.from({ length: 28 }, (_, i) => {
  const x = i / 27;
  const base = 600 + Math.sin(x * 6) * 220 + x * 900;
  return { t: `D${i + 1}`, tokens: Math.round(base + Math.random() * 120), cost: Number(((base + Math.random() * 120) / 1000 * 0.42).toFixed(2)) };
});
const latencySeries = [
  { fn: "search", ms: 240 }, { fn: "python", ms: 520 }, { fn: "git", ms: 180 },
  { fn: "discord", ms: 920 }, { fn: "vector", ms: 310 }, { fn: "llm.pro", ms: 1620 },
  { fn: "llm.flash", ms: 410 }, { fn: "cache", ms: 90 }, { fn: "embed", ms: 280 },
];
const LOG_LINES = [
  { tone: "ok", text: "Web Search API executed in 240ms" },
  { tone: "ok", text: "Python Sandbox: returned dataframe(412, 8) in 612ms" },
  { tone: "warn", text: "LLM.pro latency spike: 1620ms (p95 threshold 1400ms)" },
  { tone: "err", text: "Discord Webhook timeout — Retrying (attempt 2/3)" },
  { tone: "ok", text: "Vector store upsert · 128 chunks · 310ms" },
  { tone: "ok", text: "GitHub Repo Manager: branch sync complete" },
  { tone: "ok", text: "Cache hit ratio raised to 0.84 (+0.03)" },
  { tone: "err", text: "Tool 'browser.scrape' failed: ECONNREFUSED" },
  { tone: "ok", text: "Embeddings: 4096-dim · 1024 batch · 280ms" },
  { tone: "warn", text: "Quota at 78% of monthly budget" },
] as const;

function Analytics() {
  // Animated number tickers
  const totalTokens = tokenSeries.reduce((s, p) => s + p.tokens, 0);
  const cost = totalTokens / 1000 * 0.42;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={spring}
      className="mx-auto max-w-[1400px] px-4 md:px-8 py-10"
    >
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">// telemetry · live</div>
          <h1 className="mt-2 font-display text-4xl md:text-5xl font-semibold">
            Operations <span className="text-gradient-brand">Control</span>
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">Real-time infrastructure telemetry across the agent mesh.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <GlowBadge tone="cyan"><TrendingUp className="h-3 w-3" /> P99 720ms</GlowBadge>
          <GlowBadge tone="violet"><Activity className="h-3 w-3" /> 99.97% uptime</GlowBadge>
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-12">
        {/* Token / cost telemetry */}
        <Panel
          title={<span className="inline-flex items-center gap-2"><Zap className="h-4 w-4 text-[var(--violet-glow)]" /> Token & Cost Telemetry</span>}
          className="lg:col-span-8"
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-6">
              <Stat label="Tokens · 28d" value={<Ticker n={totalTokens} />} sub="+12.4% vs prev" />
              <Stat label="Est. cost" value={<><span className="text-muted-foreground">$</span><Ticker n={Number(cost.toFixed(2))} decimals={2} /></>} sub="≈ $0.42 / 1k" />
              <Stat label="Active models" value="2" sub="Pro · Flash" />
            </div>
            <div className="h-56 -mx-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={tokenSeries} margin={{ top: 10, right: 16, bottom: 0, left: -8 }}>
                  <defs>
                    <linearGradient id="g-tokens" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.65 0.24 305)" stopOpacity={0.7} />
                      <stop offset="100%" stopColor="oklch(0.65 0.24 305)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="oklch(1 0 0 / 0.06)" vertical={false} />
                  <XAxis dataKey="t" tick={{ fill: "oklch(0.7 0.02 270)", fontSize: 10, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "oklch(0.7 0.02 270)", fontSize: 10, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} width={40} />
                  <Tooltip
                    cursor={{ stroke: "var(--cyan-glow)", strokeOpacity: 0.4 }}
                    contentStyle={{ background: "oklch(0.16 0.013 270 / 0.92)", border: "1px solid var(--border)", borderRadius: 10, fontFamily: "JetBrains Mono", fontSize: 11 }}
                    labelStyle={{ color: "var(--cyan-glow)" }}
                  />
                  <Area type="monotone" dataKey="tokens" stroke="oklch(0.65 0.24 305)" strokeWidth={2} fill="url(#g-tokens)" isAnimationActive animationDuration={1200} style={{ filter: "drop-shadow(0 0 6px oklch(0.65 0.24 305 / 0.5))" }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Panel>

        {/* Latency matrix */}
        <Panel
          title={<span className="inline-flex items-center gap-2"><Box className="h-4 w-4 text-[var(--cyan-glow)]" /> Neural Latency Matrix</span>}
          className="lg:col-span-4"
          right={<span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-[var(--warning)]"><AlertTriangle className="h-3 w-3" /> 1 anomaly</span>}
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={latencySeries} margin={{ top: 10, right: 8, bottom: 0, left: -16 }}>
                <CartesianGrid stroke="oklch(1 0 0 / 0.06)" vertical={false} />
                <XAxis dataKey="fn" tick={{ fill: "oklch(0.7 0.02 270)", fontSize: 10, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "oklch(0.7 0.02 270)", fontSize: 10, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
                <Tooltip
                  cursor={{ fill: "oklch(1 0 0 / 0.04)" }}
                  contentStyle={{ background: "oklch(0.16 0.013 270 / 0.92)", border: "1px solid var(--border)", borderRadius: 10, fontFamily: "JetBrains Mono", fontSize: 11 }}
                />
                <Bar dataKey="ms" radius={[6, 6, 2, 2]} isAnimationActive animationDuration={1200}
                  fill="oklch(0.82 0.18 215)"
                  shape={(props: any) => {
                    const warn = props.payload.ms > 1400;
                    return (
                      <rect
                        x={props.x} y={props.y} width={props.width} height={props.height}
                        rx={6} fill={warn ? "oklch(0.82 0.17 78)" : "oklch(0.82 0.18 215)"}
                        style={{ filter: warn ? "drop-shadow(0 0 10px oklch(0.82 0.17 78 / 0.7))" : "drop-shadow(0 0 8px oklch(0.82 0.18 215 / 0.5))" }}
                      />
                    );
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      {/* Logs */}
      <div className="mt-5">
        <LogPanel />
      </div>
    </motion.div>
  );
}

function Stat({ label, value, sub }: { label: string; value: React.ReactNode; sub?: string }) {
  return (
    <div className="min-w-0">
      <Label>{label}</Label>
      <div className="mt-1 font-display text-2xl font-semibold tabular-nums">{value}</div>
      {sub && <div className="font-mono text-[10.5px] text-muted-foreground">{sub}</div>}
    </div>
  );
}

function Ticker({ n, decimals = 0 }: { n: number; decimals?: number }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const dur = 1100;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(n * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [n]);
  return <span>{v.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}</span>;
}

function LogPanel() {
  const [items, setItems] = useState(LOG_LINES.map((l, i) => ({ ...l, id: i, time: timeAgo(i * 7) })));
  useEffect(() => {
    const id = setInterval(() => {
      setItems((cur) => {
        const next = LOG_LINES[Math.floor(Math.random() * LOG_LINES.length)];
        return [{ ...next, id: Date.now(), time: "just now" }, ...cur.slice(0, 14)];
      });
    }, 2200);
    return () => clearInterval(id);
  }, []);
  return (
    <Panel
      title={<span className="inline-flex items-center gap-2"><Activity className="h-4 w-4 text-[var(--success)]" /> Live Execution Logs</span>}
      right={<span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground"><StatusDot /> streaming</span>}
    >
      <div className="max-h-80 overflow-hidden rounded-lg border border-border bg-background/70 p-3 font-mono text-[12px]">
        <AnimatePresence initial={false}>
          {items.map((l) => (
            <motion.div
              key={l.id}
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-3 py-1"
            >
              <span className="w-16 shrink-0 text-muted-foreground">{l.time}</span>
              {l.tone === "ok" ? (
                <span className="inline-flex items-center gap-1.5 text-[var(--success)]"><CircleCheck className="h-3 w-3" /> SUCCESS</span>
              ) : l.tone === "warn" ? (
                <span className="inline-flex items-center gap-1.5 text-[var(--warning)]"><AlertTriangle className="h-3 w-3" /> WARN</span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-[var(--danger)]"><CircleX className="h-3 w-3" /> ERROR</span>
              )}
              <span className="text-foreground/80 truncate">{l.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Panel>
  );
}
function timeAgo(s: number) { return `${(s + 1).toString().padStart(2, "0")}s ago`; }

/* --------------------------------- APP SHELL -------------------------------- */

export default function HubClawApp() {
  const [view, setView] = useState<"dashboard" | "analytics" | "workspace" | "docs">("dashboard");
  const [active, setActive] = useState<Agent | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const openAgent = (a: Agent) => { setActive(a); setView("workspace"); };
  const goBack = () => { setView("dashboard"); setActive(null); };
  const setTab = (v: "dashboard" | "analytics" | "docs") => { setActive(null); setView(v); };

  return (
    <div className="min-h-screen relative">
      <span aria-hidden className="pointer-events-none fixed inset-0 grid-noise opacity-30" />
      <TopBar view={view} setView={setTab} onInit={() => {}} searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <AnimatePresence mode="wait">
        {view === "dashboard" && <Dashboard key="dash" onOpen={openAgent} searchQuery={searchQuery} />}
        {view === "workspace" && active && <Workspace key="ws" agent={active} onBack={goBack} />}
        {view === "analytics" && <Analytics key="an" />}
        {view === "docs" && <Documentation key="docs" />}
      </AnimatePresence>
      <footer className="mx-auto max-w-[1400px] px-8 py-10 font-mono text-[10.5px] text-muted-foreground/70 flex items-center justify-between">
        <span>HubClawb · operator console</span>
        <span>region · iad1 · build 24.06.01</span>
      </footer>
    </div>
  );
}
