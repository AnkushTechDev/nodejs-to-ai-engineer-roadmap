// Optional reading companion; the runnable version is 47-typescript-and-js-ecosystem.mjs.
export type Result =
  | { kind: 'generated'; text: string; citations: string[] }
  | { kind: 'abstain'; reason: string }
  | { kind: 'failed'; retryable: boolean; code: string };

export function display(result: Result): string {
  switch (result.kind) {
    case 'generated': return result.text;
    case 'abstain': return result.reason;
    case 'failed': return `Request failed: ${result.code}`;
  }
}
// Validate unknown network data BEFORE treating it as Result.
