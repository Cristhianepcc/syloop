import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Logo } from '../../components/ui/Logo';

export function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-20 text-center">
      <Logo className="mb-6" />
      <p className="font-serif text-6xl font-medium text-ink">404</p>
      <h1 className="mt-3 font-serif text-2xl font-medium text-ink">No encontramos esta página</h1>
      <p className="mt-2 max-w-md text-[#475569]">
        Puede que el enlace esté mal escrito o que la página se haya movido. Volvamos a un lugar conocido.
      </p>
      <Link to="/" className="mt-6">
        <Button variant="primary">Ir al inicio</Button>
      </Link>
    </div>
  );
}
