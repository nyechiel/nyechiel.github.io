---
layout: post
title: "The Harness Is the Product"
date: 2026-06-21
categories:
- Blog
tags:
- AI
- Product Management
- Agents
- Architecture
description: "Three independent signals recently pointed to the same conclusion: the orchestration layer around AI models matters more than the models themselves."
comments_id: 138
permalink: "/blog/2026/06/21/the-harness-is-the-product/"
image:
  path: /assets/images/blog/the-harness-is-the-product.jpg
  alt: "A tangled web of wires and connections"
---

If you're building on top of an LLM, there's a natural instinct to chase the best model. Bigger parameter counts, higher benchmark scores, the latest release from OpenAI or Anthropic or Google. The model feels like the thing that matters most.

I've spent the last few months building AI products at Red Hat and running a growing AI-augmented personal workflow that connects to every tool I use daily. The lesson from both experiences is the same: the model is not the product. The harness is.

## What is the harness?

The "agent harness" is everything around the model - the system that decides what context flows into each prompt, which tools the agent can call, how memory persists across interactions, how tasks get routed and verified, how failures get caught and retried. System prompts, orchestration logic, middleware, tool definitions, verification steps. If the model is the engine, the harness is the car.

This isn't a new idea. But three independent signals recently pointed to the same conclusion, and the convergence was hard to ignore.

## Signal 1: Same model, 26% better

