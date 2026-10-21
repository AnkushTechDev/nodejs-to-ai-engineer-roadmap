import { createHash } from 'node:crypto';
export function actionHash(action) {
  // Explicit field order; include every business-relevant field in the approval identity.
  return createHash('sha256').update(JSON.stringify([
    action.operationId, action.tenantId, action.orderId, action.amountCents, action.currency,
  ])).digest('hex');
}
export function prepareAction() {
  return { operationId: 'demo-refund-1', tenantId: 'demo', orderId: 'demo-order', amountCents: 2500, currency: 'USD' };
}
export function makeApproval(action, reviewer, now = Date.now()) {
  if (reviewer.role !== 'reviewer' || reviewer.tenantId !== action.tenantId) throw Error('Reviewer is not authorized');
  return { reviewerId: reviewer.id, actionHash: actionHash(action), expiresAt: now + 60_000 };
}
export function executeDemoAction(action, approval, context, ledger, now = Date.now()) {
  if (!Number.isInteger(action.amountCents) || action.amountCents <= 0 || action.amountCents > 5000 || action.currency !== 'USD') throw Error('Action violates demo refund policy');
  if (context.role !== 'reviewer' || context.tenantId !== action.tenantId || !context.id || context.id !== approval?.reviewerId) throw Error('Not authorized');
  if (!approval || approval.expiresAt <= now || approval.actionHash !== actionHash(action)) throw Error('Missing, expired, or mismatched approval');
  if (ledger.has(action.operationId)) return { status: 'already-recorded', operationId: action.operationId };
  ledger.add(action.operationId);
  return { status: 'demo-intent-recorded', operationId: action.operationId, notice: 'No money moved.' };
}
