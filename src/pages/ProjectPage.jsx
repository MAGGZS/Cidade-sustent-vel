import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react'

const STEPS = [
  {
    id: 'separa',
    question: 'Você separa o lixo em casa?',
    options: ['Sim, sempre', 'Às vezes', 'Raramente', 'Não separo'],
  },
  {
    id: 'materiais',
    question: 'Quais materiais você recicla?',
    hint: 'Selecione todos que se aplicam',
    multi: true,
    options: ['Papel e papelão', 'Plástico', 'Vidro', 'Metal', 'Orgânico', 'Nenhum'],
  },
  {
    id: 'frequencia',
    question: 'Com que frequência você descarta no ponto de coleta?',
    options: ['Toda semana', 'A cada 15 dias', 'Uma vez por mês', 'Raramente'],
  },
  {
    id: 'comunidade',
    question: 'Sua comunidade tem coleta seletiva?',
    options: ['Sim, funciona bem', 'Sim, mas é irregular', 'Não tem', 'Não sei'],
  },
  {
    id: 'interesse',
    question: 'O que te motivaria a reciclar mais?',
    options: ['Mais pontos de coleta', 'Educação e campanhas', 'Benefícios ou recompensas', 'Já reciclo bastante'],
  },
]

const frost = {
  background: 'rgba(16, 24, 18, 0.62)',
  backdropFilter: 'blur(40px) saturate(200%)',
  WebkitBackdropFilter: 'blur(40px) saturate(200%)',
  border: '1px solid rgba(255,255,255,0.09)',
  boxShadow: '0 24px 64px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)',
}

