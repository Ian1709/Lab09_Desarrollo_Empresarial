import Button from './Button.jsx'

function MovieSearch({ value = '', onChange, onSubmit }) {
  const handleChange = (event) => {
    onChange(event.target.value)
  }

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
        onChange={handleChange}
        placeholder="Search movies by title..."
        autoComplete="off"
        aria-controls="billboard-movies"
      />
      <Button type="submit" variant="primary">
        Search movies
      </Button>
    </form>
  )
}

export default MovieSearch
