import React from 'react';
import PropTypes from 'prop-types';
import styles from './Balance.module.css';

const Balance = ({ depoSumm, withSumm }) => {
  return (
    <section className="bal">
      <div className="container">
        <p className={styles.balance}>
          <span>
            <span className={styles.icoUp}> ⬆ </span> {depoSumm}$
          </span>
          <span>
            <span className={styles.icoDown}>⬇ </span> {withSumm}$
          </span>
          <span>
            Balance: <strong>{depoSumm - withSumm}</strong>$
          </span>
        </p>
      </div>
    </section>
  );
};

Balance.propTypes = {
  depoSumm: PropTypes.number.isRequired,
  withSumm: PropTypes.number.isRequired,
};
export default Balance;
