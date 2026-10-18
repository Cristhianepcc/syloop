import { useState } from 'react';
import { AlertTriangle, Check, X, Pencil } from 'lucide-react';
import { Card, CardBlock, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useAppStore } from '../../store/useAppStore';
import type { ValidationDoc } from '../../types';

const statusTone: Record<ValidationDoc['status'], 'warn' | 'success' | 'danger' | 'brand'> = {
  pendiente: 'warn',
  aprobado: 'success',
  rechazado: 'danger',
  corrigiendo: 'brand',
};

const statusLabel: Record<ValidationDoc['status'], string> = {
  pendiente: 'Pendiente',
  aprobado: 'Aprobado',
  rechazado: 'Rechazado',
  corrigiendo: 'Corrigiendo',
};

export function Validation() {
  const queue = useAppStore((s) => s.validationQueue);
  const setValidationStatus = useAppStore((s) => s.setValidationStatus);

  const [selectedId, setSelectedId] = useState(queue.find((q) => q.status === 'pendiente')?.id ?? queue[0]?.id);
  const [draft, setDraft] = useState('');

  const selected = queue.find((q) => q.id === selectedId);

  function startEditing(doc: ValidationDoc) {
    setDraft(doc.aiText);
    setValidationStatus(doc.id, 'corrigiendo');
  }

  function saveAndApprove(doc: ValidationDoc) {
    setValidationStatus(doc.id, 'aprobado', draft);
  }

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="font-serif text-[32px] font-medium text-ink">Validación IA</h1>
        <p className="mt-1 text-sm text-[#475569]">Ningún texto generado por IA se envía sin tu revisión.</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <Card className="!p-3">
          <div className="flex flex-col gap-1">
            {queue.map((doc) => (
              <button
                key={doc.id}
                onClick={() => setSelectedId(doc.id)}
                className={`flex items-start justify-between gap-2 rounded-[10px] px-3 py-2.5 text-left ${
                  selectedId === doc.id ? 'bg-tint-soft' : 'hover:bg-[#F8FAFC]'
                }`}
              >
                <span>
                  <span className="block text-sm font-semibold text-ink">{doc.title}</span>
                  <span className="block text-xs text-[#475569]">{doc.clientName}</span>
                </span>
                <Badge tone={statusTone[doc.status]}>{statusLabel[doc.status]}</Badge>
              </button>
            ))}
          </div>
        </Card>

        {selected && (
          <Card>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardTitle>{selected.title}</CardTitle>
                <p className="mt-1 text-sm text-[#475569]">Clienta: {selected.clientName}</p>
              </div>
              <Badge tone={statusTone[selected.status]}>{statusLabel[selected.status]}</Badge>
            </div>

            {selected.flags.length > 0 && (
              <CardBlock className="mt-4 !bg-warn-panel">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-warn-text">
                  <AlertTriangle className="h-3.5 w-3.5" /> La IA marcó para revisar
                </p>
                <ul className="mt-2 flex flex-col gap-1">
                  {selected.flags.map((f) => (
                    <li key={f} className="text-sm text-warn-text">
                      · {f}
                    </li>
                  ))}
                </ul>
              </CardBlock>
            )}

            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-link">Texto generado</p>
              {selected.status === 'corrigiendo' ? (
                <textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  rows={8}
                  className="mt-2 w-full rounded-[10px] border border-brand p-3 text-sm focus-visible:focus-ring"
                />
              ) : (
                <p className="mt-2 whitespace-pre-line rounded-block bg-canvas p-4 text-sm text-[#334155]">
                  {selected.aiText}
                </p>
              )}
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              {selected.status === 'corrigiendo' ? (
                <Button variant="primary" icon={<Check className="h-4 w-4" />} onClick={() => saveAndApprove(selected)}>
                  Guardar y aprobar
                </Button>
              ) : (
                <>
                  <Button
                    variant="primary"
                    icon={<Check className="h-4 w-4" />}
                    onClick={() => setValidationStatus(selected.id, 'aprobado')}
                    disabled={selected.status === 'aprobado'}
                  >
                    Aprobar
                  </Button>
                  <Button variant="secondary" icon={<Pencil className="h-4 w-4" />} onClick={() => startEditing(selected)}>
                    Corregir
                  </Button>
                  <Button
                    variant="danger"
                    icon={<X className="h-4 w-4" />}
                    onClick={() => setValidationStatus(selected.id, 'rechazado')}
                    disabled={selected.status === 'rechazado'}
                  >
                    Rechazar
                  </Button>
                </>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
