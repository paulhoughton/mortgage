import React from 'react';

import Table from './Table';

export default ({payments, className})=> {
	let output=payments.slice(1)
		.filter(year=>year.balance>0 || year.interestYearly>0)
		.reduce((acc, year, index) => {
			return {
				interestTotal:acc.interestTotal+year.interestYearly,
				overpaymentTotal:acc.overpaymentTotal+year.overpayment,
				rows:acc.rows.concat([
						[year.partial?year.partial + "m":index+1,
						Math.round(year.interestYearly||0),
						Math.round(year.overpayment),
						Math.round(year.balance)]])
			}
		}, {interestTotal:0, overpaymentTotal:0, rows:[]});

	return <Table className={className}
			headings={["Years", "Interest", "Overpayment", "Balance"]}
			rows={output.rows}
			totals={[" ",Math.round(output.interestTotal), Math.round(output.overpaymentTotal)," "]} />;
};