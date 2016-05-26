export default ({ actions, monthlyOverpayment, overpayments, years, className }) => (
  <div className={className}>
    <div>
      <h2>Overpayment</h2>
      <label>Monthly</label>
      <input type="text" maxLength="5" value={monthlyOverpayment} onChange={actions.setMonthlyOverpayment}/>
    </div>
    <div>
        <label>Year</label>
        <label>Month</label>
        <label>Amount</label>
    </div>
    {overpayments.map(({ year, month, amount }, i) => (
      <div key={i}>
        <input type="number" min="0" max={years} value={year} onChange={actions.updateOverpayment(i, "year")} />
        <input type="number" min="1" max="12" value={month} onChange={actions.updateOverpayment(i, "month")} />
        <input type="text" value={amount} onChange={actions.updateOverpayment(i, "amount")} />

        {i === overpayments.length-1 ?
          <button className="btn btn-xs" onClick={actions.addOverpayment}>+</button> :
          <button className="btn btn-xs" onClick={actions.deleteOverpayment(i)}>X</button>}
      </div>))
    }

  </div>
);
