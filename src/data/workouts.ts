export type Exercise = {
  id: string;
  name: string;
  shortName: string;
  equipment: string;
  target: string;
  sets: number;
  reps: string;
  seconds: number;
  image: string;
  gif: string;
  instructions: readonly string[];
  loadGuide?: {
    start: string;
    afterMonth: string;
  };
};

export type Workout = {
  id: string;
  day: string;
  title: string;
  focus: string;
  duration: number;
  calories: number;
  intensity: 'Moderado' | 'Intenso' | 'Recuperación';
  exerciseIds: readonly string[];
};

export const exercises: readonly Exercise[] = [
  {
    id: '0289',
    name: 'dumbbell bench press',
    shortName: 'Press con mancuernas',
    equipment: 'Banco + mancuernas',
    target: 'Pecho',
    sets: 4,
    reps: '8–12',
    seconds: 45,
    image: '/media/0289-SpYC0Kp.jpg',
    gif: '/media/0289-SpYC0Kp.gif',
    loadGuide: { start: '2 × 6 kg', afterMonth: '2 × 8 kg' },
    instructions: [
      'Acuéstate con los pies firmes en el suelo.',
      'Baja las mancuernas con control hasta el pecho.',
      'Empuja hacia arriba sin despegar los hombros del banco.',
    ],
  },
  {
    id: '0405',
    name: 'dumbbell seated shoulder press',
    shortName: 'Press de hombro sentado',
    equipment: 'Banco + mancuernas',
    target: 'Hombros',
    sets: 3,
    reps: '8–12',
    seconds: 40,
    image: '/media/0405-znQUdHY.jpg',
    gif: '/media/0405-znQUdHY.gif',
    loadGuide: { start: '2 × 4 kg', afterMonth: '2 × 6 kg' },
    instructions: [
      'Ajusta el respaldo casi vertical.',
      'Mantén abdomen y glúteos firmes.',
      'Empuja sin bloquear los codos.',
    ],
  },
  {
    id: '2188',
    name: 'dumbbell seated triceps extension',
    shortName: 'Extensión de tríceps',
    equipment: 'Mancuerna',
    target: 'Tríceps',
    sets: 3,
    reps: '10–15',
    seconds: 35,
    image: '/media/2188-kont8Ut.jpg',
    gif: '/media/2188-kont8Ut.gif',
    loadGuide: { start: '6 kg total', afterMonth: '8 kg total' },
    instructions: [
      'Sujeta una mancuerna detrás de la cabeza.',
      'Mantén los codos apuntando al frente.',
      'Extiende con control y baja lentamente.',
    ],
  },
  {
    id: '1459',
    name: 'dumbbell romanian deadlift',
    shortName: 'Peso muerto rumano',
    equipment: 'Mancuernas',
    target: 'Femoral y glúteo',
    sets: 4,
    reps: '8–12',
    seconds: 45,
    image: '/media/1459-rR0LJzx.jpg',
    gif: '/media/1459-rR0LJzx.gif',
    loadGuide: { start: '2 × 8 kg', afterMonth: '2 × 12 kg' },
    instructions: [
      'Lleva la cadera hacia atrás con espalda neutra.',
      'Mantén las mancuernas cerca de las piernas.',
      'Sube apretando glúteos, sin hiperextender.',
    ],
  },
  {
    id: '1760',
    name: 'dumbbell goblet squat',
    shortName: 'Sentadilla goblet',
    equipment: 'Mancuerna',
    target: 'Pierna completa',
    sets: 4,
    reps: '10–15',
    seconds: 45,
    image: '/media/1760-yn8yg1r.jpg',
    gif: '/media/1760-yn8yg1r.gif',
    loadGuide: { start: '10 kg total', afterMonth: '14 kg total' },
    instructions: [
      'Sujeta la mancuerna frente al pecho.',
      'Baja entre las caderas con rodillas alineadas.',
      'Empuja el suelo y termina erguido.',
    ],
  },
  {
    id: '0336',
    name: 'dumbbell lunge',
    shortName: 'Zancadas con mancuernas',
    equipment: 'Mancuernas',
    target: 'Cuádriceps y glúteo',
    sets: 3,
    reps: '10 / lado',
    seconds: 40,
    image: '/media/0336-RRWFUcw.jpg',
    gif: '/media/0336-RRWFUcw.gif',
    loadGuide: { start: '2 × 4 kg', afterMonth: '2 × 6 kg' },
    instructions: [
      'Da un paso suficientemente largo.',
      'Baja ambas rodillas manteniendo el torso erguido.',
      'Regresa empujando con el pie delantero.',
    ],
  },
  {
    id: '0293',
    name: 'dumbbell bent over row',
    shortName: 'Remo inclinado',
    equipment: 'Mancuernas',
    target: 'Espalda',
    sets: 4,
    reps: '8–12',
    seconds: 45,
    image: '/media/0293-BJ0Hz5L.jpg',
    gif: '/media/0293-BJ0Hz5L.gif',
    loadGuide: { start: '2 × 6 kg', afterMonth: '2 × 9 kg' },
    instructions: [
      'Inclina el torso con la espalda neutra.',
      'Lleva los codos hacia las caderas.',
      'Evita encoger los hombros.',
    ],
  },
  {
    id: '0294',
    name: 'dumbbell biceps curl',
    shortName: 'Curl de bíceps',
    equipment: 'Mancuernas',
    target: 'Bíceps',
    sets: 3,
    reps: '10–15',
    seconds: 35,
    image: '/media/0294-NbVPDMW.jpg',
    gif: '/media/0294-NbVPDMW.gif',
    loadGuide: { start: '2 × 3 kg', afterMonth: '2 × 5 kg' },
    instructions: [
      'Mantén los codos junto al torso.',
      'Sube sin balancear el cuerpo.',
      'Baja en dos o tres segundos.',
    ],
  },
  {
    id: '0857',
    name: 'wheel rollerout',
    shortName: 'Rueda abdominal',
    equipment: 'Rueda abdominal',
    target: 'Core',
    sets: 3,
    reps: '6–12',
    seconds: 35,
    image: '/media/0857-NAgVB3t.jpg',
    gif: '/media/0857-NAgVB3t.gif',
    instructions: [
      'Empieza de rodillas con la pelvis neutra.',
      'Avanza solo hasta mantener control lumbar.',
      'Regresa contrayendo el abdomen.',
    ],
  },
  {
    id: '0872',
    name: 'reverse crunch',
    shortName: 'Crunch inverso',
    equipment: 'Peso corporal',
    target: 'Abdomen y control pélvico',
    sets: 3,
    reps: '10–15',
    seconds: 40,
    image: '/media/0872-nCU1Ekp.jpg',
    gif: '/media/0872-nCU1Ekp.gif',
    instructions: [
      'Acuéstate con las rodillas flexionadas y la espalda baja apoyada.',
      'Acerca las rodillas al pecho levantando suavemente la pelvis.',
      'Baja despacio, sin balancear las piernas ni arquear la espalda.',
    ],
  },
  {
    id: '0276',
    name: 'dead bug',
    shortName: 'Dead bug',
    equipment: 'Peso corporal',
    target: 'Core profundo',
    sets: 3,
    reps: '8–12 / lado',
    seconds: 40,
    image: '/media/0276-iny3m5y.jpg',
    gif: '/media/0276-iny3m5y.gif',
    instructions: [
      'Presiona suavemente la espalda baja contra el suelo.',
      'Extiende brazo y pierna contrarios sin perder esa posición.',
      'Regresa con control, exhala y alterna el lado.',
    ],
  },
  {
    id: '3544',
    name: 'bodyweight incline side plank',
    shortName: 'Plancha lateral',
    equipment: 'Peso corporal',
    target: 'Oblicuos y estabilidad',
    sets: 3,
    reps: '20–40 s / lado',
    seconds: 35,
    image: '/media/3544-5VXmnV5.jpg',
    gif: '/media/3544-5VXmnV5.gif',
    instructions: [
      'Apoya el antebrazo y alinea hombro, cadera y pies.',
      'Eleva la cadera formando una línea recta con el cuerpo.',
      'Respira sin dejar que la cadera rote o caiga.',
    ],
  },
  {
    id: '0620',
    name: 'lying leg raise flat bench',
    shortName: 'Elevación de piernas',
    equipment: 'Banco o suelo',
    target: 'Abdomen y flexores de cadera',
    sets: 3,
    reps: '10–15',
    seconds: 40,
    image: '/media/0620-WhuFnR7.jpg',
    gif: '/media/0620-WhuFnR7.gif',
    instructions: [
      'Acuéstate y fija la espalda baja contra el banco o suelo.',
      'Eleva las piernas juntas hasta controlarlas sobre la cadera.',
      'Baja solo hasta donde puedas evitar que la espalda se arquee.',
    ],
  },
  {
    id: '0003',
    name: 'air bike',
    shortName: 'Bicicleta abdominal',
    equipment: 'Peso corporal',
    target: 'Abdomen y oblicuos',
    sets: 3,
    reps: '12–16 / lado',
    seconds: 40,
    image: '/media/0003-1ZFqTDN.jpg',
    gif: '/media/0003-1ZFqTDN.gif',
    instructions: [
      'Acuéstate con las manos detrás de la cabeza y las rodillas a 90 grados.',
      'Acerca el codo derecho a la rodilla izquierda mientras extiendes la otra pierna.',
      'Alterna los lados con control sin tirar del cuello ni arquear la espalda.',
    ],
  },
  {
    id: '0630',
    name: 'mountain climber',
    shortName: 'Escaladores',
    equipment: 'Peso corporal',
    target: 'Cardio y core',
    sets: 4,
    reps: '30–45 s',
    seconds: 40,
    image: '/media/0630-RJgzwny.jpg',
    gif: '/media/0630-RJgzwny.gif',
    instructions: [
      'Comienza en plancha alta con las manos justo debajo de los hombros.',
      'Lleva una rodilla hacia el pecho y cambia de pierna con ritmo constante.',
      'Mantén la cadera baja, el abdomen firme y aterriza suavemente.',
    ],
  },
  {
    id: '0687',
    name: 'russian twist',
    shortName: 'Giros rusos',
    equipment: 'Peso corporal',
    target: 'Abdomen y oblicuos',
    sets: 3,
    reps: '12–16 / lado',
    seconds: 40,
    image: '/media/0687-XVDdcoj.jpg',
    gif: '/media/0687-XVDdcoj.gif',
    instructions: [
      'Siéntate con las rodillas flexionadas e inclina ligeramente el torso.',
      'Mantén la espalda larga y gira el pecho hacia un lado sin mover solo los brazos.',
      'Alterna los lados con control; apoya los pies si necesitas más estabilidad.',
    ],
  },
  {
    id: '0689',
    name: 'seated leg raise',
    shortName: 'Encogimientos sentado',
    equipment: 'Banco',
    target: 'Abdomen',
    sets: 3,
    reps: '10–15',
    seconds: 40,
    image: '/media/0689-Hgs6Nl1.jpg',
    gif: '/media/0689-Hgs6Nl1.gif',
    instructions: [
      'Siéntate en el borde del banco y apoya las manos a los lados.',
      'Inclina ligeramente el torso y acerca las rodillas al pecho apretando el abdomen.',
      'Extiende las piernas con control sin perder la postura ni tocar el suelo.',
    ],
  },
  {
    id: '3007',
    name: 'resistance band leg extension',
    shortName: 'Extensión de pierna con liga',
    equipment: 'Liga de resistencia',
    target: 'Cuádriceps',
    sets: 3,
    reps: '12–15 / lado',
    seconds: 40,
    image: '/media/3007-Y1MsI1l.jpg',
    gif: '/media/3007-Y1MsI1l.gif',
    instructions: [
      'Asegura la liga a un punto firme y colócala alrededor del tobillo.',
      'Estabiliza el torso y extiende la rodilla hasta contraer el cuádriceps.',
      'Regresa lentamente, completa las repeticiones y cambia de pierna.',
    ],
  },
  {
    id: '3123',
    name: 'resistance band seated biceps curl',
    shortName: 'Curl con liga',
    equipment: 'Liga de resistencia',
    target: 'Bíceps',
    sets: 3,
    reps: '12–15',
    seconds: 35,
    image: '/media/3123-XFc3vpY.jpg',
    gif: '/media/3123-XFc3vpY.gif',
    instructions: [
      'Pisa la liga de forma simétrica.',
      'Mantén los codos estables.',
      'Controla la tensión durante todo el recorrido.',
    ],
  },
  {
    id: '0997',
    name: 'band shoulder press',
    shortName: 'Press con liga',
    equipment: 'Liga de resistencia',
    target: 'Hombros',
    sets: 3,
    reps: '12–15',
    seconds: 35,
    image: '/media/0997-peAeMR3.jpg',
    gif: '/media/0997-peAeMR3.gif',
    instructions: [
      'Pisa el centro de la liga.',
      'Lleva las manos a la altura del hombro.',
      'Empuja verticalmente manteniendo el core firme.',
    ],
  },
] as const;

