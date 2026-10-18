import { HashRouter, Routes, Route } from 'react-router-dom';
import { PublicLayout } from './components/layout/PublicLayout';
import { AppLayout } from './components/layout/AppLayout';
import { Landing } from './pages/public/Landing';
import { Login } from './pages/public/Login';
import { NotFound } from './pages/public/NotFound';
import { Panel } from './pages/mother/Panel';
import { Ruta } from './pages/mother/Ruta';
import { Asistente } from './pages/mother/Asistente';
import { Expediente } from './pages/mother/Expediente';
import { Gastos } from './pages/mother/Gastos';
import { Marketplace } from './pages/mother/Marketplace';
import { CommandCenter } from './pages/lawyer/CommandCenter';
import { Leads } from './pages/lawyer/Leads';
import { Validation } from './pages/lawyer/Validation';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<PublicLayout><Landing /></PublicLayout>} />
        <Route path="/ingresar" element={<PublicLayout><Login /></PublicLayout>} />
        <Route path="/abogados" element={<AppLayout role="madre"><Marketplace /></AppLayout>} />

        <Route path="/madre/panel" element={<AppLayout role="madre"><Panel /></AppLayout>} />
        <Route path="/madre/ruta" element={<AppLayout role="madre"><Ruta /></AppLayout>} />
        <Route path="/madre/asistente" element={<AppLayout role="madre"><Asistente /></AppLayout>} />
        <Route path="/madre/expediente" element={<AppLayout role="madre"><Expediente /></AppLayout>} />
        <Route path="/madre/gastos" element={<AppLayout role="madre"><Gastos /></AppLayout>} />

        <Route path="/abogado" element={<AppLayout role="abogado"><CommandCenter /></AppLayout>} />
        <Route path="/abogado/adquisicion" element={<AppLayout role="abogado"><Leads /></AppLayout>} />
        <Route path="/abogado/validacion" element={<AppLayout role="abogado"><Validation /></AppLayout>} />

        <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
      </Routes>
    </HashRouter>
  );
}
