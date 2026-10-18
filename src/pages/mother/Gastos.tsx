import { useState } from 'react';
import { FileUp, CheckCircle2, Send } from 'lucide-react';
import { Card, CardBlock, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Stat } from '../../components/ui/Stat';
import { Badge } from '../../components/ui/Badge';
import { HBars } from '../../components/charts/HBars';
import { expenseCategories } from '../../data/expenses';
import { calendarYear2026 } from '../../data/calendarYear';
import { bankStatementDeposits } from '../../data/bankStatement';
import type { CalendarMonth, CalendarStatus } from '../../types';

const DUE = 800;

const statusLabel: Record<CalendarStatus, string> = {
  pagado: 'Pagado',
  parcial: 'Parcial',
  atrasado: 'Atrasado',
  'sin-verificar': 'Sin verificar',
  proximo: 'Próximo',
};

const statusClasses: Record<CalendarStatus, string> = {
  pagado: 'bg-ink text-white',
  parcial: 'bg-brand-ink text-white',
  atrasado: 'bg-danger text-white',
  'sin-verificar': 'bg-[#E2E8F0] text-[#475569]',
  proximo: 'border border-tint-border bg-white text-brand-ink',
};

export function Gastos() {
  const [calendar, setCalendar] = useState<CalendarMonth[]>(calendarYear2026);
  const [selectedCategory, setSelectedCategory] = useState(expenseCategories[0].category);
  const [analyzing, setAnalyzing] = useState(false);
  const [imported, setImported] = useState(false);
  const [liquidationSent, setLiquidationSent] = useState(false);

  const relevant = calendar.slice(6);
  const recibido = relevant
    .filter((m) => m.status === 'pagado' || m.status === 'parcial')
    .reduce((sum, m) => sum + m.amount, 0);
  const pendiente = relevant
    .filter((m) => m.status === 'parcial' || m.status === 'atrasado' || m.status === 'sin-verificar')
    .reduce((sum, m) => sum + (DUE - m.amount), 0);
  const totalMonthlyExpense = expenseCategories.reduce((s, c) => s + c.amount, 0);
  const category = expenseCategories.find((c) => c.category === selectedCategory)!;

  function analyzeStatement() {
    setAnalyzing(true);
    setTimeout(() => {
      setCalendar((prev) =>
        prev.map((m) => (m.month === 'Septiembre' ? { ...m, status: 'parcial', amount: 500 } : m))
      );
      setAnalyzing(false);
      setImported(true);
    }, 1200);
  }

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="font-serif text-[32px] font-medium text-ink">Gastos y pensiones</h1>
        <p className="mt-1 text-sm text-[#475569]">Exp. 01234-2026 · Mateo, 4 años</p>
      </header>

      <Card>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          <Stat label="Asignación" value={`S/ ${DUE}`} sub="mensual" />
          <Stat label="Recibido" value={`S/ ${recibido.toLocaleString('es-PE')}`} sub="ago—dic 2026" />
          <Stat label="Pendiente" value={`S/ ${pendiente.toLocaleString('es-PE')}`} sub="por cobrar" tone="debt" />
          <Stat label="Gasto mensual" value={`S/ ${totalMonthlyExpense.toLocaleString('es-PE')}`} sub="de Mateo" />
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Card>
          <CardTitle>Gastos por categoría</CardTitle>
          <div className="mt-4">
            <HBars
              data={expenseCategories.map((c) => ({ label: c.category, value: `S/ ${c.amount}` }))}
              values={expenseCategories.map((c) => c.amount)}
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>
          <CardBlock className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-link">
              Comprobantes · {category.category}
            </p>
            <ul className="mt-2 flex flex-col gap-2">
              {category.receipts.map((r) => (
                <li key={r.description} className="flex items-center justify-between gap-3 text-sm text-[#334155]">
                  <span>{r.description}</span>
                  <span className="shrink-0 font-semibold text-ink">S/ {r.amount}</span>
                </li>
              ))}
            </ul>
          </CardBlock>
        </Card>

        <Card>
          <CardTitle>Calendario 2026</CardTitle>
          <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
            {calendar.map((m) => (
              <div key={m.month} className={`rounded-[10px] px-2 py-3 text-center ${statusClasses[m.status]}`}>
                <p className="text-[11px] font-semibold">{m.month.slice(0, 3)}</p>
                <p className="mt-1 text-[10px]">{statusLabel[m.status]}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-3 text-xs text-[#475569]">
            {(Object.keys(statusLabel) as CalendarStatus[]).map((s) => (
              <span key={s} className="flex items-center gap-1.5">
                <span className={`inline-block h-2.5 w-2.5 rounded-sm ${statusClasses[s].split(' ')[0]}`} />
                {statusLabel[s]}
              </span>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <CardTitle>Lector de estado de cuenta del Banco de la Nación</CardTitle>
        <p className="mt-1 text-sm text-[#475569]">
          Sube el PDF de tu cuenta y la IA extrae los depósitos relacionados a la pensión de Mateo.
        </p>

        {!imported ? (
          <Button
            className="mt-4"
            variant="secondary"
            icon={<FileUp className="h-4 w-4" />}
            onClick={analyzeStatement}
            disabled={analyzing}
          >
            {analyzing ? 'Analizando PDF…' : 'Subir PDF y analizar'}
          </Button>
        ) : (
          <div className="mt-4 flex flex-col gap-4">
            <div className="overflow-hidden rounded-block border border-[#E2E8F0]">
              <table className="w-full text-sm">
                <thead className="bg-canvas text-left text-xs font-semibold uppercase tracking-[0.05em] text-[#475569]">
                  <tr>
                    <th className="px-4 py-2">Fecha</th>
                    <th className="px-4 py-2">Descripción</th>
                    <th className="px-4 py-2 text-right">Monto</th>
                  </tr>
                </thead>
                <tbody>
                  {bankStatementDeposits.map((d) => (
                    <tr key={d.date + d.description} className={`border-t border-[#E2E8F0] ${d.ignored ? 'text-[#475569]' : 'text-[#334155]'}`}>
                      <td className="px-4 py-2">{d.date}</td>
                      <td className="px-4 py-2">
                        {d.description}
                        {d.ignored && <span className="ml-2 text-xs italic">(ignorado)</span>}
                      </td>
                      <td className="px-4 py-2 text-right font-semibold">S/ {d.amount.toLocaleString('es-PE')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="flex items-center gap-2 text-sm font-medium text-brand-ink">
              <CheckCircle2 className="h-4 w-4" /> Calendario y KPIs actualizados con los depósitos encontrados.
            </p>
            <Badge tone="brand">Mes de septiembre verificado</Badge>
            <Button
              variant="primary"
              icon={<Send className="h-4 w-4" />}
              onClick={() => {
                setLiquidationSent(true);
                setTimeout(() => setLiquidationSent(false), 2500);
              }}
            >
              Preparar liquidación para mi abogada
            </Button>
            {liquidationSent && (
              <p className="text-sm font-medium text-brand-ink">
                Enviamos la liquidación de pagos pendientes a la Dra. Valdivia.
              </p>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
