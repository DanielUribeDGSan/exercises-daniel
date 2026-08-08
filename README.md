# Daniel U. — Plan de entrenamiento

Aplicación responsive de entrenamiento en casa construida con Astro, React y TypeScript. Incluye una rutina semanal personalizada, reproductor de ejercicios, cronómetro configurable, progreso local y guías animadas de técnica.

## Funciones

- Cinco rutinas semanales con páginas y URLs independientes.
- Restauración de la rutina y el ejercicio después de recargar.
- Cronómetro con pausa, reinicio y ajustes de cinco segundos.
- Bottom sheets animados para consultar la técnica.
- Persistencia local del progreso semanal.
- Diseño responsive para móvil y escritorio.
- TypeScript estricto, ESLint y Prettier.

## Desarrollo local

```bash
npm ci
npm run dev
```

## Validación

```bash
npm run check
```

## Despliegue en Netlify

El archivo `netlify.toml` ya configura:

- Comando de construcción: `npm run build`.
- Carpeta publicada: `dist`.
- Node.js 22.
- Caché permanente para recursos versionados y medios.
- Encabezados básicos de seguridad.

Al importar este repositorio desde Netlify no es necesario modificar la configuración de construcción.

## Datos y medios

Los ejercicios proceden de [hasaneyldrm/exercises-dataset](https://github.com/hasaneyldrm/exercises-dataset). Los medios visuales tienen atribución de Gym Visual y están sujetos a los términos indicados por el repositorio original.
