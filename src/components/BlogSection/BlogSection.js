import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './BlogSection.module.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import { ArrowLeftCircle } from 'react-bootstrap-icons';
import Product from '../Product/Product';
import Layer1 from '../../assets/images/Medical/Layer 16.jpg';
import Layer2 from '../../assets/images/Medical/Layer 17.jpg';
import Layer3 from '../../assets/images/Medical/Layer 29.png';
import Layer4 from '../../assets/images/Medical/Layer 30.png';
import Layer5 from '../../assets/images/Medical/Layer 31.png';
import Layer6 from '../../assets/images/Medical/Layer 45.png';
import { GenericApiContext } from '../../context/GenericApiContext';

const data = [
  {
    id: 1,
    name: 'Product 1',
    thumbnail_image: Layer1,
    stroked_price: 10,
    discount: 10,
    banner: Layer1,
    postdate: '03/12/2025',
    blog_name: "Understanding JSON Basics",

  },
  {
    id: 2,
    name: 'Product 2',
    thumbnail_image: Layer2,
    stroked_price: 14,
    discount: 10,
    banner: Layer2,
    postdate: '03/12/2025',
    blog_name: "Top 10 Programming Languages in 2024",

  },
  {
    id: 3,
    name: 'Product 3',
    thumbnail_image: Layer3,
    stroked_price: 13,
    discount: 10,
    banner: Layer3,
    postdate: '03/12/2025',
    blog_name: "How to Build a Responsive Website",

  },
  {
    id: 4,
    name: 'Product 4',
    thumbnail_image: Layer4,
    stroked_price: 12,
    discount: 10,
    banner: Layer4,
    postdate: '03/12/2025',
    blog_name: "Introduction to AI and Machine Learning",

  }
]

const BlogSection = () => {

  const [blogList, setBlogList] = useState(data);

  const context = useContext(GenericApiContext)

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
    slidesToShow: 4,
    slidesToScroll: 4,
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
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
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
          initialSlide: 2,
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


  return (
    <>
      <div className={styles.blogSection_container + ' ' + 'container'}>
        <div className={styles.blogSection_heading_container}>
          <span className={styles.blogSection_heading_text}>
            Lorem Ipsum
          </span>
          <span className={styles.blogSection_subheading}>
            Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development to fill empty spaces in a layout that do not yet
          </span>
        </div>
        <Slider {...settings} className='container'>
          {blogList && blogList.map((blog, index) => {
            return (
              <div key={index}>
                <Product productObject={blog} parent="blog" />
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  )
};


export default BlogSection;
