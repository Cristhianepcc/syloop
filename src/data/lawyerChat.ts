import type { SuggestedQuestion } from '../types';

export const lawyerSuggestedQuestions: SuggestedQuestion[] = [
  {
    id: 'plazo-contestacion',
    question: '¿Cuál es el plazo para que el demandado conteste la demanda?',
    answers: {
      breve: 'En los procesos sumarísimos de alimentos, el demandado tiene 5 días hábiles desde la notificación para contestar la demanda.',
      'paso-a-paso':
        '1. La demanda de alimentos se tramita como proceso sumarísimo.\n2. El plazo para contestar es de 5 días hábiles desde la notificación válida.\n3. Si no contesta, puedes pedir que se le declare en rebeldía.\n4. El expediente sigue hacia la audiencia única sin esperar más.',
      detallada:
        'El artículo 554 del Código Procesal Civil establece que en los procesos sumarísimos —vía en la que se tramitan los alimentos— el plazo para contestar la demanda es de 5 días hábiles contados desde la notificación. Vencido el plazo sin contestación, corresponde evaluar la declaración de rebeldía conforme al artículo 458, sin perjuicio de que el juzgado siga valorando la prueba documental ofrecida.',
    },
    sources: ['Código Procesal Civil, art. 554 y 458'],
  },
  {
    id: 'escrito-prorroga',
    question: 'Redacta un escrito solicitando reprogramación de audiencia',
    answers: {
      breve: 'Genera un borrador con los datos del expediente y el motivo de la reprogramación en el generador de escritos de la derecha.',
      'paso-a-paso':
        '1. Indica el número de expediente y el motivo de la reprogramación.\n2. El borrador cita el artículo que faculta pedir reprogramación por causa justificada.\n3. Elige el caso en el generador de escritos y descarga el PDF.\n4. Revisa el texto final antes de presentarlo en el CEJ.',
      detallada:
        'La reprogramación de audiencia por causa justificada está prevista en el artículo 203 del Código Procesal Civil, aplicable supletoriamente a los procesos sumarísimos. El escrito debe sustentar la imposibilidad de asistir con un medio probatorio mínimo (certificado médico, constancia laboral, etc.) y solicitar expresamente nueva fecha. Usa el generador de escritos de la derecha: la IA prellena el formato, pero el contenido final queda sujeto a tu revisión antes de presentarlo.',
    },
    sources: ['Código Procesal Civil, art. 203', 'Plantilla Syloop — Reprogramación de audiencia'],
  },
  {
    id: 'resumen-caso',
    question: 'Resume el estado del expediente de Yolanda Ramírez',
    answers: {
      breve: 'Caso de asignación anticipada en Paucarpata: ya se solicitó la pensión provisional; el juzgado pidió una constancia de ingresos actualizada para resolver.',
      'paso-a-paso':
        '1. Expediente exp-02211, etapa: Asignación anticipada.\n2. Se pidió pensión provisional por mora de 3 meses del demandado.\n3. El juzgado requirió constancia de ingresos actualizada de la demandante.\n4. Pendiente: subir el documento para que el juzgado resuelva.',
      detallada:
        'El expediente exp-02211 de Yolanda Ramírez se encuentra en etapa de asignación anticipada. Se sustentó la urgencia con la falta de aportes del demandado durante 3 meses. El juzgado, mediante resolución, solicitó una constancia de ingresos actualizada de la demandante como elemento adicional antes de resolver el pedido. Una vez presentado ese documento, corresponde hacer seguimiento al despacho para la resolución.',
    },
    sources: ['Expediente 02211-2026', 'Resolución pendiente de constancia de ingresos'],
  },
  {
    id: 'jurisprudencia-asignacion',
    question: '¿Qué jurisprudencia respalda un pedido de asignación anticipada por mora?',
    answers: {
      breve: 'Basta la acreditación indiciaria del vínculo y la necesidad del menor para conceder la asignación anticipada; la mora en los aportes refuerza la urgencia.',
      'paso-a-paso':
        '1. La asignación anticipada no exige prueba plena, solo indicios razonables.\n2. La mora de varios meses en los aportes es un indicio fuerte de urgencia.\n3. Cita el artículo 675 del CPC en el escrito.\n4. Acompaña los documentos que acrediten la falta de pago (constancia bancaria, etc.).',
      detallada:
        'Conforme al artículo 675 del Código Procesal Civil y a criterios reiterados en casaciones sobre asignación anticipada, el juzgado puede conceder la pensión provisional con prueba indiciaria del vínculo filial y la necesidad del menor, sin requerir un proceso probatorio pleno. La falta de aportes acreditada por varios meses consecutivos constituye un indicio relevante de la urgencia que sustenta el pedido. Se recomienda acompañar constancias bancarias o declaraciones que evidencien la mora.',
    },
    sources: ['Código Procesal Civil, art. 675', 'Casación N.º 4642-2015 Lima (referencial)'],
  },
];

export const genericLawyerAssistantAnswer =
  'Esta consulta requiere revisar documentos específicos del expediente. Quedó registrada para que la verifiques con la información completa del caso antes de usarla.';
