---
layout: post
title: "Why Your AI Agent Keeps Making the Same Mistakes"
date: 2026-06-15
categories:
- Blog
tags:
- AI
- Productivity
- Agents
- Automation
- Claude Code
description: "Most AI agents forget everything between sessions. A three-stage loop turns corrections into persistent rules and verifies they stuck."
comments_id: 124
permalink: "/blog/2026/06/15/why-your-ai-agent-keeps-making-the-same-mistakes/"
image:
  path: /assets/images/blog/why-your-ai-agent-keeps-making-the-same-mistakes.jpg
  alt: "A spiral concrete staircase viewed from above"
---

My AI agent used to guess people's names from their email addresses. It saw an email handle and confidently produced a full name in a meeting brief - wrong person entirely. In the same session, it did the same thing with another handle.

I corrected it. The agent fixed the output. Next session, it guessed again.

This is the frustrating part about working with AI agents: they don't remember being wrong. You correct the same mistakes across sessions, and every tomorrow starts fresh. I decided immediately that this needed a real fix - `/learn` was one of the first skills I invested in.

## The problem isn't intelligence, it's amnesia

AI agents are good at following instructions in the moment. If you say "don't guess names from email handles, look them up in the directory," it will do exactly that - for the rest of the conversation. Next session, it has no idea you ever said it.

This isn't a flaw - it's how LLMs work. Under the hood, a language model is a function: it takes a sequence of tokens and predicts the next one based on patterns frozen into its weights during training. There's no feedback loop, no parameter update at inference time - just matrix multiplications over whatever's in the context window. The model's knowledge is static; its memory is the prompt. Your correction lives in one conversation's context and vanishes when that session ends. Fine-tuning could theoretically bake corrections into the model's weights, but it's too slow, too expensive, and too broad for individual preferences. You shouldn't have to retrain a model just because it guessed someone's name wrong.

The fix seems obvious: write the correction down somewhere the agent reads at session start. But that raises questions:

- Where does the rule go? A project config file? A memory file? A specific skill's instructions?
- How do you phrase it so the agent applies it correctly in new contexts?
- How do you know it actually worked?
- What happens when you have 50 rules and some of them contradict each other?

Over time, I built a system that handles this. It has three stages: correct, codify, verify. The first two are about capturing and persisting corrections. The third - which came later as the rule count grew - is about making sure they actually stuck.

## Correct (the conversation)

Every correction starts in conversation. Some are explicit - "No, don't do that," "Stop summarizing what you just did, I can read the diff." Some are implicit - I rewrite the agent's output, or I ignore a suggestion and do something different.

Both carry signal. Explicit corrections are obvious. Implicit ones reveal preferences you haven't articulated yet.

Then there are positive confirmations. "Yes, exactly like that." Accepting an unusual approach without pushback. These are easy to miss. If you only capture mistakes, you avoid past errors but drift away from approaches that already work.

## Codify (the learning)

At the end of a session with corrections, I run `/learn` - a skill that reviews the conversation, identifies corrections, and asks three questions about each one:

**Is this generalizable?** "Change this sentence" is not. "Don't use markdown blockquotes for text I need to copy-paste" is.

**What's the scope?** A rule about Jira triaging belongs in the triage skill's instructions. A rule about communication style belongs in a feedback memory. A rule that applies everywhere belongs in the project config.

**Is there a why?** "Don't use blockquotes for copy-paste" is a weak rule. "Don't use blockquotes for copy-paste - the `>` characters get included when selecting text, requiring manual cleanup before pasting" is strong. The why lets the agent judge edge cases instead of following the rule blindly.

Each correction gets routed to exactly one place. Global behavior goes to the project config (AGENT.md). Personal preferences go to feedback memory files. Skill-specific quirks go to that skill's instructions. Domain facts go to knowledge files.

The output is a structured summary showing what was codified, where, and the exact text added. I review everything before it's final.

### Routing is the hard part

At this point I have dozens of feedback memories. Getting the routing right matters more than getting the rule right. A rule in the wrong place either gets ignored (too narrow) or creates noise (too broad).

Some real routing decisions:

