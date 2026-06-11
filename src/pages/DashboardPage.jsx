import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Leaf, Users, Recycle, TrendingUp, BarChart2, Activity, MapPin, Bell, RefreshCw } from 'lucide-react'

const API = 'https://cidade-sustentavel-backend.onrender.com'

const glass = {
  background: 'rgba(8,22,12,0.52)',
  backdropFilter: 'blur(52px) saturate(220%)',
  WebkitBackdropFilter: 'blur(52px) saturate(220%)',
  border: '1px solid rgba(255,255,255,0.08)',
  boxShadow: '0 8px 48px rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.07)',
}
const glassGreen = {
  background: 'rgba(74,222,128,0.09)',
  backdropFilter: 'blur(52px) saturate(220%)',
  WebkitBackdropFilter: 'blur(52px) saturate(220%)',
  border: '1px solid rgba(74,222,128,0.22)',
  boxShadow: '0 8px 48px rgba(0,0,0,0.40), inset 0 1px 0 rgba(74,222,128,0.10)',
}
const glassDim = {
  background: 'rgba(255,255,255,0.03)',
  backdropFilter: 'blur(32px) saturate(180%)',
  WebkitBackdropFilter: 'blur(32px) saturate(180%)',
  border: '1px solid rgba(255,255,255,0.07)',
  boxShadow: '0 4px 24px rgba(0,0,0,0.35)',
}

function Donut({ pct, color = '#4ade80', size = 88, stroke = 9 }) {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const filled = (pct / 100) * circ
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ flexShrink: 0 }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={`${filled} ${circ}`} strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`}
        style={{ filter: `drop-shadow(0 0 5px ${color}99)`, transition: 'stroke-dasharray 1.2s cubic-bezier(.22,1,.36,1)' }} />
    </svg>
  )
}

function Sparkline({ data, color = '#4ade80', w = 100, h = 40 }) {
  if (!data || data.length < 2) return null
  const min = Math.min(...data), max = Math.max(...data), range = max - min || 1
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * (h - 6) - 3}`).join(' ')
  const id = `sg${color.replace('#', '')}`
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: 'visible', display: 'block' }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,${h} ${pts} ${w},${h}`} fill={`url(#${id})`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth={1.8}
        strokeLinecap="round" strokeLinejoin="round"
        style={{ filter: `drop-shadow(0 0 3px ${color}88)` }} />
    </svg>
  )
}

function DistBar({ items = [], colors = [] }) {
  const total = items.reduce((s, i) => s + i.total, 0) || 1
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {items.slice(0, 4).map(({ valor, total: v }, i) => {
        const pct = Math.round((v / total) * 100)
        const c = colors[i % colors.length]
        return (
          <div key={valor} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ flex: 1, height: 6, borderRadius: 99, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
              <div style={{ height: '100%', borderRadius: 99, width: `${pct}%`, background: c, transition: 'width 1s cubic-bezier(.22,1,.36,1)' }} />
            </div>
            <span style={{ color: 'rgba(255,255,255,0.38)', fontSize: 10, minWidth: 28, textAlign: 'right' }}>{pct}%</span>
            <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 10, minWidth: 60, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {valor?.split(' ').slice(0, 2).join(' ')}
            </span>
          </div>
        )
      })}
    </div>
  )
}

function VBarChart({ items = [], color = '#4ade80', maxBars = 6 }) {
  const data = items.slice(0, maxBars)
  const max = Math.max(...data.map(d => d.total), 1)
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 64 }}>
      {data.map(({ valor, total }, i) => (
        <div key={valor} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <div style={{
            width: '100%', borderRadius: 5,
            height: `${Math.max((total / max) * 52, 4)}px`,
            background: i === 0 ? color : 'rgba(255,255,255,0.09)',
            boxShadow: i === 0 ? `0 0 10px ${color}55` : 'none',
            transition: 'height 1s cubic-bezier(.22,1,.36,1)',
          }} />
          <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.28)', maxWidth: 36, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {valor?.split(' ')[0]}
          </span>
        </div>
      ))}
    </div>
  )
}

function Skel({ w = '100%', h = 18 }) {
  return <div className="db-skel" style={{ width: w, height: h, borderRadius: 8 }} />
}

function Card({ style, children }) {
  return <div style={{ borderRadius: 20, padding: 'clamp(0.9rem,2.5vw,1.3rem)', display: 'flex', flexDirection: 'column', gap: 10, ...style }}>{children}</div>
}

