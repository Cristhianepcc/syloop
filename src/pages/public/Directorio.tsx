import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { LawyerBrowser } from '../../components/lawyers/LawyerBrowser';

export function Directorio() {
  return (
    <div className="bg-canvas px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-col items-start gap-3">
          <span className="inline-flex items-center rounded-full border border-tint-border bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-link">
            Marketplace · Arequipa
          </span>
          <h1 className="font-serif text-4xl font-medium text-ink sm:text-[40px]">
            Encuentra a tu abogado en Arequipa
          </h1>
          <p className="max-w-2xl text-[#475569]">
            Todos los abogados de este directorio están verificados por el Colegio de Abogados de Arequipa y
            trabajan por hitos, para que sepas exactamente qué estás pagando.
          </p>
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-ink">
            <ShieldCheck className="h-4 w-4 text-brand" />
            Protegido por hitos
          </span>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-card bg-ink px-6 py-5 sm:flex-row sm:items-center">
          <div>
            <p className="font-sans text-[15px] font-bold text-white">¿Quieres contratar con pago protegido?</p>
            <p className="mt-1 text-sm text-[#CBD5E1]">Crea tu cuenta gratis y sigue tu caso paso a paso.</p>
          </div>
          <Link to="/ingresar" className="shrink-0">
            <Button variant="sky">Crear cuenta gratis</Button>
          </Link>
        </div>

        <div className="mt-8">
          <LawyerBrowser mode="public" />
        </div>
      </div>
    </div>
  );
}
