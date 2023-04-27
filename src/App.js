import React, { useState } from 'react';

import './App.css';

import Table from './Table';
import Chart from './Chart';
import calculate from './calculations';
// import Table from './mortageTable';

const defaultOverpayment = { month: '1', year: '0', amount: '0' };

export default () => {
  const [initial, setInitial] = useState('0');
  const [rate, setRate] = useState('8.9');
  const [years, setYears] = useState('10');
  const [monthlyOverpayment, setMonthlyOverpayment] = useState('0');
  const [overpayments, setOverpayments] = useState([defaultOverpayment]);

  const updateOverpayment = index => ({ target }) =>
    setOverpayments(
      overpayments.map((overpayment, i) =>
        i === index
          ? { ...overpayment, [target.name]: target.value }
          : overpayment
      )
    );

  const { monthlyPayment, payments } = calculate({
    initial: +initial,
    years: +years,
    rate: +rate,
    monthlyOverpayment: +monthlyOverpayment,
    overpayments
  });

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
          <h2>Initial</h2>
            <div className='range-div'>
              <label>Amount</label>
              <span>{initial}</span>
              <input
                type='range'
                max={200000}
                maxLength={5}
                value={initial}
                onChange={e => setInitial(e.target.value)}
                className='range'
              />
            </div>
            <div className='range-div'> 
              <label>Years</label>
              <span>{years}</span>
              <input
                type="range"
                max={25}
                value={years}
                onChange={e => setYears(e.target.value)}
                className='range'
              />
            </div>
            <div className='range-div'>
              <label>Rate</label>
              <span>{rate}</span>
              <input
                type="range"
                max={30}
                step={0.1}
                value={rate}
                onChange={e => setRate(e.target.value)}
                className='range'
              />
            </div>
          </div>
          <div className="col-sm-8">
          <h2>Overpayment</h2>
            <div className='range-div'>
              <label>Monthly</label>
              <span >{monthlyOverpayment}</span>
              <input
                type="range"
                maxLength={5}
                value={monthlyOverpayment}
                onChange={e => setMonthlyOverpayment(e.target.value)}
                className='range'
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
            <Chart payments={payments} />
          </div>
        </div>
        <div className='table'>
           <Table className="col-sm-4" payments={payments} />
        </div>
      </div>
    </div>
  );
};
