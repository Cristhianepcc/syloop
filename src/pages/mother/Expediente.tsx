import { DragEvent, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, UploadCloud, FileText, CheckCircle2, Clock } from 'lucide-react';
import { Card, CardBlock, CardTitle } from '../../components/ui/Card';
import { Chip } from '../../components/ui/Chip';
import { Badge } from '../../components/ui/Badge';
import { useAppStore } from '../../store/useAppStore';
import type { DocCategory } from '../../types';

const categories: DocCategory[] = ['Demanda', 'Resolución', 'Cédula', 'Acta', 'Partida', 'Constancia'];

export function Expediente() {
  const documents = useAppStore((s) => s.documents);
  const addDocument = useAppStore((s) => s.addDocument);
  const [searchParams] = useSearchParams();
  const docParam = searchParams.get('doc');

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<DocCategory | null>(null);
  const [selectedId, setSelectedId] = useState(docParam ?? documents[0]?.id);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (docParam) setSelectedId(docParam);
  }, [docParam]);

  const filtered = useMemo(() => {
    return documents.filter((d) => {
      const matchesSearch =
        !search.trim() ||
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.summary.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !category || d.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [documents, search, category]);

  const selected = documents.find((d) => d.id === selectedId) ?? filtered[0];

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    const name = file?.name ?? 'Documento subido';
    setUploading(true);
    setTimeout(() => {
      const id = `doc-${Date.now()}`;
      addDocument({
        id,
        name,
        category: 'Constancia',
        date: new Date().toLocaleDateString('es-PE'),
        summary: 'Documento clasificado automáticamente como Constancia. Tu abogada lo revisará antes de usarlo en el expediente.',
        keyPoints: ['Clasificado por IA como Constancia', 'Pendiente de validación de tu abogada'],
        status: 'pendiente',
      });
      setUploading(false);
      setSelectedId(id);
    }, 1000);
  }

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="font-serif text-[32px] font-medium text-ink">Expediente digital</h1>
        <p className="mt-1 text-sm text-[#475569]">Exp. 01234-2026 · 3° Juzgado de Paz Letrado de Arequipa</p>
      </header>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center gap-2 rounded-card border-2 border-dashed p-8 text-center transition-colors ${
          dragging ? 'border-brand bg-tint-soft' : 'border-[#CBD5E1] bg-white'
        }`}
      >
        <UploadCloud className="h-8 w-8 text-brand" />
        <p className="font-semibold text-ink">
          {uploading ? 'Clasificando documento…' : 'Arrastra un documento aquí para subirlo'}
        </p>
        <p className="text-sm text-[#475569]">Se clasificará automáticamente y quedará pendiente de validación.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        <Card className="!p-4">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar documentos…"
              className="min-h-[40px] w-full rounded-[10px] border border-[#E2E8F0] pl-9 pr-3 text-sm focus-visible:focus-ring"
            />
          </label>

          <div className="mt-3 flex flex-wrap gap-1.5">
            <Chip active={category === null} onClick={() => setCategory(null)} count={documents.length}>
              Todos
            </Chip>
            {categories.map((c) => (
              <Chip
                key={c}
                active={category === c}
                onClick={() => setCategory(c)}
                count={documents.filter((d) => d.category === c).length}
              >
                {c}
              </Chip>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-1.5">
            {filtered.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedId(d.id)}
                className={`flex items-start gap-3 rounded-[10px] px-3 py-2.5 text-left ${
                  selected?.id === d.id ? 'bg-tint-soft' : 'hover:bg-[#F8FAFC]'
                }`}
              >
                <FileText className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span className="flex-1">
                  <span className="block text-sm font-semibold text-ink">{d.name}</span>
                  <span className="block text-xs text-[#475569]">{d.category} · {d.date}</span>
                </span>
                {d.status === 'validado' ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-brand" />
                ) : (
                  <Clock className="h-4 w-4 shrink-0 text-warn-dot" />
                )}
              </button>
            ))}
            {filtered.length === 0 && <p className="px-3 py-6 text-center text-sm text-[#475569]">Sin resultados.</p>}
          </div>
        </Card>

        {selected && (
          <Card>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-link">{selected.category}</p>
                <CardTitle className="mt-1 !text-xl">{selected.name}</CardTitle>
                <p className="mt-1 text-sm text-[#475569]">{selected.date}</p>
              </div>
              {selected.status === 'validado' ? (
                <Badge tone="success">Validado por {selected.validatedBy}</Badge>
              ) : (
                <Badge tone="warn">Pendiente</Badge>
              )}
            </div>

            <CardBlock className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-link">Resumen IA</p>
              <p className="mt-2 text-sm text-[#334155]">{selected.summary}</p>
            </CardBlock>

            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-link">Puntos clave</p>
              <ul className="mt-2 flex flex-col gap-1.5">
                {selected.keyPoints.map((p) => (
                  <li key={p} className="flex gap-2 text-sm text-[#334155]">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
