import { Component } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { fetchMovieByQuery } from '../../services/moviesAPI';
import styles from './MoviePage.module.css';
import noImage from '../../components/DefaultImage/no-img.png';

class MoviePage extends Component {
  state = {
    value: '',
    searchedMovies: null,
  };

  componentDidMount() {
    const { location } = this.props.history;
    if (location.search === '') return;
    const parsed = queryString.parse(location.search);
    fetchMovieByQuery(parsed.query).then(({ results }) =>
      this.setState({ searchedMovies: results }),
    );
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { location, history } = this.props;
    if (this.state.value !== '') {
      fetchMovieByQuery(this.state.value).then(({ results }) =>
        this.setState({ searchedMovies: results }),
      );
    }
    history.push({ ...location, search: `query=${this.state.value}` });
  };

  render() {
    const { value, searchedMovies } = this.state;
    const { location } = this.props;

    return (
      <>
        <form onSubmit={this.handleSubmit} className={styles.searchForm}>
          <label>
            <input
              type="phone"
              value={value}
              onChange={this.handleChange}
              placeholder="Enter name of the movie"
              autoFocus
              autoComplete="on"
              className={styles.input}
            />
          </label>
          <button type="submit" className={styles.searchButton}>
            Search
          </button>
        </form>
        {searchedMovies !== null && (
          <section>
            <h2 className={styles.mainTitle}>
              Matches movies by your request:
            </h2>
            <ul className={styles.moviesList}>
              {searchedMovies.map(
                ({ id, title, name, poster_path, vote_average }) => {
                  const url = poster_path
                    ? `https://image.tmdb.org/t/p/w780${poster_path}`
                    : noImage;

                  return (
                    <li key={id} className={styles.movieListItem}>
                      <Link
                        to={{
                          pathname: `/movies/${id}`,
                          state: {
                            from: location,
                          },
                        }}
                        className={styles.linkToFilm}
                      >
                        <div className={styles.movieCard}>
                          <div className={styles.thumb}>
                            <span className={styles.voteRate}>
                              {vote_average}
                            </span>
                            <img src={url} alt={title || name} width="200" />
                          </div>
                          <p className={styles.movieTitle}>{title}</p>
                        </div>
                      </Link>
                    </li>
                  );
                },
              )}
            </ul>
          </section>
        )}
      </>
    );
  }
}

export default MoviePage;
