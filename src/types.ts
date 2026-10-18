export type Role = 'publico' | 'madre' | 'abogado';

export type District =
  | 'Cercado'
  | 'Yanahuara'
  | 'Cayma'
  | 'Paucarpata'
  | 'J. L. Bustamante y Rivero'
  | 'Cerro Colorado';

export type Modalidad = 'Presencial' | 'Virtual' | 'Ambas';

export interface Lawyer {
  id: string;
  name: string;
  initials: string;
  caaNumber: string;
  district: District;
  modalidad: Modalidad;
  specialties: string[];
  casesCount: number;
  responseTime: string;
  rating: number;
  languages: string[];
  pricePerHito: number;
  hitos: number;
  bio: string;
}

export type StageStatus = 'completado' | 'en-curso' | 'atencion' | 'proximo' | 'pendiente';

export interface RouteStage {
  id: string;
  order: number;
  title: string;
  status: StageStatus;
  description: string;
  dateLabel: string;
  facts: string[];
  estimates: string[];
}

export type DocCategory = 'Demanda' | 'Resolución' | 'Cédula' | 'Acta' | 'Partida' | 'Constancia';

export interface DocumentItem {
  id: string;
  name: string;
  category: DocCategory;
  date: string;
  summary: string;
  keyPoints: string[];
  status: 'validado' | 'pendiente';
  validatedBy?: string;
}

export interface PensionMonth {
  month: string;
  paid: number;
  due: number;
  owed: number;
}

export interface ExpenseReceipt {
  description: string;
  amount: number;
  date: string;
}

export interface ExpenseCategory {
  category: string;
  amount: number;
  receipts: ExpenseReceipt[];
}

export type CalendarStatus = 'pagado' | 'parcial' | 'atrasado' | 'sin-verificar' | 'proximo';

export interface CalendarMonth {
  month: string;
  status: CalendarStatus;
  amount: number;
}

export interface BankDeposit {
  date: string;
  amount: number;
  description: string;
  ignored?: boolean;
}

export type ChatStyle = 'breve' | 'paso-a-paso' | 'detallada';

export interface SuggestedQuestion {
  id: string;
  question: string;
  answers: Record<ChatStyle, string>;
  sources?: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  pendingReview?: boolean;
  sources?: string[];
}

export interface RecommendedAction {
  id: string;
  text: string;
  to: string;
}

export interface Lead {
  id: string;
  motherName: string;
  summary: string;
  district: District;
  status: 'nuevo' | 'aceptado' | 'presupuestado';
}

export interface BoardQuestion {
  id: string;
  question: string;
  anonName: string;
  answer?: string;
  lawyerName?: string;
  date: string;
}

export interface ValidationDoc {
  id: string;
  title: string;
  clientName: string;
  aiText: string;
  flags: string[];
  status: 'pendiente' | 'aprobado' | 'rechazado' | 'corrigiendo';
}

export type MilestoneStatus = 'liberado' | 'verificando' | 'custodia';

export interface CaseMilestone {
  caseId: string;
  clientName: string;
  status: MilestoneStatus;
  amount: number;
}

export interface ActiveCase {
  id: string;
  clientName: string;
  stage: string;
  district: District;
  nextHearing?: string;
}
