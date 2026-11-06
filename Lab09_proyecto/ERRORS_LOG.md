# Registro de errores comunes de React

Este documento recoge tres errores didácticos, el mensaje que muestran las herramientas y la corrección aplicada. Los fragmentos de la columna «Ejemplo que provoca el error» son ilustrativos y no forman parte de la aplicación final.

## 1. Usar `class` en JSX

**Ejemplo que provoca el error:**

```jsx
function Example() {
  return <div class="movie-card">Movie</div>
}
```

**Mensaje de consola (React):**

```text
Invalid DOM property `class`. Did you mean `className`?
```

**Solución aplicada:** En JSX se utiliza `className` para asignar clases CSS. Los componentes del proyecto usan esa propiedad.

```jsx
<div className="movie-card">Movie</div>
```

## 2. Devolver dos nodos raíz

**Ejemplo que provoca el error:**

```jsx
function Example() {
  return (
    <h1>Now showing</h1>
    <p>Choose a movie.</p>
  )
}
```

**Mensaje del compilador JSX (Vite/esbuild):**

```text
Adjacent JSX elements must be wrapped in an enclosing tag.
Did you want a JSX fragment <>...</>?
```

**Solución aplicada:** Ambos nodos se agrupan dentro de un elemento contenedor o un fragmento.

```jsx
function Example() {
  return (
    <>
      <h1>Now showing</h1>
      <p>Choose a movie.</p>
    </>
  )
}
```

## 3. Omitir `key` al renderizar una lista

**Ejemplo que provoca el error:**

```jsx
function MovieList({ movies }) {
  return movies.map((movie) => <MovieCard movie={movie} />)
}
```

**Mensaje de consola (React):**

```text
Each child in a list should have a unique "key" prop.
```

**Solución aplicada:** Cada elemento directo de la lista recibe una clave estable y única. La lista de cartelera usa el identificador de cada película.

```jsx
movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
```

## Alcance de la evidencia

Los mensajes anteriores corresponden a las herramientas indicadas y a los fragmentos mínimos mostrados; no son una transcripción de una captura tomada durante esta entrega. Se documentan los casos y sus soluciones sin introducir fallos en la aplicación final.

## Verificación final

- `npm run build`: compilación de producción completada correctamente.
- `npm run lint`: finalizado sin errores ni advertencias.
- La aplicación final conserva `className`, un único nodo raíz por retorno y `key={movie.id}` al recorrer películas.
