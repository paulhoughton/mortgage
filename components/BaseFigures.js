import React  from 'react';

export default ({actions, initial, years, rate})=>{ 
  const update = (action, e) => actions[action](e.target.value)
  
  return (
    <div>
      <div>
        <h2>Initial</h2>
        <label>Amount</label>
        <input type="text" maxLength="7" value={initial} onChange={update.bind(this, "setInitial")}/>
      </div>
      <div>
        <label>Years</label>
        <input type="text" maxLength="2" value={years} onChange={update.bind(this, "setYears")}/>
      </div>
      <div>
        <label>Rate</label>
        <input type="text" value={rate} onChange={update.bind(this, "setRate")}/>
      </div>
    </div>
  )
}