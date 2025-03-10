import React from 'react';
import styles from './CheckOutComponent.module.css';

const CheckOutComponent = () => {
  return (
    <div className={styles.checkout_container}>
      <div className={styles.form_section}>
        <h2>Email</h2>
        <input type="email" placeholder="Email Address*" className={styles.input_field} />
        <h2>Shipping</h2>
        <div className={styles.shipping_info}>
          <input type="text" placeholder="First Name*" className={styles.input_field} />
          <input type="text" placeholder="Last Name*" className={styles.input_field} />
          <input type="text" placeholder="Phone" className={styles.input_field} />
          <input type="text" placeholder="Address" className={styles.input_field} />
          <input type="text" placeholder="Apt, Suite" className={styles.input_field} />
          <input type="text" placeholder="City*" className={styles.input_field} />
          <input type="text" placeholder="State*" className={styles.input_field} />
          <input type="text" placeholder="ZIP Code*" className={styles.input_field} />
          <input type="text" placeholder="Country" className={styles.input_field} />
        </div>

        <div className={styles.gift_option}>
          <input type="checkbox" id="gift" />
          <label htmlFor="gift">This order is a gift</label>
        </div>

        <h2>Payment Method</h2>
        <div className={styles.payment_methods}>
          <div className={styles.credit_card}>
            <p>Credit Card</p>
            <div className={styles.cards}>
              <img src="visa.png" alt="Visa" />
              <img src="mastercard.png" alt="Mastercard" />
              <img src="amex.png" alt="American Express" />
            </div>
          </div>
          <div className={styles.pay_over_time}>
            <p>Pay Over Time</p>
            <p>As low as $59/month* for 43 months at 0% APR.</p>
          </div>
        </div>
      </div>

      <div className={styles.summary_section}>
        <h2>Cart Summary</h2>
        <p>1 Bike+ Basics Package</p>
        <p>$2,495.00</p>
        <p>1 Peloton Membership</p>
        <p>$39/mo membership to unlimited Peloton content.</p>
        <hr />
        <p>Subtotal: $2,495.00</p>
        <p>Estimated Total: $2,495.00</p>

        <h2>100 Day Home Trial</h2>
        <ul>
          <li>Try Peloton at home for 100 days.</li>
          <li>Explore thousands of classes, live and on_demand.</li>
          <li>Not for you? We’ll refund your entire order.</li>
        </ul>
      </div>
    </div>
  )
};


export default CheckOutComponent;
