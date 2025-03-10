import React, { useState, useEffect, useContext } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './NewArrivalSection.module.css';
import { ArrowRightCircle, ClockHistory } from 'react-bootstrap-icons';
import { ArrowLeftCircle } from 'react-bootstrap-icons';
import Product from '../Product/Product';
import { GenericApiContext } from '../../context/GenericApiContext';



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

  useEffect(() => {
    const getTodaysDeal = () => {
      const url = 'products/todays-deal'

      context.getGetData(url, 'todaysDeal');
    }
    getTodaysDeal();
  }, [])

  useEffect(() => {
    if (context.getTodayDealData) {
      setProducts(context.getTodayDealData.data.data);
    }
  }, [context.getTodayDealData])

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
