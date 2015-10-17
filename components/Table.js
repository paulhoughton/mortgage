import React from 'react';

export default ({data})=> (
	<table>
		<thead>
		<tr style={{borderBottom:"#428bca solid 1px"}}>
			<th>Years</th>
			<th className="interest">Interest</th>
			<th className="overpayment">Overpayment</th>
			<th>Balance</th>
		</tr>
		</thead>
		<tbody>
		{data.slice(1).filter(year=>year.balance>0 || year.interestYearly>0)
			.map((year, index) =>(<tr key={index}>
				<td>{year.partial?year.partial + "m":index+1}</td>
				<td className="currency interest">{Math.round(year.interestYearly||0)}</td>
				<td className="currency overpayment">{Math.round(year.overpayment)}</td>
				<td className="currency">{Math.round(year.balance)}</td>
			</tr>))
		}
		</tbody>
	</table>
);