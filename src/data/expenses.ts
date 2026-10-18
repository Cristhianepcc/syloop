import type { ExpenseCategory } from '../types';

export const expenseCategories: ExpenseCategory[] = [
  {
    category: 'Alimentación',
    amount: 500,
    receipts: [
      { description: 'Mercado Central — víveres del mes', amount: 320, date: '03/10/2026' },
      { description: 'Suplemento nutricional', amount: 180, date: '12/10/2026' },
    ],
  },
  {
    category: 'Educación',
    amount: 350,
    receipts: [
      { description: 'Pensión I.E.I. Los Volcanes', amount: 280, date: '05/10/2026' },
      { description: 'Materiales escolares', amount: 70, date: '08/10/2026' },
    ],
  },
  {
    category: 'Salud',
    amount: 200,
    receipts: [{ description: 'Consulta pediátrica + vacunas', amount: 200, date: '14/10/2026' }],
  },
  {
    category: 'Vestimenta',
    amount: 150,
    receipts: [{ description: 'Ropa de temporada', amount: 150, date: '09/10/2026' }],
  },
  {
    category: 'Transporte',
    amount: 120,
    receipts: [{ description: 'Movilidad escolar', amount: 120, date: '01/10/2026' }],
  },
  {
    category: 'Recreación',
    amount: 80,
    receipts: [{ description: 'Actividades de fin de semana', amount: 80, date: '11/10/2026' }],
  },
];

export const totalMonthlyExpense = expenseCategories.reduce((sum, c) => sum + c.amount, 0);
