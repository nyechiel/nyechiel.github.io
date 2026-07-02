---
layout: post
title: 'I Built a Personal AI Operating System for Product Management'
date: 2026-05-13 13:00:00.000000000 +03:00
categories:
- Blog
tags:
- AI
- Product Management
- Claude Code
- MCP
- Red Hat
description: "How I built an AI-powered workflow to handle the operational side of product management, using Claude Code and MCP integrations."
comments_id: 70
image:
  path: /assets/images/blog/ai-operating-system-for-product-management.jpg
  alt: "A computer circuit board with a glowing brain pattern"
---
> **Update:** Since this post was published, I open-sourced the system as a [template repo](https://github.com/nyechiel/ai-augmented-workflow) you can fork and adapt. See [Build Your Own AI-Augmented Workflow](https://nyechiel.com/blog/2026/06/14/build-your-own-ai-augmented-workflow/) for the walkthrough.
{: style="font-size: 0.92em"}

I recently moved back into PM after more than six years in engineering leadership - a transition that probably deserves its own post someday. I currently work as a Senior Principal Product Manager at Red Hat with a strong technical focus, building agentic AI systems that transform how teams across the business work.

But this post is about something else. Over the past few weeks I've been building a personal AI system that handles the operational side of my job. This space is evolving fast, and what I describe here will probably look different in a few months, but I wanted to capture where I am in this journey and share what's working.

Product management generates a lot of operational work. Triaging inboxes, prepping for meetings, tracking action items, writing specs, staying current on industry news, keeping stakeholders aligned. Most of it is important, but repetitive. It fills the day and leaves little room for the deep work that actually compounds.

I wanted to flip that ratio. Instead of spending 70% of my time on operational overhead and 30% on strategic work, I wanted the inverse.

## What I built

I started building what I call NirOps - a local AI system that handles the operational side of my job so I can focus on the parts that require human judgment.

The core idea is simple:

- **The AI handles routine operations.** Inbox triage, meeting prep, research, news monitoring, action item tracking, knowledge capture.
- **I handle judgment calls.** Strategy, prioritization, stakeholder relationships, decisions.
- **Everything is saved locally.** Every meeting brief, triage output, research note, and decision record lives in a structured repo on my machine. The AI builds context over time, so it gets better the longer I use it.

It's not a chatbot I talk to occasionally. It's closer to an operating system that sits underneath my daily workflow - connecting my calendar, email, stakeholders, and ongoing work into a single context that the AI uses to do real operational work.

## What a typical day looks like

### Morning

I start with three commands:

1. **Jira triage** - the agent scans my Jira landscape and flags what needs attention.
2. **News brief** - curated top-10 industry news relevant to my domain. Deep-dive articles get queued as reading tasks that the agent processes in the background.
3. **Inbox triage** - the agent scans Slack and Gmail, categorizes every message (respond / review / FYI / defer), drafts responses for the urgent ones, extracts action items into a task board, and archives processed emails.

### Before Meetings

I give the agent a meeting topic and attendee list. It pulls context from prior interactions, recent activity, relevant documents, and stakeholder notes, then generates a brief with talking points. For first-time 1:1s, it generates a personal cheat sheet with the person's background, our overlap areas, and good questions to ask.

### After Meetings

This is where it gets interesting. My meetings are transcribed by Google's Gemini. The agent auto-discovers those transcripts, correlates them with calendar events, extracts action items into the task board, updates my contact map with new people I met, and saves key facts to domain knowledge files. I don't fill in any forms or update any trackers manually.

I can also quick-capture ad-hoc thoughts throughout the day - a link, a fact, a contact, a decision - and the agent routes it to the right place in my knowledge base.

### During the Day

Research on demand. Discovery briefs for vague problem areas. Competitive analyses. Quick briefings on any Slack thread, email, or document someone sends me.

All of these are codified workflows - not ad-hoc prompts.

## How it's wired together

The system runs on [Claude Code](https://docs.anthropic.com/en/docs/claude-code), Anthropic's CLI agent, connected to my work tools via [MCP](https://modelcontextprotocol.io/) (Model Context Protocol) - small services that bridge the AI to external APIs.

```
Claude Code
    |
    +-- Gmail (read + archive)
    +-- Google Calendar (read)
    +-- Google Drive / Docs / Sheets / Slides (read)
    +-- Slack (read + mark-as-read)
    +-- Google Contacts (directory lookup)
    +-- Jira / Confluence (read + write)
    +-- Crux (custom task board)
```

Most MCP servers run locally as containers behind a gateway proxy. The proxy enforces tool allowlists - a JSON config defines exactly which tools each server can expose. This is how I enforce read-only access: the Google Workspace MCP server has dozens of tools, but the proxy only exposes the ones for searching and reading, not sending or creating.

Everything runs on my laptop (shoutout to the [Fedora](https://fedoraproject.org/) team). No third-party SaaS indexing my workspace data. The knowledge base is markdown files, the task board is SQLite. If the AI tool disappears tomorrow, I still have all my meeting briefs, research notes, and decision records.

## What makes this different from "Using ChatGPT"

The difference isn't the model - it's the context and the workflow.

A generic AI chat session starts from zero every time. You paste in context, ask a question, get an answer, lose everything when you close the tab. Useful for one-off tasks, but nothing compounds.

This system maintains context across sessions: who my stakeholders are, what was discussed in last week's meeting, what action items are open, what the competitive landscape looks like, how I prefer to communicate. When I prep for a meeting with someone, the agent already knows our shared history, our last conversation, and the open items between us.

The other difference is tooling. The agent doesn't just answer questions - it reads my email, checks my calendar, searches Jira, looks up people in the directory, and saves its output to structured files. It operates on my actual work environment, not a text box.

## Skills, not prompts

Each workflow is codified as a skill - a markdown file with explicit steps, tool access declarations, verification checks, and graceful degradation rules. This makes the system reliable instead of ad-hoc:

- **Access control.** Skills declare which tools they can use. An inbox triage skill can read email and manage labels but can't send messages. A research skill can search the web but can't modify Jira.
- **Self-verification.** Every skill that produces output reads it back and checks for completeness before presenting results. This catches silent failures - the kind where the AI says "done" but actually dropped half the data.
- **Composability.** Skills can invoke other skills. My inbox triage automatically delegates reading tasks after categorizing messages. My news brief queues deep-dive articles and processes them in the background.
- **Learning from corrections.** When I correct the agent, a dedicated skill extracts the principle and persists it so the same mistake doesn't happen twice.

There are currently 16 skills covering everything from quick text polishing to full competitive analyses.

## The design principles that matter

**Human-as-approver.** The agent can research, draft, and organize - but it never sends messages, creates tickets without my confirmation, or marks work as done. Every outward-facing action goes through me. This isn't a limitation - it's the design. The judgment layer stays human.

**Artifacts over chat.** The agent produces files, not just conversation responses. Meeting briefs, research notes, decision records, competitive analyses - all saved in structured formats. This means the work compounds: next month's meeting prep references last month's capture notes.

**Progressive automation.** I started with read-only integrations and manual workflows. As I trust the system more, I automate more. Email archiving was added after weeks of manual triage. Action item extraction was added after I noticed I was doing it by hand every session. The system grows with confidence, not ambition.

**Inbox zero as a feature.** After triage, processed emails get archived and Slack gets marked as read. Items awaiting my reply stay visible. My inbox reflects my actual to-do list, not a pile of stuff I've already processed mentally.

## What I've learned

**Start with read-only.** Connect tools for reading before writing. Build trust in the system's judgment before giving it any write access. This is the single most important principle for anyone building something similar.

**Verification matters more than you think.** Silent failures are the biggest trust killer. The AI says "I triaged your inbox" but actually only processed 8 of 15 messages because it didn't paginate. Every skill now reads its own output back and checks for completeness. This sounds paranoid until the first time it catches a real bug.

**The contact map is the most valuable artifact.** An auto-maintained list of every person I interact with - their role, our shared context, interaction history. It makes every meeting prep and inbox triage smarter because the agent knows who people are and why they matter.

**Quick capture changes everything.** The ability to text myself a link, thought, or observation from my phone and have it automatically routed to the right place in my knowledge base means nothing falls through the cracks. Before this, I had a dozen half-organized note apps. Now there's one inbox, and the agent sorts it.

**The AI gets better, not just me.** Every captured meeting, every triage run, every research note makes the next one faster and more contextual. The system compounds. After a few weeks, meeting prep that used to take 20 minutes of manual research takes one command and 30 seconds.

## What's next

This space is moving fast. The models get more capable every few months, and the tooling around them is maturing just as quickly. I expect the skills and workflows I described here to keep evolving - some of what I do manually today will be automated tomorrow, and new capabilities will open up patterns I haven't thought of yet.

I also made a deliberate choice to invest in building this system while onboarding into my new role, rather than waiting until I was "settled in." The thinking is that the earlier I build the right habits and infrastructure, the more it compounds over time. So far, that bet is paying off - the system is already making me faster at absorbing context, tracking commitments, and staying on top of a new domain.

The bigger challenge ahead isn't the AI itself - it's connecting these workflows to the people around me. Right now, the system mostly serves me: my inbox, my context, my task board. The next step is integrating more deeply into the product delivery team - bridging the gap between PM operational work and engineering execution, making the context I accumulate useful to the people I work with, not just to me. That's where the real leverage is.

## Is this for everyone?

Not yet. Today, this requires comfort with the command line, willingness to debug container networking, and patience to iterate on workflow design. It's not a product you install - it's a system you build. I expect more turnkey offerings to appear as this space matures, but there will always be a need to tune and optimize for your specific workflow.

But the pattern - AI as operational infrastructure for knowledge workers - is where things are heading. Not AI replacing PMs (or lawyers, or analysts, or researchers), but AI handling the operational overhead so humans can focus on the work that requires judgment.

If you're interested in exploring something similar, I'm happy to walk through the details. The practical challenges (auth, reliability, prompt engineering, trust calibration) are real, but solvable. And the payoff - reclaiming hours of your week for the work that actually matters - is worth the investment.

---

Special thanks to [Jonathan Zarecki](https://github.com/jonzarecki) who helped me get started and validated some of my ideas.
