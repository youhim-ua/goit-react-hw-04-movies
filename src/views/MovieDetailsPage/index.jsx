import { Component, lazy, Suspense } from 'react';
import { NavLink, Route } from 'react-router-dom';
import {
  fetchOneMovies,
  fetchMovieActors,
  fetchMovieReviews,
} from '../../services/moviesAPI';
import styles from './MovieDetailsPage.module.css';
import noImage from '../../components/DefaultImage/no-img.png';
import routes from '../../routes';

const CastSection = lazy(() =>
  import('../../components/CastSection' /* webpackChunkName: "CastSection" */),
);
const ReviewsSection = lazy(() =>
  import(
    '../../components/ReviewsSection' /* webpackChunkName: "ReviewsSection" */
  ),
);

class MovieDetailsPage extends Component {
  state = {
    poster_path: null,
    title: null,
    name: null,
    release_date: null,
    vote_average: null,
    overview: null,
    genres: [],
    actors: [],
    reviews: [],
  };

  componentDidMount() {
    const { movieID } = this.props.match.params;

    fetchOneMovies(movieID)
      .then(data => this.setState({ ...data }))
      .catch(error => console.log(error));

    fetchMovieActors(movieID)
      .then(({ cast }) => this.setState({ actors: cast }))
      .catch(error => console.log(error));

    fetchMovieReviews(movieID)
      .then(({ results }) => this.setState({ reviews: results }))
      .catch(error => console.log(error));
  }

  handleGoBack = () => {
    const { location, history } = this.props;
    history.push(location?.state?.from || '/');
  };

  render() {
    const {
      poster_path,
      title,
      name,
      release_date,
      vote_average,
      overview,
      genres,
      actors,
      reviews,
    } = this.state;
    const { location } = this.props;

    const imgURL = poster_path
      ? `https://image.tmdb.org/t/p/w780${poster_path}`
      : noImage;

    return (
      <main>
        <section>
          <button
            type="button"
            onClick={this.handleGoBack}
            className={styles.backButton}
          >
            Go back
          </button>
          <div className={styles.filmInfo}>
            <div className={styles.poster}>
              <img src={imgURL} alt={title || name} width="320" />
            </div>
            <div>
              <h1>{title || name}</h1>
              <span>{release_date}</span>
              <p>
                User score: <b>{vote_average * 10} %</b>
              </p>
              <h2>Overview</h2>
              <p>{overview}</p>
              <h3>Genres</h3>
              <ul className={styles.genresList}>
                {genres.map(genre => (
                  <li key={genre.id} className={styles.genresListItem}>
                    {genre.name} |
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <section>
          <h4>Additional information</h4>
          <ul className={styles.moreInfoList}>
            <li key="actors">
              <NavLink
                to={{
                  pathname: `${this.props.match.url}/actors`,
                  state: {
                    from: location,
                  },
                }}
              >
                Cast
              </NavLink>
            </li>
            <li key="reviews">
              <NavLink
                to={{
                  pathname: `${this.props.match.url}/reviews`,
                  state: {
                    from: location,
                  },
                }}
              >
                Reviews
              </NavLink>
            </li>
          </ul>
        </section>
        <Suspense fallback={<div>Loading...</div>}>
          <Route
            exact
            path={`${this.props.match.path}${routes.cast}`}
            render={props => <CastSection {...props} actors={actors} />}
          />
          <Route
            exact
            path={`${this.props.match.path}${routes.reviews}`}
            render={props => <ReviewsSection {...props} reviews={reviews} />}
          />
        </Suspense>
      </main>
    );
  }
}

export default MovieDetailsPage;
