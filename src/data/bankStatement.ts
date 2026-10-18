import type { BankDeposit } from '../types';

export const bankStatementDeposits: BankDeposit[] = [
  { date: '15/08/2026', amount: 800, description: 'Depósito — Banco de la Nación' },
  { date: '22/09/2026', amount: 500, description: 'Depósito — Banco de la Nación' },
  { date: '30/09/2026', amount: 3.5, description: 'Comisión de mantenimiento', ignored: true },
];
