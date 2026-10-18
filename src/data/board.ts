import type { BoardQuestion } from '../types';

export const boardQuestions: BoardQuestion[] = [
  {
    id: 'q1',
    question: '¿El padre puede pedir rebajar la pensión si cambia de trabajo?',
    anonName: 'Madre anónima · Cayma',
    answer:
      'Sí, puede pedir una reducción, pero debe demostrar el cambio de ingresos ante el juzgado. La pensión vigente se mantiene hasta que haya una nueva resolución.',
    lawyerName: 'Dra. Carmen Valdivia Salas',
    date: '14/10/2026',
  },
  {
    id: 'q2',
    question: '¿Hasta qué edad se paga la pensión de alimentos?',
    anonName: 'Madre anónima · Paucarpata',
    answer:
      'La obligación dura hasta los 18 años, salvo que el hijo siga estudios superiores de forma exitosa, en cuyo caso puede extenderse hasta los 28 años.',
    lawyerName: 'Dr. Jorge Huamaní Cáceres',
    date: '12/10/2026',
  },
  {
    id: 'q3',
    question: '¿Puedo pedir pensión si no estuvimos casados?',
    anonName: 'Madre anónima · Cerro Colorado',
    date: '16/10/2026',
  },
];
