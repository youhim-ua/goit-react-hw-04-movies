import { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { fetchPopularMovies } from '../../services/moviesAPI';
import styles from './HomePage.module.css';

class HomePage extends Component {
  state = {
    popularMovie: [],
  };

  componentDidMount() {
    fetchPopularMovies()
      .then(response => this.setState({ popularMovie: [...response] }))
      .catch(error => console.log(error));
  }

  render() {
    const { popularMovie } = this.state;
    const { location } = this.props;

    return (
      <>
        <h1 className={styles.mainTitle}>Popular movies</h1>
        <ul className={styles.moviesList}>
          {popularMovie.map(
            ({ id, title, name, poster_path, vote_average }) => (
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
                      <span className={styles.voteRate}>{vote_average}</span>
                      <img
                        src={`https://image.tmdb.org/t/p/w780${poster_path}`}
                        alt={title || name}
                        width="200"
                      />
                    </div>
                    <p className={styles.movieTitle}>{title}</p>
                  </div>
                </Link>
              </li>
            ),
          )}
        </ul>
      </>
    );
  }
}

export default withRouter(HomePage);
