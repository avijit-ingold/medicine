import React, { useState, useEffect, useContext } from 'react';
import ProductImage from '../../assets/images/Medical/Layer 13.png'
import styles from './ProductSecond.module.css';
import { Heart, Eye, HeartFill } from 'react-bootstrap-icons';
import { GenericApiContext } from '../../context/GenericApiContext';
import { encryptData, decryptData } from "../../utils/CryptoUtils";
import { useNavigate } from 'react-router-dom';

const ProductSecond = ({ productObject }) => {
  const [wishlistState, setWishListState] = useState(false);
  const [loggedinData, setLoggedInData] = useState();
  const [productId, setProductId] = useState('');

  const context = useContext(GenericApiContext);
  const navigate = useNavigate();

  const handleWishList = (id) => {

    if (!wishlistState) {
      const url = `wishlists-add-product?product_id=${id}&user_id=${loggedinData.user.id}`
      context.getGetDataQuick(url, '');
    } else {
      const url = `wishlists-remove-product?product_id=${id}&user_id=${loggedinData.user.id}`
      context.getGetDataQuick(url, 'sad');
    }

    setWishListState(!wishlistState);
  }

  const redirect = (productId) => {
    navigate(`/productDetails/${productId}`);
  }

  useEffect(() => {
    setLoggedInData(JSON.parse(sessionStorage.getItem('loginDetails')));
  }, [])

  useEffect(() => {
    const handleEncrypt = () => {
      const encrypted = encryptData(productObject.id);
      setProductId(encrypted);
    };

    handleEncrypt();
  }, [productObject])


  return (
    <div className={styles.card}>
      <div className={styles.card_image}>
        <div className={styles.card_header}>
          <button className={styles.wishlist_button + ' ' + (wishlistState ? styles.is_active : '')} onClick={() => handleWishList(productObject.id)}>{wishlistState ? (<HeartFill color='#e64141' />) : (<Heart />)}</button>
        </div>
        <img src={productObject.thumbnail_image} alt="Product" />
        <div className={styles.cart_button}>
          <button onClick={() => redirect(productId)}><Eye /></button>
        </div>
      </div>
      <div className={styles.card_content}>
        <p className={styles.product_title}>{productObject.name}</p>
        <p className={styles.product_price}>
          <span className={styles.old_price}>{productObject.stroked_price}</span>
          <span className={styles.new_price}>{productObject.main_price}</span>
        </p>
      </div>
    </div>
  )
};

export default ProductSecond;
