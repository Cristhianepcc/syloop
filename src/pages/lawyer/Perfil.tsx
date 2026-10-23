import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ExternalLink,
  Eye,
  EyeOff,
  Lock,
  RotateCcw,
  Save,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react';
import { Card, CardBlock, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Chip } from '../../components/ui/Chip';
import { Select } from '../../components/ui/Select';
import { Toggle } from '../../components/ui/Toggle';
import { LawyerCard } from '../../components/cards/LawyerCard';
import {
  applyProfile,
  districtCatalogue,
  languageCatalogue,
  myLawyer,
  specialtyCatalogue,
} from '../../data/lawyers';
import { useAppStore } from '../../store/useAppStore';
import type { District, LawyerProfileDraft, Modalidad } from '../../types';

const BIO_MAX = 280;
const MAX_SPECIALTIES = 4;

const profileStats = [
  { label: 'Visitas a tu perfil', value: '312', hint: 'últimos 30 días', icon: Eye },
  { label: 'Solicitudes recibidas', value: '18', hint: '6 % de conversión', icon: Users },
  { label: 'Posición promedio', value: '2.º', hint: 'en "Pensión de alimentos"', icon: TrendingUp },
];

export function Perfil() {
  const saved = useAppStore((s) => s.lawyerProfile);
  const saveLawyerProfile = useAppStore((s) => s.saveLawyerProfile);

  const [draft, setDraft] = useState<LawyerProfileDraft>(saved);
  const [justSaved, setJustSaved] = useState(false);

  const dirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(saved), [draft, saved]);
  const preview = useMemo(() => applyProfile(myLawyer, draft), [draft]);

  function patch(changes: Partial<LawyerProfileDraft>) {
    setDraft((d) => ({ ...d, ...changes }));
    setJustSaved(false);
  }

  function toggleIn(list: string[], value: string, max?: number) {
    if (list.includes(value)) return list.filter((v) => v !== value);
    if (max && list.length >= max) return list;
    return [...list, value];
  }

  function save() {
    saveLawyerProfile(draft);
    setJustSaved(true);
  }

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-serif text-[32px] font-medium text-ink">Mi perfil público</h1>
          <p className="mt-1 text-sm text-[#475569]">
            Esto es lo que ven las madres cuando te encuentran en el marketplace. Los cambios se reflejan al
            instante en la vista previa.
          </p>
        </div>
        <Link to="/directorio" target="_blank" rel="noreferrer" className="shrink-0">
          <Button variant="secondary" icon={<ExternalLink className="h-4 w-4" />}>
            Ver en el directorio
          </Button>
        </Link>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="flex flex-col gap-6">
          <Card>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <CardTitle>Visibilidad</CardTitle>
                <p className="mt-1 text-sm text-[#475569]">Controla si apareces en las búsquedas de las madres.</p>
              </div>
              <Badge tone={draft.listed ? 'success' : 'neutral'}>
                {draft.listed ? 'Visible en el marketplace' : 'Oculto del marketplace'}
              </Badge>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <SwitchRow
                checked={draft.listed}
                onChange={(v) => patch({ listed: v })}
                title="Aparecer en el directorio"
                description="Si lo desactivas, dejas de salir en los resultados de búsqueda y en las comparaciones."
              />
              <SwitchRow
                checked={draft.acceptingClients}
                onChange={(v) => patch({ acceptingClients: v })}
                disabled={!draft.listed}
                title="Acepto nuevas clientas"
                description="Sigues visible, pero tu ficha avisa que por ahora no tomas casos nuevos."
              />
            </div>
          </Card>

          <Card>
            <CardTitle>Presentación</CardTitle>
            <p className="mt-1 text-sm text-[#475569]">
              Escribe en lenguaje sencillo: la mayoría de madres llega sin conocer términos legales.
            </p>

            <label className="mt-4 flex flex-col gap-1.5">
              <span className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.1em] text-link">Sobre tu trabajo</span>
                <span className={`text-xs ${draft.bio.length > BIO_MAX ? 'font-semibold text-danger' : 'text-[#94A3B8]'}`}>
                  {draft.bio.length}/{BIO_MAX}
                </span>
              </span>
              <textarea
                value={draft.bio}
                onChange={(e) => patch({ bio: e.target.value })}
                rows={4}
                className="w-full resize-y rounded-[10px] border border-[#E2E8F0] bg-white px-3.5 py-3 text-[15px] leading-relaxed text-ink focus-visible:focus-ring"
              />
            </label>

            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <Select
                label="Distrito base"
                value={draft.district}
                onChange={(e) => patch({ district: e.target.value as District })}
              >
                {districtCatalogue.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </Select>
              <Select
                label="Modalidad"
                value={draft.modalidad}
                onChange={(e) => patch({ modalidad: e.target.value as Modalidad })}
              >
                <option value="Presencial">Presencial</option>
                <option value="Virtual">Virtual</option>
                <option value="Ambas">Ambas</option>
              </Select>
              <Select
                label="Tiempo de respuesta"
                value={draft.responseHours}
                onChange={(e) => patch({ responseHours: Number(e.target.value) })}
              >
                {[1, 2, 4, 6, 12, 24].map((h) => (
                  <option key={h} value={h}>
                    Responde en {h} h
                  </option>
                ))}
              </Select>
            </div>
            <p className="mt-2 text-xs text-[#94A3B8]">
              Es un compromiso: Syloop mide tu respuesta real y lo muestra si te retrasas seguido.
            </p>
          </Card>

          <Card>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <CardTitle>Especialidades</CardTitle>
              <span className="text-xs text-[#94A3B8]">
                {draft.specialties.length} de {MAX_SPECIALTIES}
              </span>
            </div>
            <p className="mt-1 text-sm text-[#475569]">Elige hasta cuatro. Son los filtros con los que te buscan.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {specialtyCatalogue.map((s) => {
                const active = draft.specialties.includes(s);
                return (
                  <Chip
                    key={s}
                    active={active}
                    disabled={!active && draft.specialties.length >= MAX_SPECIALTIES}
                    onClick={() => patch({ specialties: toggleIn(draft.specialties, s, MAX_SPECIALTIES) })}
                    className="disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {s}
                  </Chip>
                );
              })}
            </div>

            <div className="mt-6 border-t border-[#E2E8F0] pt-5">
              <CardTitle>Idiomas de atención</CardTitle>
              <div className="mt-3 flex flex-wrap gap-2">
                {languageCatalogue.map((l) => (
                  <Chip
                    key={l}
                    active={draft.languages.includes(l)}
                    onClick={() => patch({ languages: toggleIn(draft.languages, l) })}
                  >
                    {l}
                  </Chip>
                ))}
              </div>
              {draft.languages.includes('Quechua') && (
                <p className="mt-2 text-xs text-[#475569]">
                  Atender en quechua te destaca: 1 de cada 4 madres en Arequipa lo pide.
                </p>
              )}
            </div>
          </Card>

          <Card>
            <CardTitle>Tarifa por hito</CardTitle>
            <p className="mt-1 text-sm text-[#475569]">
              El pago se libera en {myLawyer.hitos} hitos. La madre ve el total antes de contratar.
            </p>

            <div className="mt-4 flex flex-wrap items-end gap-6">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-[0.1em] text-link">Precio por hito</span>
                <span className="relative inline-flex items-center">
                  <span className="pointer-events-none absolute left-3.5 text-[15px] font-medium text-[#475569]">S/</span>
                  <input
                    type="number"
                    min={100}
                    max={500}
                    step={5}
                    value={draft.pricePerHito}
                    onChange={(e) => patch({ pricePerHito: Number(e.target.value) })}
                    className="min-h-[44px] w-36 rounded-[10px] border border-[#E2E8F0] bg-white pl-10 pr-3.5 text-[15px] text-ink focus-visible:focus-ring"
                  />
                </span>
              </label>
              <CardBlock className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-link">Total del caso</p>
                <p className="mt-1 font-serif text-2xl font-medium text-ink">
                  S/ {draft.pricePerHito * myLawyer.hitos}
                </p>
                <p className="mt-0.5 text-xs text-[#475569]">
                  {myLawyer.hitos} hitos de S/ {draft.pricePerHito}
                </p>
              </CardBlock>
            </div>

            <input
              type="range"
              min={100}
              max={500}
              step={5}
              value={draft.pricePerHito}
              onChange={(e) => patch({ pricePerHito: Number(e.target.value) })}
              aria-label="Precio por hito"
              className="mt-5 w-full accent-brand"
            />
            <div className="mt-1 flex justify-between text-xs text-[#94A3B8]">
              <span>S/ 100</span>
              <span>Promedio en Arequipa: S/ 219</span>
              <span>S/ 500</span>
            </div>
          </Card>

          <Card>
            <CardTitle>Datos verificados</CardTitle>
            <p className="mt-1 text-sm text-[#475569]">
              Estos campos no se editan: los acredita el Colegio de Abogados o los genera tu historial en Syloop.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <LockedField label="Colegiatura" value={myLawyer.caaNumber} note="Verificado por el CAA" />
              <LockedField
                label="Calificación"
                value={`${myLawyer.rating.toFixed(1)} / 5`}
                note="Promedio de tus clientas"
              />
              <LockedField
                label="Casos atendidos"
                value={String(myLawyer.casesCount)}
                note="Cerrados en la plataforma"
              />
            </div>
          </Card>
        </div>

        <aside className="flex flex-col gap-4 lg:sticky lg:top-0 lg:self-start">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-link">Así te ven las madres</p>
            {dirty && <Badge tone="warn">Sin guardar</Badge>}
          </div>

          <div className={draft.listed ? '' : 'relative'}>
            <div
              aria-hidden
              className={`pointer-events-none select-none ${draft.listed ? '' : 'opacity-40 grayscale'}`}
            >
              <LawyerCard lawyer={preview} requestHref="/directorio" unavailable={!draft.acceptingClients} />
            </div>
            {!draft.listed && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-6">
                <span className="flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white">
                  <EyeOff className="h-4 w-4" />
                  No apareces en las búsquedas
                </span>
              </div>
            )}
          </div>

          {draft.listed && !draft.acceptingClients && (
            <p className="rounded-block bg-warn-panel px-4 py-3 text-xs text-warn-text">
              Tu ficha mostrará «Agenda llena · no acepta casos nuevos» en lugar del botón de solicitud.
            </p>
          )}

          <Card>
            <CardTitle>Rendimiento</CardTitle>
            <div className="mt-3 flex flex-col gap-2">
              {profileStats.map((s) => (
                <div key={s.label} className="flex items-center justify-between gap-3 rounded-block bg-canvas px-4 py-3">
                  <span className="flex items-center gap-2.5 text-sm text-[#475569]">
                    <s.icon className="h-4 w-4 text-[#94A3B8]" />
                    {s.label}
                  </span>
                  <span className="text-right">
                    <span className="block font-sans text-[15px] font-bold text-ink">{s.value}</span>
                    <span className="block text-xs text-[#94A3B8]">{s.hint}</span>
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3 flex items-start gap-2 text-xs text-[#475569]">
              <Star className="mt-0.5 h-3.5 w-3.5 shrink-0 fill-star text-star" />
              Los perfiles con biografía de más de 150 caracteres reciben 40 % más solicitudes.
            </p>
          </Card>

          <div className="flex items-center gap-3">
            <Button variant="primary" className="flex-1" icon={<Save className="h-4 w-4" />} disabled={!dirty} onClick={save}>
              {justSaved && !dirty ? 'Cambios guardados ✓' : 'Guardar cambios'}
            </Button>
            <Button
              variant="secondary"
              icon={<RotateCcw className="h-4 w-4" />}
              iconOnly
              aria-label="Descartar cambios"
              disabled={!dirty}
              onClick={() => {
                setDraft(saved);
                setJustSaved(false);
              }}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}

function SwitchRow({
  checked,
  onChange,
  title,
  description,
  disabled = false,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  title: string;
  description: string;
  disabled?: boolean;
}) {
  return (
    <div
      className={`flex items-start justify-between gap-4 rounded-block bg-canvas px-4 py-3 ${
        disabled ? 'opacity-50' : ''
      }`}
    >
      <div>
        <p className="font-sans text-sm font-bold text-ink">{title}</p>
        <p className="mt-0.5 text-sm text-[#475569]">{description}</p>
      </div>
      <div className={disabled ? 'pointer-events-none' : ''}>
        <Toggle checked={checked} onChange={onChange} label={title} />
      </div>
    </div>
  );
}

function LockedField({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-block border border-[#E2E8F0] bg-canvas px-4 py-3">
      <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-[#94A3B8]">
        <Lock className="h-3 w-3" />
        {label}
      </span>
      <p className="mt-1.5 font-sans text-[15px] font-bold text-ink">{value}</p>
      <p className="mt-0.5 text-xs text-[#94A3B8]">{note}</p>
    </div>
  );
}
