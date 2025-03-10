import React from 'react';
import styles from './ProductReviewComponent.module.css';

const ProductReviewComponent = () => {

  const reviews = [
    {
      created: '2/29/24',
      productName: 'Product1',
      rating: '5',
      review: 'sfsfsdfs s sfs',
      detailsLink: '#',
    },
  ];
  return (
    <div className={styles.product_reviews_container}>
      <h1>My Product Reviews</h1>
      <table className={styles.reviews_table}>
        <thead>
          <tr>
            <th>Created</th>
            <th>Product Name</th>
            <th>Rating</th>
            <th>Review</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review, index) => (
            <tr key={index}>
              <td>{review.created}</td>
              <td>{review.productName}</td>
              <td>{review.rating}</td>
              <td>
                {review.review} <a href={review.detailsLink}>See Details</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <label htmlFor="perPage">Show </label>
        <select id="perPage">
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
        <span> per page</span>
      </div>
    </div>
  )
};

export default ProductReviewComponent;
