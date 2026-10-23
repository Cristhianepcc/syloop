import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { safeStorage } from './safeStorage';
import { documents as initialDocuments } from '../data/documents';
import { leads as initialLeads, validationQueue as initialValidationQueue } from '../data/lawyerDesk';
import { boardQuestions as initialBoardQuestions } from '../data/board';
import { myLawyer } from '../data/lawyers';
import type {
  BoardQuestion,
  ChatMessage,
  DocumentItem,
  Lead,
  LawyerProfileDraft,
  Role,
  ValidationDoc,
} from '../types';

const initialLawyerProfile: LawyerProfileDraft = {
  bio: myLawyer.bio,
  district: myLawyer.district,
  modalidad: myLawyer.modalidad,
  specialties: myLawyer.specialties,
  languages: myLawyer.languages,
  pricePerHito: myLawyer.pricePerHito,
  responseHours: 2,
  listed: true,
  acceptingClients: true,
};

interface AppState {
  role: Role;
  setRole: (role: Role) => void;

  loggedIn: boolean;
  userName: string;
  login: (name: string, role: Role) => void;
  logout: () => void;

  cejSyncedLabel: string;
  markCejSynced: () => void;

  recommendedActionsOpen: boolean;
  toggleRecommendedActions: () => void;

  documents: DocumentItem[];
  addDocument: (doc: DocumentItem) => void;
  setDocumentStatus: (id: string, status: DocumentItem['status'], validatedBy?: string) => void;

  bankImported: boolean;
  importBankStatement: () => void;

  chatMessages: ChatMessage[];
  addChatMessage: (msg: ChatMessage) => void;

  lawyerChatMessages: ChatMessage[];
  addLawyerChatMessage: (msg: ChatMessage) => void;

  compareIds: string[];
  toggleCompare: (id: string) => void;
  requestedIds: string[];
  toggleRequest: (id: string) => void;

  leads: Lead[];
  setLeadStatus: (id: string, status: Lead['status']) => void;

  validationQueue: ValidationDoc[];
  setValidationStatus: (id: string, status: ValidationDoc['status'], editedText?: string) => void;

  lawyerProfile: LawyerProfileDraft;
  saveLawyerProfile: (profile: LawyerProfileDraft) => void;

  boardQuestions: BoardQuestion[];
  addBoardQuestion: (question: string) => void;
  answerBoardQuestion: (id: string, answer: string, lawyerName: string) => void;

  resetDemo: () => void;
}

const initialPersistedState = {
  role: 'publico' as Role,
  loggedIn: false,
  userName: '',
  cejSyncedLabel: 'hace 2 horas',
  recommendedActionsOpen: false,
  documents: initialDocuments,
  bankImported: false,
  chatMessages: [] as ChatMessage[],
  lawyerChatMessages: [] as ChatMessage[],
  compareIds: [] as string[],
  requestedIds: [] as string[],
  leads: initialLeads,
  validationQueue: initialValidationQueue,
  boardQuestions: initialBoardQuestions,
  lawyerProfile: initialLawyerProfile,
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      ...initialPersistedState,

      setRole: (role) => set({ role }),

      login: (name, role) => set({ loggedIn: true, userName: name, role }),
      logout: () => set({ loggedIn: false, userName: '', role: 'publico' }),

      markCejSynced: () => set({ cejSyncedLabel: 'hace un momento' }),

      toggleRecommendedActions: () => set((s) => ({ recommendedActionsOpen: !s.recommendedActionsOpen })),

      addDocument: (doc) => set((s) => ({ documents: [doc, ...s.documents] })),
      setDocumentStatus: (id, status, validatedBy) =>
        set((s) => ({
          documents: s.documents.map((d) => (d.id === id ? { ...d, status, validatedBy } : d)),
        })),

      importBankStatement: () => set({ bankImported: true }),

      addChatMessage: (msg) => set((s) => ({ chatMessages: [...s.chatMessages, msg] })),

      addLawyerChatMessage: (msg) => set((s) => ({ lawyerChatMessages: [...s.lawyerChatMessages, msg] })),

      toggleCompare: (id) =>
        set((s) => {
          if (s.compareIds.includes(id)) {
            return { compareIds: s.compareIds.filter((c) => c !== id) };
          }
          if (s.compareIds.length >= 3) return s;
          return { compareIds: [...s.compareIds, id] };
        }),
      toggleRequest: (id) =>
        set((s) => ({
          requestedIds: s.requestedIds.includes(id)
            ? s.requestedIds.filter((r) => r !== id)
            : [...s.requestedIds, id],
        })),

      setLeadStatus: (id, status) =>
        set((s) => ({ leads: s.leads.map((l) => (l.id === id ? { ...l, status } : l)) })),

      setValidationStatus: (id, status, editedText) =>
        set((s) => ({
          validationQueue: s.validationQueue.map((v) =>
            v.id === id ? { ...v, status, aiText: editedText ?? v.aiText } : v
          ),
        })),

      saveLawyerProfile: (profile) => set({ lawyerProfile: profile }),

      addBoardQuestion: (question) =>
        set((s) => ({
          boardQuestions: [
            {
              id: `q-${Date.now()}`,
              question,
              anonName: 'Madre anónima',
              date: new Date().toLocaleDateString('es-PE'),
            },
            ...s.boardQuestions,
          ],
        })),
      answerBoardQuestion: (id, answer, lawyerName) =>
        set((s) => ({
          boardQuestions: s.boardQuestions.map((q) => (q.id === id ? { ...q, answer, lawyerName } : q)),
        })),

      resetDemo: () => set(initialPersistedState),
    }),
    {
      name: 'syloop-demo-state',
      storage: createJSONStorage(() => safeStorage),
    }
  )
);
