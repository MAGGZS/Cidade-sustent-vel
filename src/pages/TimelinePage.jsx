import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Trash2, ScanLine, MapPin, Repeat2, Leaf, Lightbulb } from 'lucide-react'

const STEPS = [
  {
    icon: Trash2,
    step: 'Passo 1',
    title: 'Separe na Fonte',
    desc: 'Comece separando o lixo em casa em pelo menos dois grupos: recicláveis (plástico, papel, vidro, metal) e orgânicos. Use lixeiras com cores diferentes para criar o hábito naturalmente.',
    color: '#4ade80',
    side: 'left',
  },
  {
    icon: ScanLine,
    step: 'Passo 2',
    title: 'Identifique os Materiais',
    desc: 'Aprenda a identificar os símbolos de reciclagem nas embalagens. Plásticos têm números de 1 a 7 que indicam o tipo — nem todos são aceitos nos mesmos pontos de coleta.',
    color: '#38bdf8',
    side: 'right',
  },
  {
    icon: MapPin,
    step: 'Passo 3',
    title: 'Encontre Pontos de Coleta',
    desc: 'Localize o ecoponto ou ponto de entrega voluntária (PEV) mais próximo. Muitos supermercados e farmácias já possuem coletores específicos para pilhas, eletrônicos e embalagens.',
    color: '#fbbf24',
    side: 'left',
  },
  {
    icon: Repeat2,
    step: 'Passo 4',
    title: 'Reduza Antes de Reciclar',
    desc: 'A reciclagem é a última etapa — antes disso, reduza o consumo e reutilize. Prefira produtos a granel, embalagens retornáveis e evite o descartável sempre que possível.',
    color: '#c084fc',
    side: 'right',
  },
  {
    icon: Leaf,
    step: 'Passo 5',
    title: 'Compostagem em Casa',
    desc: 'Resíduos orgânicos como cascas e restos de comida podem ser transformados em adubo por meio da compostagem. É simples, não gera odor e reduz em até 50% o volume do seu lixo.',
    color: '#34d399',
    side: 'left',
  },
  {
    icon: Lightbulb,
    step: 'Passo 6',
    title: 'Engaje sua Comunidade',
    desc: 'Compartilhe o conhecimento com vizinhos, escolas e grupos locais. Uma comunidade informada gera impacto coletivo: menos lixo nos aterros, menos emissão de gases e cidades mais limpas.',
    color: '#fb923c',
    side: 'right',
  },
]

const frost = {
  background: 'rgba(16, 24, 18, 0.60)',
  backdropFilter: 'blur(36px) saturate(180%)',
  WebkitBackdropFilter: 'blur(36px) saturate(180%)',
  border: '1px solid rgba(255,255,255,0.09)',
  boxShadow: '0 16px 48px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
}

export default function TimelinePage() {
  const navigate = useNavigate()

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden flex flex-col items-center">

      {/* Background */}
      <div className="fixed inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1800&q=90&fit=crop"
          alt="" aria-hidden="true"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(160deg,rgba(0,0,0,0.82) 0%,rgba(0,0,0,0.65) 50%,rgba(0,0,0,0.88) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.35)' }} />
      </div>

      {/* Grain */}
      <div aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none opacity-20"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")` }} />

      {/* Back */}
      <div className="fixed top-5 left-5 z-20">
        <button onClick={() => navigate(-1)} className="btn-ghost">
          <ArrowLeft size={13} /> Voltar
        </button>
      </div>

      <main className="relative z-10 w-full max-w-3xl px-5 flex flex-col items-center gap-16" style={{ paddingTop: '7rem', paddingBottom: '5rem' }}>

        {/* Hero */}
        <header className="text-center flex flex-col items-center gap-4 anim-fade-up">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold"
            style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.10)', color: '#d1fae5', letterSpacing: '0.05em' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
            Guia de Reciclagem Inteligente
          </span>
          <h1 className="text-white font-black tracking-tight leading-tight"
            style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', textShadow: '0 2px 40px rgba(0,0,0,0.5)' }}>
            Como reciclar de forma{' '}
            <span className="text-shimmer">inteligente</span>
          </h1>
          <p className="text-white/50 text-base leading-relaxed max-w-md">
            Seis passos práticos para transformar seus hábitos e gerar impacto real na sua comunidade.
          </p>
        </header>

        {/* Timeline */}
        <section className="w-full relative" aria-label="Linha do tempo">

          {/* Vertical line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(180deg, transparent, rgba(74,222,128,0.25) 8%, rgba(74,222,128,0.25) 92%, transparent)' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {STEPS.map(({ icon: Icon, step, title, desc, color, side }, i) => (
              <div key={step}
                className={`anim-fade-up d-${Math.min((i + 1) * 100, 600)}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: side === 'left' ? 'flex-start' : 'flex-end',
                  position: 'relative',
                  marginBottom: 48,
                }}>

                {/* Card */}
                <div style={{
                  ...frost,
                  borderRadius: 24,
                  padding: '1.5rem',
                  width: 'calc(50% - 40px)',
                  position: 'relative',
                }}>
                  {/* Step label */}
                  <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 8 }}>
                    {step}
                  </p>
                  <h3 style={{ color: '#fff', fontWeight: 900, fontSize: '1.15rem', lineHeight: 1.25, marginBottom: 10 }}>
                    {title}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', lineHeight: 1.7 }}>
                    {desc}
                  </p>
                  {/* Color accent */}
                  <div style={{ marginTop: 16, height: 2, width: 32, borderRadius: 99, background: color, opacity: 0.6 }} />
                </div>

                {/* Center dot + icon */}
                <div style={{
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 0,
                  zIndex: 2,
                }}>
                  {/* Dashed connector */}
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 48,
                    height: 1,
                    [side === 'left' ? 'right' : 'left']: '100%',
                    backgroundImage: `repeating-linear-gradient(90deg, ${color}50 0, ${color}50 4px, transparent 4px, transparent 8px)`,
                  }} />

                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 14,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(16,24,18,0.80)',
                    backdropFilter: 'blur(20px)',
                    border: `1px solid ${color}35`,
                    boxShadow: `0 4px 20px rgba(0,0,0,0.4), 0 0 0 4px rgba(16,24,18,0.5)`,
                  }}>
                    <Icon size={18} style={{ color }} />
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="anim-fade-up flex flex-wrap gap-3 justify-center pb-8">
          <button onClick={() => navigate('/projeto')} className="btn-primary">
            <ArrowLeft size={13} /> Fazer o questionário
          </button>
          <button onClick={() => navigate('/')} className="btn-ghost">
            Voltar ao início
          </button>
        </div>

      </main>
    </div>
  )
}
