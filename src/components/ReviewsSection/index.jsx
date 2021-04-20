import { Component } from 'react';
import styles from './ReviewsSection.module.css';

class ReviewsSection extends Component {
  render() {
    const { reviews } = this.props;

    return (
      <section>
        {reviews.length > 0 ? (
          <ul className={styles.reviewsList}>
            {reviews.map(({ author, content, id }) => (
              <li key={id}>
                <h3>Review from {author}</h3>
                <p>{content}</p>
              </li>
            ))}
          </ul>
        ) : (
          'No reviews yet!'
        )}
      </section>
    );
  }
}

export default ReviewsSection;
