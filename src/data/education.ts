import type { EducationalVideo, EmpathyRating } from '../types';

export const educationalVideos: EducationalVideo[] = [
  {
    id: 'vid-1',
    title: '¿Qué es la asignación anticipada?',
    lawyerName: 'Dra. Carmen Valdivia Salas',
    duration: '3:12',
    topic: 'Asignación anticipada',
    views: 842,
  },
  {
    id: 'vid-2',
    title: 'Cómo leer una resolución judicial sin asustarte',
    lawyerName: 'Dr. Luis Paredes Zúñiga',
    duration: '4:05',
    topic: 'Lectura de expedientes',
    views: 613,
  },
  {
    id: 'vid-3',
    title: 'Qué hacer si el padre deja de pagar la pensión',
    lawyerName: 'Dra. Rosa Quispe Mamani',
    duration: '2:47',
    topic: 'Pensiones atrasadas',
    views: 1024,
  },
];

export const lawyerEmpathyRatings: EmpathyRating[] = [
  { label: 'Empatía', value: 4.9 },
  { label: 'Claridad', value: 4.8 },
  { label: 'Resultados', value: 4.7 },
];
