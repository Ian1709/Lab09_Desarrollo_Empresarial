import { adaptMovies } from '../utils/movieAdapter.js'

/**
 * Raw billboard payload, shaped like an external movie API response.
 * It is passed through adaptMovies before reaching the UI.
 */
export const movieCatalog = [
  {
    movieId: 1,
    title: 'Inception',
    posterUrl: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    overview:
      'A skilled thief who steals secrets from dreams is offered a chance to erase his past by planting an idea in a target mind.',
    ageRating: 'PG-13',
    voteAverage: 8.8,
    showtimes: ['14:30', '17:45', '20:30'],
  },
  {
    movieId: 2,
    title: 'Interstellar',
    posterUrl: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    overview:
      'A team of explorers travels through a wormhole in search of a new home for humanity as Earth becomes uninhabitable.',
    ageRating: 'PG-13',
    voteAverage: 8.7,
    showtimes: ['13:00', '16:30', '21:00'],
  },
  {
    movieId: 3,
    title: 'The Dark Knight',
    posterUrl: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    overview:
      'Batman faces the Joker, a criminal mastermind who pushes Gotham City into chaos and tests the hero’s moral limits.',
    ageRating: 'PG-13',
    voteAverage: 9.0,
    showtimes: ['15:15', '18:00', '21:30'],
  },
  {
    movieId: 4,
    title: 'Dune: Part Two',
    posterUrl: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
    overview:
      'Paul Atreides unites with the Fremen to seek revenge against the conspirators who destroyed his family and decide the fate of the universe.',
    ageRating: 'PG-13',
    voteAverage: 8.5,
    showtimes: ['12:45', '16:00', '19:45', '22:15'],
  },
  {
    movieId: 5,
    title: 'Oppenheimer',
    posterUrl: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    overview:
      'The story of J. Robert Oppenheimer and the scientific team that developed the atomic bomb during the Second World War.',
    ageRating: 'R',
    voteAverage: 8.4,
    showtimes: ['14:00', '17:30', '20:45'],
  },
  {
    movieId: 6,
    title: 'Spider-Man: Across the Spider-Verse',
    posterUrl: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
    overview:
      'Miles Morales returns for an adventure across the multiverse, where he must redefine what it means to be a hero.',
    ageRating: 'PG',
    voteAverage: 8.6,
    showtimes: ['11:30', '14:15', '17:00', '19:30'],
  },
  {
    movieId: 7,
    title: 'The Batman',
    posterUrl: 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg',
    overview:
      'In his second year of fighting crime, Batman uncovers corruption in Gotham City while tracking a serial killer known as the Riddler.',
    ageRating: 'PG-13',
    voteAverage: 7.8,
    showtimes: ['15:00', '18:30', '21:45'],
  },
  {
    movieId: 8,
    title: 'Top Gun: Maverick',
    posterUrl: 'https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg',
    overview:
      'After more than thirty years of service, Maverick trains a group of elite pilots for a mission that demands the ultimate sacrifice.',
    ageRating: 'PG-13',
    voteAverage: 8.3,
    showtimes: ['13:30', '16:45', '20:00'],
  },
]

export const movies = adaptMovies(movieCatalog)
