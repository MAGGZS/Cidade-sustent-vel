import { supabase } from '../lib/supabase.js'

export async function getStats(req, res) {
  const [
    totalResult,
    separacaoResult,
    frequenciaResult,
    comunidadeResult,
    motivacaoResult,
    materialResult,
  ] = await Promise.all([
    supabase.from('respostas_reciclagem').select('*', { count: 'exact', head: true }),
    supabase.from('respostas_reciclagem').select('separa_lixo'),
    supabase.from('respostas_reciclagem').select('frequencia'),
    supabase.from('respostas_reciclagem').select('coleta_comunidade'),
    supabase.from('respostas_reciclagem').select('motivacao'),
    supabase.from('materiais_reciclados').select('material'),
  ])

  return res.json({
    total:          totalResult.count,
    por_separacao:  contarOcorrencias(separacaoResult.data,  'separa_lixo'),
    por_frequencia: contarOcorrencias(frequenciaResult.data, 'frequencia'),
    por_comunidade: contarOcorrencias(comunidadeResult.data, 'coleta_comunidade'),
    por_motivacao:  contarOcorrencias(motivacaoResult.data,  'motivacao'),
    por_material:   contarOcorrencias(materialResult.data,   'material'),
  })
}

function contarOcorrencias(arr, campo) {
  if (!arr) return []
  const mapa = {}
  for (const item of arr) {
    const val = item[campo]
    mapa[val] = (mapa[val] || 0) + 1
  }
  return Object.entries(mapa)
    .map(([valor, total]) => ({ valor, total }))
    .sort((a, b) => b.total - a.total)
}
