import { prepareAction, makeApproval, executeDemoAction } from './workflow.mjs';
const action = prepareAction();
console.log('Prepared action:', action);
if (!process.argv.includes('--approve-demo')) {
  console.log('Awaiting a simulated review. Run npm run workflow -- --approve-demo to demonstrate approval.');
} else {
  // This is an in-process simulation, NOT authentication or a real approval UI.
  const reviewer = { id: 'demo-reviewer', role: 'reviewer', tenantId: 'demo' };
  const approval = makeApproval(action, reviewer);
  const ledger = new Set();
  console.log(executeDemoAction(action, approval, reviewer, ledger));
  console.log('Replay:', executeDemoAction(action, approval, reviewer, ledger));
}
