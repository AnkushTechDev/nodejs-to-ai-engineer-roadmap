// Model intent is mapped to server-owned parameterized SQL; never execute arbitrary model SQL.
const authenticatedTenant = 'demo';
const intent = { report: 'open_tickets', status: 'open' };
const reports = {
  open_tickets: { text: 'SELECT id, title FROM tickets WHERE tenant_id = $1 AND status = $2 LIMIT 50', values: [authenticatedTenant, intent.status] },
};
if (!Object.hasOwn(reports, intent.report)) throw Error('Report not allowed');
console.log(reports[intent.report]);
// Graph relationships answer multi-hop questions that similarity alone may miss.
const edges = [{ from: 'Ada', relation: 'MEMBER_OF', to: 'Platform' }, { from: 'Platform', relation: 'OWNS', to: 'BillingAPI' }];
const team = edges.find(edge => edge.from === 'Ada' && edge.relation === 'MEMBER_OF')?.to;
console.log('Services owned by Ada’s team:', edges.filter(edge => edge.from === team && edge.relation === 'OWNS').map(edge => edge.to));
