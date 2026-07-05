---
title: "Four Layers of AI Engineering"
date: 2026-07-05
tags:
  - AI
  - Engineering
description: "Prompt, context, harness, loop - each layer wraps the one before it, and the real engineering is further out than most people think."
---

AI engineering can be mapped into four layers, each wrapping the one before it:

![Four Layers of AI Engineering](/assets/images/notes/ai-engineering-layers-b.svg)

**1. Prompt engineering.** Compose a single input from role, instructions, examples, format. This got commoditized first.

**2. Context engineering.** The prompt is assembled from multiple sources: query, documents, memory, tool outputs, prior turns. A curator selects and compresses to fit a finite window. This is where the real skill is shifting to.

**3. Harness engineering.** The LLM runs inside a harness: gather context, call the model, dispatch to tools or sub-agents, verify, retry if needed. This is where most production AI systems actually live. The engineering is in the harness logic, not in the model call.

**4. Loop engineering.** The harness itself runs inside a larger loop that decides *whether to run it again*. Goal definition, budget constraints, progress checks, completion verification. The difference between "run the agent once" and "run the agent until the task is actually done."
