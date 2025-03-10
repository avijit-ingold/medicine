import React, { useContext, useState, useEffect } from 'react';
import styles from './WishlistComponent.module.css';
import { GenericApiContext } from '../../context/GenericApiContext';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import EmptyWishlist from '../../assets/images/Medical/wishlist-empty.jpg'

const WishlistComponent = () => {
  const [wishListData, setWishListData] = useState();
  const [loggedinData, setLoggedInData] = useState();

  const context = useContext(GenericApiContext)

  const removeWishList = (id) => {
    const url = `wishlists-remove-product?product_id=${id}&user_id=${loggedinData.user.id}`
    context.getGetDataQuick(url, 'sad');
    setTimeout(() => {
      const urlWishList = 'wishlists';
      context.getGetDataQuick(urlWishList, 'wishList');
    }, 500)
  }

  useEffect(() => {
    const getWishListDetails = () => {
      const url = 'wishlists'
      context.getGetData(url, 'wishList');
    }
    getWishListDetails();
  }, [])

  useEffect(() => {
    setWishListData(context.wishList.data.data);
  }, [context.wishList])


  useEffect(() => {
    setLoggedInData(JSON.parse(sessionStorage.getItem('loginDetails')));
  }, [])

  console.log(wishListData, 'wishListData')

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
                  <div className={styles.wishlist_card} key={product.product.id}>
                    <div className={styles.wishlist_image}>
                      <img src={product.product.thumbnail_image} alt={product.product.name} />
                      <button className={styles.delete_btn} onClick={() => removeWishList(product.product.id)}>🗑</button>
                    </div>
                    <div className={styles.wishlist_info}>
                      <h3>{product.product.name}</h3>
                      <p>{product.product.base_price}</p>
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
