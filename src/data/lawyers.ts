import type { District, Lawyer, LawyerProfileDraft } from '../types';

export const lawyers: Lawyer[] = [
  {
    id: 'valdivia',
    name: 'Dra. Carmen Valdivia Salas',
    initials: 'CV',
    caaNumber: 'CAA N.º 4521',
    district: 'Yanahuara',
    modalidad: 'Ambas',
    specialties: ['Pensión de alimentos', 'Conciliación'],
    casesCount: 58,
    responseTime: 'Responde en 2 h',
    rating: 4.9,
    languages: ['Español', 'Quechua'],
    pricePerHito: 225,
    hitos: 4,
    bio: 'Más de 10 años acompañando procesos de alimentos en los juzgados de Arequipa. Enfoque claro y en lenguaje sencillo para las madres.',
  },
  {
    id: 'paredes',
    name: 'Dr. Luis Paredes Zúñiga',
    initials: 'LP',
    caaNumber: 'CAA N.º 3998',
    district: 'Cercado',
    modalidad: 'Presencial',
    specialties: ['Pensión de alimentos', 'Tenencia'],
    casesCount: 41,
    responseTime: 'Responde en 4 h',
    rating: 4.7,
    languages: ['Español'],
    pricePerHito: 200,
    hitos: 4,
    bio: 'Litigante del 3° y 4° Juzgado de Paz Letrado, con seguimiento semanal del expediente hasta la sentencia.',
  },
  {
    id: 'quispe',
    name: 'Dra. Rosa Quispe Mamani',
    initials: 'RQ',
    caaNumber: 'CAA N.º 5210',
    district: 'Paucarpata',
    modalidad: 'Ambas',
    specialties: ['Pensión de alimentos', 'Violencia familiar'],
    casesCount: 73,
    responseTime: 'Responde en 1 h',
    rating: 4.8,
    languages: ['Español', 'Quechua'],
    pricePerHito: 190,
    hitos: 4,
    bio: 'Atiende en quechua y español. Prioriza casos con riesgo de violencia familiar en paralelo al proceso de alimentos.',
  },
  {
    id: 'huamani',
    name: 'Dr. Jorge Huamaní Cáceres',
    initials: 'JH',
    caaNumber: 'CAA N.º 2887',
    district: 'Cerro Colorado',
    modalidad: 'Virtual',
    specialties: ['Pensión de alimentos', 'Ejecución de sentencias'],
    casesCount: 35,
    responseTime: 'Responde en 6 h',
    rating: 4.6,
    languages: ['Español'],
    pricePerHito: 250,
    hitos: 4,
    bio: 'Especialista en ejecución y cobro de pensiones atrasadas. Modalidad 100% virtual, ideal para seguimiento remoto.',
  },
  {
    id: 'chavez',
    name: 'Dra. Milagros Chávez Begazo',
    initials: 'MC',
    caaNumber: 'CAA N.º 4690',
    district: 'J. L. Bustamante y Rivero',
    modalidad: 'Ambas',
    specialties: ['Pensión de alimentos', 'Asignación anticipada'],
    casesCount: 49,
    responseTime: 'Responde en 3 h',
    rating: 4.7,
    languages: ['Español'],
    pricePerHito: 210,
    hitos: 4,
    bio: 'Enfoque en resolver la asignación anticipada lo más rápido posible, para que la madre no espere la sentencia final.',
  },
  {
    id: 'linares',
    name: 'Dr. Renzo Linares Pinto',
    initials: 'RL',
    caaNumber: 'CAA N.º 3344',
    district: 'Cayma',
    modalidad: 'Presencial',
    specialties: ['Pensión de alimentos', 'Familia'],
    casesCount: 27,
    responseTime: 'Responde en 5 h',
    rating: 4.5,
    languages: ['Español', 'Inglés'],
    pricePerHito: 240,
    hitos: 4,
    bio: 'Acompañamiento cercano, con reuniones presenciales en Cayma y Yanahuara durante todo el proceso.',
  },
];

export const featuredLawyers = [lawyers[0], lawyers[2], lawyers[3]];

/** The lawyer whose account is signed in on the demo's "abogado" role. */
export const MY_LAWYER_ID = 'valdivia';
export const myLawyer = lawyers.find((l) => l.id === MY_LAWYER_ID)!;

export const specialtyCatalogue = [
  'Pensión de alimentos',
  'Asignación anticipada',
  'Conciliación',
  'Tenencia',
  'Régimen de visitas',
  'Ejecución de sentencias',
  'Violencia familiar',
  'Filiación',
  'Familia',
];

export const languageCatalogue = ['Español', 'Quechua', 'Aymara', 'Inglés'];

export const districtCatalogue: District[] = [
  'Cercado',
  'Yanahuara',
  'Cayma',
  'Paucarpata',
  'J. L. Bustamante y Rivero',
  'Cerro Colorado',
];

/** Applies the signed-in lawyer's saved profile edits on top of the seed record. */
export function applyProfile(lawyer: Lawyer, profile: LawyerProfileDraft): Lawyer {
  if (lawyer.id !== MY_LAWYER_ID) return lawyer;
  return {
    ...lawyer,
    bio: profile.bio,
    district: profile.district,
    modalidad: profile.modalidad,
    specialties: profile.specialties,
    languages: profile.languages,
    pricePerHito: profile.pricePerHito,
    responseTime: `Responde en ${profile.responseHours} h`,
  };
}
