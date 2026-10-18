import { useState } from 'react';
import { MapPin, CheckCircle2, Handshake } from 'lucide-react';
import { Card, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useAppStore } from '../../store/useAppStore';

const LAWYER_NAME = 'Dra. Carmen Valdivia Salas';

export function Leads() {
  const leads = useAppStore((s) => s.leads);
  const setLeadStatus = useAppStore((s) => s.setLeadStatus);
  const boardQuestions = useAppStore((s) => s.boardQuestions);
  const answerBoardQuestion = useAppStore((s) => s.answerBoardQuestion);

  const [replyingId, setReplyingId] = useState<string | null>(null);
  const [draft, setDraft] = useState('');

  const newLeads = leads.filter((l) => l.status === 'nuevo');
  const resolvedLeads = leads.filter((l) => l.status !== 'nuevo');

  function publishAnswer(id: string) {
    if (!draft.trim()) return;
    answerBoardQuestion(id, draft.trim(), LAWYER_NAME);
    setReplyingId(null);
    setDraft('');
  }

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="font-serif text-[32px] font-medium text-ink">Adquisición</h1>
        <p className="mt-1 text-sm text-[#475569]">Nuevas solicitudes de asesoría y la pizarra pública de consultas.</p>
      </header>

      <Card>
        <CardTitle>Solicitudes nuevas</CardTitle>
        {newLeads.length === 0 ? (
          <p className="mt-3 text-sm text-[#475569]">No tienes solicitudes nuevas por ahora.</p>
        ) : (
          <div className="mt-4 flex flex-col gap-3">
            {newLeads.map((lead) => (
              <div key={lead.id} className="rounded-block bg-canvas p-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-semibold text-ink">{lead.motherName}</p>
                  <span className="flex items-center gap-1 text-xs text-[#475569]">
                    <MapPin className="h-3.5 w-3.5" /> {lead.district}
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-[#475569]">{lead.summary}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button variant="primary" size="sm" onClick={() => setLeadStatus(lead.id, 'aceptado')}>
                    Aceptar caso
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => setLeadStatus(lead.id, 'presupuestado')}>
                    Proponer presupuesto
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {resolvedLeads.length > 0 && (
        <Card>
          <CardTitle>Gestionadas</CardTitle>
          <div className="mt-4 flex flex-col gap-2">
            {resolvedLeads.map((lead) => (
              <div key={lead.id} className="flex items-center justify-between gap-3 rounded-block bg-canvas px-4 py-2.5">
                <span className="flex items-center gap-2 text-sm font-medium text-ink">
                  <Handshake className="h-4 w-4 text-brand" /> {lead.motherName}
                </span>
                <Badge tone={lead.status === 'aceptado' ? 'success' : 'brand'}>
                  {lead.status === 'aceptado' ? 'Caso aceptado' : 'Presupuesto propuesto'}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card>
        <CardTitle>Pizarra pública</CardTitle>
        <p className="mt-1 text-sm text-[#475569]">Responde consultas anónimas de madres que aún no tienen abogado.</p>
        <div className="mt-4 flex flex-col gap-4">
          {boardQuestions.map((q) => (
            <div key={q.id} className="rounded-block bg-canvas p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-link">{q.anonName}</p>
                <span className="text-xs text-[#475569]">{q.date}</span>
              </div>
              <p className="mt-2 font-medium text-ink">{q.question}</p>

              {q.answer ? (
                <p className="mt-3 flex items-start gap-2 text-sm text-[#334155]">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  {q.answer}
                </p>
              ) : replyingId === q.id ? (
                <div className="mt-3 flex flex-col gap-2">
                  <textarea
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    rows={3}
                    placeholder="Escribe tu respuesta…"
                    className="rounded-[10px] border border-[#E2E8F0] p-3 text-sm focus-visible:focus-ring"
                  />
                  <div className="flex gap-2">
                    <Button size="sm" variant="primary" onClick={() => publishAnswer(q.id)}>
                      Publicar respuesta
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => setReplyingId(null)}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  size="sm"
                  variant="secondary"
                  className="mt-3"
                  onClick={() => {
                    setReplyingId(q.id);
                    setDraft('');
                  }}
                >
                  Responder
                </Button>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
