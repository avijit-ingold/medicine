import React, { useState, useEffect, useContext, useRef } from 'react';
import ProductImage from '../../assets/images/Medical/Layer 13.png'
import styles from './ProductSecond.module.css';
import { Heart, Eye, HeartFill } from 'react-bootstrap-icons';
import { GenericApiContext } from '../../context/GenericApiContext';
import { encryptData, decryptData } from "../../utils/CryptoUtils";
import { useLocation, useNavigate } from 'react-router-dom';
import RedirectModal from '../RedirectModal/RedirectModal';
import Layer1 from '../../assets/images/Medical/Layer 2.png'
import Layer2 from '../../assets/images/Medical/Layer 5.png'
import Layer3 from '../../assets/images/Medical/Layer 6.png'
import Layer4 from '../../assets/images/Medical/Layer 7.png'
import Layer5 from '../../assets/images/Medical/Layer 8.png'
import Layer6 from '../../assets/images/Medical/Layer 10.png'
import Layer7 from '../../assets/images/Medical/Layer 12.png'

const ProductSecond = ({ productObject, parent, images }) => {
  const [wishlistState, setWishListState] = useState(false);
  const [loggedinData, setLoggedInData] = useState();
  const [productId, setProductId] = useState('');
  const [showModal, setShowModal] = useState(false);

  const context = useContext(GenericApiContext);
  const navigate = useNavigate();
  const childRef = useRef(null);
  const locationSelf = useLocation()

  const image = [Layer1, Layer2, Layer3, Layer4, Layer5, Layer6, Layer7]

  const handleWishList = (id) => {
    const loginDetail = JSON.parse(sessionStorage.getItem('loginDetails'))
    if (loginDetail) {
      if (!wishlistState) {
        const url = `wishlist/add`
        const reqBody = {
          "customerId": loginDetail.id,
          "productId": productObject.id
        }
        context.getPostDataQuick(url, 'addWishList', reqBody);
      } else {
        const url = `wishlist/remove`
        const reqBody = {
          "customerId": loginDetail.id,
          "productId": productObject.id
        }
        context.getPostDataQuick(url, 'sad', reqBody);
      }
    } else {
      setShowModal(true)
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
      const encrypted = encryptData(productObject.sku);
      setProductId(encrypted);
    };

    handleEncrypt();

    if (productObject.wishlist == '0') {
      setWishListState(false);
    } else {
      setWishListState(true)
    }

  }, [productObject])

  useEffect(() => {
    if (childRef.current && parent != 'CategoryPage') {
      const parent = childRef.current.parentElement;
      if (parent) {
        parent.style.display = "flex";
        parent.style.justifyContent = "center";
      }
    }
  }, []);


  return (
    <>

      <div className={parent == 'related' ? styles.minWidthCard : styles.card} ref={childRef}>
        <div className={styles.card_image}>
          <div className={styles.card_header}>
            <button className={styles.wishlist_button + ' ' + (wishlistState ? styles.is_active : '')} onClick={() => handleWishList(productObject.id)}>{wishlistState ? (<HeartFill color='#e64141' />) : (<Heart />)}</button>
          </div>
          <img src={images} alt="Product" />
          <div className={styles.cart_button}>
            <button className={styles.eyeButton} onClick={() => redirect(productId)}><Eye /></button>
          </div>
        </div>
        <div className={styles.card_content}>
          <p className={styles.product_title}>{productObject.name}</p>
          <p className={styles.product_price}>
            {productObject.special_price && (
              <span className={styles.old_price}>{"€" + ' ' + parseInt(productObject.price).toFixed(2)}</span>
            )}
            <span className={styles.new_price}>{productObject.special_price ? "€" + ' ' + parseInt(productObject.special_price).toFixed(2) : "€" + ' ' + parseInt(productObject.price).toFixed(2)}</span>
          </p>
        </div>
      </div>
      <RedirectModal show={showModal} location={locationSelf} />
    </>
  )
};

export default ProductSecond;
