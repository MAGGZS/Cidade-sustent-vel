import { supabase } from '../lib/supabase.js'

// GET /stats — resumo geral das respostas
export async function getStats(req, res) {
  const [
    { count: total },
    { data: porSeparacao },
    { data: porFrequencia },
    { data: porComunidade },
    { data: porMotivacao },
    { data: porMaterial },
  ] = await Promise.all([
    supabase.from('respostas_reciclagem').select('*', { count: 'exact', head: true }),

    supabase.from('respostas_reciclagem')
      .select('separa_lixo')
      .then(({ data }) => ({
        data: contarOcorrencias(data, 'separa_lixo')
      })),

    supabase.from('respostas_reciclagem')
      .select('frequencia')
      .then(({ data }) => ({
        data: contarOcorrencias(data, 'frequencia')
      })),

    supabase.from('respostas_reciclagem')
      .select('coleta_comunidade')
      .then(({ data }) => ({
        data: contarOcorrencias(data, 'coleta_comunidade')
      })),

    supabase.from('respostas_reciclagem')
      .select('motivacao')
      .then(({ data }) => ({
        data: contarOcorrencias(data, 'motivacao')
      })),

    supabase.from('materiais_reciclados')
      .select('material')
      .then(({ data }) => ({
        data: contarOcorrencias(data, 'material')
      })),
  ])

  return res.json({
    total,
    por_separacao:  porSeparacao,
    por_frequencia: porFrequencia,
    por_comunidade: porComunidade,
    por_motivacao:  porMotivacao,
    por_material:   porMaterial,
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
