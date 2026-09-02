import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Activity,
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  CircleUserRound,
  CircleCheck,
  Clock3,
  Download,
  Dumbbell,
  Flame,
  Home,
  Info,
  Pause,
  Play,
  RotateCcw,
  Salad,
  SkipBack,
  SkipForward,
  Target,
  TriangleAlert,
  X,
} from 'lucide-react';
import { Drawer } from 'vaul';
import {
  findExercise,
  getExerciseSlug,
  trainingPlans,
  type Exercise,
  type TrainingPlan,
  type Workout,
} from '../data/workouts';

type View = 'home' | 'workout' | 'player' | 'profile';
type Progress = Record<string, boolean>;
type RouteState = { view: View; plan: TrainingPlan; workout: Workout; exerciseIndex: number };

const getFirstPlan = (): TrainingPlan => {
  const plan = trainingPlans.at(0);
  if (!plan) throw new Error('The app must include at least one training plan');
  return plan;
};

const getFirstWorkout = (plan: TrainingPlan): Workout => {
  const workout = plan.workouts.at(0);
  if (!workout) throw new Error('The workout plan must include at least one day');
  return workout;
};

const defaultPlan = getFirstPlan();

const getLeadExercise = (workout: Workout) => {
  const id = workout.exerciseIds.at(0);
  if (!id) throw new Error(`Workout ${workout.id} must include at least one exercise`);
  return findExercise(id);
};

const resolveRoute = (path: string): RouteState => {
  const parts = path.split('/').filter(Boolean);
  const matchedPlan = trainingPlans.find((item) => item.slug === parts.at(0));
  const plan = matchedPlan ?? defaultPlan;
  const offset = matchedPlan ? 1 : 0;
  const today = getFirstWorkout(plan);
  if (parts.at(offset) === 'perfil')
    return { view: 'profile', plan, workout: today, exerciseIndex: 0 };
  if (parts.at(offset) !== 'rutinas')
    return { view: 'home', plan, workout: today, exerciseIndex: 0 };

  const workout = plan.workouts.find((item) => item.id === parts.at(offset + 1)) ?? today;
  const exerciseSlug = parts.at(offset + 3);
  const exerciseIndex = exerciseSlug
    ? workout.exerciseIds.findIndex((id) => getExerciseSlug(findExercise(id)) === exerciseSlug)
    : -1;
  if (parts.at(offset + 2) === 'ejercicios' && exerciseIndex >= 0) {
    return { view: 'player', plan, workout, exerciseIndex };
  }
  return { view: 'workout', plan, workout, exerciseIndex: 0 };
};

const useProgress = (storageKey: string) => {
  const [progress, setProgress] = useState<Progress>(() => {
    if (typeof window === 'undefined') return {};
    const saved = window.localStorage.getItem(storageKey);
    return saved ? (JSON.parse(saved) as Progress) : {};
  });
  const markDone = (id: string) => {
    setProgress((current) => {
      const next = { ...current, [id]: true };
      window.localStorage.setItem(storageKey, JSON.stringify(next));
      return next;
    });
  };
  const reset = () => {
    window.localStorage.removeItem(storageKey);
    setProgress({});
  };
  return { progress, markDone, reset };
};

