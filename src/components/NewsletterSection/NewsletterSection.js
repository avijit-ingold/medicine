import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './NewsletterSection.module.css';
import GoogleThumbnail from '../../assets/images/Medical/google-thumbnail.png';
import IosThumbnail from '../../assets/images/Medical/ios-thumbnail.png'

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Subscribed with email: ${email}`);
  };


  return (
    <div className={styles.newsLetterSection_container_main}>
      <div className={styles.newsLetterSection_container + ' container row'}>
        <div className={styles.newsLetterSection_right_container + ' col-7'}>
          <span className={styles.newsLetterSection_text_heading}>Sign Up For Newsletter</span>
          <span className={styles.newsLetterSection_text_sub_heading}>Join 60,000+ Subscriber and get a new discount coupon every Saturday</span>
        </div>
        <div className={styles.newsLetterSection_left_container + ' col-5'}>
          <span className={styles.downloadNow_text} > Download the app now! </span>
          <div className={styles.downloadNow_container}>
            <div className={styles.downloadNow_google_container}>
              <img className={styles.downloadNow_img} src={GoogleThumbnail} alt='google-thumbnail' />
            </div>
            <div className={styles.downloadNow_ios_container}>
              <img className={styles.downloadNow_img} src={IosThumbnail} alt='ios-thumbnail' />
            </div>
          </div>
        </div>
        <div>
          <form className={styles.subscribe_form} onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">SUBSCRIBE</button>
          </form>
        </div>
      </div>
    </div>
  )
};


export default NewsletterSection;
