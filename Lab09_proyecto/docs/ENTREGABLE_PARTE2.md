# Entregable — Parte 2: componentes reutilizables, favoritas y búsqueda

**Proyecto:** CineStar — Laboratorio 9  
**Repositorio:** <https://github.com/Ian1709/Lab09_Desarrollo_Empresarial>  
**Stack:** React 19, Vite 8, CSS y Oxlint

Este documento registra la ampliación de la cartelera de CineStar con un botón
reutilizable, un sistema de películas favoritas que persiste en el navegador y
un buscador controlado con retardo, filtrado y estado vacío. También explica en
qué componente vive cada dato que la aplicación recuerda y por qué se tomó esa
decisión.

---

## 1. Punto de partida y verificación

Se partió del proyecto de cartelera ya publicado en el repositorio, con los
ocho datos de películas, los componentes `Header`, `Hero`, `MovieCard`,
`MovieList` y `Footer`, y los estilos globales en `src/styles/App.css`.

Antes de agregar funcionalidad se comprobó que el proyecto levantara y
compilara:

```bash
npm ci
npm run dev
npm run build
npm run lint
```

El proyecto base ya estaba sincronizado con `origin/main` y sin cambios
pendientes. La ampliación se hizo sobre esa versión para no perder el trabajo
previo.

---

## 2. Resumen de lo implementado

| # | Tarea | Implementación | Archivos principales |
| --- | --- | --- | --- |
| 1 | Partir de la cartelera funcionando | Se verificó el repositorio, la instalación y el build antes de modificar código | `package.json`, `src/App.jsx` |
| 2 | Ampliar la hoja de estilos base | Se agregaron estilos de formularios, tipografía, utilidades, buscador y estado vacío | `src/styles/App.css` |
| 3 | Componente `Button` reutilizable | Recibe `children`, `variant` y opcionalmente `href`; reemplaza los botones escritos a mano | `src/components/Button.jsx`, `Hero.jsx` |
| 4 | Estado de favoritas en `App` | `favoriteIds` con `useState` y `toggleFavorite` para agregar o quitar | `src/App.jsx` |
| 5 | Botón de favorita en la tarjeta | `MovieCard` recibe `isFavorite` y `onToggleFavorite`; el botón muestra el estado con `aria-pressed` | `MovieCard.jsx`, `MovieList.jsx` |
| 6 | `MovieSearch` como entrada controlada | El texto vive en `App`; `value` y `onChange` mantienen el input sincronizado | `MovieSearch.jsx`, `App.jsx` |
| 7 | Retardo del filtrado | Hook `useDebouncedValue` de 400 ms y trazas comparativas en consola | `src/hooks/useDebouncedValue.js`, `App.jsx` |
| 8 | Filtrado y estado vacío en `MovieList` | Filtra por título sin distinguir mayúsculas y dibuja un estado vacío accesible | `src/components/MovieList.jsx` |
| 9 | Buscador integrado en el banner | `Hero` renderiza `MovieSearch`; el envío hace scroll a la cartelera | `Hero.jsx`, `App.jsx` |
| 10 | Persistencia de favoritas | Lectura al iniciar y escritura en `localStorage` | `src/utils/favoritesStorage.js`, `App.jsx` |
| 11 | Registro de decisiones y evidencia | Este documento y la captura del estado vacío | `docs/ENTREGABLE_PARTE2.md`, `docs/evidence/empty-search.png` |
| 12 | Publicación | Commits por etapa y push al repositorio del equipo | Rama `main` |

---

## 3. Componente `Button` reutilizable

`Button` concentra el aspecto y el comportamiento de los botones de la
aplicación. Su contenido se pasa por `children` y su aspecto por `variant`:

```jsx
<Button variant="primary">Search movies</Button>
<Button variant="secondary">Explore showtimes</Button>
<Button variant={isFavorite ? 'favorite-active' : 'favorite'}>
  {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
</Button>
```

Si recibe `href`, renderiza un enlace con las mismas clases; si no, renderiza
un `<button>` y respeta `type`, `onClick`, `aria-pressed` y el resto de props.
Las variantes disponibles son `primary`, `secondary`, `favorite` y
`favorite-active`.

El botón que antes estaba escrito a mano en el banner
(`<a className="button button--primary" ...>`) fue sustituido por este
componente, y el botón de favorita de cada tarjeta también lo reutiliza.

---

## 4. Estado de las películas favoritas

### 4.1 Dónde vive y por qué

`favoriteIds` vive en `App` porque es el ancestro común de `Hero` y
`MovieList`, y porque la lista debe sobrevivir a la navegación interna y a las
recargas. Tener una sola fuente de verdad evita que dos tarjetas o dos listas
mantengan copias desincronizadas.

```jsx
const [favoriteIds, setFavoriteIds] = useState(() =>
  readFavoriteIds().filter((movieId) => validMovieIds.has(movieId)),
)

const toggleFavorite = (movieId) => {
  setFavoriteIds((currentIds) =>
    currentIds.includes(movieId)
      ? currentIds.filter((id) => id !== movieId)
      : [...currentIds, movieId],
  )
}
```

