import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Map,
  Sparkles,
  FileText,
  Wallet,
  Users,
  Inbox,
  ShieldCheck,
  Menu,
  X,
  LogOut,
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { RoleSwitcher } from './RoleSwitcher';
import type { Role } from '../../types';

interface Item {
  label: string;
  to: string;
  icon: ReactNode;
  badge?: number;
}

export function MobileNav({ role }: { role: Role }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const logout = useAppStore((s) => s.logout);
  const leads = useAppStore((s) => s.leads);
  const validationQueue = useAppStore((s) => s.validationQueue);
  const newLeadsCount = leads.filter((l) => l.status === 'nuevo').length;
  const pendingValidationCount = validationQueue.filter((v) => v.status === 'pendiente').length;

  const motherBar: Item[] = [
    { label: 'Panel', to: '/madre/panel', icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: 'Mi ruta', to: '/madre/ruta', icon: <Map className="h-5 w-5" /> },
    { label: 'Asistente', to: '/madre/asistente', icon: <Sparkles className="h-5 w-5" /> },
    { label: 'Expediente', to: '/madre/expediente', icon: <FileText className="h-5 w-5" /> },
  ];
  const motherMore: Item[] = [
    { label: 'Gastos y pensiones', to: '/madre/gastos', icon: <Wallet className="h-4 w-4" /> },
    { label: 'Abogados', to: '/madre/abogados', icon: <Users className="h-4 w-4" /> },
  ];

  const lawyerBar: Item[] = [
    { label: 'Mando', to: '/abogado', icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: 'Adquisición', to: '/abogado/adquisicion', icon: <Inbox className="h-5 w-5" />, badge: newLeadsCount },
    { label: 'Validación', to: '/abogado/validacion', icon: <ShieldCheck className="h-5 w-5" />, badge: pendingValidationCount },
    { label: 'Abogados', to: '/directorio', icon: <Users className="h-5 w-5" /> },
  ];
  const lawyerMore: Item[] = [];

  const bar = role === 'madre' ? motherBar : lawyerBar;
  const more = role === 'madre' ? motherMore : lawyerMore;

  const isActive = (to: string) => (to === '/abogado' ? location.pathname === '/abogado' : location.pathname.startsWith(to));

  return (
    <>
      <nav
        className="fixed inset-x-0 bottom-0 z-40 flex h-16 items-stretch border-t border-[#E2E8F0] bg-white md:hidden"
        aria-label="Navegación inferior"
      >
        {bar.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`relative flex flex-1 flex-col items-center justify-center gap-1 text-[11px] font-medium ${
              isActive(item.to) ? 'text-brand-ink' : 'text-[#475569]'
            }`}
          >
            {item.icon}
            {item.label}
            {!!item.badge && (
              <span className="absolute right-6 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-ink px-1 text-[10px] font-bold text-white">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Más opciones"
          className="flex flex-1 flex-col items-center justify-center gap-1 text-[11px] font-medium text-[#475569]"
        >
          <Menu className="h-5 w-5" />
          Más
        </button>
      </nav>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end bg-ink/40 md:hidden" onClick={() => setOpen(false)}>
          <div
            className="w-full rounded-t-2xl bg-ink p-5 pb-8"
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-semibold text-white">Menú</span>
              <button type="button" aria-label="Cerrar" onClick={() => setOpen(false)} className="text-[#94A3B8]">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-col gap-1">
              {more.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[44px] items-center gap-2.5 rounded-[10px] px-3 text-sm font-medium text-[#CBD5E1] hover:bg-sidebar-hover hover:text-white"
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="flex min-h-[44px] items-center gap-2.5 rounded-[10px] px-3 text-sm font-medium text-[#CBD5E1] hover:bg-sidebar-hover hover:text-white"
              >
                <LogOut className="h-4 w-4" />
                Cerrar sesión
              </button>
            </div>
            <div className="mt-4">
              <RoleSwitcher dark />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
