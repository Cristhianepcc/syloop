import { useMemo, useState } from 'react';
import { Scale } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { LawyerCard } from '../../components/cards/LawyerCard';
import { lawyers } from '../../data/lawyers';
import { useAppStore } from '../../store/useAppStore';
import type { Modalidad } from '../../types';

export function Marketplace() {
  const compareIds = useAppStore((s) => s.compareIds);
  const toggleCompare = useAppStore((s) => s.toggleCompare);
  const requestedIds = useAppStore((s) => s.requestedIds);
  const toggleRequest = useAppStore((s) => s.toggleRequest);

  const [specialty, setSpecialty] = useState('all');
  const [modalidad, setModalidad] = useState<'all' | Modalidad>('all');
  const [maxPrice, setMaxPrice] = useState(500);
  const [minRating, setMinRating] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);

  const specialties = useMemo(() => Array.from(new Set(lawyers.flatMap((l) => l.specialties))), []);

  const filtered = lawyers.filter((l) => {
    const matchesSpecialty = specialty === 'all' || l.specialties.includes(specialty);
    const matchesModalidad = modalidad === 'all' || l.modalidad === modalidad || l.modalidad === 'Ambas';
    const matchesPrice = l.pricePerHito <= maxPrice;
    const matchesRating = !minRating || l.rating >= 4.7;
    return matchesSpecialty && matchesModalidad && matchesPrice && matchesRating;
  });

  const comparedLawyers = lawyers.filter((l) => compareIds.includes(l.id));

  return (
    <div className="flex flex-col gap-6 pb-20">
      <header>
        <h1 className="font-serif text-[32px] font-medium text-ink">Marketplace de abogados</h1>
        <p className="mt-1 text-sm text-[#475569]">Abogados verificados por el Colegio de Abogados de Arequipa.</p>
      </header>

      <Card>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Select label="Especialidad" value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
            <option value="all">Todas</option>
            {specialties.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
          <Select label="Modalidad" value={modalidad} onChange={(e) => setModalidad(e.target.value as 'all' | Modalidad)}>
            <option value="all">Todas</option>
            <option value="Presencial">Presencial</option>
            <option value="Virtual">Virtual</option>
            <option value="Ambas">Ambas</option>
          </Select>
          <Select
            label={`Precio máximo · S/ ${maxPrice}`}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          >
            {[250, 300, 350, 400, 450, 500].map((p) => (
              <option key={p} value={p}>
                Hasta S/ {p}
              </option>
            ))}
          </Select>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-link">Calificación</span>
            <button
              type="button"
              onClick={() => setMinRating((v) => !v)}
              className={`flex min-h-[44px] items-center justify-center rounded-[10px] border px-3.5 text-sm font-semibold transition-colors ${
                minRating ? 'border-brand bg-tint text-brand-ink' : 'border-[#E2E8F0] bg-white text-[#475569]'
              }`}
            >
              4.7 o más
            </button>
          </label>
        </div>
      </Card>

      <p className="text-sm text-[#475569]">{filtered.length} abogados encontrados</p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((l) => (
          <LawyerCard
            key={l.id}
            lawyer={l}
            showCompare
            compared={compareIds.includes(l.id)}
            onToggleCompare={toggleCompare}
            requested={requestedIds.includes(l.id)}
            onToggleRequest={toggleRequest}
          />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-12 text-center text-sm text-[#475569]">
            No hay abogados que coincidan con tus filtros.
          </p>
        )}
      </div>

      {compareIds.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-4 border-t border-[#E2E8F0] bg-white px-4 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.06)] sm:px-8 md:bottom-0">
          <span className="text-sm font-medium text-ink">
            {compareIds.length} de 3 seleccionados para comparar
          </span>
          <Button variant="primary" icon={<Scale className="h-4 w-4" />} onClick={() => setCompareOpen(true)}>
            Comparar
          </Button>
        </div>
      )}

      <Modal open={compareOpen} onClose={() => setCompareOpen(false)} title="Comparar abogados" wide>
        <CompareTable lawyers={comparedLawyers} />
      </Modal>
    </div>
  );
}

function CompareTable({ lawyers: compared }: { lawyers: typeof lawyers }) {
  if (compared.length === 0) {
    return <p className="text-sm text-[#475569]">Selecciona abogados para comparar.</p>;
  }

  const rows: { label: string; getValue: (l: (typeof compared)[number]) => string | number; best: 'max' | 'min' }[] = [
    { label: 'Precio por hito', getValue: (l) => l.pricePerHito, best: 'min' },
    { label: 'Calificación', getValue: (l) => l.rating, best: 'max' },
    { label: 'Casos atendidos', getValue: (l) => l.casesCount, best: 'max' },
    { label: 'Tiempo de respuesta', getValue: (l) => parseInt(l.responseTime.replace(/\D/g, ''), 10), best: 'min' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[480px] text-left text-sm">
        <thead>
          <tr>
            <th className="w-40 pb-3 text-xs font-semibold uppercase tracking-[0.1em] text-link">Criterio</th>
            {compared.map((l) => (
              <th key={l.id} className="pb-3 pl-4 font-sans text-sm font-bold text-ink">
                {l.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const values = compared.map(row.getValue);
            const bestValue = row.best === 'max' ? Math.max(...(values as number[])) : Math.min(...(values as number[]));
            return (
              <tr key={row.label} className="border-t border-[#E2E8F0]">
                <td className="py-3 text-[#475569]">{row.label}</td>
                {compared.map((l) => {
                  const value = row.getValue(l);
                  const isBest = value === bestValue;
                  return (
                    <td key={l.id} className={`py-3 pl-4 ${isBest ? 'font-bold text-brand-ink' : 'text-[#334155]'}`}>
                      {row.label === 'Precio por hito' ? `S/ ${value}` : value}
                      {row.label === 'Tiempo de respuesta' ? ' h' : ''}
                    </td>
                  );
                })}
              </tr>
            );
          })}
          <tr className="border-t border-[#E2E8F0]">
            <td className="py-3 text-[#475569]">Idiomas</td>
            {compared.map((l) => (
              <td key={l.id} className="py-3 pl-4 text-[#334155]">
                {l.languages.join(', ')}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
