import React, { useState, useEffect, useContext } from 'react';
import styles from './ShopByCategories.module.css';
import { Eye } from 'react-bootstrap-icons';
import { GenericApiContext } from '../../context/GenericApiContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ShopByCategories = () => {

  const [selectedCategory, setSelectedCategory] = useState(null)
  const [categories, setCategories] = useState([]);
  const context = useContext(GenericApiContext)

  // const categories = [
  //   {
  //     name: "Lorem Ipsum",
  //     img: Layer1,
  //     scaleReq: false
  //   }, {
  //     name: "Lorem Ipsum",
  //     img: Layer2,
  //     scaleReq: false
  //   }, {
  //     name: "Lorem Ipsum",
  //     img: Layer3,
  //     scaleReq: false
  //   }, {
  //     name: "Lorem Ipsum",
  //     img: Layer4,
  //     scaleReq: true
  //   }, {
  //     name: "Lorem Ipsum",
  //     img: Layer5,
  //     scaleReq: false
  //   }, {
  //     name: "Lorem Ipsum",
  //     img: Layer6,
  //     scaleReq: true
  //   }, {
  //     name: "Lorem Ipsum",
  //     img: Layer7,
  //     scaleReq: false
  //   }, {
  //     name: "Lorem Ipsum",
  //     img: Layer8,
  //     scaleReq: true
  //   },
  // ]

  const handleCategoryClick = (param) => {
    setSelectedCategory(param)
  }

  useEffect(() => {
    const categoriesImage = () => {
      const url = 'categories/top'

      context.getGetData(url, 'categories');
    }

    categoriesImage();
  }, [])

  useEffect(() => {
    if (context.getCategoryData) {
      if (context.getCategoryData.data.data) {
        setCategories(context.getCategoryData.data.data)
      }
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
                <div className={styles.categories_grid_item_container} key={ind}>
                  <div className={styles.categories_grid_image_container} onClick={() => handleCategoryClick(ind)}>
                    <LazyLoadImage effect="blur" src={category.banner} wrapperProps={{
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
