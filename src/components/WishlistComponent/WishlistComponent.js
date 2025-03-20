import React, { useContext, useState, useEffect } from 'react';
import styles from './WishlistComponent.module.css';
import { GenericApiContext } from '../../context/GenericApiContext';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import EmptyWishlist from '../../assets/images/Medical/wishlist-empty.jpg'
import Layer1 from '../../assets/images/Medical/Layer 2.png'
import Layer2 from '../../assets/images/Medical/Layer 5.png'
import Layer3 from '../../assets/images/Medical/Layer 6.png'
import Layer4 from '../../assets/images/Medical/Layer 7.png'
import Layer5 from '../../assets/images/Medical/Layer 8.png'
import Layer6 from '../../assets/images/Medical/Layer 10.png'
import Layer7 from '../../assets/images/Medical/Layer 12.png'

const WishlistComponent = () => {
  const [wishListData, setWishListData] = useState();
  const [loggedinData, setLoggedInData] = useState();

  const image = [Layer1, Layer2, Layer3, Layer4, Layer5, Layer6, Layer7]

  const context = useContext(GenericApiContext)

  const removeWishList = (id) => {
    const url = `wishlist/remove`
    const customerDetails = JSON.parse(sessionStorage.getItem("loginDetails"))
    const reqBody = {
      "customerId": customerDetails.id,
      "productId": id
    }
    context.getPostDataQuick(url, 'sad', reqBody);
    setTimeout(() => {
      const getWishListDetails = () => {
        const customerDetails = JSON.parse(sessionStorage.getItem("loginDetails"))
        const url = `wishlist/items?customerId=${customerDetails.id}`
        context.getCustomerData(url, 'wishList');
      }

      getWishListDetails();
    }, 700)
  }

  useEffect(() => {
    const getWishListDetails = () => {
      const customerDetails = JSON.parse(sessionStorage.getItem("loginDetails"))
      const url = `wishlist/items?customerId=${customerDetails.id}`
      context.getCustomerData(url, 'wishList');
    }

    getWishListDetails();
  }, [])

  useEffect(() => {
    if (context.wishList) {
      setWishListData(context.wishList.data);
    }
  }, [context.wishList])


  useEffect(() => {
    setLoggedInData(JSON.parse(sessionStorage.getItem('loginDetails')));
  }, [])

  // console.log(wishListData, 'wishListData')

  return (
    <div className={styles.wishlist_container}>
      {
        wishListData && wishListData.length > 0 ? (
          <>
            <h1>My Wish List</h1>
            <div className={styles.wishlist_grid}>
              {context.loading
                ? Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <div className={styles.wishlist_card} key={index}>
                      <div className={styles.wishlist_image}>
                        <Skeleton height={150} width={150} />
                        <Skeleton height={30} width={30} className={styles.delete_btn} />
                      </div>
                      <div className={styles.wishlist_info}>
                        <Skeleton height={20} width={100} />
                        <Skeleton height={20} width={50} />
                      </div>
                    </div>
                  ))
                : wishListData &&
                wishListData.map((product) => (
                  <div className={styles.wishlist_card} key={product.product_id}>
                    <div className={styles.wishlist_image}>
                      {
                        product.product_name == 'Product1' ? (<>
                          <img src={Layer1} /></>) : product.product_name == 'Product2' ? (<>
                            <img src={Layer2} /></>) : product.product_name == 'Product3' ? (<>
                              <img src={Layer3} /></>) : product.product_name == 'Product4' ? (<>
                                <img src={Layer4} /></>) : product.product_name == 'Product5' ? (<>
                                  <img src={Layer5} /></>) : product.product_name == 'Product6' ? (<>
                                    <img src={Layer6} /></>) : ''
                      }
                      {/* <img src={product.image_url} alt={product.product_name} /> */}
                      <button className={styles.delete_btn} onClick={() => removeWishList(product.product_id)}>🗑</button>
                    </div>
                    <div className={styles.wishlist_info}>
                      <h3>{product.product_name}</h3>
                      <p>{'€ ' + product.price}</p>
                    </div>
                  </div>
                ))}
            </div>
            <div className={styles.pagination}>
              <label htmlFor="perPage">Show </label>
              <select id="perPage">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
              <span> per page</span>
            </div>
          </>
        ) : (
          <>
            <div>
              <img src={EmptyWishlist} className={styles.emptyWishList} />
            </div>
          </>
        )
      }

    </div>
  )
};


export default WishlistComponent;
