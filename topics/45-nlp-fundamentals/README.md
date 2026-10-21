# 45. NLP: text processing before and beyond LLMs

[Roadmap index](../../README.md#topic-index) · [Setup](../../START_HERE.md) · [Glossary](../../GLOSSARY.md)

**Stage:** Advanced and specialization  
**Run mode:** Offline: no API key or external service required.  
**Before this chapter:** [03](../03-machine-learning/README.md), [10](../10-embeddings/README.md)

> Language processing includes useful low-cost techniques that do not require a generative model.

## Language is more than splitting on spaces

Natural language processing (NLP) covers tasks such as classification, extraction, translation, summarization, and search. Traditional pipelines often normalize text, tokenize it, build features, and fit a classifier. Modern systems may use learned representations or generative models, but the basic task definitions still matter.

**Bag-of-words** counts vocabulary terms. **TF-IDF** adjusts term counts using corpus rarity. **N-grams** represent sequences of words or characters. Character n-grams can help with spelling variants; word n-grams preserve some local order. These are useful baselines for search, spam detection, and routing.

**Stemming** cuts words toward a root; **lemmatization** aims to recover a dictionary form. **Named entity recognition** labels spans such as organizations or dates. **Part-of-speech tagging** labels grammatical roles. A rule or dictionary may be enough for a narrow extraction task, while ambiguous language needs better models and evaluation.

## Normalization can change the meaning

Lowercasing may be fine for general search but can alter code identifiers. Removing stop words may remove negation. Stripping punctuation can damage error codes. Unicode accents, scripts, emojis, and mixed-language text need careful handling. Do not assume English rules work for Hindi or every other language.

Compare simple lexical features against embeddings or an LLM on the actual task. A small trained classifier can be fast, predictable, and inexpensive. A regex that finds an email-like string is a pattern matcher, not a complete PII detector or language understanding system.

## Read and run the example

[Full JavaScript example](../../examples/45-nlp-fundamentals.mjs)

```bash
# Run from the repository root, after following START_HERE.md.
npm run learn -- 45
```

```javascript
import { words } from './lib/math.mjs';
for (const text of ['refund approved', 'refund not approved']) {
  const tokens = words(text);
  const bigrams = tokens.slice(0, -1).map((word, i) => `${word} ${tokens[i + 1]}`);
  console.log({ text, unigrams: tokens, bigrams, badNormalization: tokens.filter(word => word !== 'not') });
}
```

The example builds word bigrams and shows how dropping a negation changes the representation. It uses a simple tokenizer, so it is not appropriate for every language or code search.

**Expected behavior:** Inspect the labeled values in stdout and compare them with the walkthrough above. Output is deterministic except for timings and generated IDs where present.

## Try it yourself

Compare “refund approved” and “refund not approved” with unigram and bigram representations. Explain which information each preserves.

## You are ready to move on when…

Explain why preprocessing choices must be evaluated for the language and task.

## Learn from the source

[Stanford information retrieval book](https://nlp.stanford.edu/IR-book/). API details can change; compare the installed version with official documentation. See [sources and verification notes](../../RESOURCES.md).

---

[← The Python bridge and reading AI research](../44-python-and-research/README.md) · [Image generation and diffusion fundamentals →](../46-image-generation-diffusion/README.md)