export default function ForgeApp({ initialPath = '/' }: { initialPath?: string }) {
  const initialRoute = resolveRoute(initialPath);
  const [activePlan, setActivePlan] = useState<TrainingPlan>(initialRoute.plan);
  const [view, setView] = useState<View>(initialRoute.view);
  const [activeWorkout, setActiveWorkout] = useState<Workout>(initialRoute.workout);
  const [exerciseIndex, setExerciseIndex] = useState(initialRoute.exerciseIndex);
  const { progress, markDone, reset } = useProgress(`forge-progress-${activePlan.slug}`);
  const completed = activePlan.workouts.filter((workout) => progress[workout.id]).length;
  const today = getFirstWorkout(activePlan);
  const basePath = `/${activePlan.slug}`;

  useEffect(() => {
    const handleHistoryChange = () => {
      const route = resolveRoute(window.location.pathname);
      setActivePlan(route.plan);
      setView(route.view);
      setActiveWorkout(route.workout);
      setExerciseIndex(route.exerciseIndex);
      window.scrollTo(0, 0);
    };
    window.addEventListener('popstate', handleHistoryChange);
    return () => window.removeEventListener('popstate', handleHistoryChange);
  }, []);

  const changePage = (path: string, route: RouteState) => {
    window.history.pushState({}, '', path);
    setView(route.view);
    setActiveWorkout(route.workout);
    setExerciseIndex(route.exerciseIndex);
    window.scrollTo(0, 0);
  };

  const openWorkout = (workout: Workout) => {
    changePage(`${basePath}/rutinas/${workout.id}`, {
      view: 'workout',
      plan: activePlan,
      workout,
      exerciseIndex: 0,
    });
  };
  const startWorkout = () => {
    const exerciseId = activeWorkout.exerciseIds.at(0);
    if (!exerciseId) return;
    const exerciseSlug = getExerciseSlug(findExercise(exerciseId));
    changePage(`${basePath}/rutinas/${activeWorkout.id}/ejercicios/${exerciseSlug}`, {
      view: 'player',
      plan: activePlan,
      workout: activeWorkout,
      exerciseIndex: 0,
    });
  };
  const openExercise = (workout: Workout, nextIndex: number) => {
    const exerciseId = workout.exerciseIds.at(nextIndex);
    if (!exerciseId) return;
    const exerciseSlug = getExerciseSlug(findExercise(exerciseId));
    changePage(`${basePath}/rutinas/${workout.id}/ejercicios/${exerciseSlug}`, {
      view: 'player',
      plan: activePlan,
      workout,
      exerciseIndex: nextIndex,
    });
  };
  const navigate = (next: View) => {
    if (next === 'profile') {
      changePage(`${basePath}/perfil`, {
        view: 'profile',
        plan: activePlan,
        workout: activeWorkout,
        exerciseIndex: 0,
      });
      return;
    }
    if (next === 'workout') {
      openWorkout(activeWorkout);
      return;
    }
    changePage(basePath, {
      view: 'home',
      plan: activePlan,
      workout: activeWorkout,
      exerciseIndex: 0,
    });
  };
  const changeExercise = (nextIndex: number) => {
    const exerciseId = activeWorkout.exerciseIds.at(nextIndex);
    if (!exerciseId) return;
    const exerciseSlug = getExerciseSlug(findExercise(exerciseId));
    changePage(`${basePath}/rutinas/${activeWorkout.id}/ejercicios/${exerciseSlug}`, {
      view: 'player',
      plan: activePlan,
      workout: activeWorkout,
      exerciseIndex: nextIndex,
    });
  };

  return (
    <div className={`app-shell${view === 'player' ? ' player-active' : ''}`}>
      {view === 'home' && (
        <Dashboard plan={activePlan} completed={completed} onOpen={openWorkout} />
      )}
      {view === 'workout' && (
        <WorkoutDetail
          workout={activeWorkout}
          plan={activePlan}
          onBack={() => navigate('home')}
          onStart={startWorkout}
          onOpenExercise={(nextIndex) => openExercise(activeWorkout, nextIndex)}
        />
      )}
      {view === 'player' && (
        <Player
          key={activeWorkout.id}
          plan={activePlan}
          workout={activeWorkout}
          index={exerciseIndex}
          setIndex={changeExercise}
          onExit={() => navigate('workout')}
          onComplete={() => {
            markDone(activeWorkout.id);
            navigate('home');
          }}
        />
      )}
      {view === 'profile' && <Profile plan={activePlan} completed={completed} onReset={reset} />}
      {view !== 'player' && (
        <BottomNav active={view} onNavigate={navigate} onWorkouts={() => openWorkout(today)} />
      )}
    </div>
  );
}

