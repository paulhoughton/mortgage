import React from 'react';

export default ({actions, monthlyOverpayment, overpayments, years })=> {
  const setMonthlyOverpayment=(event)=>{
	  actions.setMonthlyOverpayment(event.target.value)
  }
  const updateOverpayment=(index, type, event)=> {
    actions.updateOverpayment(index, type, +event.target.value)
  }

  return (
    <div>
      <div>
        <h2>Overpayment</h2>
        <label>Monthly</label>
        <input type="text" maxLength="5" value={monthlyOverpayment} onChange={setMonthlyOverpayment}/>
      </div>
      <div>
          <label>Year</label>
          <label>Month</label>
          <label>Amount</label>
      </div>
      {overpayments.map((payment, i)=>(
        <div key={i}>
          <input type="text" type="number" min="0" max={years} value={payment.year} onChange={updateOverpayment.bind(this, i, "year")} />
          <input type="text" type="number" min="1" max="12" value={payment.month} onChange={updateOverpayment.bind(this, i, "month")} />
          <input type="text" value={payment.amount} onChange={updateOverpayment.bind(this, i, "amount")} />
          
          {i===overpayments.length-1 ?
            <button className="btn btn-xs" onClick={actions.addOverpayment}>+</button> : 
            <button className="btn btn-xs" onClick={actions.deleteOverpayment.bind(this, i)}>X</button>}
        </div>))
      }

    </div>
  );
}