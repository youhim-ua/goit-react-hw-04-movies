import { Component } from 'react';
import styles from './CastSection.module.css';
import noImage from '../DefaultImage/no-img.png';

class CastSection extends Component {
  render() {
    const { actors } = this.props;

    return (
      <section>
        <ul className={styles.castList}>
          {actors.map(({ name, character, profile_path, cast_id }) => {
            const url = profile_path
              ? `https://image.tmdb.org/t/p/w500${profile_path}`
              : noImage;

            return (
              <li key={cast_id}>
                <div>
                  <img src={url} alt={`actor ${name}`} width="320" />
                </div>
                <div>
                  <p>
                    <b>{name}</b>
                  </p>
                  <p>Character:</p>
                  <p>{character}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}

export default CastSection;
