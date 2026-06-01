import { createFileRoute } from "@tanstack/react-router";
import HubClawApp from "@/components/HubClawApp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HubClaw — GitHub for AI Agents" },
      { name: "description", content: "Operator-grade registry, sandbox, and telemetry control plane for production AI agents." },
      { property: "og:title", content: "HubClaw — GitHub for AI Agents" },
      { property: "og:description", content: "Operator-grade registry, sandbox, and telemetry control plane for production AI agents." },
    ],
  }),
  component: HubClawApp,
});
