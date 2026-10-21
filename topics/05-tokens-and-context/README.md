# 05. Tokens, context windows, and model settings

[Roadmap index](../../README.md#topic-index) · [Setup](../../START_HERE.md) · [Glossary](../../GLOSSARY.md)

**Stage:** LLM applications  
**Run mode:** Offline: no API key or external service required.  
**Before this chapter:** [04](../04-neural-networks-transformers/README.md)

> Token limits affect cost, latency, and correctness before you write any sophisticated agent code.

## Text arrives in pieces

Models usually read tokens, not JavaScript characters or whole words. A token might represent a word, part of a word, punctuation, or bytes. Different models have different tokenizers, so `text.length` and `text.split(" ").length` are not reliable token counts. Code, multilingual text, and unusual identifiers can tokenize very differently.

The **context window** is the working space available for a request. Budget instructions, user input, chat history, tool descriptions, retrieved evidence, and output. Some models also account for reasoning tokens within generation budgets. Check the chosen model’s documented limits and usage fields.

## Leave room to answer

If the context window were 8,000 tokens and your prompt used 7,800, a 1,000-token answer would not fit. Avoid blindly truncating the beginning: it may remove critical instructions or the user’s actual question. Keep required policy and task context, retrieve concise evidence, and trim irrelevant history.

**Temperature** affects sampling randomness when a model supports it. **Top-p** restricts sampling to a probability mass. **Maximum output tokens** bounds generated length. Defaults and parameter support vary. A low temperature does not make an answer factual or fully deterministic.

## Picking a model

Evaluate candidate models on your actual tasks: output quality, structured-output support, tool reliability, supported modalities, latency, context limits, data handling, and cost. A larger context window is not a replacement for good retrieval. A more expensive model is not automatically better for a simple classifier.

Record model and prompt versions with evaluation results so a later change can be explained.

## Read and run the example

[Full JavaScript example](../../examples/05-tokens-and-context.mjs)

```bash
# Run from the repository root, after following START_HERE.md.
npm run learn -- 05
```

```javascript
// These are assumed counts, NOT a tokenizer. Use the chosen model's tokenizer in production.
export function contextBudget({ window, instructions, history, evidence, output }) {
  const used = instructions + history + evidence + output;
  return { used, remaining: window - used, fits: used <= window };
}
console.log(contextBudget({ window: 8000, instructions: 500, history: 2000, evidence: 4000, output: 1000 }));
console.log(contextBudget({ window: 8000, instructions: 500, history: 4000, evidence: 4000, output: 1000 }));
```

The example adds assumed token counts and reports whether a request fits. It is a budgeting calculator, not a tokenizer. Replace assumptions with model-specific counts in a real application.

**Expected behavior:** Inspect the labeled values in stdout and compare them with the walkthrough above. Output is deterministic except for timings and generated IDs where present.

## Try it yourself

Create separate budgets for instructions, history, evidence, and output. Reduce evidence until the second example fits while preserving the question.

## You are ready to move on when…

Explain why characters are not tokens and why output capacity must be reserved.

## Learn from the source

[OpenAI API concepts](https://developers.openai.com/api/docs/concepts). API details can change; compare the installed version with official documentation. See [sources and verification notes](../../RESOURCES.md).

---

[← Neural networks and transformers](../04-neural-networks-transformers/README.md) · [Your first real model API call →](../06-model-apis/README.md)
