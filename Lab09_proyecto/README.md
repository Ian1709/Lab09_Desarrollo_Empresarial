# CineStar — Cartelera de cine

Aplicación web académica desarrollada con React y Vite para mostrar la cartelera de CineStar. Presenta una película destacada, información de ocho películas, sus clasificaciones, valoraciones y horarios disponibles, además de navegación y datos de contacto.

## Autores y aportes

El historial de Git registra las contribuciones de ambos integrantes:

| Integrante | Aportes registrados |
| --- | --- |
| **Ian1721** | Pasos 1–6: inicialización del proyecto React con Vite; limpieza del código base; estructura de carpetas y estilos globales; creación de los datos de ocho películas; componentes Header y Footer. |
| **nikolaisuarez** | Pasos 7–12: componente Hero para la película destacada; componente MovieCard y estilos responsivos; componente MovieList con claves; composición de la aplicación; documentación de tres errores comunes de React; verificación final y publicación de los cambios. |

## Funcionalidades

- Encabezado con marca CineStar y navegación a las secciones de la página.
- Banner destacado con imagen, sinopsis, clasificación, valoración y acceso a horarios.
- Cartelera renderizada desde datos locales mediante componentes reutilizables.
- Tarjetas con póster, título, valoración, clasificación y horarios disponibles.
- Diseño adaptable a distintos tamaños de pantalla y preferencias de movimiento reducido.
- Pie de página con contacto, enlaces y horario de atención.
- Registro de ejemplos y soluciones de errores comunes en [`ERRORS_LOG.md`](./ERRORS_LOG.md).

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
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── MovieCard.jsx
│   └── MovieList.jsx
├── data/
│   └── movies.js
├── styles/
│   └── App.css
├── App.jsx
└── main.jsx
ERRORS_LOG.md
```

Los datos de las películas se mantienen en `src/data/movies.js`; `App.jsx` los entrega a `Hero` y `MovieList` mediante props. `MovieList` crea una tarjeta por película y utiliza `movie.id` como clave.

## Errores comunes documentados

`ERRORS_LOG.md` describe tres casos de aprendizaje: usar `class` en JSX en lugar de `className`, devolver varios nodos raíz sin agruparlos y omitir la prop `key` al iterar. Incluye el mensaje esperado y la solución de cada caso. La aplicación final mantiene las soluciones aplicadas.

## Repositorio

[Lab09_Desarrollo_Empresarial en GitHub](https://github.com/Ian1709/Lab09_Desarrollo_Empresarial)
