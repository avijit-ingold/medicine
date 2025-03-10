import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './OrderDetails.module.css';
import { GenericApiContext } from '../../context/GenericApiContext';

const OrderDetails = () => {
  const [recentlyBought, setRecentlyBought] = useState(null);
  const context = useContext(GenericApiContext);

  const getOrderDetails = () => {
    const url = 'purchase-history'
    context.getGetData(url, 'purchaseHistory');
  }

  useEffect(() => {
    getOrderDetails();
  }, [])

  useEffect(() => {
    if (context.purchaseHistory) {
      setRecentlyBought(context.purchaseHistory.data.data)
    }
  }, [context.purchaseHistory])


  return (
    <div className={styles.my_orders_container}>
      <h1 className={styles.my_orders_title}>My Orders</h1>
      <div className={styles.table_container}>
        <table className={styles.orders_table}>
          <thead>
            <tr>
              <th>Order #</th>
              <th>Date</th>
              <th>Payment Type</th>
              <th>Payment Status</th>
              <th>Order Total</th>
              <th>Delivery Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {recentlyBought && recentlyBought.map((item, id) => {
              return (
                <tr key={id}>
                  <td>{item.code}</td>
                  <td>{item.date}</td>
                  <td>{item.payment_type}</td>
                  <td>{item.payment_status}</td>
                  <td>{item.grand_total}</td>
                  <td>{item.delivery_status}</td>
                  <td>
                    <a href="#">View Order</a> | <a href="#">Reorder</a>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <label htmlFor="perPage">Show</label>
        <select id="perPage" className={styles.per_page_select}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
        <span>per page</span>
      </div>
    </div>
  )
};



export default OrderDetails;
