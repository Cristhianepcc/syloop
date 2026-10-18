import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, RefreshCw, Upload, Undo2, Sparkles, MessageCircle, PhoneCall } from 'lucide-react';
import { Card, CardBlock, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Select';
import { Badge } from '../../components/ui/Badge';
import { ThinBars } from '../../components/charts/ThinBars';
import { GroupedBars } from '../../components/charts/GroupedBars';
import { HBars } from '../../components/charts/HBars';
import { useAppStore } from '../../store/useAppStore';
import { progressBars, courtAverageCurve, currentProgressPercent } from '../../data/progress';
import { pensionByMonth, totalPendiente } from '../../data/pension';
import { expenseCategories } from '../../data/expenses';
import type { RecommendedAction } from '../../types';

const recommendedActions: RecommendedAction[] = [
  { id: 'r1', text: 'Sube la constancia de ingresos para la asignación anticipada', to: '/madre/expediente' },
  { id: 'r2', text: 'Revisa la propuesta de conciliación con tu abogada', to: '/madre/asistente' },
  { id: 'r3', text: 'Verifica el depósito de setiembre en tus gastos y pensiones', to: '/madre/gastos' },
];

export function Panel() {
  const cejSyncedLabel = useAppStore((s) => s.cejSyncedLabel);
  const markCejSynced = useAppStore((s) => s.markCejSynced);
  const recommendedActionsOpen = useAppStore((s) => s.recommendedActionsOpen);
  const toggleRecommendedActions = useAppStore((s) => s.toggleRecommendedActions);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="font-serif text-[32px] font-medium leading-tight text-ink sm:text-[36px]">
            Hola, María. Vamos paso a paso
          </h1>
          <p className="mt-1 text-sm text-[#475569]">Exp. 01234-2026 · 3° Juzgado de Paz Letrado de Arequipa</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={markCejSynced}
            className="inline-flex min-h-[38px] items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-3.5 text-xs font-semibold text-[#475569] hover:bg-[#F8FAFC]"
          >
            <RefreshCw className="h-3.5 w-3.5 text-brand" />
            CEJ sincronizado {cejSyncedLabel}
          </button>
          <Link to="/madre/ruta" className="text-sm font-semibold text-link hover:underline">
            Ver mi ruta completa
          </Link>
          <Link to="/madre/asistente">
            <Button variant="primary">Preguntar a Syloop</Button>
          </Link>
        </div>
      </header>

      <Card className="!p-0 overflow-hidden">
        <button
          type="button"
          onClick={toggleRecommendedActions}
          className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
        >
          <span className="flex items-center gap-2.5 font-semibold text-ink">
            <Badge tone="warn">{recommendedActions.length}</Badge>
            Hay {recommendedActions.length} acciones recomendadas
          </span>
          <ChevronDown className={`h-5 w-5 text-[#475569] transition-transform ${recommendedActionsOpen ? 'rotate-180' : ''}`} />
        </button>
        {recommendedActionsOpen && (
          <div className="flex flex-col gap-1 border-t border-[#E2E8F0] bg-warn-panel px-5 py-3">
            {recommendedActions.map((a) => (
              <Link
                key={a.id}
                to={a.to}
                className="flex min-h-[38px] items-center justify-between gap-3 rounded-[8px] px-2 py-1.5 text-sm text-warn-text hover:bg-white/60"
              >
                {a.text}
                <span className="font-semibold">Ir →</span>
              </Link>
            ))}
          </div>
        )}
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <ProgressCard />
        <PensionCard />
        <WhatsNextCard />
        <ExpensesCard />
        <PendingDocsCard />
        <HelpCard />
      </div>
    </div>
  );
}

function ProgressCard() {
  const [range, setRange] = useState<'demanda' | '60'>('demanda');
  const data = range === 'demanda' ? progressBars : progressBars.slice(-60);
  const overlay = range === 'demanda' ? courtAverageCurve : courtAverageCurve.slice(-60);

  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <div>
          <CardTitle>Avance del proceso</CardTitle>
          <p className="font-serif text-4xl font-medium text-ink">{currentProgressPercent}%</p>
        </div>
        <Select
          aria-label="Rango de avance"
          value={range}
          onChange={(e) => setRange(e.target.value as 'demanda' | '60')}
          className="!min-h-[38px] text-sm"
        >
          <option value="demanda">Desde la demanda</option>
          <option value="60">Últimos 60 días</option>
        </Select>
      </div>
      <div className="mt-4">
        <ThinBars data={data} overlay={overlay} />
      </div>
      <p className="mt-2 text-xs text-[#475569]">Barra azul: tu avance diario · Línea navy: promedio del juzgado</p>
    </Card>
  );
}

