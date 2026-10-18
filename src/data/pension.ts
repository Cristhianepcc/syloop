import type { PensionMonth } from '../types';

export const pensionByMonth: PensionMonth[] = [
  { month: 'Ago', paid: 800, due: 800, owed: 0 },
  { month: 'Set', paid: 500, due: 800, owed: 300 },
  { month: 'Oct', paid: 0, due: 800, owed: 800 },
  { month: 'Nov', paid: 0, due: 800, owed: 0 },
  { month: 'Dic', paid: 0, due: 800, owed: 0 },
];

export const totalPendiente = pensionByMonth.reduce((sum, m) => sum + m.owed, 0);
