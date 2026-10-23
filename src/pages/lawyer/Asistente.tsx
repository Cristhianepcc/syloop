import { FormEvent, useState } from 'react';
import { Send, Sparkles, FileDown } from 'lucide-react';
import { Card, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Select } from '../../components/ui/Select';
import { useAppStore } from '../../store/useAppStore';
import { lawyerSuggestedQuestions, genericLawyerAssistantAnswer } from '../../data/lawyerChat';
import { activeCases } from '../../data/lawyerDesk';
import type { ChatMessage, ChatStyle } from '../../types';

const styleLabels: Record<ChatStyle, string> = {
  breve: 'Breve',
  'paso-a-paso': 'Paso a paso',
  detallada: 'Detallada con fuentes',
};

export function Asistente() {
  const [style, setStyle] = useState<ChatStyle>('breve');
  const [input, setInput] = useState('');
  const messages = useAppStore((s) => s.lawyerChatMessages);
  const addLawyerChatMessage = useAppStore((s) => s.addLawyerChatMessage);

  function sendQuestion(question: string) {
    addLawyerChatMessage({ id: `u-${Date.now()}`, role: 'user', text: question });

    const match = lawyerSuggestedQuestions.find((q) => q.question === question);
    setTimeout(() => {
      if (match) {
        addLawyerChatMessage({
          id: `a-${Date.now()}`,
          role: 'assistant',
          text: match.answers[style],
          sources: style === 'detallada' ? match.sources : undefined,
        });
      } else {
        addLawyerChatMessage({
          id: `a-${Date.now()}`,
          role: 'assistant',
          text: genericLawyerAssistantAnswer,
          pendingReview: true,
        });
      }
    }, 700);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    sendQuestion(input.trim());
    setInput('');
  }

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="font-serif text-[32px] font-medium text-ink">Asistente IA para abogados</h1>
        <p className="mt-1 text-sm text-[#475569]">Borradores y respuestas que tú revisas antes de presentarlas.</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <Card className="flex flex-col">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardTitle>Chat</CardTitle>
            <div className="inline-flex rounded-full bg-[#F1F5F9] p-1">
              {(Object.keys(styleLabels) as ChatStyle[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStyle(s)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    style === s ? 'bg-white text-ink shadow-sm' : 'text-[#475569]'
                  }`}
                >
                  {styleLabels[s]}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex min-h-[320px] flex-col gap-3 overflow-y-auto">
            {messages.length === 0 && (
              <p className="rounded-block bg-canvas p-4 text-sm text-[#475569]">
                Pregunta sobre plazos, jurisprudencia o pide un resumen de un caso. Elige primero el estilo de respuesta.
              </p>
            )}
            {messages.map((m) => <ChatBubble key={m.id} message={m} />)}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {lawyerSuggestedQuestions.map((q) => (
              <button
                key={q.id}
                type="button"
                onClick={() => sendQuestion(q.question)}
                className="rounded-full border border-tint-border bg-tint-soft px-3.5 py-2 text-sm font-medium text-brand-ink hover:bg-tint"
              >
                {q.question}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu pregunta…"
              className="min-h-[44px] flex-1 rounded-[10px] border border-[#E2E8F0] px-3.5 text-[15px] focus-visible:focus-ring"
            />
            <Button type="submit" iconOnly aria-label="Enviar pregunta" icon={<Send className="h-4 w-4" />} />
          </form>
        </Card>

        <EscritoGenerator />
      </div>
    </div>
  );
}

function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-card px-4 py-3 text-sm ${
          isUser ? 'bg-ink text-white' : 'bg-canvas text-[#334155]'
        }`}
      >
        {!isUser && (
          <span className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-brand-ink">
            <Sparkles className="h-3.5 w-3.5" /> Asistente Syloop
          </span>
        )}
        <p className="whitespace-pre-line">{message.text}</p>
        {message.pendingReview && (
          <span className="mt-2 inline-block">
            <Badge tone="warn">Verifica con el expediente completo</Badge>
          </span>
        )}
        {message.sources && message.sources.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {message.sources.map((src) => (
              <span key={src} className="rounded-full bg-tint px-2.5 py-1 text-[11px] font-semibold text-brand-ink">
                {src}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const escritoTypes = [
  { id: 'reprogramacion', label: 'Solicitud de reprogramación de audiencia' },
  { id: 'subsanacion', label: 'Escrito de subsanación' },
  { id: 'apelacion', label: 'Recurso de apelación' },
] as const;

type EscritoTypeId = (typeof escritoTypes)[number]['id'];

function buildDraft(typeId: EscritoTypeId, caseId: string, clientName: string, district: string) {
  const header = `Señor Juez del Juzgado de Paz Letrado de ${district}:\n\nEn el expediente ${caseId}, seguido por ${clientName} sobre pensión de alimentos, me presento y expongo:`;

  switch (typeId) {
    case 'reprogramacion':
      return `${header}\n\nSolicito se sirva reprogramar la audiencia señalada en el presente proceso, por causa justificada que se acreditará con el medio probatorio correspondiente.\n\nFUNDAMENTO: artículo 203 del Código Procesal Civil, aplicable supletoriamente al proceso sumarísimo.\n\nPOR TANTO: solicito se conceda nueva fecha de audiencia.`;
    case 'subsanacion':
      return `${header}\n\nCumplo con subsanar la omisión advertida por el juzgado, adjuntando la documentación requerida en la resolución correspondiente.\n\nPOR TANTO: solicito tener por subsanada la omisión y continuar con la tramitación del proceso.`;
    case 'apelacion':
      return `${header}\n\nInterpongo recurso de apelación contra la resolución emitida en el presente proceso, por no ajustarse a los hechos y a la prueba actuada en autos.\n\nFUNDAMENTOS: [desarrollar los agravios específicos del caso antes de presentar].\n\nPOR TANTO: solicito se conceda el recurso y se eleven los autos al superior jerárquico.`;
  }
}

function EscritoGenerator() {
  const [caseId, setCaseId] = useState(activeCases[0].id);
  const [typeId, setTypeId] = useState<EscritoTypeId>('reprogramacion');
  const [generated, setGenerated] = useState(false);

  const selectedCase = activeCases.find((c) => c.id === caseId)!;
  const draft = buildDraft(typeId, selectedCase.id, selectedCase.clientName, selectedCase.district);

  async function downloadPdf() {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Syloop — Borrador de escrito', 20, 20);
    doc.setFontSize(11);
    const lines = doc.splitTextToSize(draft, 170);
    doc.text(lines, 20, 35);
    doc.setFontSize(9);
    doc.text('Borrador generado por IA · revisar y editar antes de presentar · datos ficticios de demo', 20, 280);
    doc.save(`syloop-borrador-${typeId}.pdf`);
    setGenerated(true);
  }

  return (
    <Card>
      <CardTitle>Generador de escritos</CardTitle>
      <p className="mt-1 text-sm text-[#475569]">Borradores listos para que tú los edites antes de presentarlos.</p>

      <div className="mt-4 flex flex-col gap-3">
        <Select label="Caso" value={caseId} onChange={(e) => { setCaseId(e.target.value); setGenerated(false); }}>
          {activeCases.map((c) => (
            <option key={c.id} value={c.id}>
              {c.clientName} — {c.id}
            </option>
          ))}
        </Select>
        <Select
          label="Tipo de escrito"
          value={typeId}
          onChange={(e) => { setTypeId(e.target.value as EscritoTypeId); setGenerated(false); }}
        >
          {escritoTypes.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </Select>
      </div>

      <div className="mt-4 rounded-block bg-canvas p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-link">Vista previa</p>
        <p className="mt-2 whitespace-pre-line text-sm text-[#334155]">{draft}</p>
        <span className="mt-3 inline-block">
          <Badge tone="warn">Borrador IA — revisar antes de presentar</Badge>
        </span>
      </div>

      <Button variant="secondary" className="mt-4 w-full" icon={<FileDown className="h-4 w-4" />} onClick={downloadPdf}>
        Descargar borrador en PDF
      </Button>
      {generated && <p className="mt-2 text-xs font-medium text-brand-ink">PDF generado y descargado.</p>}
    </Card>
  );
}
