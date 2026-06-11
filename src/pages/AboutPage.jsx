import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Sprout, Leaf, Recycle, Users, Lightbulb, TreePine, Play } from 'lucide-react'

const frost = {
  background: 'rgba(10, 22, 14, 0.58)',
  backdropFilter: 'blur(44px) saturate(200%)',
  WebkitBackdropFilter: 'blur(44px) saturate(200%)',
  border: '1px solid rgba(255,255,255,0.08)',
  boxShadow: '0 16px 56px rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.06)',
}

const frostGreen = {
  background: 'rgba(74,222,128,0.08)',
  backdropFilter: 'blur(44px) saturate(200%)',
  WebkitBackdropFilter: 'blur(44px) saturate(200%)',
  border: '1px solid rgba(74,222,128,0.20)',
  boxShadow: '0 8px 40px rgba(0,0,0,0.40), inset 0 1px 0 rgba(74,222,128,0.08)',
}

const PILARES = [
  {
    icon: Recycle,
    color: '#4ade80',
    title: 'Reciclagem Inteligente',
    desc: 'Mapeamos os hábitos da comunidade para criar estratégias de coleta seletiva mais eficientes e acessíveis a todos.',
  },
  {
    icon: Users,
    color: '#38bdf8',
    title: 'Engajamento Comunitário',
    desc: 'Acreditamos que a transformação começa nas pessoas. Campanhas, questionários e dados reais para mobilizar cada bairro.',
  },
  {
    icon: TreePine,
    color: '#34d399',
    title: 'Impacto Ambiental Real',
    desc: 'Cada dado coletado se transforma em ação: menos resíduos nos aterros, menos emissão de CO₂ e cidades mais verdes.',
  },
  {
    icon: Lightbulb,
    color: '#fbbf24',
    title: 'Educação Ambiental',
    desc: 'Informação acessível sobre reciclagem, compostagem e consumo consciente para todas as idades e perfis.',
  },
]

const VIDEOS = [
  {
    id: 'ITur0JNJZos',
    title: 'Por que reciclar importa?',
    desc: 'A cadeia da reciclagem e seu impacto direto no meio ambiente urbano.',
  },
  {
    id: 'B-IoByiYUuE',
    title: 'Separação correta do lixo',
    desc: 'Como separar corretamente os resíduos em casa de forma simples e eficaz.',
  },
  {
    id: 'sfa-jnXtA84',
    title: 'O que nunca te contaram sobre o lixo',
    desc: 'Felipe Castanhari explica de forma animada tudo que acontece com o lixo que você descarta.',
  },
]

const NUMEROS = [
  { valor: '1 bi+',  label: 'toneladas de lixo geradas por ano no Brasil' },
  { valor: '3%',     label: 'apenas do lixo eletrônico é reciclado no país' },
  { valor: '91%',    label: 'do plástico nunca foi reciclado globalmente' },
  { valor: '50%',    label: 'redução possível do lixo doméstico com compostagem' },
]

