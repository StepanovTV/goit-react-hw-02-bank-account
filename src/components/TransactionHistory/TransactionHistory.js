import React from 'react';
import PropTypes from 'prop-types';
import styles from './TransactionHistory.module.css';

const TransactionHistory = ({ history }) => {
  return (
    <section>
      <div className="container">
        <table className={styles.history}>
          <thead>
            <tr>
              <th>Transaction</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {history.map(ele => (
              <tr key={ele.id}>
                <td>{ele.type}</td>
                <td>{ele.amount}$</td>
                <td>{ele.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

TransactionHistory.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default TransactionHistory;
