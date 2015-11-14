import React  from 'react';

export default ({actions, initial, years, rate, className})=>{ 
  const update = (action) => event => actions[action](event.target.value)
  
  return (
    <div className={className}>
      <div>
        <h2>Initial</h2>
        <label>Amount</label>
        <input type="text" maxLength="7" value={initial} onChange={update("setInitial")}/>
      </div>
      <div>
        <label>Years</label>
        <input type="text" maxLength="2" value={years} onChange={update("setYears")}/>
      </div>
      <div>
        <label>Rate</label>
        <input type="text" value={rate} onChange={update("setRate")}/>
      </div>
    </div>
  )
}