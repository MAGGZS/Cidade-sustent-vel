import { supabase } from '../lib/supabase.js'

// POST /respostas — salva resposta + materiais
export async function criarResposta(req, res) {
  const { email, separa_lixo, frequencia, coleta_comunidade, motivacao, materiais } = req.body

  if (!email || !separa_lixo || !frequencia || !coleta_comunidade || !motivacao) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' })
  }

  const { data, error } = await supabase
    .from('respostas_reciclagem')
    .insert({ email, separa_lixo, frequencia, coleta_comunidade, motivacao })
    .select('id')
    .single()

  if (error) return res.status(500).json({ error: error.message })

  if (Array.isArray(materiais) && materiais.length > 0) {
    const { error: matErr } = await supabase
      .from('materiais_reciclados')
      .insert(materiais.map(m => ({ resposta_id: data.id, material: m })))

    if (matErr) return res.status(500).json({ error: matErr.message })
  }

  return res.status(201).json({ id: data.id })
}

// GET /respostas — lista todas com materiais
export async function listarRespostas(req, res) {
  const { data, error } = await supabase
    .from('respostas_reciclagem')
    .select(`
      id, email, separa_lixo, frequencia, coleta_comunidade, motivacao, criado_em,
      materiais_reciclados ( material )
    `)
    .order('criado_em', { ascending: false })

  if (error) return res.status(500).json({ error: error.message })
  return res.json(data)
}

// GET /respostas/:id — busca uma resposta por id
export async function buscarResposta(req, res) {
  const { id } = req.params

  const { data, error } = await supabase
    .from('respostas_reciclagem')
    .select(`
      id, email, separa_lixo, frequencia, coleta_comunidade, motivacao, criado_em,
      materiais_reciclados ( material )
    `)
    .eq('id', id)
    .single()

  if (error) return res.status(404).json({ error: 'Resposta não encontrada.' })
  return res.json(data)
}

// DELETE /respostas/:id — remove uma resposta
export async function deletarResposta(req, res) {
  const { id } = req.params

  const { error } = await supabase
    .from('respostas_reciclagem')
    .delete()
    .eq('id', id)

  if (error) return res.status(500).json({ error: error.message })
  return res.json({ message: 'Resposta removida com sucesso.' })
}
