# CineStar — Cartelera de cine

Aplicación web académica desarrollada con React y Vite para mostrar la cartelera de CineStar. Presenta una película destacada, información de ocho películas, sus clasificaciones, valoraciones y horarios disponibles, además de navegación y datos de contacto.

## Autores y aportes

El historial de Git registra las contribuciones de ambos integrantes:

| Integrante | Aportes registrados |
| --- | --- |
| **Ian1721** | Pasos 1–6: inicialización del proyecto React con Vite; limpieza del código base; estructura de carpetas y estilos globales; creación de los datos de ocho películas; componentes Header y Footer. |
| **nikolaisuarez** | Pasos 7–12: componente Hero para la película destacada; componente MovieCard y estilos responsivos; componente MovieList con claves; composición de la aplicación; documentación de tres errores comunes de React; verificación final y publicación de los cambios. |

## Funcionalidades

- Encabezado con marca CineStar, navegación y contador de películas favoritas.
- Banner destacado con imagen, sinopsis, clasificación, valoración, buscador, acceso a horarios y acción para limpiar el filtro.
- Cartelera renderizada desde datos locales mediante componentes reutilizables y un adaptador que normaliza el modelo.
- Tarjetas con póster, título, valoración, clasificación, horarios y botón de favorita.
- Favoritas persistentes en `localStorage`, recuperadas al cargar la página.
- Aviso emergente al marcar o desmarcar una favorita, gestionado desde `App` sin acoplar la tarjeta.
- Buscador controlado con el hook propio `useDebounce` (400 ms), filtrado por título, resumen de resultados y estado vacío.
- Hook propio `useWindowSize` que ajusta la cantidad de tarjetas por fila según el ancho de la ventana.
- Sección de estrenos con el hook `usePremieres`: esqueleto de carga, carrusel de datos y estado de error con reintento.
- Botón reutilizable con variantes de estilo y soporte para enlaces.
- Diseño adaptable a distintos tamaños de pantalla y preferencias de movimiento reducido.
- Pie de página con contacto, enlaces y horario de atención.
- Registro de ejemplos y soluciones de errores comunes en [`ERRORS_LOG.md`](./ERRORS_LOG.md).
- Decisiones de estado y evidencias de la segunda etapa en [`docs/ENTREGABLE_PARTE2.md`](./docs/ENTREGABLE_PARTE2.md).
- Hooks, adaptador, estrenos y árbol de componentes del Laboratorio 10 en [`docs/ENTREGABLE_LAB10.md`](./docs/ENTREGABLE_LAB10.md).

## Tecnologías

- React 19
- Vite 8
- JavaScript (ES modules)
- CSS
- Oxlint

## Requisitos

- Node.js compatible con la versión de Vite indicada en `package-lock.json`.
- npm.

## Instalación y ejecución

Desde la carpeta `Lab09_proyecto`:

```bash
npm ci
npm run dev
```

Vite mostrará la dirección local para abrir la aplicación en el navegador.

## Comandos disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor local de desarrollo. |
| `npm run build` | Genera la versión de producción en `dist/`. |
| `npm run preview` | Sirve localmente la versión compilada. |
| `npm run lint` | Revisa el código con Oxlint. |

## Estructura principal

```text
src/
├── components/
│   ├── Button.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── MovieCard.jsx
│   ├── MovieList.jsx
│   ├── MovieSearch.jsx
│   ├── PremiereCard.jsx
│   ├── PremieresCarousel.jsx
│   ├── PremieresSection.jsx
│   ├── PremieresSkeleton.jsx
│   └── Toast.jsx
├── data/
│   ├── movies.js
│   └── premieres.js
├── hooks/
│   ├── useDebounce.js
│   ├── usePremieres.js
│   └── useWindowSize.js
├── services/
│   └── premieresService.js
├── styles/
│   └── App.css
├── utils/
│   ├── favoritesStorage.js
│   └── movieAdapter.js
├── App.jsx
└── main.jsx
docs/
├── ENTREGABLE_LAB10.md
├── ENTREGABLE_PARTE2.md
└── evidence/
    ├── empty-search.png
    ├── lab10-favorite-counter.jpeg
    ├── lab10-clear-filter-active.jpeg
    ├── lab10-clear-filter-cleared.jpeg
    ├── lab10-premieres-error.jpeg
    ├── lab10-premieres-loading.jpeg
    └── lab10-premieres-success.jpeg
ERRORS_LOG.md
```

Los datos de las películas se guardan en `src/data/movies.js` como payload crudo
y se pasan por `src/utils/movieAdapter.js` antes de llegar a la interfaz. `App.jsx`
entrega el modelo adaptado a `Hero` y `MovieList` mediante props, y concentra el
estado de favoritas, búsqueda y aviso emergente. `MovieList` crea una tarjeta por
película, filtra el arreglo con el texto ya retardado por `useDebounce` y ajusta
las columnas con `useWindowSize`. `PremieresSection` usa `usePremieres` para
mostrar el esqueleto, el carrusel o el error de la petición simulada. El detalle
del árbol y de las decisiones está en `docs/ENTREGABLE_LAB10.md`.

## Errores comunes documentados

`ERRORS_LOG.md` describe tres casos de aprendizaje: usar `class` en JSX en lugar de `className`, devolver varios nodos raíz sin agruparlos y omitir la prop `key` al iterar. Incluye el mensaje esperado y la solución de cada caso. La aplicación final mantiene las soluciones aplicadas.

## Repositorio

[Lab09_Desarrollo_Empresarial en GitHub](https://github.com/Ian1709/Lab09_Desarrollo_Empresarial)