- "Don't use em dashes" goes in the writing style memory, not the project config - it's about my voice, not agent behavior
- "Always include clickable links in output" goes in the project config as a protocol rule - it applies to every skill
- "Search all Gmail pages, don't stop at the first batch" goes in the inbox triage skill - it's specific to how that skill processes email
- "Never mark tasks as done, only move them to review" goes in the project config as a non-negotiable rule - violating it breaks my review workflow across every skill

The pattern: if a rule applies to more than one skill, it goes in the project config or a memory file. If it applies to one context, it goes in that skill.

### What a feedback memory looks like

Each memory has three parts: the rule, the reason, and how to apply it. The email handle rule says: never guess names - always look them up in the directory or stakeholder map. The reason explains that wrong names in meeting briefs destroy credibility. The application section specifies the fallback chain: check stakeholders first, then directory lookup, then show the raw email handle rather than guessing.

The reason isn't decoration. It helps the agent decide what to do in situations the rule doesn't explicitly cover.

## Verify (the system)

This is the part most people skip.

`/learn` captures individual corrections. But did they actually propagate? If I added "always include links" to the project config, does every skill that produces output actually include links? If I renamed a concept in one skill, did the other skills that reference it update too?

`/audit` is a separate skill that scans the repo for drift and inconsistencies:

- **Cross-references:** A skill says "save to the triages directory" - does it exist? A skill says "run /meeting-prep" - does that skill exist?
- **Contradictions:** A memory file says one thing, a skill says the opposite. The project config documents a tool that was removed.
- **Drift:** A count in a document fell out of date. The workflow guide no longer matches reality.
- **Staleness:** Memory files reference things that no longer exist.

`/learn` is writing a test. `/audit` is running the test suite. I run `/learn` at the end of sessions with corrections and `/audit` weekly or after structural changes. Most audit runs find nothing - which is the point. The ones that do catch something prevent subtle bugs: a rule that contradicts another rule, a skill that references a renamed file, a count that drifted.

## What compounds

The first few weeks were clunky. Over time, corrections started getting rarer. Eventually, most sessions had zero.

A few interesting observations:

**The agent improves at things I never explicitly corrected.** The timezone rule ("always verify dates before stating them") came from a few incidents where the agent guessed the day of the week wrong. But the underlying principle - don't assert verifiable facts, look them up - started applying to other contexts too.

**Positive patterns compound faster than corrections.** When I confirmed that bundling related changes into one PR was the right call, recording that confirmation meant the agent would default to it in similar situations. Without the positive signal, it might try something different next time.

**The loop can close itself.** I codified rules that tell the agent to proactively suggest running `/learn` when it notices it was corrected multiple times, and `/audit` after structural changes. The learning system uses its own output to trigger itself - which is a satisfying kind of recursion.

**Curation is ongoing.** Dozens of feedback memories is a lot of context to load at session start. Rules need consolidation, outdated ones need pruning. The system doesn't maintain itself - but the maintenance cost is low compared to repeating corrections every session.

## The bigger picture

The agent's intelligence isn't the bottleneck. The system around it - rules, memory, verification - determines whether it's useful day after day or just impressive in demos. This aligns with what others are finding: Adel Zaalouk [built an attribution pipeline](https://adelzaalouk.me/2026/mar/22/teaching-your-ai-agent-to-learn-from-its-mistakes/) that traces failures to specific skills. The concept of [harness engineering](https://www.langchain.com/blog/the-anatomy-of-an-agent-harness) frames the system around the model - memory, skills, context management - as more important than what the model generates. Charity Majors [argues](https://charitydotwtf.substack.com/p/ai-demands-more-engineering-discipline) that nondeterministic systems demand more engineering discipline, not less.

The three-stage loop is simple: correct, codify, verify. Most people do the first. Some do the second. Almost nobody does the third. The verify step is what turns a collection of corrections into a system that actually learns.

The [template repo](https://github.com/nyechiel/ai-augmented-workflow) includes a [basic version of `/learn`](https://github.com/nyechiel/ai-augmented-workflow/blob/main/skills/learn/SKILL.md) you can customize. `/audit` is something I built for my own setup as the rule count grew - once you have enough corrections to lose track of, you'll want one too. Start correcting, start codifying, and don't skip the verification.
