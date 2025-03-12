import React, { useState, useContext, useEffect, useRef } from 'react';
import styles from './ProductDetailsComponent.module.css';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { GenericApiContext } from '../../context/GenericApiContext';
import ReviewCardComponent from '../ReviewCardComponent/ReviewCardComponent';
import { Cart3, Box2 } from 'react-bootstrap-icons';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ProductVariant1 from '../../assets/images/Medical/Product-Variant (1).png';
import ProductVariant2 from '../../assets/images/Medical/Product-Variant (2).png';
import ProductVariant3 from '../../assets/images/Medical/Product-Variant (3).png';
import ProductVariant4 from '../../assets/images/Medical/Product-Variant (4).png';
import SpecsSmall1 from '../../assets/images/Medical/Ellipse 1.png';
import SpecsSmall2 from '../../assets/images/Medical/balance (1).png';
import SpecsSmall3 from '../../assets/images/Medical/rocket (2).png';
import SpecsSmall4 from '../../assets/images/Medical/protection.png';
import SpecscardImg1 from '../../assets/images/Medical/bio.png';
import SpecscardImg2 from '../../assets/images/Medical/non-toxic-1.png';
import SpecscardImg3 from '../../assets/images/Medical/rubber-stamp.png';
import SpecscardImg4 from '../../assets/images/Medical/bpa-free.png';
import SpecscardImg5 from '../../assets/images/Medical/gluten-free.png';
import SpecscardImg6 from '../../assets/images/Medical/recycle.png';
import ProductDetailFAQ from '../ProductDetailFAQ/ProductDetailFAQ';
import RelatedProductComponent from '../RelatedProductComponent/RelatedProductComponent';
import medicineBlueImg from '../../assets/images/Medical/med-blue.svg';
import medicineWhiteImg from '../../assets/images/Medical/med-white.svg';
import pawWhite from '../../assets/images/Medical/paw-med-white.svg';
import pawBlue from '../../assets/images/Medical/paw-med-blue.svg';
import callBlue from '../../assets/images/Medical/call-medicine-blue.svg';
import callWhite from '../../assets/images/Medical/call-medicine-white.svg';
import cylinderBlue from '../../assets/images/Medical/oxygen-tank-blue.svg';
import cylinderWhite from '../../assets/images/Medical/oxygen-tank-white.svg';
import DetailsSlider1 from '../../assets/images/Medical/details-slider-1.png';
import DetailsSlider2 from '../../assets/images/Medical/details-slider-2.png';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";


gsap.registerPlugin(ScrollTrigger);