function Header({ plan }: { plan: TrainingPlan }) {
  const basePath = `/${plan.slug}`;
  return (
    <header className="topbar">
      <button className="icon-button menu-button" aria-label="Abrir menú">
        <Dumbbell />
      </button>
      <a className="wordmark" href={basePath}>
        {plan.wordmark}
      </a>
      <nav>
        <a href={basePath}>Inicio</a>
        <a href={`${basePath}/rutinas/lunes`}>Entrenamientos</a>
        <a href={`${basePath}/perfil`}>Mi perfil</a>
      </nav>
      <div className="avatar" aria-label="Perfil">
        <Activity />
      </div>
    </header>
  );
}
function InstallAppButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true) {
      setIsStandalone(true);
    }
    
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(userAgent));

    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  if (isStandalone) return null;
  if (!deferredPrompt && !isIOS) return null;

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else if (isIOS) {
      alert('Para instalar la app en iPhone:\n\n1. Toca el ícono de Compartir (cuadrado con flecha hacia arriba) en la barra inferior de Safari.\n2. Selecciona "Agregar a inicio" (o "Add to Home Screen").');
    }
  };

  return (
    <button onClick={handleInstall} style={{ marginBottom: '1rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', padding: '1rem', borderRadius: '100px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}>
      <Download size={20} /> Descargar la App
    </button>
  );
}

function Dashboard({
  plan,
  completed,
  onOpen,
}: {
  plan: TrainingPlan;
  completed: number;
  onOpen: (workout: Workout) => void;
}) {
  const today = getFirstWorkout(plan);
  return (
    <>
      <Header plan={plan} />
      <main id="inicio">
        <section className="hero">
          <div className="hero-media">
            <img
              src={findExercise(plan.heroExerciseId).gif}
              alt={`Demostración de ${findExercise(plan.heroExerciseId).shortName}`}
            />
          </div>
          <div className="hero-shade" />
          <div className="hero-content">
            <span className="eyebrow">ENTRENAMIENTO DEL DÍA</span>
            <h1>
              Construye fuerza.
              <br />
              Define tu ritmo.
            </h1>
            <p>
              {plan.slug === 'adilene-salas'
                ? 'Un plan de 5 días para entrenar en casa con dos mancuernas de 10 kg, peso corporal, el piso y una silla firme.'
                : 'Un plan de 5 días creado para casa, con tu equipo y un objetivo claro: perder grasa mientras conservas y aumentas músculo.'}
            </p>
            <div className="hero-metrics">
              <span>
                <Flame /> 345 kcal
              </span>
              <span>
                <Clock3 /> 45 min
              </span>
            </div>
            <InstallAppButton />
            <button className="primary-button" onClick={() => onOpen(today)}>
              Empezar hoy{' '}
              <span>
                <Play fill="currentColor" />
              </span>
            </button>
            <ChevronDown className="scroll-cue" />
          </div>
        </section>
        <section className="content-section" id="plan">
          <div className="section-heading">
            <div>
              <span className="kicker">TU SEMANA</span>
              <h2>Entrena con intención</h2>
            </div>
            <p>Fuerza primero, cardio inteligente y recuperación suficiente.</p>
          </div>
          <div className="workout-grid">
            {plan.workouts.map((workout, index) => (
              <button className="workout-card" key={workout.id} onClick={() => onOpen(workout)}>
                <img src={getLeadExercise(workout).image} alt="" />
                <div className="card-gradient" />
                <div className="card-index">0{index + 1}</div>
                <div className="card-copy">
                  <span>{workout.day.toUpperCase()}</span>
                  <h3>{workout.title}</h3>
                  <p>
                    <Clock3 /> {workout.duration} min
                  </p>
                </div>
                <span className="round-play">
                  <Play fill="currentColor" />
                </span>
              </button>
            ))}
          </div>
        </section>
        <section className="goal-section" id="objetivo">
          <div className="goal-copy">
            <span className="kicker">TU OBJETIVO</span>
            <h2>
              Más músculo.
              <br />
              Menos grasa.
            </h2>
            <p>
              {plan.slug === 'adilene-salas'
                ? 'Con una estatura aproximada de 1.63–1.65 m, el enfoque será bajar grasa poco a poco y fortalecer especialmente piernas, glúteos y abdomen. La técnica y la constancia importan más que entrenar hasta el agotamiento.'
                : 'Con 65–68 kg y 1.75 m, tu peso está en un rango saludable. El enfoque será recomposición corporal: progresar cargas, comer suficiente proteína y mantener un déficit pequeño, no perseguir una bajada agresiva.'}
            </p>
            <div className="goal-stats">
              <div>
                <strong>4×</strong>
                <span>Fuerza / semana</span>
              </div>
              <div>
                <strong>1.6–2.2 g</strong>
                <span>Proteína / kg</span>
              </div>
              <div>
                <strong>7–9 h</strong>
                <span>Sueño / noche</span>
              </div>
            </div>
          </div>
          <div className="nutrition-card">
            <Salad />
            <span>GUÍA SIMPLE</span>
            <h3>
              {plan.slug === 'adilene-salas'
                ? 'Comer bien sostiene el progreso.'
                : 'Tu batido suma, no sustituye.'}
            </h3>
            <p>
              {plan.slug === 'adilene-salas'
                ? 'Mantén comidas completas con proteína, verduras, fruta y suficiente agua. No necesitas eliminar grupos de alimentos para progresar.'
                : 'Usa tu whey para llegar a 105–145 g de proteína diaria. Mantén verduras, fruta, agua y comidas completas como base.'}
            </p>
            <small>
              Empieza con un déficit aproximado de 200–300 kcal y ajusta según tu promedio de peso
              durante 2–3 semanas.
            </small>
          </div>
        </section>
        <section className="progress-panel">
          <div>
            <span>PROGRESO SEMANAL</span>
            <strong>
              {completed}
              <small>/5</small>
            </strong>
            <p>Días completados</p>
          </div>
          <div
            className="progress-ring"
            style={{ '--progress': `${String(completed * 20)}%` } as React.CSSProperties}
          >
            <Flame />
          </div>
        </section>
      </main>
    </>
  );
}

function WorkoutDetail({
  plan,
  workout,
  onBack,
  onStart,
  onOpenExercise,
}: {
  plan: TrainingPlan;
  workout: Workout;
  onBack: () => void;
  onStart: () => void;
  onOpenExercise: (index: number) => void;
}) {
  const workoutExercises = workout.exerciseIds.map(findExercise);
  return (
    <main className="detail-page">
      <header className="detail-header">
        <button className="icon-button" onClick={onBack} aria-label="Volver">
          <ArrowLeft />
        </button>
        <span className="wordmark">{plan.wordmark}</span>
        <div className="avatar">
          <Activity />
        </div>
      </header>
      <nav className="day-switcher" aria-label="Días de entrenamiento">
        {plan.workouts.map((dayWorkout) => (
          <a
            key={dayWorkout.id}
            href={`/${plan.slug}/rutinas/${dayWorkout.id}`}
            data-astro-reload
            className={dayWorkout.id === workout.id ? 'active' : ''}
            aria-current={dayWorkout.id === workout.id ? 'page' : undefined}
            onClick={(event) => {
              event.preventDefault();
              window.location.assign(`/${plan.slug}/rutinas/${dayWorkout.id}`);
            }}
          >
            <strong>{dayWorkout.day}</strong>
          </a>
        ))}
      </nav>
      <section className="detail-intro">
        <span className="kicker">RUTINA DEL DÍA</span>
        <h1>{workout.day}</h1>
        <p>
          {workout.title}. Enfócate en el control, la técnica y subir peso o repeticiones cada
          semana.
        </p>
        <div className="chips">
          <span>{workout.duration} MIN</span>
          <span>{workout.intensity.toUpperCase()}</span>
        </div>
      </section>
      <section className="round">
        <div className="round-title">
          <span>Ronda 1</span>
          <small>{workoutExercises.length} ejercicios</small>
        </div>
        {workoutExercises.map((exercise, index) => (
          <article className="exercise-row" key={exercise.id}>
            <a
              className="exercise-card-link"
              href={`/${plan.slug}/rutinas/${workout.id}/ejercicios/${getExerciseSlug(exercise)}`}
              aria-label={`Abrir ${exercise.shortName}`}
              onClick={(event) => {
                event.preventDefault();
                onOpenExercise(index);
              }}
            />
            <img src={exercise.image} alt={exercise.shortName} />
            <div>
              <h2>{exercise.shortName}</h2>
              <p>
                {exercise.sets} SERIES × {exercise.reps}
              </p>
              {plan.slug === 'daniel-uribe' && exercise.loadGuide && (
                <small className="row-load">Inicio recomendado: {exercise.loadGuide.start}</small>
              )}
            </div>
            <TechniqueSheet exercise={exercise} plan={plan} />
            <span className="row-number">0{index + 1}</span>
          </article>
        ))}
      </section>
      <aside className="safety-note">
        <Info />
        <p>
          <strong>Elige una carga segura.</strong> Las últimas 2–3 repeticiones deben costar sin
          romper la técnica. Si tienes dolor agudo, detente y consulta a un profesional.
        </p>
      </aside>
      <button className="primary-button sticky-start" onClick={onStart}>
        Iniciar {workout.day}
        <span>
          <Play fill="currentColor" />
        </span>
      </button>
    </main>
  );
}

let audioCtx: AudioContext | null = null;
const initAudio = () => {
  try {
    audioCtx ??= new window.AudioContext();
    if (audioCtx.state === 'suspended') {
      void audioCtx.resume().catch((error: unknown) => {
        console.error('No fue posible activar el audio', error);
      });
    }
  } catch (error: unknown) {
    console.error('Audio no disponible', error);
  }
};

const playBeep = () => {
  if (!audioCtx) return;
  try {
    const now = audioCtx.currentTime;
    for (let i = 0; i < 5; i++) {
      const startTime = now + i * 0.5;
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, startTime);
      osc.frequency.exponentialRampToValueAtTime(300, startTime + 0.35);

      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(1, startTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.35);

      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.35);
    }
  } catch {
    return;
  }
};

