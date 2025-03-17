import React, { useState, useEffect, useContext } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './NewArrivalSection.module.css';
import { ArrowRightCircle, ClockHistory } from 'react-bootstrap-icons';
import { ArrowLeftCircle } from 'react-bootstrap-icons';
import Product from '../Product/Product';
import { GenericApiContext } from '../../context/GenericApiContext';

import ProductVariant1 from '../../assets/images/Medical/Product-Variant (1).png';
import ProductVariant2 from '../../assets/images/Medical/Product-Variant (2).png';
import ProductVariant3 from '../../assets/images/Medical/Product-Variant (3).png';
import ProductVariant4 from '../../assets/images/Medical/Product-Variant (4).png';
import ProductVariant5 from '../../assets/images/Medical/Layer 19.png';

const data = [
  {
    id: 1,
    name: 'Product 1',
    thumbnail_image: ProductVariant1,
    stroked_price: 10,
    discount: 10,
    banner: ProductVariant1,
    postdate: '03/12/2025',
    sku: "Product1",

  },
  {
    id: 2,
    name: 'Product 2',
    thumbnail_image: ProductVariant2,
    stroked_price: 14,
    discount: 10,
    banner: ProductVariant2,
    postdate: '03/12/2025',
    sku: "Product2",

  },
  {
    id: 3,
    name: 'Product 3',
    thumbnail_image: ProductVariant3,
    stroked_price: 13,
    discount: 10,
    banner: ProductVariant3,
    postdate: '03/12/2025',
    sku: "Product3",

  },
  {
    id: 4,
    name: 'Product 4',
    thumbnail_image: ProductVariant4,
    stroked_price: 12,
    discount: 10,
    banner: ProductVariant4,
    postdate: '03/12/2025',
    sku: "Product5",

  },
  // {
  //   id: 5,
  //   name: 'Product 5',
  //   thumbnail_image: ProductVariant5,
  //   stroked_price: 15,
  //   discount: 10,
  //   banner: ProductVariant5,
  //   postdate: '03/12/2025',

  // }
]


const NewArrivalSection = () => {

  const [products, setProducts] = useState(null);

  const context = useContext(GenericApiContext);


  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <>
        <ArrowRightCircle color='#b4b1b1' onClick={onClick} style={{ ...style }} className={styles.slick_Arrow_right} size={25} />
      </>
    );
  }

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <>
        <ArrowLeftCircle color='#b4b1b1' onClick={onClick} style={{ ...style }} className={styles.slick_Arrow_left} size={25} />
      </>
    );
  }

  var settings = {
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 2024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
          nextArrow: false,
          prevArrow: false,
          infinite: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          nextArrow: false,
          prevArrow: false
        }
      }
    ]
  }

  // useEffect(() => {
  //   const getTodaysDeal = () => {
  //     const url = 'products/todays-deal'

  //     context.getGetData(url, 'todaysDeal');
  //   }
  //   getTodaysDeal();
  // }, [])

  // useEffect(() => {
  //   if (context.getTodayDealData) {
  //     setProducts(context.getTodayDealData.data.data);
  //   }
  // }, [context.getTodayDealData])



  useEffect(() => {

    setProducts(data);

  }, [])

  return (
    <>
      <div className={styles.newArrivalSection_container + ' ' + 'container'}>
        <div className={styles.newArrivalSection_heading_container}>
          <span className={styles.newArrival_heading_text}>
            NEW ARRIVAL MEDICINES
          </span>
        </div>
        <Slider {...settings} className='container'>
          {products && products.map((product, index) => {
            return (
              <div key={index}>
                <Product productObject={product} parent="newArrival" />
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  )
};


export default NewArrivalSection;
