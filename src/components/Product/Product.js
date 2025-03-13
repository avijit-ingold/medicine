import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './Product.module.css';
import { Rating, RoundedStar } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { ArrowRightCircle } from 'react-bootstrap-icons';
import { redirect, useNavigate } from 'react-router-dom';
import { encryptData, decryptData } from "../../utils/CryptoUtils";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { GenericApiContext } from '../../context/GenericApiContext';

const Product = ({ productObject, parent , ele}) => {
  const [productId, setProductId] = useState('');

  const context = useContext(GenericApiContext);

  const myStyles = {
    itemShapes: RoundedStar,
    activeFillColor: '#ffb700',
    inactiveFillColor: '#fbf1a9'
  }

  const navigate = useNavigate();


  const convertDateToString = (dateString) => {
    const [day, month, year] = dateString.split('/');
    const date = new Date(`${year}-${month}-${day}`);

    if (isNaN(date)) {
      return 'Invalid date';
    }
    return date.toDateString();
  };

  const handleConvert = (param) => {
    const inputDate = param;
    const formattedDate = convertDateToString(inputDate);

    return formattedDate;
  };

  const redirect = (productId) => {
    navigate(`/productDetails/${productId}`);
  }

  useEffect(() => {
    const handleEncrypt = () => {
      const encrypted = encryptData(productObject.id);
      setProductId(encrypted);
    };

    handleEncrypt();
  }, [productObject])

  useEffect(() => {
    console.log(productObject, 'anish')
  })


  return (
    <>
      {parent && parent === 'newArrival' ? (
        <div className={styles.product_container_main + ' container'} onClick={() => redirect(productId)}>
          <div className={styles.product_background_container}>
            <div className={styles.product_image_container}>
              {context.loading ? (
                <Skeleton className={styles.product_image} height={150} width={150} />
              ) : (
                <img
                  src={productObject.thumbnail_image}
                  className={styles.product_image}
                  alt={productObject.name}
                />
              )}
            </div>
          </div>
          <div className={styles.product_name_container}>
            {context.loading ? (
              <Skeleton width={200} height={20} />
            ) : (
              <span className={styles.product_name_text}>{productObject.name}</span>
            )}
          </div>
          <div className={styles.product_price_container}>
            {context.loading ? (
              <>
                <Skeleton width={100} height={20} />
              </>
            ) : (
              <>
                <span className={styles.product_price_afterPrice}>
                  <strong>{productObject.stroked_price}</strong>€
                </span>
              </>
            )}
          </div>
        </div>
      )
        : parent && parent === 'CategoryPage' ?
          (
            <>
              <div className={styles.product_list_conatiner} onClick={() => redirect(productId)}>

                {context.loading ? (
                  <Skeleton width={50} height={20} />
                ) : (
                  <div className={styles.discountContainer}>
                    <p>{productObject.discount}</p>
                  </div>
                )}


                <div className={styles.product_card}>
                  {context.loading ? (
                    <Skeleton width={150} height={150} />
                  ) : (
                    <img src={productObject.thumbnail_image} alt="Product" />
                  )}
                  <div className={styles.product_info}>
                    {context.loading ? (
                      <Skeleton width="80%" height={20} />
                    ) : (
                      <p>{productObject.name}</p>
                    )}
                  </div>
                </div>
              </div>
            </>
          )
          :
          (
            <>
              <div className={styles.blog_container}>
                <div className={styles.blog_image_container}>
                  <img src={productObject.banner} className={styles.blog_image} alt='BlogImage' />
                </div>
                <div className={styles.blog_text_container}>
                  <div className={styles.date_comments_container}>
                    <span className={styles.date_comments_text}>

                      {handleConvert(productObject.postdate) + ' | 30 comments'}
                      {/* November 05,2024 | 30 comments */}
                    </span>
                  </div>
                  <span className={styles.blogs_name}>
                    {productObject.blog_name}
                  </span>
                </div>
                <div className={styles.readMore_container}>
                  <ArrowRightCircle color='grey' size={12} />
                  <span className={styles.date_comments_text}>  Read More</span>
                </div>
              </div>
            </>
          )
      }
    </>

  )
};


export default Product;
