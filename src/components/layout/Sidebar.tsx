import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Bell,
  Search,
  LayoutDashboard,
  Map,
  Sparkles,
  FileText,
  Wallet,
  Users,
  Inbox,
  ShieldCheck,
  LogOut,
} from 'lucide-react';
import { Logo } from '../ui/Logo';
import { RoleSwitcher } from './RoleSwitcher';
import { useAppStore } from '../../store/useAppStore';
import { documents } from '../../data/documents';
import { activeCases } from '../../data/lawyerDesk';
import type { Role } from '../../types';

interface NavItem {
  label: string;
  to: string;
  icon: ReactNode;
  badge?: number;
}

export function Sidebar({ role }: { role: Role }) {
  const location = useLocation();
  const userName = useAppStore((s) => s.userName);
  const logout = useAppStore((s) => s.logout);
  const leads = useAppStore((s) => s.leads);
  const validationQueue = useAppStore((s) => s.validationQueue);

  const newLeadsCount = leads.filter((l) => l.status === 'nuevo').length;
  const pendingValidationCount = validationQueue.filter((v) => v.status === 'pendiente').length;

  const motherNav: NavItem[] = [
    { label: 'Panel', to: '/madre/panel', icon: <LayoutDashboard className="h-[18px] w-[18px]" /> },
    { label: 'Mi ruta judicial', to: '/madre/ruta', icon: <Map className="h-[18px] w-[18px]" /> },
    { label: 'Asistente IA', to: '/madre/asistente', icon: <Sparkles className="h-[18px] w-[18px]" /> },
    { label: 'Expediente', to: '/madre/expediente', icon: <FileText className="h-[18px] w-[18px]" /> },
    { label: 'Gastos y pensiones', to: '/madre/gastos', icon: <Wallet className="h-[18px] w-[18px]" /> },
  ];

  const lawyerNav: NavItem[] = [
    { label: 'Centro de mando', to: '/abogado', icon: <LayoutDashboard className="h-[18px] w-[18px]" /> },
    { label: 'Adquisición', to: '/abogado/adquisicion', icon: <Inbox className="h-[18px] w-[18px]" />, badge: newLeadsCount },
    { label: 'Validación IA', to: '/abogado/validacion', icon: <ShieldCheck className="h-[18px] w-[18px]" />, badge: pendingValidationCount },
    { label: 'Asistente IA', to: '/abogado/asistente', icon: <Sparkles className="h-[18px] w-[18px]" /> },
  ];

  const nav = role === 'madre' ? motherNav : lawyerNav;
  const recentDocs = documents.slice(0, 2);
  const clientRoster = activeCases.slice(0, 4);

  const isActive = (to: string) => (to === '/abogado' ? location.pathname === '/abogado' : location.pathname.startsWith(to));

  return (
    <aside className="hidden h-screen w-[248px] shrink-0 flex-col bg-ink py-5 md:flex">
      <div className="flex items-center justify-between px-5">
        <Link to={role === 'madre' ? '/madre/panel' : '/abogado'}>
          <Logo variant="light" />
        </Link>
        <button
          type="button"
          aria-label="Notificaciones"
          className="flex h-9 w-9 items-center justify-center rounded-full text-[#CBD5E1] hover:bg-sidebar-hover"
        >
          <Bell className="h-[18px] w-[18px]" />
        </button>
      </div>

      <div className="mt-4 px-5">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
          <span className="sr-only">Buscar</span>
          <input
            type="search"
            placeholder="Buscar"
            className="min-h-[38px] w-full rounded-[10px] bg-sidebar-hover pl-9 pr-3 text-sm text-white placeholder:text-[#94A3B8] focus-visible:focus-ring"
          />
        </label>
      </div>

      <div className="scrollbar-thin mt-5 flex-1 overflow-y-auto">
        <nav className="flex flex-col gap-0.5 px-3" aria-label="Navegación principal">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex min-h-[44px] items-center justify-between gap-2.5 rounded-[10px] px-3 text-[14px] font-medium transition-colors ${
                isActive(item.to) ? 'bg-sidebar-active text-white' : 'text-[#CBD5E1] hover:bg-sidebar-hover hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2.5">
                {item.icon}
                {item.label}
              </span>
              {!!item.badge && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-ink px-1 text-[11px] font-bold text-white">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {role === 'madre' ? (
          <>
            <SidebarSection title="Herramientas">
              <SidebarLink to="/madre/abogados" icon={<Users className="h-4 w-4" />} label="Abogados" />
            </SidebarSection>
            <SidebarSection title="Recientes">
              {recentDocs.map((d) => (
                <SidebarLink
                  key={d.id}
                  to={`/madre/expediente?doc=${d.id}`}
                  icon={<FileText className="h-4 w-4" />}
                  label={d.name}
                />
              ))}
            </SidebarSection>
            <SidebarSection title="Mis expedientes">
              <SidebarLink to="/madre/expediente" icon={<FileText className="h-4 w-4" />} label="Exp. 01234-2026" />
            </SidebarSection>
          </>
        ) : (
          <>
            <SidebarSection title="Apps">
              <SidebarLink to="/directorio" icon={<Users className="h-4 w-4" />} label="Mi perfil público" />
            </SidebarSection>
            <SidebarSection title="Clientas">
              {clientRoster.map((c) => (
                <SidebarLink key={c.id} to={`/abogado/clienta/${c.id}`} icon={<Users className="h-4 w-4" />} label={c.clientName} />
              ))}
            </SidebarSection>
          </>
        )}
      </div>

      <div className="flex shrink-0 flex-col gap-3 px-3 pt-4">
        <div className="flex items-center justify-between gap-2 rounded-[10px] px-3 py-2">
          <span className="flex items-center gap-2.5 overflow-hidden">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sidebar-hover text-xs font-bold text-white">
              {(userName || (role === 'madre' ? 'María Torres' : 'Carmen Valdivia'))
                .split(' ')
                .map((p) => p[0])
                .slice(0, 2)
                .join('')}
            </span>
            <span className="truncate text-sm font-medium text-white">
              {userName || (role === 'madre' ? 'María Torres' : 'Dra. Carmen Valdivia')}
            </span>
          </span>
          <button type="button" aria-label="Cerrar sesión" onClick={logout} className="text-[#94A3B8] hover:text-white">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
        <RoleSwitcher dark />
      </div>
    </aside>
  );
}

function SidebarSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-5 px-3">
      <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#94A3B8]">{title}</p>
      <div className="mt-1 flex flex-col gap-0.5">{children}</div>
    </div>
  );
}

function SidebarLink({ to, icon, label }: { to: string; icon: ReactNode; label: string }) {
  const location = useLocation();
  const [toPath, toQuery] = to.split('?');
  const isActive = toQuery
    ? location.pathname === toPath && location.search === `?${toQuery}`
    : location.pathname.startsWith(toPath) && !location.search;

  return (
    <Link
      to={to}
      className={`flex min-h-[38px] items-center gap-2.5 truncate rounded-[10px] px-3 text-[13px] transition-colors ${
        isActive ? 'bg-sidebar-active text-white' : 'text-[#CBD5E1] hover:bg-sidebar-hover hover:text-white'
      }`}
    >
      {icon}
      <span className="truncate">{label}</span>
    </Link>
  );
}
