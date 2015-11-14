import React from 'react';

export default ({actions, monthlyOverpayment, overpayments, years, className })=> {
  const action=(name, ...props)=>event=>actions[name](...props, +event.target.value)

  return (
    <div className={className}>
      <div>
        <h2>Overpayment</h2>
        <label>Monthly</label>
        <input type="text" maxLength="5" value={monthlyOverpayment} onChange={action("setMonthlyOverpayment")}/>
      </div>
      <div>
          <label>Year</label>
          <label>Month</label>
          <label>Amount</label>
      </div>
      {overpayments.map((payment, i)=>(
        <div key={i}>
          <input type="number" min="0" max={years} value={payment.year} onChange={action("updateOverpayment", i, "year")} />
          <input type="number" min="1" max="12" value={payment.month} onChange={action("updateOverpayment", i, "month")} />
          <input type="text" value={payment.amount} onChange={action("updateOverpayment", i, "amount")} />
          
          {i===overpayments.length-1 ?
            <button className="btn btn-xs" onClick={action("addOverpayment")}>+</button> : 
            <button className="btn btn-xs" onClick={action("deleteOverpayment", i)}>X</button>}
        </div>))
      }

    </div>
  );
}