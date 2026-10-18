import { Star, MapPin, Clock, Languages } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import type { Lawyer } from '../../types';

interface LawyerCardProps {
  lawyer: Lawyer;
  compact?: boolean;
  showCompare?: boolean;
  compared?: boolean;
  onToggleCompare?: (id: string) => void;
  requested?: boolean;
  onToggleRequest?: (id: string) => void;
}

export function LawyerCard({
  lawyer,
  compact = false,
  showCompare = false,
  compared = false,
  onToggleCompare,
  requested = false,
  onToggleRequest,
}: LawyerCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-card bg-white p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-tint text-sm font-bold text-brand-ink">
            {lawyer.initials}
          </span>
          <div>
            <p className="font-sans text-[15px] font-bold text-ink">{lawyer.name}</p>
            <p className="text-xs text-[#475569]">{lawyer.caaNumber}</p>
          </div>
        </div>
        <span className="flex items-center gap-1 text-sm font-semibold text-ink">
          <Star className="h-4 w-4 fill-star text-star" />
          {lawyer.rating.toFixed(1)}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {lawyer.specialties.map((s) => (
          <Badge key={s} tone="brand">
            {s}
          </Badge>
        ))}
      </div>

      <div className="flex flex-col gap-1.5 text-sm text-[#475569]">
        <span className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-[#94A3B8]" /> {lawyer.district} · {lawyer.modalidad}
        </span>
        <span className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-[#94A3B8]" /> {lawyer.responseTime} · {lawyer.casesCount} casos atendidos
        </span>
        <span className="flex items-center gap-2">
          <Languages className="h-4 w-4 text-[#94A3B8]" /> {lawyer.languages.join(', ')}
        </span>
      </div>

      {!compact && (
        <>
          <p className="text-sm text-[#475569]">{lawyer.bio}</p>

          <div className="mt-1 flex items-end justify-between gap-3 border-t border-[#E2E8F0] pt-4">
            <div>
              <p className="font-serif text-2xl font-medium text-ink">S/ {lawyer.pricePerHito}</p>
              <p className="text-xs text-[#475569]">por hito</p>
            </div>
            <Badge tone="success">
              Protegido por hitos · {lawyer.hitos} pagos de S/ {lawyer.pricePerHito}
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant={requested ? 'secondary' : 'primary'}
              className="flex-1"
              onClick={() => onToggleRequest?.(lawyer.id)}
            >
              {requested ? 'Solicitud enviada' : 'Solicitar asesoría'}
            </Button>
            {showCompare && (
              <label className="flex items-center gap-2 text-sm text-[#475569]">
                <input
                  type="checkbox"
                  checked={compared}
                  onChange={() => onToggleCompare?.(lawyer.id)}
                  className="h-4 w-4 rounded border-[#CBD5E1] text-brand focus-visible:focus-ring"
                />
                Comparar
              </label>
            )}
          </div>
        </>
      )}
    </div>
  );
}
