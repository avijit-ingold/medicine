import React, { useState, useEffect, useContext } from 'react';
import styles from './ShopByCategories.module.css';
import { Eye } from 'react-bootstrap-icons';
import { GenericApiContext } from '../../context/GenericApiContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { encryptData, decryptData } from "../../utils/CryptoUtils";
import { useNavigate } from 'react-router-dom';

const ShopByCategories = () => {

  const [selectedCategory, setSelectedCategory] = useState(null)
  const [categories, setCategories] = useState([]);
  const [categoryEncryptedArray, setCategoryEncryptedArray] = useState([]);
  
  const context = useContext(GenericApiContext)
  const navigate = useNavigate();

  const handleCategoryClick = (param, id) => {
    setSelectedCategory(param);
    redirect(id);
  }

  const redirect = (id) => {
    navigate(`/category/${categoryEncryptedArray[id - 1]}`);
    // setShowCategories(false)
  }

  useEffect(() => {
    const categoriesImage = () => {
      const url = 'getCategory'

      context.getGetData(url, 'categories');
    }

    categoriesImage();
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
          context.getCategoryData.data.map((ele) => {
            const encrypted = encryptData(ele.id);
            tempArray.push(encrypted);
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
                    <LazyLoadImage effect="blur" src={category.image_url} wrapperProps={{
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
