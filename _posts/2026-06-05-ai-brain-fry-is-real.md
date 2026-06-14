---
layout: post
title: "AI Brain Fry Is Real"
date: 2026-06-05 18:48:36.000000000 +03:00
categories:
- Blog
tags:
- AI
- Product Management
- Productivity
description: "I built an AI-first system for my PM work. It works great. Now I have a different problem - and it has a name: AI brain fry."
comments_id: 105
permalink: "/blog/2026/06/05/ai-brain-fry-is-real/"
image:
  path: /assets/images/blog/ai-brain-fry-is-real.jpg
  alt: "Assorted colorful sticky notes"
---

A few weeks ago I wrote about [building an AI operating system for product management](https://nyechiel.com/blog/2026/05/13/ai-operating-system-for-product-management/) - a local system called NirOps that takes an AI-first approach to my PM workflows. Not just operational tasks like inbox triage and meeting prep, but core PM work - RFE drafting, feature specs, competitive analysis, research, writing. It has 20 skills now, connects to my email, calendar, Slack, Jira, and task board, and runs entirely on my laptop. I use it daily and keep tailoring it to how I actually work.

It works. That's the problem.

## The system works perfectly

NirOps captures every action item from every meeting. It extracts tasks from emails, Slack threads, and document comments. It tracks everything in a local task board and queues reading and research for background execution. Nothing falls through the cracks anymore.

But it goes beyond capture. The system produces research summaries, drafts, and analyses faster than I can review them. Tasks in "review" queue up waiting for my attention. The bottleneck shifted from production to absorption - and I'm the bottleneck.

Before I built this, I was like most PMs - drowning in messages, forgetting follow-ups, occasionally rediscovering an action item weeks after the meeting where it was assigned. The manual approach was lossy but it had a hidden feature: natural forgetting acted as a filter. If something was important enough, it would come back around. If it wasn't, it quietly disappeared.

NirOps removed that filter. Now everything is captured, everything is visible, and the task board shows me the actual scope of my commitments for the first time. It turns out the real workload is bigger than what I was tracking manually. Not because the work increased - because visibility did. And the ease of doing more means I actually do more.

## This has a name, apparently

I went looking for research to understand what I was feeling and found that this pattern is well-documented. It's part of what people are now calling "AI fatigue" - the cognitive and emotional toll of working alongside AI systems. The research gives it more specific names.

BCG [surveyed 1,488 workers](https://hbr.org/2026/03/when-using-ai-leads-to-brain-fry) in March 2026 and coined the term "AI brain fry." Workers whose AI tasks required higher oversight experienced 14% more mental effort, 12% greater mental fatigue, and 19% greater information overload.
This isn't burnout, which builds over months. It's acute cognitive overload that recovers when you step away.

UC Berkeley ran an [8-month ethnographic study](https://hbr.org/2026/02/ai-doesnt-reduce-work-it-intensifies-it) at a tech company and identified three mechanisms:

1. **Scope expansion** - workers absorb tasks that would have belonged to others ("I can just AI this")
2. **Boundary dissolution** - natural stopping points disappear (prompts sent during lunch, evenings, between meetings)
3. **Relentless multitasking** - multiple AI threads running in the background during meetings

The paradox they found: moment-to-moment, using AI feels exciting and empowering. Cumulatively, workers feel stretched and unable to disconnect. And none of this was imposed by management - it emerged from voluntary adoption.

## The Jevons paradox for productivity

There's an economics concept called the [Jevons paradox](https://en.wikipedia.org/wiki/Jevons_paradox): when a resource becomes more efficient to use, total consumption goes up, not down. Coal-powered engines got more efficient, so people used more coal, not less.

AI is doing this to knowledge work. When capture becomes effortless, you capture everything. When triage becomes fast, you triage more. When delegation is easy, you delegate more - which generates more outputs to review. Your "saved time" gets absorbed by new tasks, more content to review, and more requests from stakeholders who know you have AI assistance.

[Developers on high-AI teams merge 98% more pull requests](https://www.faros.ai/blog/ai-software-engineering). But PR review time on those same teams increased 91%. Production is happening at AI speed. Absorption is still happening at human speed.

And there's another layer: when AI handles more routine parts of your job, you're left with the concentrated hard stuff - complex decisions, deep thinking, edge cases, stakeholder politics. Cognitive intensity per hour goes up. You feel exhausted without being able to point to volume that justifies it.

## What this looks like in practice

Here's how each of those patterns maps to my own workflow:

**Scope expansion.** NirOps captures every action item from every meeting. Before, many of those would have been naturally forgotten. Now they're all on the board, and each one feels like a commitment even when it probably isn't.

**Boundary dissolution.** I can send myself a quick capture at any time - a link, a thought, an observation - and it gets automatically routed to the right place in my knowledge base. The friction that used to make me think "I'll deal with this tomorrow" is gone, and with it, the ability to disconnect. Work thoughts become capture actions instantly, at any hour.

**Production faster than absorption.** This is the bottleneck problem I described above. The review queue grows faster than I can work through it, and every item sitting there is a small cognitive weight.

## The body keeps the score

I'm a regular runner and do yoga weekly. Physical activity, especially running outside, has been a key tool in my toolbox for managing stress and staying sharp long before any of this. I also happen to wear a Garmin watch that tracks stress, heart rate variability (HRV), sleep, and something called Body Battery. When I started noticing the cognitive load patterns described above, I looked at what the watch data was already telling me.

My weekly stress average has been trending up: from 27 to 33 over four weeks. Not alarming on its own, but a clear direction.

The more interesting finding: morning runs have a measurable next-day effect. Days after a morning run show lower stress (avg 29 vs 35), higher overnight HRV (+5.8ms), and zero "stressful" day ratings. Two-thirds of days without a preceding morning run were rated "stressful."

Small sample, directional data, all the usual caveats. But directional is enough to act on.

## What I'm trying

I don't have solutions. I have experiments. Here's what I'm implementing, and I'll report back on what actually works.

### Deliberate prioritization

This is the biggest mindset shift. NirOps should capture everything - that's its job. But capturing something doesn't mean committing to it. I added a weekly review step that sorts new tasks into three buckets: commit, delegate, and deprioritize.

The key is making deprioritization an explicit decision, not a passive one. I added an "archived" status to my task board for items I've reviewed and decided aren't worth pursuing right now. Not deleted (that loses the signal), not left sitting indefinitely. Explicitly triaged and set aside. The goal is to focus on the things that actually matter rather than spreading thin across everything the system captured.

### Finish before starting

I limit myself to 5 tasks in "doing" at any time. The captured list can grow - that's fine, it's just a queue. What matters is the active set. When you have 20 things in progress, nothing actually moves forward. When you have 5, things get done.

I'm tracking this in my weekly review. The hard part isn't setting the limit - it's resisting the urge to start something new when the current work hits a snag.

### Batch review, not drip-feed

The BCG research found that isolated individual AI power-use is the highest-risk pattern for cognitive overload. Reviewing AI outputs one at a time throughout the day is drip-feeding - each one costs a context switch, and [research suggests](https://www.ics.uci.edu/~gmark/chi08-mark.pdf) each switch takes 23+ minutes to recover from.

I'm trying to batch my review of AI outputs into dedicated blocks instead of processing them as they arrive.

### Protect the deep work day

I'm based in Israel, so my workweek is Sunday through Thursday. Sunday is a gift - I still catch up on what happened over my weekend and Friday, but most of my colleagues haven't started their week yet, so nothing new piles up during the day. No meetings, no incoming requests. It's the one day where I can do deep work without interruptions. I protect that day aggressively.

### Track sustainability, not just productivity

I built a weekly review that combines work output (tasks completed, zone alignment against my goals) with physical metrics - stress trend, exercise frequency, sleep quality. The idea is to make the connection between work patterns and physical state visible, not just track them separately.

The Garmin data confirms what I already knew intuitively: consistent exercise matters. Morning runs correlate with lower next-day stress. My goal is four runs a week, and the review tracks whether I'm hitting the target. No optimization games about which days to run - just consistency.

The weekly stress trend is a leading indicator. If it keeps climbing while task throughput is flat, the answer is workload reduction, not optimization.

## What the research doesn't cover yet

This is genuinely new territory. The tools have moved faster than our understanding of how they change the way we work. The research is starting to document the patterns, but we simply haven't had enough time to understand the long-term impact of going AI-first in our daily work. Nobody has a playbook yet.

## Why I'm sharing this

I think a lot of knowledge workers are going to hit this wall. You build or adopt an AI system, it works great, your operational efficiency improves - and then the cognitive load increases because you can see and do more than before. The AI didn't reduce your work. It made the real scope visible for the first time, and that visibility is both valuable and overwhelming.

If you're experiencing something similar - feeling stretched even though your tools are better than ever - I hope it helps to know this pattern has names, research backing, and some directional data on what might help.

I'll follow up on what actually works and what doesn't. For now, I'm running the experiments.
