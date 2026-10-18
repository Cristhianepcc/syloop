import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';
import { DemoBanner } from './DemoBanner';
import type { Role } from '../../types';

export function AppLayout({ role, children }: { role: Exclude<Role, 'publico'>; children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-ink">
      <Sidebar role={role} />
      <div className="flex min-h-screen flex-1 flex-col">
        <DemoBanner />
        <main className="flex-1 overflow-y-auto bg-ink p-0 md:p-[10px]">
          <div className="min-h-full rounded-[14px] bg-canvas p-4 pb-24 sm:p-6 md:pb-6 lg:p-8">{children}</div>
        </main>
      </div>
      <MobileNav role={role} />
    </div>
  );
}
