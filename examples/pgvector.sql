-- Run in a throwaway PostgreSQL database with pgvector installed.
-- This 3-dimensional fixture is NOT compatible with real model embeddings.
CREATE EXTENSION IF NOT EXISTS vector;
CREATE TABLE IF NOT EXISTS roadmap_chunks (
  id text PRIMARY KEY, tenant_id text NOT NULL, content text NOT NULL, embedding vector(3)
);
INSERT INTO roadmap_chunks VALUES ('leave:0', 'demo', '20 days of annual leave', '[1,0,0]')
ON CONFLICT (id) DO NOTHING;
-- In Node pg: bind $1 to the authenticated tenant and $2 to a validated vector literal.
-- SELECT id, content, embedding <=> $2::vector AS distance
-- FROM roadmap_chunks WHERE tenant_id = $1 ORDER BY embedding <=> $2::vector LIMIT 5;
SELECT id, content, embedding <=> '[1,0,0]'::vector AS distance
FROM roadmap_chunks WHERE tenant_id = 'demo' ORDER BY embedding <=> '[1,0,0]'::vector LIMIT 5;
-- For large datasets, compare HNSW and IVFFlat recall/latency. Add RLS for defense in depth.
