---
layout: post
title: "The Bottleneck Moved"
date: 2026-07-02 20:39:03.000000000 +03:00
categories:
- Blog
tags:
- AI
- Product Management
- Agents
- Leadership
description: "AI compressed the execute layer of software development. Deciding what to build and verifying it's right didn't get faster. That changes everything."
comments_id: 141
permalink: "/blog/2026/07/02/the-bottleneck-moved/"
image:
  path: /assets/images/blog/the-bottleneck-moved.jpg
  alt: "A computer chip with AI engraved on it"
---

A few weeks into my current role, I had a spec ready for a UI change - twelve string replacements across seven files, with a clear naming principle and an explicit list of what to change and what to leave alone. The engineer picked it up, and it was merged and running in pre-production in under two hours.

That's not the interesting part. The interesting part is what happened next: I didn't have another spec at that level of quality ready to go. I could have written a vague ticket and moved on, but I'd just seen what a precise spec produces. The engineer had the capacity. I was the constraint.

And the honest realization was harder than that. I maintain a backlog with roughly 68 feature requests. There is no way I can write that level of spec for each one. The bottleneck wasn't a one-time gap in my planning - it was structural. The constraint on shipping had quietly moved from "can we build it?" to "should we build it, and can we specify it precisely enough?"

I just hadn't noticed because I was still thinking in terms of engineering capacity. It isn't the bottleneck. Not anymore.

## The execute layer got compressed

[Arvind Narayanan and Sayash Kapoor](https://braddelong.substack.com/p/coding-agents-as-a-continuation-of) have a framework that breaks software development into three layers: decide what to build, execute the build, and deliver it to users. AI coding agents are compressing the middle layer at a pace that's hard to overstate.

Anthropic told its growth team to [hire more PMs](https://venturebeat.com/infrastructure/claude-code-turned-every-engineer-into-three-now-companies-need-more-product-thinkers), not fewer, because their coding agents had "turned engineering into a team that ships at roughly three times its actual headcount." This isn't an isolated example. The same pattern is playing out across the industry - features that used to take weeks are shipping in days or hours.

When execution gets cheaper, organizations don't do less. They do more. And "more" requires more decisions about what to do.

## Decide didn't

Andrew Ng has a good [analogy](https://productleadersdayindia.org/blogs/product_management_ai_bottleneck._Andrew_Ng.html) for what's happening. The typewriter made writing physically easy and exposed writer's block. AI coding agents solved the "how to build it" problem and exposed what he calls "builder's block." The bottleneck was always there. It was just hidden behind the slow pace of construction.

Ng is proposing that organizations will need more PMs than engineers - inverting the traditional ratio entirely. That sounds extreme until you think about what PMs actually do: understand customer problems, evaluate trade-offs, scope the right solution, decide what not to build. None of that got automated.

A vague requirement doesn't just slow things down anymore - it produces the wrong thing faster. As Simon Martinelli [put it](https://martinelli.ch/ai-makes-coding-cheap-requirements-are-now-the-bottleneck/): "AI does not resolve ambiguity. It amplifies it."

I feel this every day. When your team can build anything you specify, the quality of what you specify becomes the highest-impact work you do. And even when engineers build without a detailed spec - which they increasingly can - someone still needs to review the result with taste, judgment, and a deep understanding of the user problem. That review requires the same product thinking as writing the spec. The work didn't disappear. It moved from input to output.

That spec from the opening - the one running in pre-production in under two hours - worked because it had a clear guiding principle, explicit scope boundaries, and a list of what to change and what to leave alone. Writing it took me longer than the engineer took to implement it. That's the inversion. The PM's work is now the rate-limiting step, not the engineering work that follows.

And the hard question isn't how to write specs faster. It's which of those 68 requests deserve that level of clarity, in what order, and at what scope. That's judgment work - customer empathy, strategic alignment, trade-off analysis. No coding agent helps with that.

## Deliver didn't either

There's a third layer that gets less attention: delivering it right. Not just shipping code, but verifying that what shipped actually works, solves the problem, and doesn't break anything else. This layer didn't get faster. In some ways, it got harder.

[DORA's 2025 report](https://dora.dev/dora-report-2025/) tells the story in one number: AI adoption hit 90% among developers, but incidents per pull request were up 242.7%. Teams are shipping more code, faster, with less review. The probability of a production incident per code change more than tripled.

Code production accelerated. Review, integration, and verification didn't.

I see this in my own workflow. I run an [AI-augmented system](https://nyechiel.com/blog/2026/05/13/ai-operating-system-for-product-management/) with a growing set of skills that handle research, triage, drafting, and analysis. The founding rule was simple: agents do the work, set it to "review," and only I move it to "done." I'm starting to relax that for lower-risk tasks, but the principle holds - the cost of producing work approaches zero. The cost of verifying it's right doesn't.

## What this means

The decide-execute-deliver sandwich works as a diagnostic. If your team has excess execute capacity but decide and deliver are bottlenecked, adding more engineers - or faster AI tools - won't help. You need more product thinking.

Some organizations are already acting on this. LinkedIn [replaced its Associate Product Manager program](https://www.lennysnewsletter.com/p/why-linkedin-is-replacing-pms) with "Associate Product Builder" - generalists who take an idea from concept to launch with fewer handoffs. To apply, you don't submit a resume. You submit a 60-second demo of something you built.

For me, the immediate challenge is distribution. I can't write a detailed spec for every feature, and that approach doesn't scale even if I could. The real question is: how do I create enough shared context that the engineering team can make good product decisions without me in the loop for each one? That means codifying the principles behind the specs, not just the specs themselves - making the "why" explicit enough that someone, human or agent, can derive the "what" without calling me.

I don't have that fully figured out yet. But I'm increasingly convinced the answer isn't "write more specs faster." It's building the kind of shared product context that lets a team operate with judgment, not just instructions.

The engineers who will thrive aren't the ones who write the most code. They're the ones who treat "deciding what to build" as part of their job, not someone else's problem. And the PMs who will thrive aren't the ones who generate the most specs. They're the ones who make every spec count - clear enough that an agent can execute it, precise enough that the wrong thing doesn't get built faster.

The bottleneck moved. The question is whether your organization has noticed.
