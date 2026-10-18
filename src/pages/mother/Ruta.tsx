import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, AlertTriangle, Circle, ArrowRight } from 'lucide-react';
import { Card, CardBlock } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { HBars } from '../../components/charts/HBars';
import { routeStages, juzgadoComparison } from '../../data/routeStages';
import type { StageStatus } from '../../types';

const statusStyles: Record<StageStatus, { dot: string; label: string; textClass: string }> = {
  completado: { dot: 'bg-ink', label: 'Completado', textClass: 'text-ink' },
  'en-curso': { dot: 'bg-brand', label: 'En curso', textClass: 'text-brand-ink' },
  atencion: { dot: 'bg-warn-dot', label: 'Requiere atención', textClass: 'text-warn-text' },
  proximo: { dot: 'bg-white ring-2 ring-brand', label: 'Próximo paso', textClass: 'text-brand-ink' },
  pendiente: { dot: 'bg-[#CBD5E1]', label: 'Pendiente', textClass: 'text-[#475569]' },
};

export function Ruta() {
  const [selectedId, setSelectedId] = useState(
    routeStages.find((s) => s.status === 'en-curso')?.id ?? routeStages[0].id
  );
  const selected = routeStages.find((s) => s.id === selectedId)!;
  const [notice, setNotice] = useState('');

  function askAbogada() {
    setNotice('Tu consulta fue enviada a la Dra. Valdivia.');
    setTimeout(() => setNotice(''), 2500);
  }

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="font-serif text-[32px] font-medium text-ink">Mi ruta judicial</h1>
        <p className="mt-1 text-sm text-[#475569]">Exp. 01234-2026 · 3° Juzgado de Paz Letrado de Arequipa</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <Card className="!p-3">
          <ol className="flex flex-col">
            {routeStages.map((stage, i) => {
              const style = statusStyles[stage.status];
              const isSelected = stage.id === selectedId;
              return (
                <li key={stage.id} className="relative">
                  {i < routeStages.length - 1 && (
                    <span className="absolute left-[19px] top-9 h-full w-px bg-[#E2E8F0]" aria-hidden="true" />
                  )}
                  <button
                    type="button"
                    onClick={() => setSelectedId(stage.id)}
                    className={`relative flex w-full items-start gap-3 rounded-[10px] px-2 py-2.5 text-left ${
                      isSelected ? 'bg-tint-soft' : 'hover:bg-[#F8FAFC]'
                    }`}
                  >
                    <span className={`z-10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${style.dot}`}>
                      {stage.status === 'completado' && <Check className="h-3.5 w-3.5 text-white" />}
                      {stage.status === 'atencion' && <AlertTriangle className="h-3.5 w-3.5 text-white" />}
                      {stage.status === 'en-curso' && <Circle className="h-2.5 w-2.5 fill-white text-white" />}
                    </span>
                    <span>
                      <span className={`block text-sm font-semibold ${isSelected ? 'text-ink' : 'text-[#334155]'}`}>
                        {stage.title}
                      </span>
                      <span className={`block text-xs font-medium ${style.textClass}`}>{style.label}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </Card>

        <Card>
          <p className={`text-xs font-semibold uppercase tracking-[0.1em] ${statusStyles[selected.status].textClass}`}>
            {statusStyles[selected.status].label}
          </p>
          <h2 className="mt-1 font-serif text-2xl font-medium text-ink">{selected.title}</h2>
          <p className="mt-1 text-sm text-[#475569]">{selected.dateLabel}</p>
          <p className="mt-4 text-[#334155]">{selected.description}</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <CardBlock>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-link">Hechos · del CEJ</p>
              {selected.facts.length === 0 ? (
                <p className="mt-2 text-sm text-[#475569]">Aún no hay hechos registrados en el CEJ para esta etapa.</p>
              ) : (
                <ul className="mt-2 flex flex-col gap-1.5 text-sm text-[#334155]">
                  {selected.facts.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink" />
                      {f}
                    </li>
                  ))}
                </ul>
              )}
            </CardBlock>
            <CardBlock>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-link">Estimaciones · IA</p>
              <ul className="mt-2 flex flex-col gap-1.5 text-sm text-[#334155]">
                {selected.estimates.map((e) => (
                  <li key={e} className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand" />
                    {e}
                  </li>
                ))}
              </ul>
            </CardBlock>
          </div>

          {selected.status === 'en-curso' && (
            <CardBlock className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-link">
                Días promedio por juzgado en esta etapa
              </p>
              <div className="mt-3">
                <HBars
                  data={juzgadoComparison.map((j) => ({ label: j.juzgado, value: `${j.dias} días` }))}
                  values={juzgadoComparison.map((j) => j.dias)}
                />
              </div>
              <p className="mt-2 text-xs italic text-[#475569]">Datos de ejemplo, solo para esta demo.</p>
            </CardBlock>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/madre/asistente">
              <Button variant="secondary" icon={<ArrowRight className="h-4 w-4" />}>
                Explícame este paso
              </Button>
            </Link>
            <Button variant="primary" onClick={askAbogada}>
              Consultar a mi abogada
            </Button>
          </div>
          {notice && <p className="mt-3 text-sm font-medium text-brand-ink">{notice}</p>}
        </Card>
      </div>
    </div>
  );
}
