import React, { useState } from 'react';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import EventIcon from '@material-ui/icons/Event';
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import './App.css';

import Table from './Table';
import Chart from './Chart';
import calculate from './calculations';

const defaultOverpayment = {month: '1', year: '0', amount: '0'};

export default () => {
    const [initial, setInitial] = useState('200000');
    const [rate, setRate] = useState('5');
    const [years, setYears] = useState('25');
    const [monthlyOverpayment, setMonthlyOverpayment] = useState('0');
    const [overpayments, setOverpayments] = useState([defaultOverpayment]);

    const updateOverpayment = index => ({target}) =>
        setOverpayments(
            overpayments.map((overpayment, i) =>
                i === index
                    ? {...overpayment, [target.name]: target.value}
                    : overpayment
            )
        );

    const {monthlyPayment, payments} = calculate(
        +initial,
        +years,
        +rate,
        +monthlyOverpayment,
        overpayments
    );

    return (
        <div>
            <nav className="navbar navbar-default">
                <div className="navbar-header">
                    <div className="navbar-brand" style={{fontFamily: 'Times New Roman', fontSize: 25}}>
                        Mortgage Overpayment Calculator
                    </div>
                </div>
            </nav>
            <div className="container-fluid">
                <div className="col-md-8 col-sm-12">
                    <div className="col-sm-4">
                        <div>
                            <h2>Initial</h2>
                            <label>
                                <MonetizationOnIcon className= {'material-icons'} />
                                Amount<span className={'required'}> *</span>
                            </label>
                            <input 
                                //style={{width: "80px"}}
                                //placeholder="Required"
                                type="number"
                                maxLength={7}
                                value={initial}
                                onChange={e => {
                                    e.target.value = !!e.target.value && Math.abs(e.target.value) >= 0 ? Math.abs(e.target.value) : null;
                                    setInitial(e.target.value)
                                }}
                            />
                        </div>
                        <div>
                            <label>
                                <EventIcon className= {'material-icons'} />
                                Years<span className={'required'}> *</span>
                            </label>
                            <input
                                //style={{width: "80px"}}
                                //placeholder="Required"
                                type="number"
                                maxLength={2}
                                value={years}
                                onChange={e => {
                                    e.target.value = !!e.target.value && Math.abs(e.target.value) >= 0 ? Math.abs(e.target.value) : null;
                                    setYears(e.target.value)
                                }}
                            />
                        </div>
                        <div>
                            <label> <span className='percentage'>% </span>Rate<span className={'required'}> *</span></label>
                            <input
                                //style={{width: "80px"}}
                                //placeholder="Required"
                                type="number"
                                step={0.1}
                                value={rate}
                                onChange={e => {
                                    e.target.value = !!e.target.value && Math.abs(e.target.value) >= 0 ? Math.abs(e.target.value) : null;
                                    setRate(e.target.value)
                                }}
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
                                onChange={e => {
                                    e.target.value = !!e.target.value && Math.abs(e.target.value) >= 0 ? Math.abs(e.target.value) : null;
                                    setMonthlyOverpayment(e.target.value)
                                }}
                            />
                        </div>
                        <div>
                            <label>Year</label>
                            <label>Month</label>
                            <label>
                                <MonetizationOnIcon className= {'material-icons'} />
                                Amount
                            </label>
                        </div>
                        {overpayments.map(({year, month, amount}, i) => (
                            <div key={i}>
                                <input
                                    type="number"
                                    min="0"
                                    max={years}
                                    value={!!year && Math.abs(year) >= 0 ? Math.abs(parseInt(year)) : null}
                                    name="year"
                                    onChange={updateOverpayment(i)}
                                />
                                <input
                                    type="number"
                                    min="1"
                                    max="12"
                                    value={!!month && Math.abs(month) >= 0 ? Math.max(1, Math.min(12, Math.abs(parseInt(month)))) : null}
                                    name="month"
                                    onChange={updateOverpayment(i)}
                                />
                                <input
                                    type="number"
                                    value={!!amount && Math.abs(amount) >= 0 ? Math.abs(amount) : null}
                                    name="amount"
                                    onChange={updateOverpayment(i)}
                                />

                                {i === overpayments.length - 1 ? (
                                    <IconButton  color="secondary" variant="outlined"
                                                 onClick={() =>
                                                     setOverpayments([...overpayments, defaultOverpayment])
                                                 }>
                                        <AddIcon />
                                    </IconButton>
                                ) : (
                                    <IconButton  color="secondary" variant="outlined"
                                                 onClick={() =>
                                                     setOverpayments(overpayments.filter((_, j) => j !== i))
                                                 }>
                                        <DeleteIcon />
                                    </IconButton>
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
                        <Chart payments={payments}/>
                    </div>
                </div>
                <Table className="col-sm-4" payments={payments}/>
            </div>
        </div>
    );
};
