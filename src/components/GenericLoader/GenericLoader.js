import React from 'react';
import PropTypes from 'prop-types';
import styles from './GenericLoader.module.css';

const GenericLoader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.inner + ' ' + styles.one}></div>
      <div className={styles.inner + ' ' + styles.two}></div>
      <div className={styles.inner + ' ' + styles.three}></div>
    </div>
  )
};



export default GenericLoader;
