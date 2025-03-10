import React, { useState, useContext, useEffect } from 'react';
import styles from './ProductDetailsComponent.module.css';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { GenericApiContext } from '../../context/GenericApiContext';
import ReviewCardComponent from '../ReviewCardComponent/ReviewCardComponent';
import { Heart, HeartFill, GlobeEuropeAfrica, HouseLock, CalendarCheck, Cart3, Box2 } from 'react-bootstrap-icons';
import { useLocation, useNavigate } from 'react-router-dom';
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


const ProductDetailsComponent = ({ id, loading }) => {

  const [productDetail, setProductDetails] = useState();
  const [productCounter, setProductCounter] = useState(1);
  const [wishlistState, setWishListState] = useState(false)
  const [clicked, setClicked] = useState(false);
  const [loggedinData, setLoggedInData] = useState();
  const [selectedImage, setSelectedImage] = useState('')
  const [cartSuccess, setCartSuccess] = useState(false)

  const variantArray = [ProductVariant1, ProductVariant2, ProductVariant3, ProductVariant4];


  const context = useContext(GenericApiContext);
  const navigate = useNavigate()
  const location = useLocation();

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


  return (
    <>
      {/* {
        productDetail && (
          <div className={styles.product_details}>
            <div className={styles.product_image_section}>
              {loading ? (
                <Skeleton className={styles.product_image} height={400} />
              ) : (
                <img
                  src={productDetail.thumbnail_image}
                  alt="Product"
                  className={styles.product_image}
                />
              )}
            </div>

            <div className={styles.product_info_section}>
              <h1 className={styles.product_title}>
                {loading ? <Skeleton width="80%" /> : productDetail.name}
              </h1>
              <div className={styles.product_rating}>
                {loading ? (
                  <Skeleton width="60%" />
                ) : (
                  <>
                    <span>⭐ {productDetail.rating}</span> |
                    <span>{' ' + productDetail.rating_count + ' rating'}</span> |
                    <span> 154 orders</span>
                  </>
                )}
              </div>
              <div className={styles.product_stock}>
                {loading ? <Skeleton width="30%" /> : "✅ In stock"}
              </div>

              <ul className={styles.product_details_list}>
                {loading ? (
                  <>
                    <Skeleton width="70%" />
                    <Skeleton width="70%" />
                    <Skeleton width="70%" />
                    <Skeleton width="70%" />
                  </>
                ) : (
                  <>
                    <div dangerouslySetInnerHTML={{ __html: productDetail.description }}></div>
                  </>
                )}
              </ul>
              <div>
                <ReviewCardComponent
                  id={id}
                  loading={loading}
                />
              </div>

            </div>

            <div className={styles.product_price_section}>
              <div className={styles.price}>
                {loading ? (
                  <Skeleton width="50%" height={30} />
                ) : (
                  <>
                    <span className={styles.current_price}>{productDetail.main_price}</span>
                    <span className={styles.original_price}>{productDetail.stroked_price}</span>
                  </>
                )}
              </div>
              {loading ? (
                <Skeleton width="60%" />
              ) : (
                <p>Price per unit, Includes VAT</p>
              )}

              <div className={styles.quantity}>
                {loading ? (
                  <Skeleton width="30%" height={30} />
                ) : (
                  <>
                    <div id="increase" className={styles.counter_btn} onClick={() => setProductCounter(productCounter + 1)}>+</div>
                    <div className={styles.productCount}>{productCounter}</div>
                    <div id="decrease" className={styles.counter_btn} onClick={() => {
                      if (productCounter > 1) {
                        setProductCounter(productCounter - 1)
                      }
                    }
                    }
                    >-</div>
                  </>
                )}
              </div>

              <div className={styles.action_buttons}>
                {loading ? (
                  <Skeleton width="100%" height={40} />
                ) : (
                  <>{
                    context.ifLoggedin ? (
                      <>
                        <button className={styles.cart_button + ' ' + (clicked ? styles.clicked : "")} onClick={() => handleClick()}>
                          <span className={styles.add_to_cart}>Add to cart</span>
                          <span className={styles.added}>Added</span>
                          <Cart3 size={28} color='white' className={styles.fa_shopping_cart} />
                          <Box2 size={15} color='white' className={styles.fa_box} />
                        </button>
                        <button className={styles.buy_now} onClick={() => navigate('/myProfile/cart')}>Buy now</button>
                      </>
                    ) : (
                      <>
                        <button className={styles.cart_button} onClick={() => navigate('/', { state: { from: location }, replace: true })}>
                          <span className={styles.add_to_cart}>Add to cart</span>
                        </button>
                        <button className={styles.buy_now} onClick={() => navigate('/', { state: { from: location }, replace: true })}>Buy now</button>
                      </>
                    )
                  }

                  </>
                )}
              </div>
              {loading ? (
                <Skeleton width="60%" />
              ) : (
                <div className={styles.add_to_wishlist + ' ' + (wishlistState ? styles.is_active : '')} onClick={() => handleWishList(id)}><span>Add to wishlist</span> {wishlistState ? (<HeartFill color='#e64141' />) : (<Heart />)}
                </div>
              )}

              <div className={styles.extra_info}>
                {loading ? (
                  <>
                    <Skeleton width="70%" />
                    <Skeleton width="70%" />
                    <Skeleton width="70%" />
                  </>
                ) : (
                  <>
                    <p><GlobeEuropeAfrica /> Worldwide shipping</p>
                    <p><HouseLock /> Secure payment</p>
                    <p><CalendarCheck /> 2 years full warranty</p>
                  </>
                )}
              </div>
            </div>
          </div>
        )
      } */}
      {
        productDetail && (
          <div className={styles.productDetails_main_contaier}>
            <div className={styles.productSpecs_container + ' container'}>
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
              <div className={styles.productDescription_container}>
                <span className={styles.breadCrumb_section}>Lorem Ipsum &nbsp; &nbsp;  &gt; &nbsp; &nbsp; Lorem Ipsum  &nbsp; &nbsp; &gt; &nbsp; &nbsp;  Lorem Ipsum</span>
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

                  </span>
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
            <div className='container'>
              <div className={styles.productFAQ_container}>
                <ProductDetailFAQ />
              </div>

            </div>
          </div>
        )
      }
    </>

  )
};
;

export default ProductDetailsComponent;
