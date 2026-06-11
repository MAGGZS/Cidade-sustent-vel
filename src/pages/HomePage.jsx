import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import { ArrowRight, Sprout } from 'lucide-react'

export default function HomePage() {
  const navigate = useNavigate()
  const clicks = useRef(0)
  const timer  = useRef(null)

  function handleBadgeClick() {
    clicks.current += 1
    clearTimeout(timer.current)
    timer.current = setTimeout(() => { clicks.current = 0 }, 2000)
    if (clicks.current >= 5) {
      clicks.current = 0
      navigate('/dashboard')
    }
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center">

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=1800&q=90&fit=crop"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0.5) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'rgba(5,25,12,0.22)' }} />
      </div>

      {/* Grain */}
      <div aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none opacity-25"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")` }} />

      {/* Content */}
      <main className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center gap-4 sm:gap-6 text-center"
        style={{ padding: 'clamp(5rem, 14vw, 8rem) clamp(1.25rem, 5vw, 2rem) clamp(3rem, 7vw, 5rem)' }}>

        {/* Badge */}
        <span onClick={handleBadgeClick} className="anim-fade-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold"
          style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.10)', color: '#d1fae5', letterSpacing: '0.05em', cursor: 'default', userSelect: 'none' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
          Projeto de Sustentabilidade Urbana
        </span>

        {/* Headline */}
        <h1 className="anim-fade-up d-100 font-black leading-[1.02] tracking-tight text-white"
          style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', textShadow: '0 2px 40px rgba(0,0,0,0.4)' }}>
          Construindo a{' '}
          <span className="text-shimmer">Cidade</span>
          <br />do Futuro
        </h1>

        {/* Subtitle */}
        <p className="anim-fade-up d-200 text-white/60 text-base sm:text-lg leading-relaxed max-w-md"
          style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}>
          Tecnologia, natureza e comunidade unidas para transformar
          espaços urbanos em ambientes mais sustentáveis.
        </p>

        {/* CTAs */}
        <div className="anim-fade-up d-300 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full max-w-xs sm:max-w-none mx-auto">
          <button
            onClick={() => navigate('/sobre')}
            className="btn-accent group">
            <Sprout size={16} />
            Conhecer o Projeto
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

      </main>

      {/* Bottom fade */}
      <div aria-hidden="true" className="absolute bottom-0 inset-x-0 h-28 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(5,12,7,0.65), transparent)', zIndex: 10 }} />
    </div>
  )
}
