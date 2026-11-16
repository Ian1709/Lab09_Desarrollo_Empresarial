/**
 * Raw premiere payload, shaped like the response of an external movie
 * service. The UI only receives the adapted model.
 */
export const premiereCatalog = [
  {
    movieId: 101,
    title: 'Inception: 15th Anniversary',
    posterUrl: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    overview:
      'Christopher Nolan’s dream-heist thriller returns to the big screen with a restored presentation and a new behind-the-scenes featurette.',
    ageRating: 'PG-13',
    voteAverage: 8.8,
    showtimes: ['19:00', '22:00'],
    releaseDate: '2026-11-20',
  },
  {
    movieId: 102,
    title: 'Interstellar: IMAX Re-release',
    posterUrl: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    overview:
      'A limited IMAX engagement of the space epic, with remastered sound and a conversation with the visual effects team.',
    ageRating: 'PG-13',
    voteAverage: 8.7,
    showtimes: ['18:30', '21:30'],
    releaseDate: '2026-11-27',
  },
  {
    movieId: 103,
    title: 'The Dark Knight: Remastered',
    posterUrl: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    overview:
      'Gotham’s darkest chapter returns in a remastered edition, followed by a fan discussion about the legacy of the Joker.',
    ageRating: 'PG-13',
    voteAverage: 9.0,
    showtimes: ['20:00'],
    releaseDate: '2026-12-04',
  },
  {
    movieId: 104,
    title: 'Dune: Part Two — Extended Cut',
    posterUrl: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
    overview:
      'Denis Villeneuve’s desert epic returns with additional footage and a special introduction recorded for CineStar audiences.',
    ageRating: 'PG-13',
    voteAverage: 8.5,
    showtimes: ['17:45', '21:15'],
    releaseDate: '2026-12-11',
  },
]
