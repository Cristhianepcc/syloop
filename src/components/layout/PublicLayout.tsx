import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircleQuestion } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';
import { DemoBanner } from './DemoBanner';

const navLinks = [
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Pizarra de consultas', href: '#pizarra' },
  { label: 'Seguridad', href: '#seguridad' },
  { label: 'Abogados', to: '/abogados' },
];

export function PublicLayout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const onLanding = location.pathname === '/';

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <DemoBanner />
      <header className="sticky top-0 z-40 border-b border-[#E2E8F0] bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="shrink-0">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) =>
              link.to ? (
                <Link key={link.label} to={link.to} className="text-sm font-medium text-[#334155] hover:text-ink">
                  {link.label}
                </Link>
              ) : onLanding ? (
                <a key={link.label} href={link.href} className="text-sm font-medium text-[#334155] hover:text-ink">
                  {link.label}
                </a>
              ) : (
                <Link key={link.label} to={`/${link.href}`} className="text-sm font-medium text-[#334155] hover:text-ink">
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link to="/ingresar">
              <Button variant="ghost" size="sm">
                Ingresar
              </Button>
            </Link>
            <Link to="/ingresar">
              <Button variant="primary" size="sm">
                Comenzar gratis
              </Button>
            </Link>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-[10px] text-ink lg:hidden"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-[#E2E8F0] bg-white px-4 py-4 lg:hidden">
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) =>
                link.to ? (
                  <Link key={link.label} to={link.to} className="py-2 text-sm font-medium text-[#334155]" onClick={() => setMenuOpen(false)}>
                    {link.label}
                  </Link>
                ) : (
                  <a key={link.label} href={onLanding ? link.href : `/${link.href}`} className="py-2 text-sm font-medium text-[#334155]" onClick={() => setMenuOpen(false)}>
                    {link.label}
                  </a>
                )
              )}
              <div className="mt-2 flex flex-col gap-2">
                <Link to="/ingresar">
                  <Button variant="secondary" className="w-full">
                    Ingresar
                  </Button>
                </Link>
                <Link to="/ingresar">
                  <Button variant="primary" className="w-full">
                    Comenzar gratis
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <Footer />

      <Link
        to="/madre/asistente"
        className="fixed bottom-5 right-5 z-30 flex min-h-[44px] items-center gap-2 rounded-full bg-ink px-4 text-sm font-semibold text-white shadow-lg hover:bg-[#15202E]"
      >
        <MessageCircleQuestion className="h-4 w-4" />
        ¿Dudas? Pregúntame
      </Link>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#E2E8F0] bg-canvas">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <Logo />
          <p className="mt-3 text-sm text-[#475569]">Devolvemos el tiempo a la justicia.</p>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.1em] text-link">Producto</h2>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-[#475569]">
            <li><a href="#como-funciona">Cómo funciona</a></li>
            <li><Link to="/abogados">Abogados</Link></li>
            <li><a href="#pizarra">Pizarra de consultas</a></li>
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.1em] text-link">Confianza</h2>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-[#475569]">
            <li><a href="#seguridad">Seguridad</a></li>
            <li>Supervisión humana</li>
            <li>Colegio de Abogados de Arequipa</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.1em] text-link">Syloop</h2>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-[#475569]">
            <li>Arequipa, Perú</li>
            <li>Demo pública · datos ficticios</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#E2E8F0] px-4 py-4 text-center text-xs text-[#475569] sm:px-6">
        © 2026 Syloop. Demo con datos ficticios · no ingreses información real.
      </div>
    </footer>
  );
}