function Player({
  plan,
  workout,
  index,
  setIndex,
  onExit,
  onComplete,
}: {
  plan: TrainingPlan;
  workout: Workout;
  index: number;
  setIndex: (index: number) => void;
  onExit: () => void;
  onComplete: () => void;
}) {
  const list = useMemo(() => workout.exerciseIds.map(findExercise), [workout.exerciseIds]);
  const exercise = list.at(index);
  if (!exercise) throw new Error(`Exercise index ${String(index)} is outside the workout`);
  const nextExercise = list.at(index + 1);
  const [duration, setDuration] = useState(exercise.seconds);
  const [seconds, setSeconds] = useState(exercise.seconds);
  const [playing, setPlaying] = useState(false);
  const [sheetCollapsed, setSheetCollapsed] = useState(false);
  const endTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!playing || seconds === 0) {
      endTimeRef.current = null;
      return;
    }

    endTimeRef.current ??= Date.now() + seconds * 1000;

    const updateTimer = () => {
      const endTime = endTimeRef.current;
      if (endTime === null) return;
      const remaining = Math.max(0, Math.round((endTime - Date.now()) / 1000));
      if (remaining !== seconds) {
        setSeconds(remaining);
      }
      if (remaining === 0) {
        endTimeRef.current = null;
        setPlaying(false);
        playBeep();
      }
    };

    const timer = window.setInterval(updateTimer, 250);

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        updateTimer();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [playing, seconds]);
  const goNext = () => {
    if (index === list.length - 1) onComplete();
    else setIndex(index + 1);
  };
  const adjustTimer = (change: number) => {
    const nextDuration = Math.min(5999, Math.max(5, seconds + change));
    setDuration(nextDuration);
    setSeconds(nextDuration);
    if (playing) {
      endTimeRef.current = Date.now() + nextDuration * 1000;
    }
  };
  const formattedTime = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  return (
    <main className={`player${sheetCollapsed ? ' sheet-collapsed' : ''}`}>
      <img
        className="player-media"
        src={exercise.gif}
        alt={`Demostración: ${exercise.shortName}`}
      />
      <div className="player-overlay" />
      <header>
        <button className="glass-button" onClick={onExit} aria-label="Salir del reproductor">
          <ArrowLeft />
        </button>
        <button className="next-exercise-preview" onClick={goNext}>
          <span className="next-exercise-copy">
            <span>SIGUIENTE</span>
            <strong>{nextExercise?.shortName ?? 'Finalizar rutina'}</strong>
          </span>
          <span className="next-exercise-circle">
            {nextExercise ? (
              <img src={nextExercise.gif} alt={`Siguiente: ${nextExercise.shortName}`} />
            ) : (
              <CircleCheck aria-hidden="true" />
            )}
          </span>
        </button>
      </header>
      <section className="player-sheet">
        <button
          className="player-sheet-toggle"
          onClick={() => setSheetCollapsed((collapsed) => !collapsed)}
          aria-expanded={!sheetCollapsed}
          aria-label={sheetCollapsed ? 'Mostrar controles' : 'Ocultar controles'}
        >
          {sheetCollapsed ? <ChevronUp /> : <ChevronDown />}
        </button>
        <div className="player-sheet-content" aria-hidden={sheetCollapsed} inert={sheetCollapsed}>
          <div className="player-title">
            <div>
              <span>
                {index + 1} DE {list.length}
              </span>
              <h1>{exercise.shortName}</h1>
              <p>
                {exercise.equipment} · {exercise.target}
              </p>
            </div>
            <span className="set-pill">
              {exercise.sets} × {exercise.reps}
            </span>
          </div>
          <div className="timer-workspace">
            <div className="timer-stepper" aria-label="Ajustar cronómetro">
              <button onClick={() => adjustTimer(5)} aria-label="Agregar cinco segundos">
                <ChevronUp />
                <span>+5 s</span>
              </button>
              <button onClick={() => adjustTimer(-5)} aria-label="Quitar cinco segundos">
                <ChevronDown />
                <span>−5 s</span>
              </button>
            </div>
            <div
              className="timer"
              style={
                {
                  '--timer': `${String((seconds / duration) * 100)}%`,
                } as React.CSSProperties
              }
            >
              <div>
                <strong>{formattedTime}</strong>
                <span>{seconds === 0 ? 'SERIE LISTA' : 'RESTANTES'}</span>
              </div>
            </div>
            <button
              className="reset-timer"
              onClick={() => {
                setSeconds(duration);
                setPlaying(false);
              }}
            >
              <RotateCcw />
              <span>Reiniciar</span>
            </button>
          </div>
          <div className="player-controls">
            <button onClick={() => setIndex(Math.max(0, index - 1))} disabled={index === 0}>
              <SkipBack fill="currentColor" />
              <span>ANTERIOR</span>
            </button>
            <button
              className="pause-button"
              onClick={() => {
                initAudio();
                if (seconds === 0) {
                  setSeconds(duration);
                  setPlaying(true);
                } else {
                  setPlaying((value) => !value);
                }
              }}
              aria-label={
                seconds === 0 ? 'Reiniciar' : playing ? 'Pausar cronómetro' : 'Iniciar cronómetro'
              }
              style={
                seconds === 0 ? { backgroundColor: 'var(--lime)', color: '#101500' } : undefined
              }
            >
              {seconds === 0 ? (
                <RotateCcw />
              ) : playing ? (
                <Pause fill="currentColor" />
              ) : (
                <Play fill="currentColor" />
              )}
            </button>
            <button onClick={goNext}>
              <SkipForward fill="currentColor" />
              <span>{index === list.length - 1 ? 'TERMINAR' : 'SIGUIENTE'}</span>
            </button>
          </div>
          <TechniqueSheet exercise={exercise} plan={plan} wideTrigger />
        </div>
      </section>
    </main>
  );
}

