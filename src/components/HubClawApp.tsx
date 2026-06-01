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

/* ----------------------------- Shared primitives ----------------------------- */

const spring = { type: "spring" as const, mass: 0.6, damping: 15, stiffness: 180 };

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
  view, setView, onInit,
}: { view: "dashboard" | "analytics" | "workspace"; setView: (v: "dashboard" | "analytics") => void; onInit: () => void }) {
  return (
    <div className="sticky top-0 z-40 border-b border-border/60 backdrop-blur-xl bg-background/60">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-4 px-4 md:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="relative grid h-8 w-8 place-items-center rounded-lg border border-border bg-card/60 animate-breathe">
            <Sparkles className="h-4 w-4 text-[var(--cyan-glow)]" />
          </div>
          <div className="font-display text-xl font-bold tracking-tight text-gradient-brand animate-breathe">
            HubClaw
          </div>
          <span className="ml-2 hidden md:inline rounded-md border border-border/60 px-1.5 py-0.5 text-[10px] font-mono uppercase text-muted-foreground">v0.4 · alpha</span>
        </div>

        {/* Search */}
        <div className="ml-4 hidden flex-1 max-w-md md:flex items-center gap-2 rounded-full border border-border/60 bg-card/30 px-3 py-1.5 backdrop-blur-md focus-within:border-[color-mix(in_oklab,var(--cyan-glow)_60%,transparent)] focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--cyan-glow)_15%,transparent)] transition-all">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search agents, tools, telemetry…"
            className="w-full bg-transparent text-sm placeholder:text-muted-foreground/70 outline-none"
          />
          <span className="font-mono text-[10px] text-muted-foreground border border-border/60 rounded px-1.5 py-0.5">⌘K</span>
        </div>

        {/* Tabs */}
        <nav className="ml-auto flex items-center gap-1 rounded-full border border-border/60 bg-card/30 p-1 backdrop-blur-md">
          {(["dashboard", "analytics"] as const).map((t) => {
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
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[color-mix(in_oklab,var(--cyan-glow)_20%,transparent)] to-[color-mix(in_oklab,var(--violet-glow)_20%,transparent)] border border-[color-mix(in_oklab,var(--cyan-glow)_30%,transparent)]"
                  />
                )}
                <span className={`relative ${active ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                  {t === "dashboard" ? "Dashboard" : "Global Analytics"}
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

        {/* Profile */}
        <div className="ml-1 grid h-9 w-9 place-items-center rounded-full border border-border bg-gradient-to-br from-[var(--cyan-glow)] to-[var(--violet-glow)] text-[11px] font-bold text-background">
          OP
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- AGENT DATA -------------------------------- */

type Agent = {
  id: string; name: string; owner: string; description: string;
  model: "Gemini 1.5 Pro" | "Gemini 1.5 Flash";
  stars: number; forks: number; updated: string; tags: string[];
};

const AGENTS: Agent[] = [
  { id: "a1", name: "data-analyst-agent", owner: "operator", description: "Pandas + SQL reasoning agent with chart synthesis and CSV ingestion.", model: "Gemini 1.5 Pro", stars: 1248, forks: 92, updated: "3m ago", tags: ["analytics", "python"] },
  { id: "a2", name: "research-scout", owner: "operator", description: "Multi-hop web research with citation graphs and bias scoring.", model: "Gemini 1.5 Flash", stars: 842, forks: 51, updated: "1h ago", tags: ["search", "research"] },
  { id: "a3", name: "devops-sentinel", owner: "operator", description: "Cluster health monitor with autonomous rollback playbooks.", model: "Gemini 1.5 Pro", stars: 2104, forks: 187, updated: "12m ago", tags: ["devops"] },
  { id: "a4", name: "shader-architect", owner: "operator", description: "WebGL/GLSL composer with real-time material previews.", model: "Gemini 1.5 Flash", stars: 567, forks: 34, updated: "2d ago", tags: ["graphics"] },
  { id: "a5", name: "claim-arbiter", owner: "operator", description: "Insurance claim triage with policy retrieval and risk scoring.", model: "Gemini 1.5 Pro", stars: 311, forks: 19, updated: "5h ago", tags: ["finance"] },
  { id: "a6", name: "orbit-translator", owner: "operator", description: "Real-time multilingual translator tuned for technical jargon.", model: "Gemini 1.5 Flash", stars: 904, forks: 76, updated: "47m ago", tags: ["language"] },
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

function Dashboard({ onOpen }: { onOpen: (a: Agent) => void }) {
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
          <GlowBadge tone="cyan"><Activity className="h-3 w-3" /> 12 Agents Active</GlowBadge>
          <GlowBadge tone="violet"><Zap className="h-3 w-3" /> 4.2k Telemetry Calls</GlowBadge>
          <GlowBadge tone="amber"><Layers className="h-3 w-3" /> 3 Pending Reviews</GlowBadge>
        </div>
      </div>

      {/* Section header */}
      <div className="mt-10 mb-4 flex items-center justify-between">
        <h2 className="font-display text-sm uppercase tracking-[0.18em] text-muted-foreground">Agent Registry</h2>
        <div className="flex gap-1 rounded-full border border-border bg-card/30 p-1 text-[11px] font-mono">
          {["All", "Mine", "Starred"].map((f, i) => (
            <button key={f} className={`px-2.5 py-1 rounded-full ${i === 0 ? "bg-foreground/10 text-foreground" : "text-muted-foreground hover:text-foreground"}`}>{f}</button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {AGENTS.map((a) => <AgentCard key={a.id} agent={a} onOpen={onOpen} />)}
      </div>
    </motion.div>
  );
}

/* --------------------------- VIEW 2: WORKSPACE ---------------------------- */

const WORKSPACE_TABS = ["Prompt & Config", "Versions", "Tools", "Settings"] as const;

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
    { id: 2, role: "log", text: "Initializing system functions [Web Search API → Python Sandbox] · routing through Gemini 1.5 Pro" },
    { id: 3, role: "agent", text: "Pulled FY24-Q4 ledger. North America led with $4.21M (+18%). EMEA stable at $3.07M. APAC accelerating at $2.41M (+34%). Rendering chart now." },
  ]);
  const [input, setInput] = useState("");
  const [running, setRunning] = useState(false);

  const copyEndpoint = () => {
    navigator.clipboard?.writeText(`https://api.hubclaw.dev/v1/agents/${agent.id}/invoke`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const timers = useRef<number[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, running]);
  useEffect(() => () => { timers.current.forEach(clearTimeout); }, []);

  const buildPlan = (query: string) => {
    const q = query.toLowerCase();
    const active: string[] = [];
    if (tools.web) active.push("Web Search API");
    if (tools.py) active.push("Python Sandbox");
    if (tools.gh && /(repo|commit|branch|pull|pr|github)/.test(q)) active.push("GitHub Repo Manager");
    if (tools.dc && /(notify|alert|discord|channel)/.test(q)) active.push("Discord Webhook");
    if (active.length === 0) active.push("LLM Reasoner");

    const steps = [
      { ms: 320, text: `Parsing directive · ${query.length} tokens · routing through ${model}` },
      { ms: 520, text: `Planner resolved ${active.length}-step pipeline: [${active.join(" → ")}]` },
      ...active.map((tool, i) => ({
        ms: 520 + i * 480 + Math.round(Math.random() * 200),
        text: tool === "Web Search API"
          ? `Web Search · issued query "${query.slice(0, 48)}${query.length > 48 ? "…" : ""}" · 4 sources retrieved in ${180 + Math.floor(Math.random() * 120)}ms`
          : tool === "Python Sandbox"
          ? `Python Sandbox · executing analysis.py · numpy 1.26, pandas 2.2 · returned dataframe(${50 + Math.floor(Math.random() * 400)}, 6)`
          : tool === "GitHub Repo Manager"
          ? `GitHub · fetched HEAD of main · diff against last 3 commits · 0 conflicts`
          : tool === "Discord Webhook"
          ? `Discord Webhook · payload signed · POST channel#agent-ops · 204 No Content`
          : `LLM Reasoner · ${Math.floor(temp * 100)}°C · ${maxTok} max tokens · drafting response`,
      })),
      { ms: 420, text: `Synthesizing structured payload · total latency ${1200 + Math.floor(Math.random() * 600)}ms` },
    ];

    const responses: Record<string, string> = {
      chart: "Rendered chart from sandbox dataframe. Top region NA (+18%), EMEA flat, APAC +34% QoQ. Confidence 0.92 — full breakdown stored at /artifacts/chart-q4.png.",
      revenue: "FY24-Q4 revenue: NA $4.21M (+18%), EMEA $3.07M (-0.3%), APAC $2.41M (+34%). Forecast Q1 mid-point $10.4M ±6%.",
      bug: "Reproduced the issue on branch main@8a4f12. Root cause: race in useEffect cleanup. Patch drafted at /tmp/fix-race.diff (3 files, +12 / -4).",
      summarize: "Synthesized 4 sources into 5-bullet brief. Sentiment: cautiously positive. Two citations flagged as low-confidence — see footnotes.",
      deploy: "Built artifact 24.06.01 (3.2MB) and queued Vercel deployment. Preview URL will be returned on completion in ~40s.",
    };
    const key = Object.keys(responses).find((k) => q.includes(k));
    const final = key
      ? responses[key]
      : `Completed "${query.slice(0, 60)}${query.length > 60 ? "…" : ""}". Returned a structured payload assembled from ${active.length} tool call${active.length > 1 ? "s" : ""}. Confidence 0.88.`;

    return { steps, final };
  };

  const send = () => {
    const text = input.trim();
    if (!text || running) return;

    const baseId = Date.now();
    setMsgs((m) => [...m, { id: baseId, role: "user", text }]);
    setInput("");
    setRunning(true);

    timers.current.forEach(clearTimeout);
    timers.current = [];

    const { steps, final } = buildPlan(text);
    let cursor = 0;
    steps.forEach((s, i) => {
      cursor += s.ms;
      const t = window.setTimeout(() => {
        setMsgs((m) => [...m, { id: baseId + 1 + i, role: "log", text: s.text }]);
      }, cursor);
      timers.current.push(t);
    });

    cursor += 700;
    const finalTimer = window.setTimeout(() => {
      setMsgs((m) => [...m, { id: baseId + 1000, role: "agent", text: final }]);
      setRunning(false);
    }, cursor);
    timers.current.push(finalTimer);
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

      {/* Two-column workspace */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.05 }}
        className="mt-5 grid gap-5 lg:grid-cols-[5fr_7fr]"
      >
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
                        className="absolute z-20 mt-1 w-full overflow-hidden rounded-lg border border-border bg-popover/95 backdrop-blur-xl shadow-2xl"
                      >
                        {(["Gemini 1.5 Pro", "Gemini 1.5 Flash"] as const).map((m) => (
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

            {/* Input */}
            <div className="mt-3 flex items-center gap-2 rounded-xl border border-border bg-background/60 px-3 py-2 focus-within:border-[color-mix(in_oklab,var(--cyan-glow)_60%,transparent)] focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--cyan-glow)_12%,transparent)] transition-all">
              <span className="font-mono text-xs text-[var(--cyan-glow)]">›</span>
              <input
                value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Issue directive to agent…"
                className="flex-1 bg-transparent font-mono text-sm outline-none placeholder:text-muted-foreground/60"
              />
              <motion.button
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={send}
                className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[var(--cyan-glow)] to-[var(--violet-glow)] text-background"
              >
                {running ? (
                  <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }} className="block h-3.5 w-3.5 rounded-full border-2 border-background/40 border-t-background" />
                ) : <Send className="h-3.5 w-3.5" />}
              </motion.button>
            </div>
          </div>
        </Panel>
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
  title, icon, right, children, dense = false,
}: { title: React.ReactNode; icon?: React.ReactNode; right?: React.ReactNode; children: React.ReactNode; dense?: boolean }) {
  return (
    <div className="glass-panel rounded-2xl overflow-hidden">
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
        >
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="flex items-center gap-6">
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
  const [view, setView] = useState<"dashboard" | "analytics" | "workspace">("dashboard");
  const [active, setActive] = useState<Agent | null>(null);

  const openAgent = (a: Agent) => { setActive(a); setView("workspace"); };
  const goBack = () => { setView("dashboard"); setActive(null); };
  const setTab = (v: "dashboard" | "analytics") => { setActive(null); setView(v); };

  return (
    <div className="min-h-screen relative">
      <span aria-hidden className="pointer-events-none fixed inset-0 grid-noise opacity-30" />
      <TopBar view={view} setView={setTab} onInit={() => {}} />
      <AnimatePresence mode="wait">
        {view === "dashboard" && <Dashboard key="dash" onOpen={openAgent} />}
        {view === "workspace" && active && <Workspace key="ws" agent={active} onBack={goBack} />}
        {view === "analytics" && <Analytics key="an" />}
      </AnimatePresence>
      <footer className="mx-auto max-w-[1400px] px-8 py-10 font-mono text-[10.5px] text-muted-foreground/70 flex items-center justify-between">
        <span>HubClaw · operator console</span>
        <span>region · iad1 · build 24.06.01</span>
      </footer>
    </div>
  );
}
