import React, { useState } from 'react';
import  { withLDProvider, useFlags } from 'launchdarkly-react-client-sdk';
import './App.css';
import Table from './Table';
import Chart from './Chart';
import calculate from './calculations';
import ProgressBar from 'react-bootstrap/ProgressBar';

const defaultOverpayment = { month: '1', year: '0', amount: '0' };
const defaultActualPayment = {}

const App = () => {
  const [initial, setInitial] = useState('200000');
  const [rate, setRate] = useState('5');
  const [years, setYears] = useState('25');
  const [monthlyOverpayment, setMonthlyOverpayment] = useState('0');
  const [overpayments, setOverpayments] = useState([defaultOverpayment]);
  const [actualYear, setActualYear] = useState('0');
  const [actualYearPayment, setActualYearPayment] = useState('0');
  const [actualPayments, setActualPayments] = useState(defaultActualPayment);

  const { actualPaymentForm, actualProgressBar } = useFlags();
  
  const updateOverpayment = index => ({ target }) => {
    setOverpayments(
      overpayments.map((overpayment, i) =>
        i === index
          ? { ...overpayment, [target.name]: target.value }
          : overpayment
      )
    );
  }
  
  const setActualPayment = (year, amount) => {
    if (amount < 0 || year < 0 || year > Number(years)) return;
    setActualPayments(
      {
        ...actualPayments,
        [year]: amount
      }
    )
  }

  const { monthlyPayment, payments, actualTotal } = calculate(
    +initial,
    +years,
    +rate,
    +monthlyOverpayment,
    overpayments,
    actualPayments
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

          { actualPaymentForm ? 
          <div className="col-sm-10">
            <div>
              <h2>Actual Payments</h2>
              <label>Year</label>
              <input
                type="number"
                min="1"
                max={years}
                onChange={e => setActualYear(e.target.value)}
                />
              <label>Amount</label>
              <input
                maxLength={7}
                min="1"
                max={initial}
                onChange={e => setActualYearPayment(e.target.value)}
                />
              <button
                    className="btn btn-xs"
                    onClick={() =>
                      setActualPayment(actualYear, actualYearPayment)
                    }
                  >
                    +
                  </button>
            </div>
          </div>
          : null }

          <div className="col-sm-12">
            <h2>
              Monthly Payment
              <span className="money">
                {(+monthlyOverpayment + monthlyPayment).toFixed(2)}
              </span>
            </h2>
            <Chart payments={payments} />
            {actualProgressBar ? 
            <ProgressBar now={actualTotal}
                        min={0}
                        max={initial}
                        label={`${actualTotal} / ${initial}`}></ProgressBar> 
            : null}
          </div>
        </div>
        <Table className="col-sm-4" payments={payments} actualTotal={actualTotal} />
      </div>
    </div>
  );
};

export default withLDProvider({ clientSideID: '607a030de00b830bbb2020e5' })(App);