export default function AboutPage() {
  const navigate = useNavigate()

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center overflow-x-hidden">

      {/* Background */}
      <div className="fixed inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=1800&q=90&fit=crop"
          alt="" aria-hidden="true"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(160deg,rgba(0,0,0,0.82) 0%,rgba(0,0,0,0.62) 50%,rgba(0,0,0,0.88) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'rgba(2,14,6,0.30)' }} />
      </div>

      {/* Grain */}
      <div aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none opacity-20"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")` }} />

      {/* Botão voltar */}
      <div className="fixed top-4 left-4 sm:top-6 sm:left-6 z-20">
        <button onClick={() => navigate('/')} className="btn-ghost">
          <ArrowLeft size={13} /> Início
        </button>
      </div>

      <main className="relative z-10 w-full max-w-4xl flex flex-col items-center"
        style={{ padding: 'clamp(4.5rem,12vw,6.5rem) clamp(1rem,5vw,1.5rem) clamp(3rem,8vw,5rem)', gap: 'clamp(3rem,7vw,5rem)', display: 'flex', flexDirection: 'column' }}>

        {/* ── Hero da proposta ── */}
        <header className="anim-fade-up w-full flex flex-col items-center gap-5 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold"
            style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.10)', color: '#d1fae5', letterSpacing: '0.05em' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
            Nossa Proposta
          </span>

          <h1 className="font-black tracking-tight text-white leading-tight"
            style={{ fontSize: 'clamp(1.9rem,5vw,3.6rem)', textShadow: '0 2px 40px rgba(0,0,0,0.5)', maxWidth: 720 }}>
            Construindo hábitos que{' '}
            <span className="text-shimmer">transformam</span> cidades
          </h1>

          <p className="text-white/50 leading-relaxed max-w-xl"
            style={{ fontSize: 'clamp(0.9rem,2vw,1.1rem)' }}>
            O projeto <strong style={{ color: '#bbf7d0', fontWeight: 700 }}>Cidade Sustentável</strong> nasce da convicção
            de que pequenas mudanças individuais, quando somadas, geram impacto urbano real.
            Usamos dados, educação e tecnologia para criar uma cultura de reciclagem duradoura.
          </p>
        </header>

        {/* ── Números impactantes ── */}
        <section className="anim-fade-up d-100 w-full">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 'clamp(0.6rem,1.5vw,1rem)' }}
            className="about-grid-4">
            {NUMEROS.map(({ valor, label }) => (
              <div key={label} style={{ ...frost, borderRadius: 20, padding: 'clamp(1rem,3vw,1.5rem)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <p style={{ color: '#4ade80', fontWeight: 900, fontSize: 'clamp(1.6rem,4vw,2.4rem)', letterSpacing: '-0.04em', lineHeight: 1, textShadow: '0 0 24px rgba(74,222,128,0.30)' }}>
                  {valor}
                </p>
                <p style={{ color: 'rgba(255,255,255,0.40)', fontSize: 'clamp(0.7rem,1.5vw,0.82rem)', lineHeight: 1.5 }}>{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Missão em destaque ── */}
        <section className="anim-fade-up d-200 w-full" style={{ ...frostGreen, borderRadius: 24, padding: 'clamp(1.5rem,4vw,2.5rem)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'clamp(1rem,3vw,1.75rem)', flexWrap: 'wrap' }}>
            <div style={{ width: 52, height: 52, borderRadius: 16, ...frostGreen, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Sprout size={22} style={{ color: '#4ade80' }} />
            </div>
            <div style={{ flex: 1, minWidth: 220 }}>
              <p style={{ color: 'rgba(255,255,255,0.30)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 10 }}>Nossa missão</p>
              <p style={{ color: '#fff', fontWeight: 800, fontSize: 'clamp(1rem,2.5vw,1.35rem)', lineHeight: 1.5, letterSpacing: '-0.01em' }}>
                "Mapear, educar e engajar comunidades urbanas para transformar o descarte de resíduos em um hábito consciente, acessível e sustentável — contribuindo para cidades mais limpas e um planeta mais saudável."
              </p>
              <div style={{ marginTop: 14, height: 2, width: 48, borderRadius: 99, background: '#4ade80', opacity: 0.5 }} />
            </div>
          </div>
        </section>

        {/* ── Os 4 pilares ── */}
        <section className="anim-fade-up d-300 w-full">
          <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 'clamp(1rem,2.5vw,1.5rem)', textAlign: 'center' }}>
            Os quatro pilares
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 'clamp(0.6rem,1.5vw,1rem)' }}
            className="about-grid-4">
            {PILARES.map(({ icon: Icon, color, title, desc }) => (
              <div key={title} style={{ ...frost, borderRadius: 20, padding: 'clamp(1rem,3vw,1.5rem)', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: `${color}14`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <div>
                  <h3 style={{ color: '#fff', fontWeight: 800, fontSize: 'clamp(0.88rem,1.8vw,1.05rem)', marginBottom: 6, lineHeight: 1.25 }}>{title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.40)', fontSize: 'clamp(0.75rem,1.4vw,0.82rem)', lineHeight: 1.65 }}>{desc}</p>
                </div>
                <div style={{ height: 2, width: 28, borderRadius: 99, background: color, opacity: 0.5, marginTop: 'auto' }} />
              </div>
            ))}
          </div>
        </section>

        {/* ── Vídeos informativos ── */}
        <section className="anim-fade-up d-400 w-full">
          <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 'clamp(1rem,2.5vw,1.5rem)', textAlign: 'center' }}>
            Vídeos informativos
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.75rem,2vw,1.25rem)' }}>
            {VIDEOS.map(({ id, title, desc }) => (
              <div key={id} style={{ ...frost, borderRadius: 20, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                {/* Cabeçalho do card */}
                <div style={{ padding: 'clamp(0.9rem,2.5vw,1.25rem) clamp(1rem,3vw,1.5rem) 0', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 10, ...frostGreen, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Play size={14} style={{ color: '#4ade80', marginLeft: 1 }} />
                  </div>
                  <div>
                    <h3 style={{ color: '#fff', fontWeight: 800, fontSize: 'clamp(0.88rem,1.8vw,1rem)', lineHeight: 1.2 }}>{title}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.72rem', marginTop: 2 }}>{desc}</p>
                  </div>
                </div>
                {/* Iframe do YouTube */}
                <div style={{ position: 'relative', paddingBottom: '56.25%', margin: 'clamp(0.75rem,2vw,1rem)', borderRadius: 14, overflow: 'hidden', background: 'rgba(0,0,0,0.40)' }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', borderRadius: 14 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA final ── */}
        <section className="anim-fade-up d-500 w-full flex flex-col items-center gap-5 text-center"
          style={{ ...frostGreen, borderRadius: 24, padding: 'clamp(2rem,5vw,3rem) clamp(1.25rem,4vw,2rem)' }}>
          <div style={{ width: 52, height: 52, borderRadius: 16, ...frostGreen, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Leaf size={22} style={{ color: '#4ade80' }} />
          </div>
          <div>
            <h2 style={{ color: '#fff', fontWeight: 900, fontSize: 'clamp(1.3rem,3vw,2rem)', letterSpacing: '-0.025em', marginBottom: 10 }}>
              Faça parte da mudança
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.40)', fontSize: 'clamp(0.82rem,1.8vw,0.95rem)', lineHeight: 1.7, maxWidth: 420, margin: '0 auto' }}>
              Responda nosso questionário e ajude a construir um diagnóstico real dos hábitos de reciclagem na sua comunidade.
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', width: '100%' }}>
            <button onClick={() => navigate('/projeto')} className="btn-accent group"
              style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Sprout size={15} />
              Participar do questionário
              <ArrowRight size={14} />
            </button>
            <button onClick={() => navigate('/timeline')} className="btn-primary">
              Guia de reciclagem
            </button>
          </div>
        </section>

      </main>

      <style>{`
        @media (min-width: 640px) {
          .about-grid-4 { grid-template-columns: repeat(4, 1fr) !important; }
        }
      `}</style>
    </div>
  )
}
