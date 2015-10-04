export function calculatePayments(initial, years, rate, monthlyOverpayment, overpayments=[]) {
    let monthlyRatePct = rate / 1200;
    let balance = initial;
	let baseline = initial;
    let payments = [{overpayment:0, balance, baseline}];
    let monthlyPayment = (initial * monthlyRatePct / (1 - (Math.pow(1/(1 + monthlyRatePct), years * 12)))).toFixed(2);
	let partial;
	
    for (let year=1; year<=years; year++) {
        let interestYearly = 0;
		let overpayment = overpayments.reduce((acc,val) => (val.year==year ? acc+val.amount : acc),0)

        for (let month=1; month<=12; month++) {
            let interestMonth = balance * monthlyRatePct;
            interestYearly+= interestMonth;
            balance = Math.max(0,balance - monthlyPayment - monthlyOverpayment + interestMonth - (month==1?overpayment:0));
			baseline = baseline - monthlyPayment + (baseline* monthlyRatePct);
			if (balance<=0 && partial===undefined && month!=12) partial=month;
		}

		payments.push({baseline, interestYearly, overpayment:overpayment+(monthlyOverpayment *12), balance, partial});
		if (partial) partial=0;
    }
    return {monthlyPayment, payments};
};

