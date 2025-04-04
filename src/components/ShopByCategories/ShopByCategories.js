import React, { useState, useEffect, useContext } from 'react';
import styles from './ShopByCategories.module.css';
import { Eye } from 'react-bootstrap-icons';
import { GenericApiContext } from '../../context/GenericApiContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { encryptData, decryptData } from "../../utils/CryptoUtils";
import { useNavigate } from 'react-router-dom';
import Layer1 from '../../assets/images/Medical/Layer 2.png'
import Layer2 from '../../assets/images/Medical/Layer 5.png'
import Layer3 from '../../assets/images/Medical/Layer 6.png'
import Layer4 from '../../assets/images/Medical/Layer 7.png'
import Layer5 from '../../assets/images/Medical/Layer 8.png'
import Layer6 from '../../assets/images/Medical/Layer 10.png'
import Layer7 from '../../assets/images/Medical/Layer 12.png'


const ShopByCategories = () => {

  const [selectedCategory, setSelectedCategory] = useState(null)
  const [categories, setCategories] = useState([]);
  const [categoryEncryptedArray, setCategoryEncryptedArray] = useState([]);

  const context = useContext(GenericApiContext)
  const navigate = useNavigate();

  const handleCategoryClick = (param, id) => {
    setSelectedCategory(param);
    redirect(param);
  }

  const image = [Layer1, Layer2, Layer3, Layer4, Layer5, Layer6, Layer7]

  const redirect = (id) => {
    navigate(`/category/${categoryEncryptedArray[id]}`);
    // setShowCategories(false)
  }

  useEffect(() => {
    const categoriesImage = () => {
      const url = 'b2c/getCategory'

      context.getGetData(url, 'categories');
    }
    setTimeout(() => {
      categoriesImage();
    }, 1000)

  }, [])

  useEffect(() => {
    if (context.getCategoryData) {
      if (context.getCategoryData.data) {
        setCategories(context.getCategoryData.data)
      }
    }
  }, [context.getCategoryData])

  useEffect(() => {
    if (context.getCategoryData) {
      var tempArray = []
      if (context.getCategoryData.data) {
        if (context.getCategoryData.data.length > 0) {
          // console.log(context.getCategoryData.data, 'context.getCategoryData.data')
          context.getCategoryData.data.map((ele) => {
            const encrypted = encryptData(ele.id);
            tempArray.push(encrypted);
            // console.log(encrypted, ele.id)
          })
        }
      }
      setCategoryEncryptedArray(tempArray);
    }

  }, [context.getCategoryData])


  return (
    <>
      <div className={`container ${styles.categories_component_main}`}>
        <div className={styles.categories_heading_container}>
          <span className={styles.categories_heading_text}>SHOP BY CATEGORIES</span>
        </div>
        <div className={styles.categories_grid_container}>
          {
            categories && categories.map((category, ind) => {
              return (
                <div className={styles.categories_grid_item_container} key={ind} onClick={() => handleCategoryClick(ind, category.id)}>
                  <div className={styles.categories_grid_image_container}>
                    <LazyLoadImage referrerPolicy='no-referrer' effect="blur" src={image[ind]} wrapperProps={{
                      style: { transitionDelay: "1s" },
                    }} alt='categories' loading="lazy"
                      className={styles.categories_img + ' ' + (category.scaleReq ? styles.categories_cale_property : '')}
                    />
                  </div>
                  {selectedCategory === ind && (
                    <div className={styles.categories_grid_image_overlay}>
                      <Eye size={30} color='white' />
                    </div>
                  )}
                  <div className={styles.categories_text_container}>
                    <span className={styles.categories_text}>{category.name}</span>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
};

export default ShopByCategories;