function PensionCard() {
  return (
    <Card>
      <CardTitle>Pensión por mes</CardTitle>
      <p className="mt-1 font-serif text-2xl font-medium text-debt">S/ {totalPendiente.toLocaleString('es-PE')} por cobrar</p>
      <div className="mt-4">
        <GroupedBars
          categories={pensionByMonth.map((m) => m.month)}
          series={[
            { label: 'Pagado', color: '#4A8CF0' },
            { label: 'Debido', color: '#CBD5E1' },
            { label: 'Adeudado', color: '#C2410C' },
          ]}
          values={[
            pensionByMonth.map((m) => m.paid),
            pensionByMonth.map((m) => m.due),
            pensionByMonth.map((m) => m.owed),
          ]}
        />
      </div>
    </Card>
  );
}

function WhatsNextCard() {
  return (
    <Card>
      <CardTitle>¿Qué sigue en mi caso?</CardTitle>
      <div className="mt-4 grid grid-cols-3 gap-3">
        <CardBlock>
          <p className="font-serif text-2xl font-medium text-warn-text">5 días</p>
          <p className="mt-1 text-xs text-[#475569]">para subir la constancia</p>
        </CardBlock>
        <CardBlock>
          <p className="font-serif text-2xl font-medium text-ink">10 nov</p>
          <p className="mt-1 text-xs text-[#475569]">audiencia única</p>
        </CardBlock>
        <CardBlock>
          <p className="font-serif text-2xl font-medium text-ink">S/ 800</p>
          <p className="mt-1 text-xs text-[#475569]">asignación propuesta</p>
        </CardBlock>
      </div>
      <Link to="/madre/expediente" className="mt-4 block">
        <Button variant="primary" className="w-full">
          Subir constancia
        </Button>
      </Link>
    </Card>
  );
}

function ExpensesCard() {
  return (
    <Card>
      <CardTitle>Gastos de Mateo</CardTitle>
      <p className="mt-1 text-sm text-[#475569]">Este mes, por categoría</p>
      <div className="mt-4">
        <HBars
          data={expenseCategories.map((c) => ({ label: c.category, value: `S/ ${c.amount}` }))}
          values={expenseCategories.map((c) => c.amount)}
        />
      </div>
    </Card>
  );
}

function PendingDocsCard() {
  const documents = useAppStore((s) => s.documents);
  const setDocumentStatus = useAppStore((s) => s.setDocumentStatus);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const pending = documents.filter((d) => d.status === 'pendiente');

  function handleUpload(id: string) {
    setLoadingId(id);
    setTimeout(() => {
      setDocumentStatus(id, 'validado', 'Dra. Valdivia');
      setLoadingId(null);
    }, 900);
  }

  return (
    <Card>
      <CardTitle>Documentos pendientes</CardTitle>
      {pending.length === 0 ? (
        <p className="mt-3 text-sm text-[#475569]">No tienes documentos pendientes por ahora.</p>
      ) : (
        <div className="mt-3 flex flex-col gap-2">
          {pending.map((d) => (
            <div key={d.id} className="flex items-center justify-between gap-3 rounded-block bg-canvas p-3">
              <div>
                <p className="text-sm font-semibold text-ink">{d.name}</p>
                <p className="text-xs text-[#475569]">{d.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  icon={<Upload className="h-3.5 w-3.5" />}
                  onClick={() => handleUpload(d.id)}
                  disabled={loadingId === d.id}
                >
                  {loadingId === d.id ? 'Subiendo…' : 'Subir'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      {documents.some((d) => d.status === 'validado' && d.validatedBy === 'Dra. Valdivia') && (
        <button
          type="button"
          onClick={() => {
            const last = documents.find((d) => d.status === 'validado' && d.validatedBy === 'Dra. Valdivia');
            if (last) setDocumentStatus(last.id, 'pendiente', undefined);
          }}
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#475569] hover:text-ink"
        >
          <Undo2 className="h-3.5 w-3.5" /> Deshacer última subida
        </button>
      )}
    </Card>
  );
}

function HelpCard() {
  const [message, setMessage] = useState('');

  function notify(text: string) {
    setMessage(text);
    setTimeout(() => setMessage(''), 2500);
  }

  return (
    <Card>
      <CardTitle>Ayuda</CardTitle>
      <p className="mt-1 text-sm text-[#475569]">Elige cómo quieres resolver tu duda.</p>
      <div className="mt-4 flex flex-col gap-2">
        <Link to="/madre/asistente">
          <Button variant="secondary" className="w-full justify-start" icon={<Sparkles className="h-4 w-4 text-brand" />}>
            Preguntar al asistente IA
          </Button>
        </Link>
        <Button
          variant="secondary"
          className="w-full justify-start"
          icon={<MessageCircle className="h-4 w-4 text-brand" />}
          onClick={() => notify('Tu mensaje fue enviado a la Dra. Valdivia.')}
        >
          Escribir a mi abogada
        </Button>
        <Button
          variant="secondary"
          className="w-full justify-start"
          icon={<PhoneCall className="h-4 w-4 text-brand" />}
          onClick={() => notify('Tu abogada te llamará en las próximas horas.')}
        >
          Pedir una llamada
        </Button>
      </div>
      {message && <p className="mt-3 text-sm font-medium text-brand-ink">{message}</p>}
    </Card>
  );
}
