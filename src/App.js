import React, { useState } from 'react';

import './App.css';

import Table from './Table';
import Chart from './Chart';
import calculateMortgage from './Mortgage';

const defaultOverpayment = { month: '1', year: '0', amount: '0' };

export default () => {
  const [initial, setInitial] = useState('220000');
  const [rate, setRate] = useState('3.375');
  const [years, setYears] = useState('30');
  const [monthlyOverpayment, setMonthlyOverpayment] = useState('0');
  const [overpayments, setOverpayments] = useState([defaultOverpayment]);

  // Line of credit calculation
  const [recurringCredit, setRecurringCredit] = useState('15000');
  const [creditInterest, setCreditInterest] = useState('25.00');
  const [serviceFee, setServiceFee] = useState('2.5');
  const [monthlyCreditPayment, setMonthlyCreditPayment] = useState('1500');

  const updateOverpayment = index => ({ target }) =>
    setOverpayments(
      overpayments.map((overpayment, i) =>
        i === index
          ? { ...overpayment, [target.name]: target.value }
          : overpayment
      )
    );

  const { monthlyPayment, mortgagePayments, creditPayments } = calculateMortgage(
    +initial,
    +years,
    +rate,
    +monthlyOverpayment,
    overpayments,
    +recurringCredit,
    +creditInterest,
    +serviceFee,
    +monthlyCreditPayment,
  );

  return (
    <div>
      <nav className="navbar navbar-default">
        <div className="navbar-header">
          <div className="navbar-brand">Mortgage Overpayment Calculator</div>
        </div>
      </nav>
      <div className="container-fluid">
        <div className="col-md-8 col-sm-12">
          <div className="col-sm-4">
            <div>
              <h2>Initial</h2>
              <label>Amount</label>
              <input
                maxLength={7}
                value={initial}
                onChange={e => setInitial(e.target.value)}
              />
            </div>
            <div>
              <label>Years</label>
              <input
                type="number"
                maxLength={2}
                value={years}
                onChange={e => setYears(e.target.value)}
              />
            </div>
            <div>
              <label>Rate</label>
              <input
                type="number"
                step={0.1}
                value={rate}
                onChange={e => setRate(e.target.value)}
              />
            </div>
          </div>
          <div className="col-sm-4">
            <div>
              <h2>Line of Credit</h2>
              <label>Recurring Credit</label>
              <input
                maxLength={7}
                value={recurringCredit}
                onChange={e => setRecurringCredit(e.target.value)}
              />
            </div>
            <div>
              <label>Credit Interest</label>
              <input
                type="number"
                step={0.1}
                value={creditInterest}
                onChange={e => setCreditInterest(e.target.value)}
              />
            </div>
            <div>
              <label>Service Fees</label>
              <input
                type="number"
                step={0.1}
                value={serviceFee}
                onChange={e => setServiceFee(e.target.value)}
              />
            </div>
            <div>
              <label>Montly Payment</label>
              <input
                type="number"
                step={0.1}
                value={monthlyCreditPayment}
                onChange={e => setMonthlyCreditPayment(e.target.value)}
              />
            </div>
          </div>
          <div className="col-sm-8">
            <div>
              <h2>Overpayment</h2>
              <label>Monthly</label>
              <input
                type="number"
                maxLength={5}
                value={monthlyOverpayment}
                onChange={e => setMonthlyOverpayment(e.target.value)}
              />
            </div>
            <div>
              <label>Year</label>
              <label>Month</label>
              <label>Amount</label>
            </div>
            {overpayments.map(({ year, month, amount }, i) => (
              <div key={i}>
                <input
                  type="number"
                  min="0"
                  max={years}
                  value={year}
                  name="year"
                  onChange={updateOverpayment(i)}
                />
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={month}
                  name="month"
                  onChange={updateOverpayment(i)}
                />
                <input
                  type="text"
                  value={amount}
                  name="amount"
                  onChange={updateOverpayment(i)}
                />

                {i === overpayments.length - 1 ? (
                  <button
                    className="btn btn-xs"
                    onClick={() =>
                      setOverpayments([...overpayments, defaultOverpayment])
                    }
                  >
                    +
                  </button>
                ) : (
                  <button
                    className="btn btn-xs"
                    onClick={() =>
                      setOverpayments(overpayments.filter((_, j) => j !== i))
                    }
                  >
                    X
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="col-sm-12">
            <h2>
              Monthly Payment
              <span className="money">
                {(+monthlyOverpayment + monthlyPayment).toFixed(2)}
              </span>
            </h2>
            <Chart payments={mortgagePayments} />
            <Chart payments={creditPayments} />
          </div>
        </div>
        <Table className="col-sm-4" payments={mortgagePayments} />
        <Table className="col-sm-4" payments={creditPayments} />
      </div>
    </div>
  );
};