LangChain published their [harness engineering results](https://www.langchain.com/blog/improving-deep-agents-with-harness-engineering) on Terminal Bench 2.0, a coding benchmark. Their agent, deepagents-cli, scored 52.8%. They kept the same model (GPT-5.2-Codex) and changed only the harness - system prompts, tool definitions, and middleware hooks. The result: 66.5%. That's a 13.7-point jump, enough to move from outside the top 30 to the top 5 on the leaderboard.

No model change. No fine-tuning. Just better engineering of the system around the model.

The specific changes are instructive. They added a "reasoning sandwich" - higher reasoning effort at the planning and verification phases, lower during implementation. They built middleware to detect doom loops (agents repeating the same failed approach). They injected local context automatically so agents didn't waste cycles figuring out their working environment. Each change was straightforward engineering, not model magic.

A few weeks later, Stanford's IRIS Lab paired the same benchmark with an automated harness-evolution system and [hit 76.4%](https://arxiv.org/html/2603.28052v1) - beating every hand-designed system. The harness engineering itself was becoming automatable.

## Signal 2: The academic case

An [arXiv paper by Shangding Gu](https://arxiv.org/abs/2605.26112) made the case more formally: the next bottleneck in agentic AI is system scaling, not model scaling. The paper identifies three core harness bottlenecks:

- **Context governance** - what information flows into the context window, and what gets filtered out
- **Trustworthy memory** - reliable persistence across interactions, not just within a single conversation
- **Dynamic skill routing** - directing tasks to the right tools and sub-agents based on what the task actually needs

These are all engineering problems, not model problems. You can't solve context governance by making the model smarter. You solve it by building a system that selects and prioritizes the right information before the model ever sees it.

The paper also makes an important point about evaluation. Current benchmarks measure final-task success - did the agent complete the task or not? But they don't measure trajectory quality, memory hygiene, context efficiency, or verification cost. An agent that gets the right answer through 47 tool calls and three hallucination-recovery loops scores the same as one that gets it in 5 clean steps. Harness quality is invisible to current evals.

## Signal 3: The market votes

[OpenRouter](https://openrouter.ai/announcements/series-b) raised $113M at a $1.3B valuation. It's a model routing gateway - it lets you pick different models for different tasks, optimizing cost versus accuracy per job. Their platform serves 400+ models and processes roughly 100 trillion tokens per month.

The signal isn't the funding round itself. It's what the funding validates: enterprises are treating models as interchangeable components. The model is becoming, in OpenRouter's framing, "an invisible, swappable engine." Companies have no plans to get locked into a model vendor.

If the model is swappable, then what's not swappable is the differentiator. That's the harness - the orchestration, the context management, the tool integrations, the verification logic. That's where the product value lives.

## The evidence keeps building

Those are three data points from three different angles - a benchmark, an academic paper, and a funding round. The pattern keeps sharpening. A [SkillWeaver paper](https://arxiv.org/abs/2606.18051) tested compositional skill routing across 2,209 real MCP server skills and found that task decomposition quality - how the system breaks a request into steps before the model touches it - is the primary bottleneck. Their decomposition-aware routing improved accuracy by 32.7% while cutting context window usage by 99%. The model was held constant throughout.

A separate [study on self-evolving agents](https://arxiv.org/abs/2605.30621) added an important nuance: a 9-billion-parameter open-weight model produced harness updates just as good as Claude Opus 4.6. But the agent *using* those updates needed to be capable - weak models couldn't reliably follow the harness instructions, regardless of how well-written they were.

The takeaway isn't that models don't matter. It's that they matter at the wrong layer. Writing good prompts and skill definitions doesn't necessarily require a frontier model - in this study, a small open-weight model did it just as well. But the agent executing the work still needs to be capable enough to follow those instructions. How capable depends on the complexity of the task, which is why the most effective systems route different jobs to different model tiers rather than throwing the biggest model at everything.

## What I've seen firsthand

This isn't just theory for me. I work on AI agent products at Red Hat, and the pattern from the research plays out in our codebase every week.

One of our products, [Sales Assistant](https://www.redhat.com/en/blog/ai-enabled-enterprise-why-we-are-applying-software-engineering-principles-business-operations), helps Red Hat's sales organization with account intelligence, product information, and deal strategy. Over the past few months, the team experimented with multiple model swaps. Some never made it to production. One was tried, reverted, and only re-shipped weeks later when paired with prompt optimizations - the model alone wasn't enough.

Meanwhile, harness changes shipped steadily and produced measured results. An intent classifier prompt rewrite fixed 90% of misrouted queries. A discovery tool routing change cut agent error rates from 20% to 7% while reducing total tool calls from 137 to 84 - the agent got both more accurate and more efficient, with no model change. An architectural rework of the data pipeline cut costs by 95% and ingestion time from 26 hours to 7. As the engineer who built it put it: "driven purely by smarter system design and execution."

The most telling signal came from our product lead's improvement priority list. She listed eight things needed to improve quality: summarization across data sources, intent classification, non-deterministic tool calls, deep research, token overflow, non-deterministic responses, multi-turn evaluation, and model evaluations. Seven harness problems. The model was number eight.

I run a similar system for my own work - an [AI-augmented workflow](https://nyechiel.com/blog/2026/06/14/build-your-own-ai-augmented-workflow/) with 20 skills and a [self-correcting memory system](https://nyechiel.com/blog/2026/06/15/why-your-ai-agent-keeps-making-the-same-mistakes/). The harness decides which model to use, not the other way around - routine tasks like triage and content briefings route to a smaller, faster model, while complex research and product work stays on a larger one. When something goes wrong, the fix is never "use a smarter model." It's a harness change: a new rule in memory, a tighter tool allowlist, a verification step that catches the failure before it reaches the output.

## What this means for product teams

If you're building AI products, this pattern has practical implications:

**Invest in harness engineering, not model shopping.** The 52.8% to 66.5% jump from harness changes alone is a bigger improvement than most model upgrades deliver. Before chasing the next model release, ask whether your orchestration, context management, and verification are actually good.

**Design for model portability.** If the model is becoming a swappable component - and the market is clearly voting that way - your architecture should make swapping easy. The teams that tightly couple their product logic to a specific model's API are building on sand. The teams that keep a clean separation between their harness and the model underneath can upgrade, downgrade, or mix models without rewriting their product.

**Build the eval you wish you had.** Current benchmarks won't tell you whether your harness is good. You need harness-level metrics: token efficiency per task, tool call count, context utilization, verification pass rates, failure recovery patterns. These aren't standard yet, but they're what actually predicts production reliability.

**Treat failures as harness bugs, not model limitations.** When your agent hallucinates, loops, or misses context, the first question should be "what did the harness fail to provide?" not "do we need a better model?" Often the model had enough capability - the system around it just didn't set it up for success.

## The uncomfortable truth

There's a reason teams default to model shopping instead of harness engineering. Model upgrades are easy - you change an API key, run your benchmarks, and report the improvement. Harness engineering is harder. It requires understanding your system deeply, instrumenting it properly, and making iterative improvements that don't have the satisfying clarity of a benchmark score going up.

And to be fair, as the self-evolving agents research showed, you can't compensate for a weak agent with a great harness. The model matters for execution. But once you cross the capability threshold, the returns from harness improvements consistently outpace the returns from model upgrades.

[One practitioner's analysis](https://towardsdatascience.com/most-ai-agents-fail-in-production-because-theyre-built-backwards/) found that the most robust multi-agent systems used roughly 1,000 lines of plain Python with no AI-specific infrastructure - message queues, scoped workers, shared state with explicit contracts. No framework magic. The less magic the orchestration layer contained, the faster the team found bugs. As Charity Majors [put it recently](https://charitydotwtf.substack.com/p/ai-demands-more-engineering-discipline): nondeterministic systems demand more engineering discipline, not less. The rigor doesn't disappear - it relocates from code review to architecture artifacts, behavioral tests, and observability.

## The harness is the product. For now.

I want to be honest about the shelf life of this argument.

Every generation of models absorbs what the previous generation's harness had to do manually. Context windows grew 250x in three years - chunking strategies and summarization layers that were essential in 2023 are already less necessary. Tool calling went from hand-crafted routing logic to a native model capability. The Stanford team that automated harness evolution and hit 76.4% on the same benchmark suggests that even harness engineering itself might eventually become a model capability.

The direction of travel is clear: as models get more capable, the capability threshold drops - and with it, the amount of harness engineering required to get good results. Tasks that require careful orchestration today will likely be handled natively by next year's models.

But I don't think the harness disappears entirely. System boundaries - which APIs to call, what credentials to use, what permissions to enforce - are organizational decisions, not model capabilities. Verification against external truth requires checking the world, not reasoning about it. Business guardrails are policy, not intelligence. The harness will get thinner as models get smarter, but the boundary between "what the model handles" and "what the system around it handles" will always exist somewhere.

What changes is the balance. Today, the harness carries most of the weight. A team that invests in orchestration, context management, and verification will outperform a team that chases model upgrades. That's the current reality, and it's where the leverage is right now. But the smart bet is to build your harness in a way that lets you peel layers off as models make them unnecessary - not to assume the current balance is permanent.

The harness is the product. The model is the engine inside it. And the engine keeps getting better.
