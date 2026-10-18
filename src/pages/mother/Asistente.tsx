import { FormEvent, useState } from 'react';
import { Send, Sparkles, FileDown } from 'lucide-react';
import { Card, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useAppStore } from '../../store/useAppStore';
import { suggestedQuestions, genericAssistantAnswer } from '../../data/chat';
import type { ChatMessage, ChatStyle } from '../../types';

const styleLabels: Record<ChatStyle, string> = {
  breve: 'Breve',
  'paso-a-paso': 'Paso a paso',
  detallada: 'Detallada con fuentes',
};

export function Asistente() {
  const [style, setStyle] = useState<ChatStyle>('breve');
  const [input, setInput] = useState('');
  const messages = useAppStore((s) => s.chatMessages);
  const addChatMessage = useAppStore((s) => s.addChatMessage);

  function sendQuestion(question: string) {
    addChatMessage({ id: `u-${Date.now()}`, role: 'user', text: question });

    const match = suggestedQuestions.find((q) => q.question === question);
    setTimeout(() => {
      if (match) {
        addChatMessage({
          id: `a-${Date.now()}`,
          role: 'assistant',
          text: match.answers[style],
          sources: style === 'detallada' ? match.sources : undefined,
        });
      } else {
        addChatMessage({
          id: `a-${Date.now()}`,
          role: 'assistant',
          text: genericAssistantAnswer,
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
        <h1 className="font-serif text-[32px] font-medium text-ink">Asistente jurídico IA</h1>
        <p className="mt-1 text-sm text-[#475569]">Respuestas supervisadas por tu abogada, la Dra. Carmen Valdivia.</p>
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
                Pregunta lo que necesites sobre tu proceso. Elige primero el estilo de respuesta que prefieras.
              </p>
            )}
            {messages.map((m) => <ChatBubble key={m.id} message={m} />)}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {suggestedQuestions.map((q) => (
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

        <ConciliacionSimulator />
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
            <Badge tone="warn">Pendiente de revisión humana</Badge>
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

function ConciliacionSimulator() {
  const [childName, setChildName] = useState('Mateo');
  const [expenses, setExpenses] = useState('1400');
  const [income, setIncome] = useState('2600');
  const [generated, setGenerated] = useState(false);
  const [sent, setSent] = useState(false);

  const expensesNum = Number(expenses) || 0;
  const incomeNum = Number(income) || 0;
  const raw = Math.min(expensesNum * 0.6, incomeNum * 0.4);
  const proposal = Math.max(0, Math.round(raw / 10) * 10);

  async function downloadPdf() {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Syloop — Propuesta de conciliación', 20, 20);
    doc.setFontSize(11);
    doc.text(`Menor: ${childName}`, 20, 35);
    doc.text(`Gastos mensuales declarados: S/ ${expensesNum.toLocaleString('es-PE')}`, 20, 45);
    doc.text(`Ingreso declarado del padre: S/ ${incomeNum.toLocaleString('es-PE')}`, 20, 55);
    doc.text(`Propuesta de pensión mensual: S/ ${proposal.toLocaleString('es-PE')}`, 20, 70);
    doc.text('Fórmula: mínimo entre 60% de gastos y 40% de ingreso, redondeado a S/ 10.', 20, 85);
    doc.text('Estado: pendiente de revisión por la Dra. Carmen Valdivia Salas (CAA N.º 4521).', 20, 100);
    doc.setFontSize(9);
    doc.text('Documento generado en la demo de Syloop · datos ficticios', 20, 280);
    doc.save('syloop-propuesta-conciliacion.pdf');
    setGenerated(true);
  }

  return (
    <Card>
      <CardTitle>Simulador de conciliación</CardTitle>
      <p className="mt-1 text-sm text-[#475569]">Calcula una propuesta referencial de pensión mensual.</p>

      <div className="mt-4 flex flex-col gap-3">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-[0.1em] text-link">Nombre del menor</span>
          <input
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            className="min-h-[40px] rounded-[10px] border border-[#E2E8F0] px-3 text-[15px] focus-visible:focus-ring"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-[0.1em] text-link">Gastos mensuales (S/)</span>
          <input
            type="number"
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)}
            className="min-h-[40px] rounded-[10px] border border-[#E2E8F0] px-3 text-[15px] focus-visible:focus-ring"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-[0.1em] text-link">Ingreso del padre (S/)</span>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="min-h-[40px] rounded-[10px] border border-[#E2E8F0] px-3 text-[15px] focus-visible:focus-ring"
          />
        </label>
      </div>

      <div className="mt-4 rounded-block bg-canvas p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-link">Vista previa del PDF</p>
        <p className="mt-1 font-serif text-3xl font-medium text-ink">S/ {proposal.toLocaleString('es-PE')} / mes</p>
        <p className="mt-1 text-xs text-[#475569]">Propuesta para {childName || 'el menor'}</p>
        <span className="mt-2 inline-block">
          <Badge tone="warn">Pendiente de revisión</Badge>
        </span>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <Button variant="secondary" icon={<FileDown className="h-4 w-4" />} onClick={downloadPdf}>
          Descargar PDF
        </Button>
        <Button
          variant="primary"
          icon={<Send className="h-4 w-4" />}
          onClick={() => {
            setSent(true);
            setTimeout(() => setSent(false), 2500);
          }}
        >
          Enviar a Dra. Valdivia
        </Button>
      </div>
      {generated && <p className="mt-2 text-xs font-medium text-brand-ink">PDF generado y descargado.</p>}
      {sent && <p className="mt-2 text-xs font-medium text-brand-ink">Enviado a tu abogada para revisión.</p>}
    </Card>
  );
}
