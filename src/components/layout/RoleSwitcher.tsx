import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import type { Role } from '../../types';

const roles: { id: Role; label: string; to: string }[] = [
  { id: 'publico', label: 'Público', to: '/' },
  { id: 'madre', label: 'Madre', to: '/madre/panel' },
  { id: 'abogado', label: 'Abogado', to: '/abogado' },
];

export function RoleSwitcher({ dark = false }: { dark?: boolean }) {
  const role = useAppStore((s) => s.role);
  const setRole = useAppStore((s) => s.setRole);
  const navigate = useNavigate();

  return (
    <div
      className={`inline-flex items-center gap-0.5 rounded-full p-1 ${dark ? 'bg-ink/40' : 'bg-[#F1F5F9]'}`}
      role="group"
      aria-label="Selector de rol de demo"
    >
      {roles.map((r) => (
        <button
          key={r.id}
          type="button"
          onClick={() => {
            setRole(r.id);
            navigate(r.to);
          }}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
            role === r.id
              ? dark
                ? 'bg-sky text-ink'
                : 'bg-white text-ink shadow-sm'
              : dark
                ? 'text-[#CBD5E1] hover:text-white'
                : 'text-[#475569] hover:text-ink'
          }`}
        >
          {r.label}
        </button>
      ))}
    </div>
  );
}
