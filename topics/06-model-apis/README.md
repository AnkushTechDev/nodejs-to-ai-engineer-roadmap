# 06. Your first real model API call

[Roadmap index](../../README.md#topic-index) · [Setup](../../START_HERE.md) · [Glossary](../../GLOSSARY.md)

**Stage:** LLM applications  
**Run mode:** API: credentials and a compatible model are required; calls may cost money.  
**Before this chapter:** [05](../05-tokens-and-context/README.md)

> A model API is another network dependency. Start with one bounded request before adding frameworks.

## A familiar Node.js boundary

Your service sends instructions and input to a provider and receives generated output plus metadata. Treat this like calling a payment or email service: credentials stay on the server, network calls need timeouts, and failures need a clear response.

This repository uses the OpenAI SDK for some examples so the API shape is concrete. The architectural ideas transfer to other providers, but field names, tool formats, supported models, and data policies differ. Set `OPENAI_MODEL` explicitly to a model available to your account. The repository does not silently choose one or promise free API access.

## Follow one request

1. Read the key from the environment.
2. Create a client with a timeout and bounded retries.
3. Send a small input and limit the output.
4. Check completion and the expected output type.
5. Inspect usage separately from the answer.

The shared helper sets `store: false`, which controls response storage behavior for this endpoint. It is not a blanket promise about all provider logging, retention, or compliance. Read the provider’s current data terms for your deployment.

## Failure is part of the contract

Handle authentication failures, rate limits, timeouts, unavailable models, incomplete output, and refusals. Do not show raw error objects containing sensitive request data to clients. Do not automatically retry every error: malformed input and invalid credentials need a fix. A request timeout can leave uncertainty about whether work was processed, so retries of external side effects need special care.

Keep provider-specific code behind a small adapter when it helps testing or switching providers. Avoid an abstraction that hides capabilities you need to use correctly.

## Read and run the example

[Full JavaScript example](../../examples/06-model-apis.mjs)

```bash
# Run from the repository root, after following START_HERE.md.
npm run learn -- 06
```

```javascript
import { generate } from './lib/provider.mjs';
const response = await generate({ instructions: 'Explain concepts using simple JavaScript analogies.', input: 'What is an embedding? Use two sentences.' });
console.log(response.output_text);
console.log('Actual token usage:', response.usage);
```

The script calls the shared generation helper and prints text and usage. The helper rejects incomplete or non-text responses instead of treating every response as a usable answer.

**Expected behavior:** A short model-generated explanation and actual usage metadata; wording varies.

## Try it yourself

Run once with a deliberately invalid model ID. Identify the failure and write a user-facing error message that does not leak provider details.

## You are ready to move on when…

Explain where the API key belongs, which errors are retryable, and why a successful request still needs output checks.

## Learn from the source

[Official OpenAI quickstart](https://developers.openai.com/api/docs/quickstart). API details can change; compare the installed version with official documentation. See [sources and verification notes](../../RESOURCES.md).

---

[← Tokens, context windows, and model settings](../05-tokens-and-context/README.md) · [Prompt engineering without magic →](../07-prompt-engineering/README.md)