export default function ProjectPage() {
  const navigate = useNavigate()
  const [email, setEmail]     = useState('')
  const [emailOk, setEmailOk] = useState(false)
  const [emailErr, setEmailErr] = useState(false)
  const [step, setStep]       = useState(0)
  const [answers, setAnswers] = useState({})
  const [done, setDone]       = useState(false)

  function submitEmail(e) {
    e.preventDefault()
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailOk(true)
      setEmailErr(false)
    } else {
      setEmailErr(true)
    }
  }

  const current = STEPS[step]
  const answer  = answers[current?.id]
  const canNext = current?.multi ? (answer?.length > 0) : !!answer

  function select(opt) {
    if (!current.multi) {
      setAnswers(a => ({ ...a, [current.id]: opt }))
    } else {
      setAnswers(a => {
        const prev = a[current.id] || []
        return {
          ...a,
          [current.id]: prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt],
        }
      })
    }
  }

  function next() {
    if (step < STEPS.length - 1) setStep(s => s + 1)
    else setDone(true)
  }

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* Background */}
      <div className="fixed inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=1800&q=90&fit=crop"
          alt="" aria-hidden="true"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(160deg,rgba(0,0,0,0.50) 0%,rgba(0,0,0,0.20) 50%,rgba(0,0,0,0.65) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'rgba(4,14,8,0.32)' }} />
      </div>

      {/* Grain */}
      <div aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none opacity-20"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")` }} />

      {/* Back */}
      <div className="fixed top-5 left-5 z-20">
        <button onClick={() => navigate('/')} className="btn-ghost">
          <ArrowLeft size={13} /> Início
        </button>
      </div>

      <main className="relative z-10 w-full max-w-lg px-5">

        {!emailOk ? (
          /* ── Email gate ── */
          <form onSubmit={submitEmail} className="w-full anim-fade-up"
            style={{ ...frost, borderRadius: 32, padding: '2.5rem' }}>

            <div style={{ marginBottom: 28 }}>
              <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 10 }}>Antes de começar</p>
              <h2 style={{ color: '#fff', fontWeight: 900, fontSize: '1.4rem', lineHeight: 1.25, letterSpacing: '-0.02em', marginBottom: 8 }}>
                Informe seu e-mail
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                Usado apenas para registrar sua participação no formulário.
              </p>
            </div>

            <div style={{ position: 'relative' }}>
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={e => { setEmail(e.target.value); setEmailErr(false) }}
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  borderRadius: 14,
                  background: 'rgba(255,255,255,0.05)',
                  border: `1px solid ${emailErr ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.10)'}`,
                  color: '#fff',
                  fontSize: '0.9rem',
                  outline: 'none',
                  transition: 'border-color 0.3s',
                }}
              />
            </div>

            {emailErr && (
              <p style={{ color: 'rgba(239,68,68,0.8)', fontSize: 12, marginTop: 8 }}>Digite um e-mail válido para continuar.</p>
            )}

            <div style={{ marginTop: 28, display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit"
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '10px 24px', borderRadius: 99,
                  background: email ? 'rgba(74,222,128,0.16)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${email ? 'rgba(74,222,128,0.35)' : 'rgba(255,255,255,0.08)'}`,
                  color: email ? '#bbf7d0' : 'rgba(255,255,255,0.20)',
                  fontSize: '0.875rem', fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(.22,1,.36,1)',
                }}>
                Continuar <ArrowRight size={14} />
              </button>
            </div>

          </form>

        ) : !done ? (
          <div className="w-full anim-fade-up" style={{ ...frost, borderRadius: 32, padding: '2.5rem' }}>

            {/* Progress dots + bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 36 }}>
              {STEPS.map((_, i) => (
                <div key={i} style={{ flex: 1, height: 3, borderRadius: 99, overflow: 'hidden', background: 'rgba(255,255,255,0.08)' }}>
                  <div style={{
                    height: '100%',
                    borderRadius: 99,
                    background: 'rgba(74,222,128,0.80)',
                    width: i < step ? '100%' : i === step ? (canNext ? '100%' : '35%') : '0%',
                    transition: 'width 0.5s cubic-bezier(.22,1,.36,1)',
                  }} />
                </div>
              ))}
              <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11, fontWeight: 600, marginLeft: 4, flexShrink: 0 }}>
                {step + 1}/{STEPS.length}
              </span>
            </div>

            {/* Question */}
            <div style={{ marginBottom: 28 }}>
              <h2 style={{ color: '#fff', fontWeight: 900, fontSize: '1.4rem', lineHeight: 1.25, letterSpacing: '-0.02em' }}>
                {current.question}
              </h2>
              {current.hint && (
                <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, marginTop: 8 }}>{current.hint}</p>
              )}
            </div>

            {/* Options */}
            <div style={{ display: 'grid', gridTemplateColumns: current.multi ? '1fr 1fr' : '1fr', gap: 10 }}>
              {current.options.map(opt => {
                const isSelected = current.multi
                  ? (answer || []).includes(opt)
                  : answer === opt

                return (
                  <button key={opt} onClick={() => select(opt)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
                      textAlign: 'left', padding: '14px 18px', borderRadius: 14,
                      background: isSelected ? 'rgba(74,222,128,0.13)' : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${isSelected ? 'rgba(74,222,128,0.35)' : 'rgba(255,255,255,0.08)'}`,
                      color: isSelected ? '#d1fae5' : 'rgba(255,255,255,0.55)',
                      fontSize: '0.875rem', fontWeight: isSelected ? 600 : 400,
                      transition: 'all 0.3s cubic-bezier(.22,1,.36,1)',
                      cursor: 'pointer',
                    }}>
                    <span style={{ lineHeight: 1.4 }}>{opt}</span>
                    {isSelected && <CheckCircle2 size={15} style={{ color: '#4ade80', flexShrink: 0 }} />}
                  </button>
                )
              })}
            </div>

            {/* Footer */}
            <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
              {/* Back step */}
              {step > 0 ? (
                <button onClick={() => setStep(s => s - 1)}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.30)', fontSize: '0.875rem', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.3s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.30)'}
                >
                  <ArrowLeft size={13} /> Anterior
                </button>
              ) : <span />}

              {/* Next */}
              <button onClick={next} disabled={!canNext}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '10px 22px', borderRadius: 99,
                  background: canNext ? 'rgba(74,222,128,0.14)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${canNext ? 'rgba(74,222,128,0.32)' : 'rgba(255,255,255,0.07)'}`,
                  color: canNext ? '#bbf7d0' : 'rgba(255,255,255,0.18)',
                  fontSize: '0.875rem', fontWeight: 600,
                  cursor: canNext ? 'pointer' : 'not-allowed',
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.35s cubic-bezier(.22,1,.36,1)',
                }}>
                {step < STEPS.length - 1 ? 'Próxima' : 'Enviar'}
                <ArrowRight size={14} />
              </button>
            </div>

          </div>

        ) : (

          <div className="w-full anim-fade-up flex flex-col items-center gap-7 text-center"
            style={{ ...frost, borderRadius: 32, padding: '3rem 2.25rem' }}>

            <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.20)' }}>
              <CheckCircle2 size={26} style={{ color: '#4ade80' }} />
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-white font-black text-2xl tracking-tight">Obrigado!</h2>
              <p className="text-white/38 text-sm leading-relaxed max-w-xs mx-auto">
                Suas respostas vão nos ajudar a entender melhor os hábitos de reciclagem na sua comunidade.
              </p>
            </div>

            <div className="w-full h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />

            <button onClick={() => navigate('/timeline')} className="btn-primary">
              <ArrowLeft size={13} /> Ver guia de reciclagem
            </button>

          </div>
        )}

      </main>
    </div>
  )
}
