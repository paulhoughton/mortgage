import React from 'react';

export default ({data})=> {
	const border="#428bca solid 1px";
	let output=data.slice(1)
			.filter(year=>year.balance>0 || year.interestYearly>0)
			.reduce((acc, year, index) => {
				return {
					interestTotal:acc.interestTotal+year.interestYearly,
					overpaymentTotal:acc.overpaymentTotal+year.overpayment,
					rows:acc.rows.concat(<tr key={index}>
						<td>{year.partial?year.partial + "m":index+1}</td>
						<td className="currency interest">{Math.round(year.interestYearly||0)}</td>
						<td className="currency overpayment">{Math.round(year.overpayment)}</td>
						<td className="currency">{Math.round(year.balance)}</td>
					</tr>)
				}
			}, {interestTotal:0, overpaymentTotal:0, rows:[]})

	return (
		<table>
			<thead>
				<tr style={{borderBottom:border}}>
					<th>Years</th>
					<th className="interest">Interest</th>
					<th className="overpayment">Overpayment</th>
					<th>Balance</th>
				</tr>
			</thead>
			<tbody>
				{output.rows}
				<tr style={{borderTop:border}}>
					<td>&nbsp;</td>
					<td>{Math.round(output.interestTotal)}</td>
					<td>{Math.round(output.overpaymentTotal)}</td>
					<td>&nbsp;</td>
				</tr>
			</tbody>
		</table>
	);
};