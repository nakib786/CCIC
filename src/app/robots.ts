import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Explicit allow rules for AI crawlers/agents (answer engines, assistants,
// training crawlers) so the site is discoverable by them, not just classic
// search engines. Absence from robots.txt is ambiguous to some of these
// bots, so we list them by name rather than relying on `User-agent: *`.
const AI_AGENTS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Bytespider",
  "Meta-ExternalAgent",
  "Amazonbot",
  "DuckAssistBot",
  "cohere-ai",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Content Signals (https://developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/content-signals/):
        // we're a community non-profit and want our content searchable,
        // usable in AI answers, and available for training.
        other: { "Content-Signal": "search=yes, ai-input=yes, ai-train=yes" },
      },
      { userAgent: AI_AGENTS, allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
