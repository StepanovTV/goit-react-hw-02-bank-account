import React from 'react';
import PropTypes from 'prop-types';

import styles from './controls.module.css';

const Controls = ({
  hendelChange,
  pushWithdraw,
  pushDeposit,
  value,
  errors,
}) => {
  return (
    <section className={styles.controls}>
      <div className="container">
        {errors && <p className={styles.errors}>{errors}</p>}
        <input
          value={value === 0 ? '' : value}
          onChange={hendelChange}
          step="10"
          type="number"
          placeholder="Сумма транзакции..."
          className={styles.numbers}
        />
        <button
          type="button"
          onClick={pushDeposit}
          className={styles.controlBtn}
        >
          Deposit
        </button>
        <button
          type="button"
          onClick={pushWithdraw}
          className={styles.controlBtn}
        >
          Withdraw
        </button>
      </div>
    </section>
  );
};

Controls.propTypes = {
  hendelChange: PropTypes.func.isRequired,
  pushWithdraw: PropTypes.func.isRequired,
  pushDeposit: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  errors: PropTypes.string.isRequired,
};

export default Controls;
