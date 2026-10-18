import { LawyerBrowser } from '../../components/lawyers/LawyerBrowser';

export function Marketplace() {
  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="font-serif text-[32px] font-medium text-ink">Marketplace de abogados</h1>
        <p className="mt-1 text-sm text-[#475569]">Abogados verificados por el Colegio de Abogados de Arequipa.</p>
      </header>

      <LawyerBrowser mode="mother" />
    </div>
  );
}
