import { Logo } from '../ui/Logo';

interface ArequipaCollageProps {
  /** Optional real photo for the big tile. When set, replaces the product illustration with an <img>. */
  photoSrc?: string;
}

export function ArequipaCollage({ photoSrc }: ArequipaCollageProps) {
  return (
    <div className="relative grid grid-cols-1 gap-3.5 sm:grid-cols-5 sm:grid-rows-[230px_230px]">
      <PhoneTile photoSrc={photoSrc} />
      <CourtTile />
      <ChatTile />

      <div className="absolute -left-[18px] bottom-9 z-10 hidden items-center gap-2 rounded-card bg-white px-4 py-3 shadow-xl sm:flex">
        <span className="h-2 w-2 shrink-0 rounded-full bg-brand" />
        <span className="text-sm font-semibold text-ink">
          <span className="font-bold">Expediente al día</span> · CEJ hace 2 h
        </span>
      </div>
    </div>
  );
}

function PhoneTile({ photoSrc }: { photoSrc?: string }) {
  if (photoSrc) {
    return (
      <div className="relative h-[420px] overflow-hidden rounded-card sm:col-span-3 sm:row-span-2 sm:h-auto">
        <img src={photoSrc} alt="Tu caso en el celular" className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label="Ilustración: el caso de María en la app de Syloop desde el celular, con los volcanes de Arequipa al fondo"
      className="relative h-[420px] overflow-hidden rounded-card sm:col-span-3 sm:row-span-2 sm:h-auto"
      style={{ background: 'radial-gradient(ellipse 90% 70% at 50% 20%, #2A3A55 0%, #1E293B 70%)' }}
    >
      <span
        className="absolute left-4 top-4 text-[11px] font-bold uppercase text-sky"
        style={{ letterSpacing: '0.12em' }}
      >
        Tu caso en el celular
      </span>

      <svg
        className="absolute inset-x-0 bottom-0 h-[120px] w-full"
        viewBox="0 0 400 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 120 L0 92 L50 78 L95 58 L130 64 L165 46 L200 70 L240 92 L270 74 L300 40 L325 40 L352 74 L380 82 L400 76 L400 120 Z"
          fill="#27364D"
        />
        <path d="M292 48 L300 40 L325 40 L333 48 L322 45 L312 51 L303 45 Z" fill="#CBD5E1" />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <div
          style={{ transform: 'translateY(28px)', boxShadow: '0 30px 60px rgba(0,0,0,.35)' }}
          className="h-[380px] w-[196px] rounded-[30px] bg-[#0F1724] p-2"
        >
          <div className="flex h-full flex-col overflow-hidden rounded-[23px] bg-canvas p-2.5">
            <div className="flex items-center justify-between">
              <Logo showWordmark={false} />
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[9px] font-bold text-white">
                M
              </span>
            </div>

            <p className="mt-2 font-serif text-[15px] leading-tight text-ink">
              Hola, María.
              <br />
              Vamos paso a paso
            </p>

            <div className="mt-2 rounded-[10px] bg-white p-2">
              <p className="font-serif text-[20px] font-medium leading-none text-ink">42%</p>
              <p className="mt-1 text-[9px] text-[#475569]">Avance del proceso</p>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-[#E2E8F0]">
                <div className="h-full w-[42%] rounded-full bg-brand" />
              </div>
            </div>

            <div className="mt-2 rounded-[10px] bg-ink p-2">
              <p className="text-[8px] font-bold uppercase tracking-[0.1em] text-sky">¿Qué sigue?</p>
              <p className="mt-1 font-serif text-[12px] leading-snug text-white">
                Están notificando al padre de Mateo
              </p>
              <span className="mt-1 inline-block rounded-[6px] bg-sky px-1.5 py-0.5 text-[8px] font-semibold text-ink">
                Subir constancia
              </span>
            </div>

            <div className="mt-2 flex items-center gap-1.5 rounded-[10px] bg-white p-2">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-debt" />
              <p className="text-[10px] text-ink">
                <span className="font-bold">S/ 1,100</span> por cobrar
              </p>
            </div>

            <div className="mt-auto flex items-center justify-center gap-2 pt-1.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <span key={i} className={`h-1.5 w-1.5 rounded-full ${i === 0 ? 'bg-ink' : 'bg-[#CBD5E1]'}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CourtTile() {
  return (
    <div
      role="img"
      aria-label="Ilustración: el 3° Juzgado de Paz Letrado de Arequipa sincronizado con Syloop"
      className="flex h-[200px] flex-col justify-between rounded-card bg-tint-soft p-4 sm:col-span-2 sm:h-auto"
    >
      <span className="text-[11px] font-bold uppercase text-link" style={{ letterSpacing: '0.1em' }}>
        Conocemos tu juzgado
      </span>

      <svg viewBox="0 0 160 90" className="mx-auto h-[100px]" aria-hidden="true">
        <path d="M20 34 L80 8 L140 34 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
        <rect x="24" y="34" width="112" height="7" fill="#1E293B" />
        {[36, 58, 80, 102, 124].map((x) => (
          <line key={x} x1={x} y1={41} x2={x} y2={75} stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
        ))}
        <rect x="16" y="75" width="128" height="8" rx="2" fill="#4A8CF0" />
        <circle cx="80" cy="24" r="4" fill="#4A8CF0" />
      </svg>

      <div className="flex gap-2">
        <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-ink">3° JPL Arequipa</span>
        <span className="rounded-full bg-tint px-2.5 py-1 text-[11px] font-semibold text-brand-ink">
          ~38 días por etapa
        </span>
      </div>
    </div>
  );
}

function ChatTile() {
  return (
    <div
      role="img"
      aria-label="Ilustración: conversación entre María y su abogada"
      className="flex h-[200px] flex-col justify-center gap-2 rounded-card border border-[#E2E8F0] bg-white p-4 sm:col-span-2 sm:h-auto"
    >
      <span className="text-[11px] font-bold uppercase text-link" style={{ letterSpacing: '0.1em' }}>
        Tu abogada, a un mensaje
      </span>

      <div className="flex items-start gap-2">
        <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-tint text-[10px] font-bold text-brand-ink">
          CV
        </span>
        <p className="rounded-[12px_12px_12px_4px] bg-canvas px-3 py-2 text-[12px] text-[#334155]">
          Revisé tu resumen: todo en orden. Sube la constancia antes del 25.
        </p>
      </div>

      <p className="ml-auto max-w-[80%] rounded-[12px_12px_4px_12px] bg-ink px-3 py-2 text-[12px] text-white">
        ¡Gracias! La subo hoy.
      </p>

      <p className="text-right text-[10px] text-[#64748B]">Leído · 10:24</p>
    </div>
  );
}
