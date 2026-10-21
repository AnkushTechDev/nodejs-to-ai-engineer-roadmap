import { handbook } from './lib/data.mjs';
import { retrieve } from './lib/retrieval.mjs';
const authenticatedContext = { tenantId: 'demo', role: 'reader' };
const untrustedModelRequest = { action: 'delete_all_documents', tenantId: 'other-company' };
const allowedTools = new Set(['search_policy']);
console.log('Authorized action?', allowedTools.has(untrustedModelRequest.action));
console.log('Results:', retrieve('annual leave', handbook, { tenantId: authenticatedContext.tenantId }));
// Never take tenantId/role from the prompt or from model-supplied tool arguments.
