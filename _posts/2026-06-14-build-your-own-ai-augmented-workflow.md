---
layout: post
title: "Build Your Own AI-Augmented Workflow"
date: 2026-06-14
categories:
- Blog
tags:
- AI
- Productivity
- Claude Code
- MCP
- Agents
- Automation
description: "A practical guide to building an AI-powered knowledge worker workflow using Claude Code and MCP - with a template repo to get you started."
comments_id: 115
permalink: "/blog/2026/06/14/build-your-own-ai-augmented-workflow/"
redirect_from: "/2026/06/14/build-your-own-ai-augmented-workflow/"
image:
  path: /assets/images/blog/ai-augmented-workflow.jpg
  alt: "A developer workspace with laptop, external monitor, and bookshelf"
---

A few weeks ago, I published a post about [NirOps](https://nyechiel.com/blog/2026/05/13/ai-operating-system-for-product-management/) - my AI-augmented workflow for product management. The response was more than I expected. People reached out asking how to build something similar for their own roles.

The honest answer was "it took months of daily iteration." Not a great answer.

So I extracted the underlying architecture into a [template repo](https://github.com/nyechiel/ai-augmented-workflow) that anyone can clone, customize, and make their own. This post walks through the key concepts and how the pieces fit together.

## The problem

Knowledge workers spend a huge chunk of their day on operational overhead. Scanning email, triaging Slack, prepping for meetings, tracking tasks, writing status updates, chasing down context that lives in six different tools. The actual thinking - the part you were hired for - gets squeezed into whatever time is left.

AI assistants help, but most workflows look like this: open a chat window, paste some context, ask a question, copy the answer somewhere else. Each interaction starts from scratch. The AI doesn't know your role, your tools, your preferences, or what you did yesterday. That's not AI-first - that's AI-assisted, and the gap between the two is enormous.

My own system is built around product management. But when people asked how to build something similar, I realized the underlying architecture has nothing to do with PM. The skills are role-specific; the infrastructure, memory system, and trust model are generic. So I extracted the foundation into a template that works for any knowledge worker role.

## The approach

The system I built uses [Claude Code](https://claude.ai/claude-code) as the agent and [MCP (Model Context Protocol)](https://modelcontextprotocol.io/) to connect it to real tools - email, calendar, chat, task management, documents. The key idea is that the agent operates with the same tools you use, but with explicit boundaries and a human-as-approver model.

Here's the architecture:

![Architecture diagram](/assets/images/blog/ai-augmented-workflow-arch.svg)

Everything runs locally. The MCP servers connect to APIs you're already using - no new cloud services, no data leaving your machine except the API calls themselves. I use Claude Code, but the architecture - MCP servers, skills as markdown, memory files, tool allowlists - is portable to any MCP-compatible agent or coding assistant.

## Six layers

The system has six layers, each doing a different job.

### 1. Rules (CLAUDE.md)

`CLAUDE.md` is the project instruction file that Claude Code reads at every session start. It's where you define the agent's behavior, boundaries, and knowledge.

The most important part is the protocol rules - non-negotiable behaviors that prevent real damage. For my setup:

- Never send messages (Slack and Gmail are read-only - the agent drafts, I send)
- Never create issues in external trackers without confirmation
- Never mark tasks as done (only I can close the review loop)

These aren't limitations - they're the trust model that makes the system usable for real work. If the agent could send messages on my behalf, I'd never trust it to triage my inbox.

Beyond protocol rules, CLAUDE.md documents the MCP integrations (what tools are available and their quirks), the repo structure (where things go), and key context (account IDs, email addresses, constants the agent needs).

### 2. Infrastructure (MCP stack)

The MCP servers run as containers behind a proxy gateway. The proxy does two things: it aggregates multiple servers behind a single endpoint (so the agent connects to one URL), and it enforces **tool allowlists** - your safety net for read-only access.

This is important. Many MCP servers have both read and write capabilities. The proxy config lets you restrict which tools are actually available. My Slack server can technically post messages, but the proxy only exposes read and search tools. Same for Gmail - read, search, and label management (archive/organize), but no send.

The stack uses Docker or Podman Compose and includes servers for Google Workspace (Gmail, Calendar, Drive, Docs), Slack, Google Contacts, and a timezone-aware clock. The template also includes Crux (a task board with its own MCP server) which connects directly to the agent as a local stdio process, so it doesn't need the network proxy. Adding a new tool - GitHub, a CRM, whatever you need - means adding a container and a proxy route.

### 3. Skills

Skills are reusable multi-step workflows encoded as markdown files. When I type `/inbox-triage`, the agent follows a structured process: gather unread messages from Slack and Gmail, categorize each one (respond/review/FYI/defer), extract action items into the task board, archive processed emails, and produce a summary with direct links to every item.

Each skill has a tool allowlist that restricts what it can access. The inbox triage skill can read email and create tasks, but it can't touch anything else. This is defense in depth - even if the skill instructions were somehow corrupted, the tool boundary holds.

The template includes six skills:
- **inbox-triage** - process unread messages, extract action items
- **meeting-prep** - generate a brief with context, prior interactions, talking points
- **capture** - auto-discover meeting notes, capture knowledge
- **delegate** - pick up a queued task, execute it, hand back for review
- **review** - end-of-day or end-of-week work review
- **learn** - analyze corrections from the session, codify into rules

But the real value comes from building or customizing skills for whatever you want to achieve. A skill is just a markdown file with instructions - if you can explain it to a person, you can encode it as a skill. The [agent skills format](https://agentskills.io/home) is becoming an industry standard - open-source skill marketplaces are growing, and enterprises are building internal collections.

### 4. Memory

Memory files give the agent persistent context across sessions. They're markdown files with frontmatter that cover four types:

- **User** - your role, goals, preferences, expertise
- **Feedback** - corrections you've made ("don't do X because Y")
- **Project** - ongoing work, decisions, deadlines
- **Reference** - pointers to external systems and resources

The feedback memories are the most interesting. Every time you correct the agent, that correction can become a rule that prevents recurrence. Over weeks, this builds a detailed model of how you work. My system has about 100 memory files covering everything from "always verify dates before stating them" to "always check open merge requests before claiming a codebase gap."

### 5. Templates

Templates provide consistent structure for recurring documents - meeting briefs, decision records, meeting notes. When a skill creates an output file, it starts from the matching template. This keeps output predictable without forcing you to specify formatting every time. The repo includes starter templates for common document types, and you add your own as needed.

### 6. Ops

The ops layer is what separates "cool demo" from "daily driver." It includes:

- **Crux** - a lightweight task board with an MCP server. Skills create and manage tasks here. Bundled in the template repo at `crux/`.
- **App Dashboard** - a web UI for managing local services. Start, stop, restart, view logs, toggle autostart. Because after a reboot, you don't want to remember which five containers need starting. Bundled at `app-dashboard/`.
- **Backup script** - a daily scheduled task that snapshots the task database, copies configs, and commits/pushes the repo. Your knowledge base is in git - losing it would mean losing months of accumulated context.
- **Disaster recovery** - step-by-step restore procedure. If your laptop dies tomorrow, you can rebuild the full system in under an hour.

## What it's like to use

A typical session might start with `/inbox-triage`. The agent reads unread Slack and Gmail, categorizes everything, creates tasks for action items, and archives processed emails. This takes about 5 minutes and replaces what used to be 30-45 minutes of manual scanning and context-switching.

Before meetings, I run `/meeting-prep [topic]`. The agent pulls calendar details, looks up attendees in the company directory, searches for prior interactions in Slack and email, and produces a brief with context I'd otherwise need to scramble for.

Throughout the day, `/delegate` handles routine tasks - reading articles, drafting responses, researching topics. Each task goes through a human review gate before anything is sent or published.

At the end of the day, `/review daily` produces a summary of what got done, what's carrying forward, and what needs attention tomorrow.

The pattern is always the same: the agent gathers, synthesizes, and drafts. I review, adjust, and decide. No messages are sent automatically. No issues created without my confirmation. The agent handles the operational overhead; I handle the judgment calls.

Beyond the six skills in the template, my own setup has about 20 skills tailored to product management and Red Hat's environment - Jira triage, RFE drafting, competitive analysis, quarterly reviews, and more. The template gives you the foundation; you build the role-specific layer on top.

One thing to watch for: running an AI-heavy workflow has its own cognitive cost - something I'm actively researching and working to improve. I wrote about that separately in [AI Brain Fry Is Real](https://nyechiel.com/blog/2026/06/05/ai-brain-fry-is-real/).

## Getting started

You'll need a [Claude Pro or Max subscription](https://claude.ai/pricing) for Claude Code.

The [template repo](https://github.com/nyechiel/ai-augmented-workflow) includes everything described above. A setup script handles the automatable parts:

```bash
git clone https://github.com/nyechiel/ai-augmented-workflow.git
cd ai-augmented-workflow
./scripts/setup.sh        # Linux/macOS/WSL2
# or: .\scripts\setup.ps1  # Windows PowerShell
```

This installs Crux and App Dashboard (both bundled in the repo), copies config templates, and sets up the symlinks Claude Code needs. What's left is the parts that need your input:

1. **Clone the MCP servers** - The MCP servers that connect to Gmail, Slack, etc. are separate open-source projects. The template includes the docker-compose file that builds and runs them as containers, but you need to clone each server's source code alongside your workflow repo (e.g., `~/Projects/google_workspace_mcp`, `~/Projects/slack-mcp-server`). Start with [Google Workspace](https://github.com/nyechiel/google_workspace_mcp) and [Slack](https://github.com/nyechiel/slack-mcp-server).
2. **Configure credentials** - Set up OAuth tokens for Google and browser session tokens for Slack in the `mcp-secrets.env` file the setup script created. This is the most involved step.
3. **Start the MCP stack** - `docker compose up -d` (or `podman-compose up -d`) to launch the containers.
4. **Customize CLAUDE.md** - Add your rules, integrations, and context. The setup script created a starter file from the template.
5. **Start Claude Code** - type `/` and try a skill.

The [setup guide](https://github.com/nyechiel/ai-augmented-workflow/blob/main/docs/SETUP.md) has the full step-by-step, the [customization guide](https://github.com/nyechiel/ai-augmented-workflow/blob/main/docs/CUSTOMIZATION.md) covers how to adapt everything to your specific role and tools, and the [workflow guide](https://github.com/nyechiel/ai-augmented-workflow/blob/main/workflow-guide.md) shows how the skills connect and a suggested daily rhythm.

Start small. Get CLAUDE.md, two memory files, and one skill working before adding complexity. Let feedback memories accumulate naturally as you correct the agent. The system gets better the more you use it. Initial setup takes a few hours, mostly for OAuth credentials. The real investment is in writing rules and building skills over weeks.

## What I learned

Building this system taught me a few things that only became clear in hindsight.

**The rules layer is the most important.** I spent more time refining CLAUDE.md than any other file. A well-written rules file makes the agent reliable; a sloppy one makes every session feel like explaining things from scratch. Skills encode what to do; rules encode how to think.

**Memory compounds.** The first week is clunky. By week four, the agent knows your preferences, your stakeholders, and your quirks. It stops making mistakes you've already corrected. This compounding effect is the thing that makes the system genuinely useful rather than just interesting.

**Read-only is a feature, not a limitation.** The strongest trust signal is that the agent can't accidentally send a message or create an issue. Once you trust the boundaries, you stop second-guessing and start delegating more.

**Skills are never done.** My earliest skills were simple and brittle. Over time, they grew cross-references (inbox-triage creates tasks that delegate picks up), graceful degradation (skills that work even when some MCP servers are down), and edge case handling I never anticipated. Quality comes from multiple layers: tool allowlists limit what each skill can access, structured steps guide the agent through a predictable process, the human-as-approver model means every output gets reviewed, and /learn turns corrections into persistent rules. I'm looking at a more formal eval pipeline as the skill set grows.

**The ops layer matters more than you think.** A backup script and a service manager sound boring compared to skills and MCP servers. But the system I had in week one (no backup, manual container restarts) felt fragile and temporary. The one I have now feels permanent. That psychological shift changes how much you invest in it.

This template is a starting point. The value comes from making it yours - your tools, your workflows, your accumulated knowledge. Clone the [repo](https://github.com/nyechiel/ai-augmented-workflow), start small, and iterate. If you build something interesting with it, I'd love to hear about it - [contributions are welcome](https://github.com/nyechiel/ai-augmented-workflow/blob/main/CONTRIBUTING.md) too.
