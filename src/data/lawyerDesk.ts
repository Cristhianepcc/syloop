import type { ActiveCase, CaseMilestone, Lead, ValidationDoc } from '../types';

export const leads: Lead[] = [
  {
    id: 'lead-1',
    motherName: 'Yolanda Ramírez',
    summary: 'Pensión de alimentos para dos hijos (6 y 9 años), demandado con RUC propio en Paucarpata.',
    district: 'Paucarpata',
    status: 'nuevo',
  },
  {
    id: 'lead-2',
    motherName: 'Fiorella Cutipa',
    summary: 'Necesita asignación anticipada urgente, el padre dejó de aportar hace 3 meses.',
    district: 'Cercado',
    status: 'nuevo',
  },
  {
    id: 'lead-3',
    motherName: 'Deysi Apaza',
    summary: 'Primera demanda de alimentos, aún no tiene abogado, consulta por modalidad virtual.',
    district: 'Cerro Colorado',
    status: 'nuevo',
  },
];

export const validationQueue: ValidationDoc[] = [
  {
    id: 'val-1',
    title: 'Resumen de audiencia — caso Torres',
    clientName: 'María Torres',
    aiText:
      'En la audiencia del 10 de noviembre de 2026 se intentará la conciliación entre las partes. De no llegar a acuerdo, se recibirá la contestación del demandado y se actuarán las pruebas ofrecidas por ambas partes. Se recomienda a la demandante llevar los comprobantes de gastos actualizados de Mateo.',
    flags: ['Verificar monto de pensión propuesto antes de enviar'],
    status: 'pendiente',
  },
  {
    id: 'val-2',
    title: 'Propuesta de conciliación — caso Ramírez',
    clientName: 'Yolanda Ramírez',
    aiText:
      'Se propone una pensión mensual de S/ 620 para los dos hijos, calculada como el 40% del ingreso declarado del demandado. Este monto está sujeto a revisión según los gastos reales acreditados.',
    flags: ['Confirmar ingreso declarado del demandado', 'Validar número de hijos en la fórmula'],
    status: 'pendiente',
  },
  {
    id: 'val-3',
    title: 'Explicación de etapa — caso Cutipa',
    clientName: 'Fiorella Cutipa',
    aiText:
      'La asignación anticipada es una pensión provisional que el juzgado puede fijar antes de la sentencia final, cuando hay urgencia acreditada. En este caso, la falta de aportes durante 3 meses puede sustentar el pedido de urgencia.',
    flags: [],
    status: 'pendiente',
  },
];

export const caseMilestones: CaseMilestone[] = [
  { caseId: 'exp-01234', clientName: 'María Torres', status: 'custodia', amount: 225 },
  { caseId: 'exp-02211', clientName: 'Yolanda Ramírez', status: 'verificando', amount: 200 },
  { caseId: 'exp-03087', clientName: 'Deysi Apaza', status: 'liberado', amount: 190 },
  { caseId: 'exp-04456', clientName: 'Fiorella Cutipa', status: 'custodia', amount: 225 },
  { caseId: 'exp-05129', clientName: 'Katherine Flores', status: 'verificando', amount: 200 },
  { caseId: 'exp-06302', clientName: 'Noemí Huillca', status: 'liberado', amount: 190 },
];

export const activeCases: ActiveCase[] = [
  { id: 'exp-01234', clientName: 'María Torres', stage: 'Audiencia única', district: 'Cercado', nextHearing: '10/11/2026' },
  { id: 'exp-02211', clientName: 'Yolanda Ramírez', stage: 'Asignación anticipada', district: 'Paucarpata' },
  { id: 'exp-03087', clientName: 'Deysi Apaza', stage: 'Notificación', district: 'Cerro Colorado' },
  { id: 'exp-04456', clientName: 'Fiorella Cutipa', stage: 'Demanda admitida', district: 'Cercado' },
  { id: 'exp-05129', clientName: 'Katherine Flores', stage: 'Audiencia única', district: 'Yanahuara', nextHearing: '22/10/2026' },
  { id: 'exp-06302', clientName: 'Noemí Huillca', stage: 'Sentencia', district: 'Cayma' },
];

export const activeCasesCount = 24;

export const custodyByMonth = [
  { month: 'May', value: 4200, peer: 3800 },
  { month: 'Jun', value: 5100, peer: 4300 },
  { month: 'Jul', value: 5800, peer: 4900 },
  { month: 'Ago', value: 6300, peer: 5200 },
  { month: 'Set', value: 6840, peer: 5600 },
  { month: 'Oct', value: 6840, peer: 5900 },
];

export const custodyFullYear2026 = [
  { month: 'Ene', value: 2100, peer: 2400 },
  { month: 'Feb', value: 2600, peer: 2700 },
  { month: 'Mar', value: 3100, peer: 3000 },
  { month: 'Abr', value: 3400, peer: 3200 },
  { month: 'May', value: 4200, peer: 3800 },
  { month: 'Jun', value: 5100, peer: 4300 },
  { month: 'Jul', value: 5800, peer: 4900 },
  { month: 'Ago', value: 6300, peer: 5200 },
  { month: 'Set', value: 6840, peer: 5600 },
  { month: 'Oct', value: 6840, peer: 5900 },
  { month: 'Nov', value: 7200, peer: 6100 },
  { month: 'Dic', value: 7600, peer: 6400 },
];

export const casesByStage = [
  { stage: 'Demanda', mine: 3, peer: 4, subsanacion: 0 },
  { stage: 'Notificación', mine: 4, peer: 3, subsanacion: 1 },
  { stage: 'Asignación', mine: 5, peer: 4, subsanacion: 2 },
  { stage: 'Audiencia', mine: 7, peer: 6, subsanacion: 0 },
  { stage: 'Sentencia', mine: 3, peer: 5, subsanacion: 0 },
  { stage: 'Ejecución', mine: 2, peer: 3, subsanacion: 1 },
];