`App` entrega `favoriteIds` y `toggleFavorite` a `MovieList`; este calcula
`isFavorite` para cada tarjeta y se lo pasa a `MovieCard` junto con la función.
Así, la tarjeta no guarda estado propio: solo dibuja el estado que recibe y
notifica el clic.

### 4.2 Flujo de la acción

1. El usuario pulsa el botón de favorita de una tarjeta.
2. `MovieCard` llama a `onToggleFavorite(movie.id)`.
3. `MovieList` reenvía la llamada a la función recibida desde `App`.
4. `App` actualiza `favoriteIds` con `setFavoriteIds`.
5. React vuelve a renderizar y la tarjeta recibe el nuevo `isFavorite`.
6. El botón cambia de estrella y de texto, y actualiza `aria-pressed`.

El estado se refleja en la interfaz y también en el atributo
`aria-pressed`, de modo que la información no depende solo del color o del
icono.

### 4.3 Persistencia en el navegador

La persistencia se aisló en `src/utils/favoritesStorage.js` para no mezclar el
acceso a `localStorage` con la lógica de la interfaz:

- Clave utilizada: `cinestar.favoriteMovieIds`.
- Se guarda un arreglo JSON con los identificadores de las películas.
- Al iniciar, `useState` usa una función inicializadora que lee el valor una
  sola vez, descarta identificadores que ya no existen en `movies` y tolera
  datos corruptos o un `localStorage` no disponible.
- Un `useEffect` observa `favoriteIds` y vuelve a escribir el arreglo cada vez
  que cambia.

Solo se persisten las favoritas. El texto del buscador es un dato efímero de la
sesión y se pierde al recargar, que es el comportamiento esperado para una
búsqueda.

---

## 5. Buscador controlado y retardo

### 5.1 Entrada controlada

`MovieSearch` no guarda el texto. Recibe `value` desde `App`, notifica cada
pulsación con `onChange(event.target.value)` y envía el formulario con
`onSubmit`:

```jsx
function MovieSearch({ value = '', onChange, onSubmit }) {
  return (
    <form className="movie-search" role="search" onSubmit={onSubmit}>
      <label className="visually-hidden" htmlFor="movie-search-input">
        Search movies by title
      </label>
      <input
        id="movie-search-input"
        className="form-input movie-search__input"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search movies by title..."
        autoComplete="off"
        aria-controls="premieres"
      />
      <Button type="submit" variant="primary">Search movies</Button>
    </form>
  )
}
```

Como el valor siempre viene de `App`, el input y el filtro nunca quedan
desfasados: el estado de React es la única fuente de verdad.

### 5.2 Retardo del filtrado

El texto inmediato se guarda en `searchTerm`, pero la cartelera no lo usa
directamente. `useDebouncedValue` devuelve una copia que solo se actualiza
cuando el usuario deja de escribir durante 400 ms:

```jsx
const [searchTerm, setSearchTerm] = useState('')
const debouncedSearchTerm = useDebouncedValue(searchTerm, 400)
```

El hook cancela el temporizador anterior en su función de limpieza, de modo que
una ráfaga de pulsaciones no dispara un filtrado por letra. `MovieList` recibe
`debouncedSearchTerm`, no `searchTerm`.

### 5.3 Evidencia en la consola

En desarrollo se registran dos trazas con `import.meta.env.DEV` para comparar
el valor inmediato del input con el valor que finalmente se aplica al filtro:

```jsx
useEffect(() => {
  if (!import.meta.env.DEV) return

  console.log('[CineStar] search input:', JSON.stringify(searchTerm))
  console.log('[CineStar] applied filter:', JSON.stringify(debouncedSearchTerm))
}, [searchTerm, debouncedSearchTerm])
```

Al escribir `inter` en el buscador, la consola mostró:

```text
[CineStar] search input: "inter"
[CineStar] applied filter: ""
[CineStar] search input: "inter"
[CineStar] applied filter: "inter"   ← unos 409 ms después
```

La primera traza aparece en cada pulsación; la segunda, solo cuando termina el
retardo. Esa diferencia es la evidencia de que el filtrado no se dispara con
cada letra. Las trazas se ejecutan dos veces durante el desarrollo por el
`StrictMode` de React, pero el efecto observable es el mismo.

---

## 6. Filtrado, estado vacío e integración en el banner

`MovieList` recibe la búsqueda ya retardada y calcula la lista visible en cada
render, sin duplicarla en otro estado:

```jsx
const query = searchTerm.trim().toLowerCase()
const visibleMovies = query
  ? movies.filter((movie) => movie.title.trim().toLowerCase().includes(query))
  : movies
```

Cuando hay coincidencias, la lista muestra el arreglo filtrado y un resumen con
`role="status"` (`Showing 1 of 8 movies.`). Cuando no hay ninguna, dibuja el
estado vacío:

```text
No movies found
We could not find any movie matching "matrix". Try a different title.
```

El contenedor del estado vacío también usa `role="status"` y conserva el
`id="premieres"`, por lo que el resultado del filtro es accesible y sigue siendo
el destino del buscador. El campo tiene `aria-controls="premieres"`.