function TechniqueSheet({
  exercise,
  plan,
  wideTrigger = false,
}: {
  exercise: Exercise;
  plan: TrainingPlan;
  wideTrigger?: boolean;
}) {
  const adilineGuide: Record<string, string> = {
    '1760':
      'Usa una sola mancuerna de 10 kg frente al pecho. Si todavía cuesta mantener la postura, haz primero la sentadilla sin peso.',
    '1459':
      'Empieza con una sola mancuerna de 10 kg sujetada con ambas manos. Usa las dos únicamente cuando puedas controlar todo el recorrido sin redondear la espalda.',
    '0336':
      'Empieza sin peso. Cuando tengas buen equilibrio, toma una sola mancuerna de 10 kg junto al pecho.',
    'glute-bridge':
      'Hazlo primero solo con tu peso corporal sobre el piso. Si se vuelve fácil, coloca una mancuerna de 10 kg sobre la cadera y sujétala con ambas manos.',
    'push-up':
      'Haz las flexiones con las rodillas apoyadas o con las manos sobre una silla firme si la versión en el piso es demasiado pesada.',
  };
  const homeAdaptation =
    adilineGuide[exercise.id] ??
    'Este ejercicio se hace únicamente con el peso corporal. Usa el piso y una colchoneta o toalla si necesitas mayor comodidad.';
  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger asChild>
        {wideTrigger ? (
          <button className="technique-trigger">
            Ver técnica e instrucciones <ChevronDown />
          </button>
        ) : (
          <button className="row-technique" aria-label={`Ver técnica de ${exercise.shortName}`}>
            <Info />
          </button>
        )}
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="sheet-overlay" />
        <Drawer.Content className="technique-sheet">
          <div className="sheet-handle" />
          <div className="sheet-header">
            <div>
              <span className="kicker">GUÍA DE TÉCNICA</span>
              <Drawer.Title>{exercise.shortName}</Drawer.Title>
              <Drawer.Description>
                {exercise.equipment} · Enfoque: {exercise.target}
              </Drawer.Description>
            </div>
            <Drawer.Close className="sheet-close" aria-label="Cerrar guía">
              <X />
            </Drawer.Close>
          </div>
          <div
            className="sheet-body"
            data-vaul-no-drag
            style={{ overflowY: 'auto', flex: 1, minHeight: 0 }}
          >
            <div className="sheet-demo">
              <img src={exercise.gif} alt={`Demostración de ${exercise.shortName}`} />
              <span>
                {exercise.sets} series · {exercise.reps}
              </span>
            </div>
            <div className="technique-copy">
              {plan.slug === 'adilene-salas' && (
                <section className="home-adaptation">
                  <h3>
                    <Dumbbell /> Adaptación para casa
                  </h3>
                  <p>{homeAdaptation}</p>
                  <small>
                    Empieza siempre por la opción más fácil. Agrega peso solo cuando completes todas
                    las repeticiones con técnica limpia y sin dolor.
                  </small>
                </section>
              )}
              {plan.slug === 'daniel-uribe' && exercise.loadGuide && (
                <section className="load-plan">
                  <div>
                    <span>COMIENZO</span>
                    <strong>{exercise.loadGuide.start}</strong>
                  </div>
                  <ChevronRight />
                  <div>
                    <span>DESPUÉS DE 1 MES</span>
                    <strong>{exercise.loadGuide.afterMonth}</strong>
                  </div>
                  <p>
                    Sube únicamente si completas el máximo de repeticiones con técnica limpia y
                    todavía podrías hacer dos repeticiones más.
                  </p>
                </section>
              )}
              <section>
                <h3>
                  <CircleCheck /> Cómo hacerlo
                </h3>
                <ol>
                  {exercise.instructions.map((instruction) => (
                    <li key={instruction}>{instruction}</li>
                  ))}
                </ol>
              </section>
              <section className="mistake-card">
                <h3>
                  <TriangleAlert /> Cuida esto
                </h3>
                <p>
                  Mantén el movimiento lento y sin impulso. Detén la serie si pierdes la postura o
                  sientes dolor agudo; esfuerzo muscular no debe sentirse como dolor articular.
                </p>
              </section>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

function Profile({
  plan,
  completed,
  onReset,
}: {
  plan: TrainingPlan;
  completed: number;
  onReset: () => void;
}) {
  return (
    <main className="profile-page">
      <Header plan={plan} />
      <section>
        <span className="kicker">MI PERFIL</span>
        <h1>Tu progreso, sin ruido.</h1>
        <p>
          El cambio físico se mide en meses, no en días. Repite el plan de 8 a 12 semanas y registra
          peso, repeticiones y cómo te queda la ropa.
        </p>
        <div className="profile-grid">
          <article>
            <Target />
            <strong>{plan.goal}</strong>
            <span>Objetivo principal</span>
          </article>
          <article>
            <Dumbbell />
            <strong>{plan.slug === 'adilene-salas' ? '2 × 10 kg' : '65–68 kg'}</strong>
            <span>
              {plan.slug === 'adilene-salas' ? 'Equipo disponible' : 'Peso de referencia'}
            </span>
          </article>
          <article>
            <Activity />
            <strong>{plan.height}</strong>
            <span>Estatura registrada</span>
          </article>
          <article>
            <Flame />
            <strong>{completed}/5</strong>
            <span>Semana actual</span>
          </article>
        </div>
        <button className="secondary-button" onClick={onReset}>
          <RotateCcw /> Reiniciar semana
        </button>
      </section>
    </main>
  );
}

function BottomNav({
  active,
  onNavigate,
  onWorkouts,
}: {
  active: View;
  onNavigate: (view: View) => void;
  onWorkouts: () => void;
}) {
  return (
    <nav className="bottom-nav">
      <button className={active === 'home' ? 'active' : ''} onClick={() => onNavigate('home')}>
        <Home />
        <span>Inicio</span>
      </button>
      <button className={active === 'workout' ? 'active' : ''} onClick={onWorkouts}>
        <Dumbbell />
        <span>Rutinas</span>
      </button>
      <button
        className={active === 'profile' ? 'active' : ''}
        onClick={() => onNavigate('profile')}
      >
        <CircleUserRound />
        <span>Perfil</span>
      </button>
    </nav>
  );
}
