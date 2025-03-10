import React, { useState, useEffect, useContext } from 'react';
import styles from './ReviewCardComponent.module.css';
import { Rating, RoundedStar } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { GenericApiContext } from '../../context/GenericApiContext';
import { HandThumbsUp, HandThumbsDown, ChevronBarDown } from 'react-bootstrap-icons';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ReviewCardComponent = ({ id, loading }) => {

  const [reviewData, setReviewData] = useState('');
  const [readMore, setReadMore] = useState(false);

  const context = useContext(GenericApiContext);

  const getReviewDetails = () => {
    const url = `reviews/product/${id}`
    context.getGetData(url, `productReviewDetails`);
  }

  useEffect(() => {
    getReviewDetails();
  }, [id])

  useEffect(() => {
    if (context.getProductReview) {
      if (context.getProductReview.data.data) {
        setReviewData(context.getProductReview.data.data)
      }
    }
  }, [context.getProductReview])

  const myStyles = {
    itemShapes: RoundedStar,
    activeFillColor: '#ffb700',
    inactiveFillColor: '#fbf1a9'
  }

  return (
    <>{
      readMore ? (
        <>

          <div key={id} className={styles.review_card}>

            {
              reviewData && reviewData.map((ele, id) => {
                return (
                  <div key={id} className={id > 0 ? styles.review_singleContainer : ''}>
                    <div className={styles.review_header}>
                      <p className={styles.review_date}>{loading ? <Skeleton width={100} /> : ele.time}</p>
                      <span className={styles.verified}>VERIFIED PURCHASE</span>
                    </div>
                    <div className={styles.review_body}>
                      <div className={styles.review_details_container}>
                        {loading ? <Skeleton circle width={50} height={50} /> : <img src={ele.avatar} className={styles.comment_review_details_img} />}
                        <h5>{loading ? <Skeleton width={120} /> : ele.user_name}</h5>
                      </div>
                      <div className={styles.stars}>
                        {loading ? <Skeleton width={100} /> : <Rating readOnly={true} value={ele.rating} itemStyles={myStyles} style={{ width: '25%' }} />}
                      </div>
                      <p className={styles.review_text}>
                        {loading ? <Skeleton count={3} /> : ele.comment}
                      </p>
                    </div>
                    <div className={styles.review_footer}>
                      <div className={styles.actions}>
                        <div className={styles.review_footer_container}>
                          {loading ? <Skeleton count={2} /> : (
                            <>
                              <p className={styles.review_review_container}>Helpful?
                                <span className="thumb"><HandThumbsUp /></span>
                                0
                                <span className="thumb"><HandThumbsDown /></span>
                                0
                              </p>
                            </>
                          )}
                          <a href="#">Report Review</a>
                        </div>
                      </div>
                    </div>
                  </div>)
              })}
            {loading ? <Skeleton width={80} /> : (
              reviewData && reviewData.length > 1 ?
                (<span className={styles.review_review_readMore} onClick={() => setReadMore(!readMore)}>Read More <ChevronBarDown /></span>)
                : (
                <>
                </>
                )
            )}
          </div>

        </>
      ) : (<>
        {
          reviewData && reviewData.length > 0 ? (
            <>
              <div className={styles.review_card}>
                <div className={styles.review_header}>
                  <p className={styles.review_date}>{loading ? <Skeleton width={100} /> : reviewData[0].time}</p>
                  <span className={styles.verified}>VERIFIED PURCHASE</span>
                </div>
                <div className={styles.review_body}>
                  <div className={styles.review_details_container}>
                    {loading ? <Skeleton circle width={50} height={50} /> : <img src={reviewData[0].avatar} className={styles.comment_review_details_img} />}
                    <h5>{loading ? <Skeleton width={120} /> : reviewData[0].user_name}</h5>
                  </div>
                  <div className={styles.stars}>
                    {loading ? <Skeleton width={100} /> : <Rating readOnly={true} value={reviewData[0].rating} itemStyles={myStyles} style={{ width: '25%' }} />}
                  </div>
                  <p className={styles.review_text}>
                    {loading ? <Skeleton count={3} /> : reviewData[0].comment}
                  </p>
                </div>
                <div className={styles.review_footer}>
                  <div className={styles.actions}>
                    <div className={styles.review_footer_container}>
                      {loading ? <Skeleton count={2} /> : (
                        <>
                          <p className={styles.review_review_container}>Helpful?
                            <span className="thumb"><HandThumbsUp /></span>
                            0
                            <span className="thumb"><HandThumbsDown /></span>
                            0
                          </p>
                        </>
                      )}


                      <a href="#">Report Review</a>
                    </div>
                  </div>
                </div>
                {loading ? <Skeleton width={80} /> : (
                  reviewData && reviewData.length > 1 ?
                    (<span className={styles.review_review_readMore} onClick={() => setReadMore(!readMore)}>Read More <ChevronBarDown /></span>)
                    : (<>
                    </>)
                )}
              </div>
            </>
          ) : <></>
        }
      </>)
    }


    </>
  )
};


export default ReviewCardComponent;
