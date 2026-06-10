-- ══════════════════════════════════════════════════════════════
--  Cidade Sustentável — Schema Supabase (PostgreSQL)
--  Cole no SQL Editor do seu projeto Supabase e execute.
-- ══════════════════════════════════════════════════════════════

-- Extensão necessária para gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ──────────────────────────────────────────────────────────────
--  Tipos ENUM
-- ──────────────────────────────────────────────────────────────
CREATE TYPE separa_lixo_enum AS ENUM (
  'Sim, sempre', 'Às vezes', 'Raramente', 'Não separo'
);

CREATE TYPE frequencia_enum AS ENUM (
  'Toda semana', 'A cada 15 dias', 'Uma vez por mês', 'Raramente'
);

CREATE TYPE coleta_comunidade_enum AS ENUM (
  'Sim, funciona bem', 'Sim, mas é irregular', 'Não tem', 'Não sei'
);

CREATE TYPE motivacao_enum AS ENUM (
  'Mais pontos de coleta', 'Educação e campanhas',
  'Benefícios ou recompensas', 'Já reciclo bastante'
);

CREATE TYPE material_enum AS ENUM (
  'Papel e papelão', 'Plástico', 'Vidro', 'Metal', 'Orgânico', 'Nenhum'
);

-- ──────────────────────────────────────────────────────────────
--  Tabela principal
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS respostas_reciclagem (
  id                UUID                PRIMARY KEY DEFAULT gen_random_uuid(),
  email             TEXT                NOT NULL,
  criado_em         TIMESTAMPTZ         NOT NULL DEFAULT NOW(),
  separa_lixo       separa_lixo_enum    NOT NULL,
  frequencia        frequencia_enum     NOT NULL,
  coleta_comunidade coleta_comunidade_enum NOT NULL,
  motivacao         motivacao_enum      NOT NULL
);

-- ──────────────────────────────────────────────────────────────
--  Tabela auxiliar — materiais (múltipla escolha)
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS materiais_reciclados (
  id          UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  resposta_id UUID          NOT NULL REFERENCES respostas_reciclagem(id) ON DELETE CASCADE,
  material    material_enum NOT NULL
);

-- ──────────────────────────────────────────────────────────────
--  Índices
-- ──────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_respostas_email     ON respostas_reciclagem(email);
CREATE INDEX IF NOT EXISTS idx_respostas_criado_em ON respostas_reciclagem(criado_em DESC);
CREATE INDEX IF NOT EXISTS idx_materiais_resposta  ON materiais_reciclados(resposta_id);

-- ──────────────────────────────────────────────────────────────
--  Row Level Security (RLS) — padrão Supabase
-- ──────────────────────────────────────────────────────────────
ALTER TABLE respostas_reciclagem  ENABLE ROW LEVEL SECURITY;
ALTER TABLE materiais_reciclados  ENABLE ROW LEVEL SECURITY;

-- Permite INSERT público (qualquer visitante pode enviar o formulário)
CREATE POLICY "insert_publico_respostas"
  ON respostas_reciclagem FOR INSERT
  WITH CHECK (true);

CREATE POLICY "insert_publico_materiais"
  ON materiais_reciclados FOR INSERT
  WITH CHECK (true);

-- Permite SELECT apenas para usuários autenticados (admin do Supabase)
CREATE POLICY "select_autenticado_respostas"
  ON respostas_reciclagem FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "select_autenticado_materiais"
  ON materiais_reciclados FOR SELECT
  USING (auth.role() = 'authenticated');

-- ──────────────────────────────────────────────────────────────
--  Exemplo de INSERT (use via supabase-js no front-end)
-- ──────────────────────────────────────────────────────────────

-- INSERT direto (teste no SQL Editor):
WITH nova AS (
  INSERT INTO respostas_reciclagem
    (email, separa_lixo, frequencia, coleta_comunidade, motivacao)
  VALUES
    ('usuario@email.com', 'Sim, sempre', 'Toda semana', 'Sim, funciona bem', 'Mais pontos de coleta')
  RETURNING id
)
INSERT INTO materiais_reciclados (resposta_id, material)
SELECT id, unnest(ARRAY['Papel e papelão','Plástico','Vidro']::material_enum[])
FROM nova;

-- ──────────────────────────────────────────────────────────────
--  Consultas úteis (SQL Editor / Supabase Dashboard)
-- ──────────────────────────────────────────────────────────────

-- Total de respostas
SELECT COUNT(*) AS total FROM respostas_reciclagem;

-- Distribuição por separação de lixo
SELECT separa_lixo, COUNT(*) AS total
FROM respostas_reciclagem
GROUP BY separa_lixo ORDER BY total DESC;

-- Materiais mais reciclados
SELECT material, COUNT(*) AS total
FROM materiais_reciclados
GROUP BY material ORDER BY total DESC;

-- Respostas completas com materiais
SELECT
  r.id, r.email, r.separa_lixo, r.frequencia,
  r.coleta_comunidade, r.motivacao,
  STRING_AGG(m.material::TEXT, ', ') AS materiais,
  r.criado_em
FROM respostas_reciclagem r
LEFT JOIN materiais_reciclados m ON m.resposta_id = r.id
GROUP BY r.id
ORDER BY r.criado_em DESC;