const ProductDetailsComponent = ({ id, loading }) => {

  const [productDetail, setProductDetails] = useState(null);
  const [productCounter, setProductCounter] = useState(1);
  const [wishlistState, setWishListState] = useState(false)
  const [clicked, setClicked] = useState(false);
  const [loggedinData, setLoggedInData] = useState();
  const [selectedImage, setSelectedImage] = useState('')
  const [cartSuccess, setCartSuccess] = useState(false)
  const [hovEffect, setHovEffect] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState();

  const variantArray = [ProductVariant1, ProductVariant2, ProductVariant3, ProductVariant4];

  const categories = [
    {
      name: "Lorem Ipsum",
      description: "Lorem Ipsum dolor si amet entar pernosal diamlo",
      imgWhite: medicineWhiteImg,
      imgBlue: medicineBlueImg
    },
    {
      name: "Lorem Ipsum",
      description: "Lorem Ipsum dolor si amet entar pernosal diamlo",
      imgWhite: callWhite,
      imgBlue: callBlue
    },
    {
      name: "Lorem Ipsum",
      description: "Lorem Ipsum dolor si amet entar pernosal diamlo",
      imgWhite: pawWhite,
      imgBlue: pawBlue
    },
    {
      name: "Lorem Ipsum",
      description: "Lorem Ipsum dolor si amet entar pernosal diamlo",
      imgWhite: cylinderWhite,
      imgBlue: cylinderBlue
    }
  ]

  const context = useContext(GenericApiContext);
  const navigate = useNavigate()
  const location = useLocation();

  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const leftTopRef = useRef(null);
  const rightTopRef = useRef(null)

  const handleCategoryClick = (index) => {
    setSelectedIndex(index);
  };


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

  const handleClick = () => {
    handleAddCart()
  };

  const handleCartClick = () => {
    if (cartSuccess) {
      setClicked(true)
    } else {
      setClicked(false)
    }
  }

  const handleAddCart = () => {
    const url = `carts/add`
    const body = {
      "id": id,
      "variant": "",
      "user_id": loggedinData.user.id,
      "quantity": productCounter

    }

    context.getPostDataWithAuth(url, body, 'addToCart');

  }

  useEffect(() => {
    const getProductDetails = () => {
      const url = `products/${id}`
      context.getGetData(url, `productDetails`);

      if (context.ifLoggedin) {
        const getWishListurl = `wishlists-check-product?product_id=${id}&user_id=${JSON.parse(sessionStorage.getItem('loginDetails')).user.id}`
        context.getGetData(getWishListurl, `getWishList`);
      }
    }

    getProductDetails();
  }, [id])

  useEffect(() => {
    if (context.getProductDetails) {
      if (context.getProductDetails.data.data) {
        setProductDetails(context.getProductDetails.data.data[0])
      }
    }
  }, [context.getProductDetails])

  useEffect(() => {
    if (context.ifLoggedin) {
      if (context.ifWishListed) {
        setWishListState(context.ifWishListed)
      } else if (!context.getWishList) {
        setWishListState(context.ifWishListed)
      }
    }
  }, [context.ifWishListed])

  useEffect(() => {
    setLoggedInData(JSON.parse(sessionStorage.getItem('loginDetails')));
  }, [])

  useEffect(() => {
    setCartSuccess(context.addToCartSuccess)
  }, [context.addToCartSuccess])

  useEffect(() => {
    handleCartClick()
  }, [cartSuccess])

  useEffect(() => {
    if (productDetail) {
      setSelectedImage(productDetail.thumbnail_image)
    }
  }, [productDetail])

  useGSAP(() => {
    if (!leftRef.current || !rightRef.current || !leftTopRef.current || !rightTopRef.current) {
      return;
    }

    gsap.killTweensOf("*");
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    gsap.set([leftRef.current, rightRef.current, leftTopRef.current, rightTopRef.current], {
      x: 0,
      opacity: 1
    });

    const animations = [
      gsap.fromTo(leftRef.current,
        { x: -150, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: leftRef.current,
            start: "top 80%",
            toggleActions: "restart none none reverse"
          },
          ease: "power1.inOut",
        }
      ),

      gsap.fromTo(rightRef.current,
        { x: 150, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: rightRef.current,
            start: "top 80%",
            toggleActions: "restart none none reverse"
          },
          ease: "power1.inOut",
        }
      ),

      gsap.fromTo(leftTopRef.current,
        { x: -150, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: leftTopRef.current,
            start: "top 80%",
            toggleActions: "restart none none reverse"
          },
          ease: "power1.inOut",
        }
      ),

      gsap.fromTo(rightTopRef.current,
        { x: 150, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: rightTopRef.current,
            start: "top 80%",
            toggleActions: "restart none none reverse"
          },
          ease: "power1.inOut",
        }
      ),
    ];

    return () => {
      animations.forEach(animation => animation.kill());
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };

  }, [productDetail]);

  return (
    <>
      {

        productDetail == null ? (
          <>
            <div className={styles.productDetails_main_container}>
              <div className='container'>
                <div className='d-block d-lg-none mb-3'>
                  <Skeleton width={250} height={20} />
                </div>
                <div className={styles.productSpecs_container + ' row'}>
                  <div className={styles.product_spec_cont + ' col-md-7 col-12'}>
                    <div className={styles.product_demoContainer}>
                      <Skeleton height={80} width={80} count={4} className={styles.variant_image} />
                    </div>
                    <div className={styles.product_main_image_container}>
                      <Skeleton height={400} width={'100%'} className={styles.product_main_image} />
                    </div>
                  </div>
                  <div className={styles.productDescription_container + ' col-md-5 col-12'}>
                    <Skeleton width={250} height={20} className='d-none d-lg-block' />
                    <Skeleton width={300} height={30} />
                    <Skeleton width={150} height={20} />
                    <Skeleton width={'80%'} height={100} />
                    <Skeleton width={100} height={30} />
                    <Skeleton width={'60%'} height={20} />
                    <Skeleton width={120} height={20} />

                    <div className={styles.size_container}>
                      <Skeleton width={80} height={20} />
                      <Skeleton width={120} height={30} />
                    </div>
                    <div className={styles.size_container}>
                      <Skeleton width={80} height={20} />
                      <Skeleton width={180} height={40} />
                    </div>
                    <div className='d-block d-lg-none ml-3 mb-4'>
                      <Skeleton width={200} height={50} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='container mt-5'>
                <Skeleton height={30} width={200} />
                <Skeleton height={150} width={'100%'} />
              </div>
              <div className={styles.related_products_container}>
                <Skeleton height={30} width={300} />
                <Skeleton height={200} width={'100%'} />
              </div>
            </div>
          </>
        ) : (
          productDetail && (
            <div className={styles.productDetails_main_contaier}>
              <div className='container'>
                <div className="d-block d-lg-none mb-3">
                  <span className={styles.breadCrumb_section}>Lorem Ipsum &nbsp; &nbsp;  &gt; &nbsp; &nbsp; Lorem Ipsum  &nbsp; &nbsp; &gt; &nbsp; &nbsp;  Lorem Ipsum</span>
                </div>
                <div className={styles.productSpecs_container + ' row'}>
                  <div className={styles.product_spec_cont + ' col-md-7 col-12'}>
                    <div className={styles.product_demoContainer}>
                      <img src={productDetail.thumbnail_image} className={`${styles.variant_image} ${selectedImage === productDetail.thumbnail_image ? styles.selected : ''}`} onClick={() => setSelectedImage(productDetail.thumbnail_image)} />
                      {
                        variantArray && variantArray.map((ele) => {
                          return (
                            <img src={ele} className={`${styles.variant_image} ${selectedImage === ele ? styles.selected : ''}`} onClick={() => setSelectedImage(ele)} />)
                        })
                      }
                    </div>
                    <div className={styles.product_main_image_container}>
                      {productDetail && (
                        <img src={selectedImage == '' ? productDetail.thumbnail_image : selectedImage} className={styles.product_main_image} />
                      )}
                    </div>
                  </div>
                  <div className={styles.productDescription_container + ' col-md-5 col-12'}>
                    <span className={styles.breadCrumb_section + ' d-none d-lg-block'}>Lorem Ipsum &nbsp; &nbsp;  &gt; &nbsp; &nbsp; Lorem Ipsum  &nbsp; &nbsp; &gt; &nbsp; &nbsp;  Lorem Ipsum</span>
                    <h1 className={styles.product_name}>{productDetail.name}</h1>
                    <span className={styles.product_shop}>{productDetail.shop_name}</span>
                    <p className={styles.product_desc} dangerouslySetInnerHTML={{ __html: productDetail.description }} />
                    <p className={styles.productPrice}>{productDetail.main_price}</p>
                    <p className={styles.price_description}>All prices include VAT, plus shipping</p>
                    <p className={styles.price_description}>Base Price: 94.99 € / P</p>
                    <div className={styles.size_container}>
                      <span className={styles.size}>Size
                        <div className={styles.size_selector}>
                          <p>100</p>
                          <p>150 capsules</p>
                        </div>
                      </span>
                    </div>

                    <div className={styles.size_container}>
                      <span className={styles.size}>Quantity
                        <div className={styles.counter_container}>
                          <div id="decrease" className={styles.counter_btn} onClick={() => {
                            if (productCounter > 1) {
                              setProductCounter(productCounter - 1)
                            }
                          }
                          }
                          >-</div>
                          <div className={styles.productCount}>{productCounter}</div>
                          <div id="increase" className={styles.counter_btn} onClick={() => setProductCounter(productCounter + 1)}>+</div>
                        </div>
                        {
                          context.ifLoggedin ? (
                            <>
                              <button className={styles.cart_button + ' d-none d-lg-block ' + (clicked ? styles.clicked : "")} onClick={() => handleClick()}>
                                <span className={styles.add_to_cart}>ADD TO CART</span>
                                <span className={styles.added}>ADDED</span>
                                <Cart3 size={28} color='white' className={styles.fa_shopping_cart} />
                                <Box2 size={15} color='white' className={styles.fa_box} />
                              </button>
                            </>
                          ) : (
                            <>
                              <button className={styles.cart_button + + ' d-none d-lg-block '} onClick={() => navigate('/', { state: { from: location }, replace: true })}>
                                <span className={styles.add_to_cart}>Add to cart</span>
                              </button>
                            </>
                          )
                        }

                      </span>
                    </div>
                    <div className='d-block d-lg-none ml-3 mb-4'>
                      {
                        context.ifLoggedin ? (
                          <>
                            <button className={styles.cart_button + ' ' + (clicked ? styles.clicked : "")} onClick={() => handleClick()}>
                              <span className={styles.add_to_cart}>ADD TO CART</span>
                              <span className={styles.added}>ADDED</span>
                              <Cart3 size={28} color='white' className={styles.fa_shopping_cart} />
                              <Box2 size={15} color='white' className={styles.fa_box} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button className={styles.cart_button} onClick={() => navigate('/', { state: { from: location }, replace: true })}>
                              <span className={styles.add_to_cart}>Add to cart</span>
                            </button>
                          </>
                        )
                      }
                    </div>
                    <p className={styles.product_desc} dangerouslySetInnerHTML={{ __html: productDetail.description }} />
                    <div className={styles.specsList_container}>
                      <p className={styles.specs_list}><img src={SpecsSmall1} className={styles.specs_image} />Let me know if you need more details</p>
                      <p className={styles.specs_list}><img src={SpecsSmall2} className={styles.specs_image} />Let me know if you need more details</p>
                      <p className={styles.specs_list}><img src={SpecsSmall3} className={styles.specs_image} />Let me know if you need more details</p>
                      <p className={styles.specs_list}><img src={SpecsSmall4} className={styles.specs_image} />Let me know if you need more details</p>
                    </div>
                    <div className={styles.specsCard_container}>
                      <p className={styles.specsCard}><img src={SpecscardImg1} className={styles.card_image} />Eco-Friendly Materials</p>
                      <p className={styles.specsCard}><img src={SpecscardImg2} className={styles.card_image} />Non Toxic</p>
                      <p className={styles.specsCard}><img src={SpecscardImg3} className={styles.card_image} />Hypoallergenic</p>
                      <p className={styles.specsCard}><img src={SpecscardImg4} className={styles.card_image} />BPA Free</p>
                      <p className={styles.specsCard}><img src={SpecscardImg5} className={styles.card_image} />FDA Approved</p>
                      <p className={styles.specsCard}><img src={SpecscardImg6} className={styles.card_image} />Recyclable Design</p>
                    </div>

                  </div>
                </div>
              </div>
              <div className='container'>
                <div className={styles.productFAQ_container}>
                  <ProductDetailFAQ />
                </div>
              </div>
              <div className={styles.related_products_container}>
                <div className={styles.divider}>Faucibus adipiscing ligula cursus</div>
                <RelatedProductComponent id={id} />
              </div>
              <div className={`${styles.homePage_categories_container_main} container`}>
                <div className={styles.homePage_categories_container}>
                  {categories && categories.map((category, ind) => {
                    return (
                      <div key={ind} className={selectedIndex === ind ? `${styles.homepage_category_active}` : `${styles.homepage_category}`} onClick={() => handleCategoryClick(ind)} onMouseEnter={() => setHovEffect(true)} onMouseLeave={() => setHovEffect(false)}>
                        <span className={`${styles.category_icon_container}`}>
                          <img src={selectedIndex === ind ? category.imgWhite : category.imgBlue} className={`${styles.category_icon}`} />
                        </span>
                        <span className={`${styles.category_heading_container}`}>
                          {category.name}
                        </span>
                        <span className={`${styles.category_text_container}`}>
                          {category.description}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="p-1">
                <div className="row">
                  <div className={"col-md-6 d-flex align-items-center p-5 " + styles.testifyTxt_container}>
                    <div className='left-item' ref={leftTopRef}>
                      <h2 className="fw-bold mb-3 fs-3">Lorem ipsum odor amet, consectetur adipiscing elit. Torquent fermentum ipsum.</h2>
                      <p>
                        Ac gravida facilisi quis aptent iaculis aliquet. Ut mollis elit congue, fames habitant ex?
                        Facilisi nisi efficitur convallis proin faucibus interdum. Proin sem sed efficitur fusce facilisis sagittis.
                        Aenean amet convallis hendrerit sed bibendum bibendum id.
                      </p>
                      <ul className={styles.customBullets}>
                        <li><strong>Sagittis commodo dui morbi mus cras consectetur porttitor.</strong></li>
                        <li><strong>Odio consequat metus dictum sem vivamus maximus maecenas suscipit.</strong></li>
                        <li><strong>Sagittis commodo dui morbi mus cras consectetur porttitor.</strong></li>
                        <li><strong>Odio consequat metus dictum sem vivamus maximus maecenas suscipit.</strong></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-6 p-0" style={{ height: 'auto' }}>
                    <img
                      src={DetailsSlider1}
                      alt="Product Image"
                      className={"img-fluid w-100 right-item " + styles.testifyImg_container}
                      ref={rightTopRef}
                    />
                  </div>
                </div>
                <div className="row flex-md-row-reverse">
                  <div className={"col-md-6 d-flex align-items-center p-5 " + styles.testifyTxt_container}>
                    <div className='left-item' ref={rightRef}>
                      <h2 className="fw-bold mb-3 fs-3">Lorem ipsum odor amet, consectetur adipiscing elit. Torquent fermentum ipsum.</h2>
                      <p>
                        Ac gravida facilisi quis aptent iaculis aliquet. Ut mollis elit congue, fames habitant ex?
                        Facilisi nisi efficitur convallis proin faucibus interdum. Proin sem sed efficitur fusce facilisis sagittis.
                        Aenean amet convallis hendrerit sed bibendum bibendum id.
                      </p>
                      <ul className={styles.customBullets}>
                        <li><strong>Sagittis commodo dui morbi mus cras consectetur porttitor.</strong></li>
                        <li><strong>Odio consequat metus dictum sem vivamus maximus maecenas suscipit.</strong></li>
                        <li><strong>Sagittis commodo dui morbi mus cras consectetur porttitor.</strong></li>
                        <li><strong>Odio consequat metus dictum sem vivamus maximus maecenas suscipit.</strong></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-6 p-0" style={{ height: 'auto' }}>
                    <img
                      src={DetailsSlider2}
                      alt="Product Image"
                      className={"img-fluid w-100 right-item" + styles.testifyImg_container}
                      ref={leftRef}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.related_products_container}>
                <div className='container fw-bold'><h5> Dictum mi pretium porttitor suscipit phasellus laoreet</h5></div>
                <RelatedProductComponent id={id} parent={'newArrivals'} />
              </div>
              <div className='container mt-5 mb-4'>
                <div className={styles.productsFaq}>
                  <h2 className='mb-4'>Questions and Answers</h2>
                  <ProductDetailFAQ />
                </div>
              </div>
            </div >
          )
        )
      }
    </>

  )
};
;

export default ProductDetailsComponent;
