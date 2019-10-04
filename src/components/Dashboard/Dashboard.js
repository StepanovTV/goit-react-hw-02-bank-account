import React, { Component } from 'react';
import shortId from 'short-id';
import { validate } from 'indicative/validator';
import Controls from '../Controls/Controls';
import Balance from '../Balance/Balance';
import TransactionHistory from '../TransactionHistory/TransactionHistory';

const rules = {
  transSum: 'integer|accepted|above:9',
};

const messages = {
  integer: 'Должно бытьцелым числом',
  accepted: 'Не должно быть пустым',
  above: 'Cумма должна быть положительной и не меннее 10',
};

function formatDate() {
  const date = new Date();
  const day = date.getDate();
  const monthIndex = date.getMonth() + 1;
  const year = date.getFullYear();
  const hoasjd = date.getHours();
  const minijs = date.getMinutes();

  return `${day}/${monthIndex}/${year} ${hoasjd}:${minijs}`;
}

class Dashboard extends Component {
  TransType = {
    DEPOSIT: 'deposit',
    WITHDRAWAL: 'withdrawal',
  };

  transaction = [
    {
      id: shortId.generate(),
      type: this.TransType.DEPOSIT,
      amount: 5000,
      date: '4/17/2019, 12:21',
    },
    {
      id: shortId.generate(),
      type: this.TransType.DEPOSIT,
      amount: 1250,
      date: '5/01/2019, 10:45',
    },
    {
      id: shortId.generate(),
      type: this.TransType.WITHDRAWAL,
      amount: 3750,
      date: '6/21/2019, 09:36',
    },
    {
      id: shortId.generate(),
      type: this.TransType.DEPOSIT,
      amount: 7050,
      date: '7/01/2019, 10:45',
    },
    {
      id: shortId.generate(),
      type: this.TransType.WITHDRAWAL,
      amount: 250,
      date: '7/21/2019, 09:36',
    },
  ];

  state = {
    transaction: this.transaction,
    transSum: 0,
    errors: '',
    depoSumm: 0,
    withSumm: 0,
  };

  componentDidMount() {
    this.summDepos();
    this.summWith();
  }

  hendelChange = e => {
    const set = { transSum: Number(e.target.value) };
    this.setState(set);
  };

  handelPushDeposit = () => {
    const { transSum } = this.state;
    validate({ transSum }, rules, messages)
      .then(() => {
        const newTrans = {
          id: shortId.generate(),
          type: this.TransType.DEPOSIT,
          amount: transSum,
          date: formatDate(),
        };
        this.setState(state => ({
          transaction: [...state.transaction, newTrans],
        }));
        const set = { transSum: 0, errors: '' };
        this.setState(set);
        this.summDepos();
      })
      .catch(error => {
        this.setState({ errors: error[0].message });
      });
  };

  hendelPushWithdraw = () => {
    const { transSum } = this.state;
    validate({ transSum }, rules, messages)
      .then(() => {
        const newTrans = {
          id: shortId.generate(),
          type: this.TransType.WITHDRAWAL,
          amount: transSum,
          date: formatDate(),
        };
        this.setState(state => ({
          transaction: [...state.transaction, newTrans],
        }));
        const set = { transSum: 0, errors: '' };
        this.setState(set);
        this.summWith();
      })
      .catch(error => {
        this.setState({ errors: error[0].message });
      });
  };

  summDepos = () => {
    const { transaction } = this.state;

    const deposSumm = transaction.reduce((acum, ob) => {
      const summ = ob.type === this.TransType.DEPOSIT ? acum + ob.amount : acum;
      return summ;
    }, 0);

    this.setState({ depoSumm: deposSumm });
  };

  summWith = () => {
    const { transaction } = this.state;

    const Summ = transaction.reduce((acum, ob) => {
      const summ =
        ob.type === this.TransType.WITHDRAWAL ? acum + ob.amount : acum;
      return summ;
    }, 0);

    this.setState({ withSumm: Summ });
  };

  render() {
    const { transaction, transSum, errors, depoSumm, withSumm } = this.state;
    return (
      <>
        <Controls
          hendelChange={this.hendelChange}
          pushDeposit={this.handelPushDeposit}
          pushWithdraw={this.hendelPushWithdraw}
          value={transSum}
          errors={errors}
        />
        <Balance depoSumm={depoSumm} withSumm={withSumm} />
        <TransactionHistory history={transaction} />
      </>
    );
  }
}

export default Dashboard;
