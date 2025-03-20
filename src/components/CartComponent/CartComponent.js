import React, { useContext, useState, useEffect } from 'react';
import styles from './CartComponent.module.css';
import { useNavigate } from 'react-router-dom';
import { GenericApiContext } from '../../context/GenericApiContext';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Modal, Button } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
import { XCircle, Trash } from 'react-bootstrap-icons';
import CartImage from '../../assets/images/Medical/shopping.png';
import axios from "axios";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Layer1 from '../../assets/images/Medical/Layer 2.png'
import Layer2 from '../../assets/images/Medical/Layer 5.png'
import Layer3 from '../../assets/images/Medical/Layer 6.png'
import Layer4 from '../../assets/images/Medical/Layer 7.png'
import Layer5 from '../../assets/images/Medical/Layer 8.png'
import Layer6 from '../../assets/images/Medical/Layer 10.png'
import Layer7 from '../../assets/images/Medical/Layer 12.png'

const CartComponent = () => {
  const navigate = useNavigate()
  const context = useContext(GenericApiContext);

  const [cartData, setCartData] = useState();
  const [showModal, setShowModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [spinnerLoading, setSpinnerLoading] = useState(false);
  const [cartSummary, setCartSummary] = useState();
  const [discountValue, setDiscountValue] = useState();


  const handleRemoveClick = (item) => {
    setItemToRemove(item);
    setShowModal(true);
  };

  const image = [Layer1, Layer2, Layer3, Layer4, Layer5, Layer6, Layer7]

  const handleCartValue = (cartId, cartQuantity, ownerId, itemObject) => {
    context.checkIfLoggedIn();
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sessionStorage.getItem('CustomerToken')}`
    };
    const requestBody = {
      "cartItem": {
        "sku": itemObject.sku,
        "qty": cartQuantity,
        "quote_id": "4"
      }
    }
    axios({
      method: 'PUT',
      url: process.env.REACT_APP_API_URL + `carts/mine/items/${itemObject.id}`,
      data: JSON.stringify(requestBody),
      headers: headers
    }).then((res) => {
      if (res.message) {
        toast.error(`${res.data.message}` + "! 😔", {
          autoClose: 500,
          style: {
            backgroundColor: "#f8d7da",
            color: "#721c24",
            border: "1px solid #f5c6cb",
          },
        });
        if (cartQuantity > itemObject.upper_limit) {
          itemObject.quantity = itemObject.upper_limit;
          updateCartItem(ownerId, itemObject.id, itemObject);
        }
      } else {
        // const msg = 'Successfully Updated'
        // toast.success(msg, {
        //   autoClose: 1500
        // });
      }
    }).catch((err) => {
      console.error(err);
    }).finally(() => {
    });
  }

  const createOrder = () => {
    // console.log(cartData)
    const url = 'order/store';

    const reqBody = {
      "user_id": context.loggedinData.user.id,
      "owner_id": cartData[0].owner_id,
      "payment_type": "cash_on_delivery"
    }

    context.getPostDataWithAuth(url, reqBody, '')
    setTimeout(() => {
      getCartDetails();
      context.handleCart()
    }, 200)
  }

  const handleCartSummary = () => {

    setSpinnerLoading(true)
    setTimeout(() => {
      const headers = {
        "Content-Type": "application/json",
      };
      axios({
        method: 'GET',
        url: process.env.REACT_APP_API_URL + `b2c/cartlist?cartid=${sessionStorage.getItem('QuoteID')}&loggin=true`,
        headers: headers
      }).then((res) => {
        // console.log(res.data)
        setCartSummary(res.data[0]);
        setCartData(res.data);

        context?.setCartCount(parseInt(res.data[0].total_qty))


      }).finally(() => {
        setSpinnerLoading(false)
      });
    }, 1000)

  }

  const updateCartItem = (ownerId, itemId, updatedItem) => {
    setCartData((prevData) =>
      prevData.map((store) => {
        if (store.owner_id === ownerId) {
          return {
            ...store,
            cart_items: store.cart_items.map((item) =>
              item.id === itemId ? { ...item, ...updatedItem } : item
            ),
          };
        }
        return store;
      })
    );
  };

  const handleCartExcess = (quantity) => {
    toast.error(`We only have ${quantity} products` + "! 😔", {
      autoClose: 500,
      style: {
        backgroundColor: "#f8d7da",
        color: "#721c24",
        border: "1px solid #f5c6cb",
      },
    });
  }

  const confirmRemove = () => {
    if (itemToRemove) {
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem('CustomerToken')}`
      };

      axios({
        method: 'DELETE',
        url: process.env.REACT_APP_API_URL + `carts/mine/items/${itemToRemove.id}`,
        headers: headers
      }).then((res) => {
        if (!res.message) {
          const msg = 'Successfully Removed'
          toast.error(`${msg}` + "! 😔", {
            icon: "😢",
            autoClose: 1000,
            style: {
              backgroundColor: "#f8d7da",
              color: "#721c24",
              border: "1px solid #f5c6cb",
            },
          });
          handleCartSummary();
        }
      })
    }
    setShowModal(false);
    setItemToRemove(null);

    // const url = 'carts'

    // context.getGetData(url, 'cartData');



  };

  const formatToCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const handleCartItem = (type, item) => {
    let itemObject = item
    if (type === 'subtract') {
      let cartValue = JSON.parse(item.qty);
      let cartAmount = 80 //item.singleprice;
      if (cartValue > 1) {
        cartValue = cartValue - 1
        itemObject.qty = cartValue
        cartAmount = cartValue * cartAmount;
        itemObject.qty = cartValue
        itemObject.price = formatToCurrency(cartAmount);
        handleCartValue(item.id, itemObject.qty, cartData.owner_id, itemObject);
        updateCartItem(cartData.owner_id, item.id, itemObject);
        handleCartSummary()
      }
    } else {
      let cartValue = JSON.parse(item.qty);

      let cartAmount = 80 //item.singleprice;
      if (cartValue > 0) {
        cartValue = cartValue + 1
        itemObject.qty = cartValue
        cartAmount = cartValue * cartAmount;
        itemObject.qty = cartValue
        itemObject.price = formatToCurrency(cartAmount)
        handleCartValue(item.id, itemObject.qty, cartData.owner_id, itemObject);
        updateCartItem(cartData.owner_id, item.id, itemObject)
        handleCartSummary()
      }
    }
  }

  const discounValueChange = (event) => {
    setDiscountValue(event.target.value);
  };

  const handleCoupon = (parent) => {
    if (discountValue) {
      if (parent === 'apply') {
        //const url = 'coupon-apply';
        // const body = {
        //   "user_id": context.loggedinData.user.id,
        //   "owner_id": cartData.owner_id,
        //   "coupon_code": discountValue
        // }

        const headers = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem('CustomerToken')}`
        };

        axios({
          method: 'PUT',
          url: process.env.REACT_APP_API_URL + `carts/mine/coupons/${discountValue}`,
          headers: headers
        }).then((res) => {
          if (!res.message) {
            setDiscountValue('')
            handleCartSummary();
          } else {
            toast.error(`${res.message}` + "! 😔", {
              autoClose: 500,
              style: {
                backgroundColor: "#f8d7da",
                color: "#721c24",
                border: "1px solid #f5c6cb",
              },
            });
          }
        }).catch((err) => {
          const msg = 'Please apply valid Coupon code'
          toast.error(`${msg}`, {
            autoClose: 500,
            style: {
              backgroundColor: "#f8d7da",
              color: "#721c24",
              border: "1px solid #f5c6cb",
            },
          });
          setDiscountValue('')
        }).finally(() => {
        });


      } else {

        const headers = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem('CustomerToken')}`
        };

        axios({
          method: 'DELETE',
          url: process.env.REACT_APP_API_URL + `carts/mine/coupons`,
          headers: headers
        }).then((res) => {
          if (!res.message) {
            handleCartSummary();
          }
        }).catch((err) => {

        }).finally(() => {
        });

      }

    } else {
      toast.info("Please Enter a correct Coupon Code", {
        autoClose: 800
      });
    }
  }

  const getCartDetails = () => {
    const url = 'carts'

    context.getGetData(url, 'cartData');
  }

  useEffect(() => {
    // getCartDetails();
    handleCartSummary();
  }, [])

  // useEffect(() => {
  //   if (context.cartList) {
  //     setCartData(context.cartList.data.data);
  //   }
  // }, [context.cartList])


  return (
    <>
      {cartData && cartData.length > 0 && cartData[0].cart_items.length > 0 && (
        <div className={styles.shopping_cart}>
          <div className={styles.cart_items}>
            {!context.loading
              ? cartData[0].cart_items.map((item) => (
                <div className={styles.cart_items_container} key={item.id}>
                  <div className={styles.cart_item}>
                    <div className={styles.item_info}>
                      {
                        item.name == 'Product1' ? (<>
                          <img src={Layer1} className={styles.cart_item_image} /></>) : item.name == 'Product2' ? (<>
                            <img src={Layer2} className={styles.cart_item_image} /></>) : item.name == 'Product3' ? (<>
                              <img src={Layer3} className={styles.cart_item_image} /></>) : item.name == 'Product4' ? (<>
                                <img src={Layer4} className={styles.cart_item_image} /></>) : item.name == 'Product5' ? (<>
                                  <img src={Layer5} className={styles.cart_item_image} /></>) : item.name == 'Product6' ? (<>
                                    <img src={Layer6} className={styles.cart_item_image} /></>) : ''
                      }
                      {/* <img
                        src={item.image_url}
                        className={styles.cart_item_image}
                        alt={item.name}
                      /> */}
                    </div>
                    <div className={styles.item_info}>
                      <p className={styles.item_name}>{item.name}</p>
                      {item.size && <p>Size: {item.size}</p>}
                      {item.color && <p>Color: {item.color}</p>}
                    </div>
                    <div className={styles.item_price}>
                      <p>€{parseInt(item.price) / parseInt(item.qty)}.00</p>
                    </div>
                    <div className={styles.item_quantity}>

                      <button onClick={() => handleCartItem('subtract', item)}>-</button>
                      <label>{item.qty}</label>
                      {
                        item.qty < item.upper_limit ? (
                          <button onClick={() => handleCartItem('add', item)}>+</button>
                        ) : (
                          <button onClick={() => handleCartItem('add', item)}>+</button>
                        )
                      }
                    </div>
                    <div className={styles.price}>
                      <p>{'€ ' + (parseInt(item.price)).toFixed(2)}</p>
                    </div>
                  </div>
                  <span className={styles.cart_removeItem} onClick={() => handleRemoveClick(item)}><Trash className='mr-3' />Remove Item</span>
                </div>
              ))
              : Array(3)
                .fill(0)
                .map((_, index) => (
                  <div className={styles.cart_items_container} key={index}>
                    <div className={styles.cart_item}>
                      <div className={styles.item_info}>
                        <Skeleton height={50} width={50} className={styles.cart_item_image} />
                      </div>
                      <div className={styles.item_info}>
                        <Skeleton height={20} width={150} />
                        <Skeleton height={20} width={100} />
                        <Skeleton height={20} width={100} />
                      </div>
                      <div className={styles.item_price}>
                        <Skeleton height={20} width={50} />
                      </div>
                      <div className={styles.item_quantity}>
                        <Skeleton height={30} width={30} />
                        <Skeleton height={30} width={50} />
                        <Skeleton height={30} width={30} />
                      </div>
                      <div className={styles.price}>
                        <Skeleton height={20} width={50} />
                      </div>
                    </div>
                    <Skeleton height={20} width={100} />
                  </div>
                ))}
          </div>
          {!context.loading ? (
            <div className={styles.cart_summary}>
              {
                cartSummary && (
                  <>
                    <h3>SUMMARY</h3>
                    <p>Subtotal: €{parseFloat(cartSummary.subtotal).toFixed(2)}</p>
                    {cartSummary.tax && (
                      <p>Tax: €{parseFloat(cartSummary.tax).toFixed(2)}</p>
                    )}
                    <p>Shipping Cost: €{parseFloat(cartSummary.shipping_total).toFixed(2)}</p>
                    <p>Discount: €{parseFloat(cartSummary.discount_amount).toFixed(2)}</p>
                    <div className={styles.input_container}>
                      <input value={discountValue} className={styles.discount_input} onChange={discounValueChange} placeholder='Apply Discount' />
                      {
                        discountValue && (
                          <XCircle className={styles.cross_icon} onClick={() => setDiscountValue('')} />
                        )
                      }
                    </div>
                    <div className={styles.discount_container}>
                      <Button className={styles.discount_button} onClick={() => handleCoupon('apply')}>Apply</Button>
                      <Button className={styles.discount_button} onClick={() => handleCoupon('remove')}>Remove</Button>
                    </div>
                    <h4>Order Total: €{parseFloat(cartSummary.grand_total).toFixed(2)}</h4>
                  </>
                )
              }
              {
                spinnerLoading ? (
                  <>
                    <button
                      disabled={spinnerLoading} // Disable button while loading
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "10px 20px",
                        fontSize: "16px",
                        backgroundColor: spinnerLoading ? "#ccc" : "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: spinnerLoading ? "not-allowed" : "pointer",
                        width: '100%'
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <span
                          className={styles.spinner}
                        ></span>
                        Loading...
                      </div>

                    </button>
                  </>) : (
                  <>
                    <button className={styles.checkoutButton} onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
                  </>
                )
              }

              <button className={styles.checkoutButton + ' mt-3'} onClick={() => createOrder()}>Buy Now</button>

            </div>
          ) : (
            <div className={styles.cart_summary}>
              <h3>
                <Skeleton width={100} />
              </h3>
              <p>
                <Skeleton width={150} />
              </p>
              <h4>
                <Skeleton width={150} />
              </h4>
              <Skeleton width={200} height={40} />
            </div>
          )}

          {/* Modal */}
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Remove Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to remove{' '}
              <strong>{itemToRemove?.product_name}</strong> from the cart?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={() => confirmRemove()}>
                Remove
              </Button>
            </Modal.Footer>
          </Modal>

          <ToastContainer />
        </div>
      )}

      {cartData && (cartData.length == 0 || cartData[0].cart_items.length == 0) && (
        <>
          <div className={styles.empty_cart_container}>
            <div className={styles.empty_cart_content}>
              <img
                src={CartImage}
                alt="Empty Cart"
                className={styles.empty_cart_image}
              />
              <h1>Your Cart is Empty</h1>
              <p>It looks like you haven't added anything to your cart yet.</p>
              <button className={styles.shop_now_button} onClick={() => navigate('/')}>Shop Now</button>
            </div>
          </div>
        </>
      )}

      {spinnerLoading && (
        <>
          <div className={styles.empty_cart_container}>
            <div className={styles.empty_cart_content}>
              <DotLottieReact
                src="https://lottie.host/7709e40d-4f8e-4b8e-8d27-e56239852a55/pAXbP7lKOn.lottie"
                loop
                autoplay
              />
            </div>
          </div>
        </>
      )}
    </>

  )
};


export default CartComponent;
