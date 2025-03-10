import React from 'react';
import styles from './StoreCredit.module.css';
import { CashCoin, PiggyBank } from 'react-bootstrap-icons';

const StoreCredit = () => {
  return (
    <div className={styles.store_credit_container}>
      <h2 className={styles.store_credit_title}>Company Store Credit</h2>

      <div className={styles.balance_section}>
        <div className={styles.balance_card}>
          <div className={styles.icon_container}>
            <CashCoin className={styles.icon  + ' ' + styles.blue_icon} />
          </div>
          <div className={styles.balance_content}>
            <p>Current Balance</p>
            <h3>0.00 €</h3>
          </div>
        </div>

        <div className={styles.balance_card}>
          <div className={styles.icon_container}>
            <PiggyBank className={styles.icon  + ' ' + styles.orange_icon} />
          </div>
          <div className={styles.balance_content}>
            <p>
              To Be Paid <span className={styles.tooltip_icon}>?</span>
            </p>
            <h3>0.00 €</h3>
          </div>
        </div>
      </div>

      <div className={styles.warning_message}>
        <span className={styles.warning_icon}>⚠</span>
        There are no credit operations associated with your Company Account.
      </div>
    </div>
  )
};


export default StoreCredit;