export const workouts: readonly Workout[] = [
  {
    id: 'lunes',
    day: 'Lunes',
    title: 'Pecho & tríceps',
    focus: 'Fuerza superior',
    duration: 45,
    calories: 310,
    intensity: 'Intenso',
    exerciseIds: ['0289', '0405', '2188', '0857', '0872'],
  },
  {
    id: 'martes',
    day: 'Martes',
    title: 'Espalda & bíceps',
    focus: 'Tirón y postura',
    duration: 50,
    calories: 330,
    intensity: 'Intenso',
    exerciseIds: ['0293', '0294', '3123', '0689', '0630'],
  },
  {
    id: 'miercoles',
    day: 'Miércoles',
    title: 'Core & movilidad',
    focus: 'Recuperación activa',
    duration: 30,
    calories: 190,
    intensity: 'Recuperación',
    exerciseIds: ['0003', '0276', '3544', '0687', '0997'],
  },
  {
    id: 'jueves',
    day: 'Jueves',
    title: 'Pierna & glúteo',
    focus: 'Fuerza inferior',
    duration: 50,
    calories: 370,
    intensity: 'Intenso',
    exerciseIds: ['1760', '1459', '0336', '3007', '0630'],
  },
  {
    id: 'viernes',
    day: 'Viernes',
    title: 'Full body power',
    focus: 'Resistencia total',
    duration: 45,
    calories: 345,
    intensity: 'Moderado',
    exerciseIds: ['1760', '0289', '0293', '0405', '0857', '0620', '0630'],
  },
] as const;

export const findExercise = (id: string): Exercise => {
  const exercise = exercises.find((item) => item.id === id);
  if (!exercise) throw new Error(`Exercise ${id} was not found`);
  return exercise;
};

export const getExerciseSlug = (exercise: Exercise): string =>
  exercise.shortName
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
