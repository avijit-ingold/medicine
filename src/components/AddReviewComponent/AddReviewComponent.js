import React, { useContext, useState } from 'react';
import styles from './AddReviewComponent.module.css';
import { Rating, RoundedStar } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { GenericApiContext } from '../../context/GenericApiContext';

const AddReviewComponent = ({id}) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const context = useContext(GenericApiContext);

  const myStyles = {
    itemShapes: RoundedStar,
    activeFillColor: '#ffb700',
    inactiveFillColor: '#fbf1a9'
  }

  const submitReview = () => {
    const url = 'reviews/submit';

    const reqBody = { 
      "product_id": id, 
      "user_id": context.loggedinData.user.id, 
      "rating": JSON.stringify(rating), 
      "comment": review
    }

    context.getPostDataWithAuth(url,reqBody, '');
    setRating(0);
    setReview('');

    setTimeout(() => {
      const urlReviw = `reviews/product/${id}`
      context.getGetData(urlReviw, `productReviewDetails`);
    },200)
  }



  return (
    <div className={styles.add_review}>
      <h3>Add Your Review</h3>
      <div className={styles.rating_section}>
        <label>Rating:</label>
        <Rating value={rating} itemStyles={myStyles} style={{ width: '15%' }} onChange={setRating} />
      </div>
      <div className={styles.review_section}>
        <label>Review:</label>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review here..."
          rows="2"
          cols={140}
          className={styles.review_textBox}
        />
      </div>

      <div className={styles.submit_button} onClick={() => submitReview()}>
        Submit
      </div>
    </div>
  )
};


export default AddReviewComponent;