function Label({ text, icon: Icon, color }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.63rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{text}</p>
      {Icon && <Icon size={13} style={{ color }} />}
    </div>
  )
}

function BigNum({ value, suffix = '', sub }) {
  return (
    <div>
      <p style={{ color: '#fff', fontWeight: 900, fontSize: 'clamp(1.9rem,4vw,2.6rem)', letterSpacing: '-0.04em', lineHeight: 1 }}>
        {value}<span style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.38)', fontWeight: 500 }}>{suffix}</span>
      </p>
      {sub && <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.65rem', marginTop: 4 }}>{sub}</p>}
    </div>
  )
}

export default function DashboardPage() {
  const navigate = useNavigate()
  const [stats, setStats]         = useState(null)
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(false)
  const [lastUpdate, setLastUpdate] = useState(null)

  async function fetchStats() {
    setLoading(true); setError(false)
    try {
      const res = await fetch(`${API}/stats`)
      if (!res.ok) throw new Error()
      setStats(await res.json())
      setLastUpdate(new Date())
    } catch { setError(true) }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchStats() }, [])

  const total         = stats?.total ?? 0
  const porSeparacao  = stats?.por_separacao  ?? []
  const porFrequencia = stats?.por_frequencia ?? []
  const porComunidade = stats?.por_comunidade ?? []
  const porMotivacao  = stats?.por_motivacao  ?? []
  const porMaterial   = stats?.por_material   ?? []

  const sempre      = porSeparacao.find(x => x.valor === 'Sim, sempre')?.total ?? 0
  const semprePct   = total ? Math.round((sempre / total) * 100) : 0
  const funciona    = porComunidade.find(x => x.valor === 'Sim, funciona bem')?.total ?? 0
  const funcionaPct = total ? Math.round((funciona / total) * 100) : 0

  const hhmm = lastUpdate
    ? `${String(lastUpdate.getHours()).padStart(2,'0')}:${String(lastUpdate.getMinutes()).padStart(2,'0')}`
    : '--:--'

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100svh', display: 'flex', flexDirection: 'column' }}>

      {/* ── BG ── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <img src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=1800&q=90&fit=crop"
          alt="" aria-hidden="true" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(150deg,rgba(2,10,5,0.94) 0%,rgba(3,16,8,0.86) 55%,rgba(2,12,6,0.96) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,18,6,0.28)' }} />
      </div>
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.18,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")` }} />

      {/* ── TOP BAR ── */}
      <header style={{ position: 'relative', zIndex: 10, ...glass, borderRadius: 0, borderBottom: '1px solid rgba(74,222,128,0.09)', padding: 'clamp(0.7rem,2vw,1rem) clamp(1rem,4vw,2rem)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 12 }}>

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginRight: 4 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, flexShrink: 0, ...glassGreen, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Leaf size={16} style={{ color: '#4ade80' }} />
            </div>
            <div>
              <p style={{ color: '#fff', fontWeight: 900, fontSize: '0.88rem', letterSpacing: '-0.02em', lineHeight: 1.1 }}>CidadeVerde</p>
              <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.58rem', letterSpacing: '0.10em' }}>DASHBOARD</p>
            </div>
          </div>

          {/* Título */}
          <div style={{ marginLeft: 4 }}>
            <h1 style={{ color: '#fff', fontWeight: 900, fontSize: 'clamp(0.95rem,2.2vw,1.25rem)', letterSpacing: '-0.025em', lineHeight: 1.1 }}>Estatísticas</h1>
            <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.62rem', marginTop: 1 }}>Projeto de Sustentabilidade Urbana</p>
          </div>

          <div style={{ flex: 1 }} />

          {/* Ações */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button onClick={fetchStats} disabled={loading}
              style={{ ...glassDim, border: 'none', borderRadius: 10, padding: '7px 9px', cursor: 'pointer', display: 'flex', opacity: loading ? 0.5 : 1 }}>
              <RefreshCw size={14} style={{ color: 'rgba(255,255,255,0.50)', animation: loading ? 'db-spin 1s linear infinite' : 'none' }} />
            </button>

            <div style={{ ...glassDim, borderRadius: 10, padding: '7px 9px', position: 'relative' }}>
              <Bell size={14} style={{ color: 'rgba(255,255,255,0.45)' }} />
              {!error && !loading && <span style={{ position: 'absolute', top: 7, right: 8, width: 5, height: 5, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 5px #4ade80' }} />}
            </div>

            <div style={{ ...glassGreen, borderRadius: 10, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 6px #4ade80', flexShrink: 0 }} />
              <span style={{ color: '#bbf7d0', fontSize: '0.66rem', fontWeight: 700, letterSpacing: '0.06em' }}>AO VIVO</span>
            </div>

            <button onClick={() => navigate('/')}
              style={{ ...glassDim, border: 'none', borderRadius: 10, padding: '7px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.45)', fontSize: '0.76rem', fontWeight: 500 }}>
              <ArrowLeft size={13} /> Voltar
            </button>
          </div>
        </div>
      </header>

      {/* ── CONTEÚDO ── */}
      <main style={{ position: 'relative', zIndex: 10, flex: 1, overflowY: 'auto', padding: 'clamp(1rem,2.5vw,1.5rem) clamp(1rem,4vw,2rem)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(0.7rem,1.5vw,1rem)' }}>

          {/* Erro */}
          {error && (
            <div style={{ ...glassDim, borderRadius: 14, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, border: '1px solid rgba(239,68,68,0.25)' }}>
              <span style={{ color: 'rgba(239,68,68,0.8)', fontSize: '0.78rem', flex: 1 }}>Erro ao carregar dados.</span>
              <button onClick={fetchStats} style={{ color: '#4ade80', fontSize: '0.74rem', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>Tentar novamente</button>
            </div>
          )}

          {/* ── ROW 1: 3 KPIs ── */}
          <div className="db-row3">
            <Card style={glassGreen}>
              <Label text="Total de respostas" icon={Users} color="#4ade80" />
              {loading ? <Skel w={90} h={44} /> : <BigNum value={total.toLocaleString('pt-BR')} sub="participantes registrados" />}
            </Card>

            <Card style={glass}>
              <Label text="Separam sempre" icon={Recycle} color="#34d399" />
              {loading ? <Skel w={80} h={44} /> : <BigNum value={semprePct} suffix="%" sub="dos respondentes" />}
            </Card>

            <Card style={glass}>
              <Label text="Coleta funciona bem" icon={MapPin} color="#fbbf24" />
              {loading ? <Skel w={80} h={44} /> : <BigNum value={funcionaPct} suffix="%" sub="das comunidades" />}
            </Card>
          </div>

          {/* ── ROW 2: 3 gráficos ── */}
          <div className="db-row3">
            {/* Separação — donut */}
            <Card style={glassGreen}>
              <Label text="Separação do lixo" icon={BarChart2} color="#4ade80" />
              {loading ? <Skel h={90} /> : (
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <Donut pct={semprePct} color="#4ade80" size={86} />
                    <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', color: '#fff', fontWeight: 900, fontSize: '0.86rem' }}>{semprePct}%</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {porSeparacao.slice(0, 4).map(({ valor, total: v }, i) => {
                      const cols = ['#4ade80', 'rgba(255,255,255,0.30)', 'rgba(255,255,255,0.16)', 'rgba(255,255,255,0.08)']
                      return (
                        <div key={valor} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 7 }}>
                          <span style={{ width: 6, height: 6, borderRadius: 2, background: cols[i], flexShrink: 0 }} />
                          <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.68rem', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{valor}</span>
                          <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.68rem' }}>{Math.round((v / (total || 1)) * 100)}%</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </Card>

            {/* Frequência */}
            <Card style={glass}>
              <Label text="Frequência de descarte" icon={Activity} color="#38bdf8" />
              {loading ? <><Skel w={120} h={30} /><div style={{ marginTop: 8 }} /><Skel h={64} /></> : (
                <>
                  <div>
                    <p style={{ color: '#fff', fontWeight: 900, fontSize: 'clamp(1.1rem,2.2vw,1.55rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>{porFrequencia[0]?.valor ?? '—'}</p>
                    <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.63rem', marginTop: 3 }}>
                      mais respondida · <span style={{ color: '#38bdf8', fontWeight: 600 }}>{porFrequencia[0]?.total ?? 0} pessoas</span>
                    </p>
                  </div>
                  <VBarChart items={porFrequencia} color="#38bdf8" maxBars={4} />
                </>
              )}
            </Card>

            {/* Materiais */}
            <Card style={glass}>
              <Label text="Materiais reciclados" icon={Recycle} color="#34d399" />
              {loading ? <><Skel h={64} /><Skel w="70%" h={12} /></> : (
                <>
                  <VBarChart items={porMaterial} color="#34d399" maxBars={6} />
                  <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.63rem' }}>
                    Top: <span style={{ color: '#d1fae5', fontWeight: 600 }}>{porMaterial[0]?.valor ?? '—'}</span>
                    {' '}— <span style={{ color: '#4ade80', fontWeight: 700 }}>{porMaterial[0]?.total ?? 0}</span> respostas
                  </p>
                </>
              )}
            </Card>
          </div>

          {/* ── ROW 3: 3 cards ── */}
          <div className="db-row3">
            {/* Comunidade */}
            <Card style={glass}>
              <Label text="Coleta na comunidade" icon={MapPin} color="#fbbf24" />
              {loading ? <Skel h={80} /> : (
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <Donut pct={funcionaPct} color="#fbbf24" size={72} stroke={8} />
                    <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', color: '#fff', fontWeight: 900, fontSize: '0.76rem' }}>{funcionaPct}%</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ color: '#fbbf24', fontWeight: 700, fontSize: '0.75rem', marginBottom: 8 }}>Funciona bem</p>
                    <DistBar items={porComunidade} colors={['#fbbf24', 'rgba(255,255,255,0.28)', 'rgba(255,255,255,0.14)', 'rgba(255,255,255,0.07)']} />
                  </div>
                </div>
              )}
            </Card>

            {/* Motivação */}
            <Card style={glass}>
              <Label text="O que motiva mais?" icon={TrendingUp} color="#c084fc" />
              {loading
                ? [1,2,3,4].map(k => <Skel key={k} h={11} />)
                : <>
                    <DistBar items={porMotivacao} colors={['#c084fc', 'rgba(255,255,255,0.28)', 'rgba(255,255,255,0.14)', 'rgba(255,255,255,0.07)']} />
                    {porMotivacao[0] && (
                      <div style={{ ...glassGreen, borderRadius: 12, padding: '9px 12px', marginTop: 4 }}>
                        <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.58rem', marginBottom: 2 }}>Principal demanda</p>
                        <p style={{ color: '#d1fae5', fontWeight: 700, fontSize: '0.76rem', lineHeight: 1.3 }}>{porMotivacao[0].valor}</p>
                      </div>
                    )}
                  </>
              }
            </Card>

            {/* Sparkline separação */}
            <Card style={glassGreen}>
              <Label text="Tendência separação" icon={Activity} color="#4ade80" />
              {loading ? <><Skel w={90} h={40} /><Skel h={44} /></> : (
                <>
                  <p style={{ color: '#fff', fontWeight: 900, fontSize: 'clamp(1.7rem,3.5vw,2.3rem)', letterSpacing: '-0.04em', lineHeight: 1 }}>
                    {semprePct}<span style={{ fontSize: '1rem', fontWeight: 500, color: 'rgba(255,255,255,0.38)' }}>%</span>
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.63rem' }}>separam sempre o lixo</p>
                  <Sparkline data={porSeparacao.map(x => x.total)} color="#4ade80" w={160} h={44} />
                  <div style={{ height: 5, borderRadius: 99, background: 'rgba(255,255,255,0.07)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${semprePct}%`, borderRadius: 99, background: 'linear-gradient(90deg,#4ade80,#86efac)', boxShadow: '0 0 8px #4ade8066', transition: 'width 1.2s cubic-bezier(.22,1,.36,1)' }} />
                  </div>
                </>
              )}
            </Card>
          </div>

          {/* Footer */}
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, paddingTop: 4 }}>
            <p style={{ color: 'rgba(255,255,255,0.18)', fontSize: '0.60rem' }}>
              Dados em tempo real via Supabase{lastUpdate ? ` · Atualizado às ${hhmm}` : ''}
            </p>
            <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'rgba(255,255,255,0.25)', fontSize: '0.66rem', background: 'none', border: 'none', cursor: 'pointer' }}>
              <ArrowLeft size={11} /> Voltar ao início
            </button>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes db-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes db-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
        .db-skel { background: rgba(255,255,255,0.06); animation: db-pulse 1.6s ease-in-out infinite; }
        .db-row3 {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(0.7rem,1.5vw,1rem);
        }
        @media (min-width: 640px) {
          .db-row3 { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>
    </div>
  )
}
