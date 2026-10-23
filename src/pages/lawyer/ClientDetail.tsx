import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, CalendarClock, Milestone, AlertTriangle, ShieldCheck, Sparkles } from 'lucide-react';
import { Card, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useAppStore } from '../../store/useAppStore';
import { activeCases, caseMilestones, aiAlerts } from '../../data/lawyerDesk';
import type { MilestoneStatus, ValidationDoc } from '../../types';

const milestoneStyles: Record<MilestoneStatus, { label: string; tone: 'neutral' | 'brand' | 'warn' }> = {
  liberado: { label: 'Liberado', tone: 'brand' },
  verificando: { label: 'Verificando', tone: 'warn' },
  custodia: { label: 'En custodia', tone: 'neutral' },
};

const validationStatusTone: Record<ValidationDoc['status'], 'warn' | 'success' | 'danger' | 'brand'> = {
  pendiente: 'warn',
  aprobado: 'success',
  rechazado: 'danger',
  corrigiendo: 'brand',
};

const validationStatusLabel: Record<ValidationDoc['status'], string> = {
  pendiente: 'Pendiente',
  aprobado: 'Aprobado',
  rechazado: 'Rechazado',
  corrigiendo: 'Corrigiendo',
};

export function ClientDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const validationQueue = useAppStore((s) => s.validationQueue);

  const caseItem = activeCases.find((c) => c.id === id);

  if (!caseItem) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-[#475569]">No encontramos este caso.</p>
        <Button variant="secondary" icon={<ArrowLeft className="h-4 w-4" />} onClick={() => navigate('/abogado')}>
          Volver al Centro de mando
        </Button>
      </div>
    );
  }

  const milestone = caseMilestones.find((m) => m.caseId === caseItem.id);
  const alerts = aiAlerts.filter((a) => a.clientName === caseItem.clientName);
  const docs = validationQueue.filter((v) => v.clientName === caseItem.clientName);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link to="/abogado" className="flex items-center gap-1.5 text-sm font-medium text-[#475569] hover:text-ink">
          <ArrowLeft className="h-4 w-4" /> Centro de mando
        </Link>
        <header className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-serif text-[32px] font-medium text-ink">{caseItem.clientName}</h1>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-[#475569]">
              <MapPin className="h-3.5 w-3.5" /> {caseItem.district} · Expediente {caseItem.id}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" icon={<ShieldCheck className="h-4 w-4" />} onClick={() => navigate('/abogado/validacion')}>
              Validación IA
            </Button>
            <Button variant="secondary" size="sm" icon={<Sparkles className="h-4 w-4" />} onClick={() => navigate('/abogado/asistente')}>
              Asistente IA
            </Button>
          </div>
        </header>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardTitle>Resumen del caso</CardTitle>
          <dl className="mt-4 flex flex-col gap-3 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-[#475569]">Etapa actual</dt>
              <dd className="font-semibold text-ink">{caseItem.stage}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-1.5 text-[#475569]">
                <CalendarClock className="h-4 w-4" /> Próxima audiencia
              </dt>
              <dd className="font-semibold text-ink">{caseItem.nextHearing ?? 'Sin programar'}</dd>
            </div>
          </dl>
        </Card>

        <Card>
          <CardTitle>Hito de custodia</CardTitle>
          {milestone ? (
            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="flex items-center gap-1.5 text-sm font-medium text-ink">
                <Milestone className="h-4 w-4 text-brand" /> S/ {milestone.amount}
              </span>
              <Badge tone={milestoneStyles[milestone.status].tone}>{milestoneStyles[milestone.status].label}</Badge>
            </div>
          ) : (
            <p className="mt-3 text-sm text-[#475569]">Sin hitos de custodia registrados para este caso.</p>
          )}
        </Card>

        <Card>
          <CardTitle>Alertas de la IA</CardTitle>
          {alerts.length === 0 ? (
            <p className="mt-3 text-sm text-[#475569]">Sin alertas pendientes para esta clienta.</p>
          ) : (
            <ul className="mt-4 flex flex-col gap-2">
              {alerts.map((a) => (
                <li key={a.id} className="flex items-start gap-2.5 rounded-block bg-canvas p-3 text-sm">
                  <AlertTriangle
                    className={`mt-0.5 h-4 w-4 shrink-0 ${a.severity === 'urgente' ? 'text-warn-text' : 'text-brand'}`}
                  />
                  {a.text}
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <CardTitle>Documentos en validación</CardTitle>
          {docs.length === 0 ? (
            <p className="mt-3 text-sm text-[#475569]">Sin documentos generados por IA para esta clienta.</p>
          ) : (
            <ul className="mt-4 flex flex-col gap-2">
              {docs.map((d) => (
                <li key={d.id} className="flex items-center justify-between gap-3 rounded-block bg-canvas px-3 py-2.5 text-sm">
                  <span className="font-medium text-ink">{d.title}</span>
                  <Badge tone={validationStatusTone[d.status]}>{validationStatusLabel[d.status]}</Badge>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
