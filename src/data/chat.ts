import type { SuggestedQuestion } from '../types';

export const suggestedQuestions: SuggestedQuestion[] = [
  {
    id: 'rebeldia',
    question: '¿Qué pasa si el padre no contesta la demanda?',
    answers: {
      breve: 'Si no contesta en el plazo, el juzgado puede declararlo en rebeldía y seguir el proceso igual, dando por ciertos los hechos de la demanda.',
      'paso-a-paso':
        '1. El demandado tiene 10 días útiles desde la notificación para contestar.\n2. Si no contesta, cualquiera de las partes puede pedir que se le declare en rebeldía.\n3. El juzgado puede presumir como ciertos los hechos de la demanda, salvo prueba en contrario.\n4. El proceso continúa hacia la audiencia única sin esperar más.',
      detallada:
        'La declaración de rebeldía está prevista para los procesos sumarísimos, que es la vía en la que normalmente se tramitan los alimentos. Si el demandado no contesta dentro del plazo, el juez puede declararlo rebelde y aplicar la presunción relativa de verdad sobre los hechos expuestos en la demanda, sin perjuicio de que se siga evaluando la prueba ofrecida. Esto no significa que se gane automáticamente: el juez igual valora la prueba documental y puede pedir actuaciones adicionales antes de resolver.',
    },
    sources: ['Código Procesal Civil, art. 458 y 461', 'Expediente 01234-2026 — Resolución N.º 1'],
  },
  {
    id: 'tiempo-audiencia',
    question: '¿Cuánto falta para la audiencia?',
    answers: {
      breve: 'Tu audiencia única está programada para el 10 de noviembre de 2026 a las 9:00 a.m.',
      'paso-a-paso':
        '1. La audiencia única fue fijada en la Resolución N.º 3.\n2. Está programada para el 10 de noviembre de 2026, 9:00 a.m.\n3. En esa fecha se intentará la conciliación, se recibirá la contestación y se actuarán las pruebas.\n4. Si no hay conciliación, el juzgado queda expedito para sentenciar.',
      detallada:
        'Según la Resolución N.º 3 del expediente 01234-2026, la audiencia única está programada para el 10 de noviembre de 2026 a las 9:00 a.m. en el 3° Juzgado de Paz Letrado de Arequipa. En esta audiencia se desarrollan tres etapas en una sola sesión: conciliación, saneamiento y contestación de la demanda, y actuación de pruebas. Si no se llega a un acuerdo conciliatorio, el expediente queda listo para que el juzgado emita sentencia en los días u.tiles siguientes.',
    },
    sources: ['Expediente 01234-2026 — Resolución N.º 3', 'CEJ — Consulta de expedientes judiciales'],
  },
  {
    id: 'asignacion-anticipada',
    question: '¿Puedo pedir una pensión mientras dura el proceso?',
    answers: {
      breve: 'Sí, se llama asignación anticipada. Ya está solicitada; solo falta subir una constancia de ingresos para que el juzgado la resuelva.',
      'paso-a-paso':
        '1. La asignación anticipada es una pensión provisional mientras dura el proceso.\n2. Ya fue solicitada en tu expediente.\n3. El juzgado pidió una constancia de ingresos actualizada en la Resolución N.º 2.\n4. Una vez subida la constancia, el juzgado resuelve en pocos días.',
      detallada:
        'La asignación anticipada de alimentos permite que el juzgado fije un monto provisional antes de la sentencia, cuando existe prueba indiciaria del vínculo y la necesidad del menor. En tu expediente ya se presentó esta solicitud, y mediante la Resolución N.º 2 el juzgado requirió una constancia de ingresos actualizada de la demandante para resolver con mejores elementos. Subir ese documento en la sección de expediente permite que tu abogada lo adjunte formalmente y acelera la resolución del pedido.',
    },
    sources: ['Código Procesal Civil, art. 675', 'Expediente 01234-2026 — Resolución N.º 2'],
  },
];

export const genericAssistantAnswer =
  'Esta consulta necesita revisión de un caso específico. Tu pregunta fue registrada y un abogado la va a revisar antes de responderte con seguridad.';
