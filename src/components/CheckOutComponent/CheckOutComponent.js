import React, { useContext, useEffect, useState } from 'react';
import styles from './CheckOutComponent.module.css';
import axios from 'axios';
import { GenericApiContext } from '../../context/GenericApiContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";

const CheckOutComponent = () => {
  const [cartSummary, setCartSummary] = useState();
  const [defaultAddress, setDefaultAddress] = useState();
  const [userDetails, setUserDetails] = useState();
  const [paymentMethod, setPaymentMethod] = useState();
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false)

  const context = useContext(GenericApiContext);
  const navigate = useNavigate();

  const handleCartSummary = () => {

    setTimeout(() => {
      const headers = {
        "Content-Type": "application/json",
      };
      axios({
        method: 'GET',
        url: process.env.REACT_APP_API_URL + `b2c/cartlist?cartid=${sessionStorage.getItem('QuoteID')}&loggin=true`,
        headers: headers
      }).then((res) => {
        setCartSummary(res.data[0]);
      }).finally(() => {
      });
    }, 1000)
  }

  const handleSelect = (method) => {
    setSelected(method);
  };


  const getBillingMethod = async () => {
    const url = 'carts/mine/shipping-information';
    const reqBody = {
      "addressInformation": {
        "shipping_address": {
          "region": defaultAddress.region.region,
          "country_id": defaultAddress.country_id,
          "street": [defaultAddress.street[0]],
          "postcode": defaultAddress.postcode,
          "city": defaultAddress.city,
          "firstname": defaultAddress.firstname,
          "lastname": defaultAddress.lastname,
          "telephone": defaultAddress.telephone,
          "region_id": defaultAddress.region.region_id
        },
        "billing_address": {
          "region": defaultAddress.region.region,
          "country_id": defaultAddress.country_id,
          "street": [defaultAddress.street[0]],
          "postcode": defaultAddress.postcode,
          "city": defaultAddress.city,
          "firstname": defaultAddress.firstname,
          "lastname": defaultAddress.lastname,
          "telephone": defaultAddress.telephone,
          "region_id": defaultAddress.region.region_id
        },
        "shipping_carrier_code": "freeshipping",
        "shipping_method_code": "freeshipping"
      }
    };

    context.getPostDataQuick(url, 'paymentMethod', reqBody)
  }

  const getDefaultAddress = (customerData) => {
    if (!customerData || !customerData.addresses) return null;
    return customerData.addresses.find(address => address.default_billing && address.default_shipping) || null;
  }

  const placeOrder = async () => {
    setLoading(true)
    const url = 'carts/mine/order';

    const body = {
      "paymentMethod": {
        "method": selected
      },
      "shippingMethod": {
        "method_code": "freeshipping",
        "carrier_code": "freeshipping",
        "additionalProperties": {}
      }
    }

    const headers = {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Authorization": `Bearer ${sessionStorage.getItem('CustomerToken')}`,
    };

    axios({
      method: 'PUT',
      url: process.env.REACT_APP_API_URL + url,
      headers: headers,
      data: JSON.stringify(body)
    }).then((res) => {
      if (res) {
        navigate(`/success/${res.data}`)
      }
    }).catch((err) => {
      toast.error(`Error: ${err.message || "Something went wrong!"}`);
      console.error(err);
    }).finally(() => {
      setLoading(false)
    });
  }

  useEffect(() => {
    if (context.paymentMethod) {
      setPaymentMethod(context.paymentMethod.data.payment_methods)
    }
  }, [context.paymentMethod])

  useEffect(() => {
    handleCartSummary();
    console.log(getDefaultAddress(JSON.parse(sessionStorage.getItem('loginDetails'))))
    setDefaultAddress(getDefaultAddress(JSON.parse(sessionStorage.getItem('loginDetails'))));
    setUserDetails(JSON.parse(sessionStorage.getItem('loginDetails')));
  }, [])

  useEffect(() => {
    if (defaultAddress) {
      getBillingMethod();
    }
  }, [defaultAddress])


  return (
    <>
      {
        userDetails && (
          <div className={styles.checkout_container}>
            <div className={styles.form_section}>
              <h2>Email</h2>
              <p className={styles.input_field}>{userDetails.email}</p>
              <h2>Shipping</h2>
              <div className={styles.shipping_info}>
                <p className={styles.input_field} >{defaultAddress.firstname + ' ' + defaultAddress.lastname} </p>
                <p className={styles.input_field} >{defaultAddress.company} </p>
                <p className={styles.input_field} >{defaultAddress.street[0]}</p>
                <p className={styles.input_field} >{defaultAddress.city + ',' + defaultAddress.city + ',' + defaultAddress.region.region} </p>
                <p className={styles.input_field} >{defaultAddress.postcode} </p>
              </div>
            </div >
            <div className={styles.form_section}>
              <h2>Payment Method</h2>
              <div className="space-y-2">
                {paymentMethod && paymentMethod.map((method) => (
                  <label
                    key={method.code}
                    className={`flex items-center space-x-2 p-2 border rounded-lg cursor-pointer w-100 d-flex ${selected === method.value ? "border-blue-500 bg-blue-100" : "border-gray-300"
                      }`}
                  >
                    <input
                      type="radio"
                      name={method.title}
                      value={method.code}
                      checked={selected === method.code}
                      onChange={() => handleSelect(method.code)}
                    />
                    <div
                      className={`w-5 h-5 flex items-center justify-center border-2 rounded-full ${selected === method.code ? "border-blue-500" : "border-gray-400"
                        }`}
                    >
                      {selected === method.code && (
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <span>{method.title}</span>
                  </label>
                ))}
              </div>
              {
                selected && (
                  <div className='spaec-y-2 border mt-3 p-3 d-flex justify-content-center' style={{ cursor: 'pointer' }} onClick={() => placeOrder()}>
                    {loading ? ('Placing Order...') : ('Place Order')}
                  </div>
                )
              }
            </div>

            <div className={styles.summary_section}>
              <h2>Cart Summary</h2>
              <div className={styles.cart_summary}>
                {
                  cartSummary && (
                    <>
                      <p>Subtotal: €{parseFloat(cartSummary.subtotal).toFixed(2)}</p>
                      {cartSummary.tax && (
                        <p>Tax: €{parseFloat(cartSummary.tax).toFixed(2)}</p>
                      )}
                      <p>Shipping Cost: €{parseFloat(cartSummary.shipping_total).toFixed(2)}</p>
                      <p>Discount: €{parseFloat(cartSummary.discount_amount).toFixed(2)}</p>
                      <h4>Order Total: €{parseFloat(cartSummary.grand_total).toFixed(2)}</h4>
                    </>
                  )
                }

              </div>
            </div>
          </div>
        )
      }
    </>
  )
};


export default CheckOutComponent;
