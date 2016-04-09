export default ({actions, initial, years, rate, className})=>(
  <div className={className}>
    <div>
      <h2>Initial</h2>
      <label>Amount</label>
      <input type="text" maxLength="7" value={initial} onChange={actions.setInitial}/>
    </div>
    <div>
      <label>Years</label>
      <input type="number" maxLength="2" value={years} onChange={actions.setYears}/>
    </div>
    <div>
      <label>Rate</label>
      <input type="text" value={rate} onChange={actions.setRate}/>
    </div>
  </div>
);