El buscador se integró en el banner (`Hero`) junto al acceso a los horarios. Al
enviar el formulario, `App` evita el envío tradicional con
`event.preventDefault()` y desplaza la vista hasta la cartelera:

```jsx
const handleSearchSubmit = (event) => {
  event.preventDefault()

  const billboard = document.getElementById('premieres')
  if (!billboard) return

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches

  billboard.scrollIntoView({
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
    block: 'start',
  })
}
```

El desplazamiento respeta la preferencia `prefers-reduced-motion` y funciona
tanto con el botón `Search movies` como al presionar `Enter` en el campo.

---

## 7. Registro de decisiones: qué dato recuerda la aplicación y dónde vive

| Dato recordado | Componente donde vive | Tipo | Por qué se decidió ahí |
| --- | --- | --- | --- |
| `favoriteIds` | `App` | `useState` + inicialización desde `localStorage` | Es el ancestro común de la interfaz; una sola lista evita duplicar estado entre tarjetas y permite persistirla en un único lugar. |
| `searchTerm` | `App` | `useState` | El buscador está en `Hero` y la lista en `MovieList`; el texto debe compartirse entre ambos, así que se eleva al ancestro común. |
| `debouncedSearchTerm` | `App`, a través de `useDebouncedValue` | valor derivado con estado interno del hook | Evita filtrar en cada pulsación sin obligar a sincronizar manualmente dos estados. La lista consume el valor ya estabilizado. |
| `isFavorite` | `MovieCard` | prop derivada de `favoriteIds` | La tarjeta solo necesita saber si esa película está en la lista; no debe mantener una copia que pueda quedar obsoleta. |
| `visibleMovies` | `MovieList` | valor derivado de `movies` y `searchTerm` | Se calcula en el render a partir de las props; guardarlo en estado obligaría a actualizarlo con efectos y crearía otra fuente de verdad. |
| Estado visual del botón | `MovieCard` | derivado de `isFavorite` | La estrella, el texto de la acción y `aria-pressed` se calculan con el mismo dato, sin estado adicional. |
| Favoritas guardadas | `localStorage` | persistencia externa | Deben sobrevivir a una recarga; se leen al iniciar y se escriben cuando cambia `favoriteIds`. |
| Texto de búsqueda guardado | — | no se persiste | Es una consulta temporal de la sesión; recuperarla al volver a abrir la página no aporta valor y puede confundir. |

Regla aplicada: **el estado mínimo indispensable vive en `App`; todo lo demás se
deriva de props o se encapsula en un hook**. No se usó `useEffect` para
sincronizar datos que pueden calcularse durante el render.

---

## 8. Evidencia del estado vacío

La captura se tomó con el texto `matrix`, que no coincide con ninguna de las
ocho películas. Se observan el buscador en el banner, la cartelera sin tarjetas
y el mensaje de estado vacío:

![Estado vacío del buscador de películas](./evidence/empty-search.png)

La misma situación se comprobó en el DOM: `0` tarjetas renderizadas y el texto
`No movies found` dentro de `#premieres`.

---

## 9. Verificación técnica

| Comprobación | Resultado |
| --- | --- |
| `npm run build` | Compila correctamente: 26 módulos transformados, sin errores |
| `npm run lint` | Oxlint termina sin advertencias ni errores |
| Filtrado con coincidencias | `inter` muestra 1 de 8 películas (`Interstellar`) |
| Filtrado sin coincidencias | `matrix` muestra el estado vacío y `0` tarjetas |
| Favorita y recarga | Se guarda `[2]` en `localStorage`; tras recargar, la tarjeta sigue marcada |
| Envío del buscador | Desplaza la vista hasta `#premieres` |
| Consola | El filtro se aplica unos 400 ms después de la última pulsación |

---

## 10. Commits de esta etapa

El trabajo se dividió en commits temáticos para que cada cambio sea revisable:

| Commit | Contenido |
| --- | --- |
| `feat(paso-13): add reusable Button and extend base form styles` | `Button`, estilos de botones, formularios, tipografía y utilidades |
| `feat(paso-14): add favorites state with localStorage persistence` | Estado de favoritas y utilidades de almacenamiento |
| `feat(paso-15): add favorite button to MovieCard via props` | Botón de favorita, props y estilos de la tarjeta |
| `feat(paso-16): add controlled MovieSearch with debounced input` | Buscador controlado, hook de retardo y trazas de consola |
| `feat(paso-17): filter MovieList and integrate search in Hero banner` | Filtrado, estado vacío, integración en el banner y estilos responsivos |
| `docs(paso-18): document state decisions and add empty-state evidence` | Este entregable, la captura y la actualización del README |

El historial completo puede revisarse con:

```bash
git log --oneline --decorate
```

---

## 11. Alcance y siguientes pasos

La aplicación sigue siendo un prototipo frontend con datos locales: no hay
backend, autenticación ni pruebas automatizadas. Las favoritas se guardan por
navegador, no por usuario. Como siguientes pasos se podrían agregar pruebas de
los componentes con Testing Library, un contador de favoritas en el encabezado,
un filtro por clasificación o género y la sincronización de las favoritas con
una cuenta real.
