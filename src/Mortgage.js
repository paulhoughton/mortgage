export default function calculatePayments(
  initial,
  years,
  rate,
  monthlyOverpayment,
  overpayments,
  recurringCredit,
  creditInterest,
  serviceFee,
  monthlyCreditPayment,
) {
  // 1200 = 12 months * 100 (conversion for percent)
  const monthlyRatePct = rate / 1200;
  const monthlyCreditRate = creditInterest / 1200;

  const monthlyPayment =
    monthlyRatePct === 0
      ? initial / years / 12
      : (initial * monthlyRatePct) /
        (1 - Math.pow(1 / (1 + monthlyRatePct), years * 12));
  let balance = initial;

  let creditBalance = 0;

  // baseline used for calculating scenario 
  // where no overpayment is done 
  let baseline = initial;

  let mortgagePayments = [{overpayment: 0, balance, baseline}];
  let creditPayments = [{balance: recurringCredit}];

  // partial used to convey completion of loan payment mid-year
  let partial;

  for (let year = 0; year < years; year++) {
    let interestYearly = 0;
    let creditInterestYearly = 0;
    let overpaymentYearly = 0;
    for (let month = 1; month <= 12; month++) {
      let overpayment = overpayments
        .filter(x => +x.year === year && +x.month === month)
        .reduce((acc, val) => acc + +val.amount, 0);

      if (balance > 0 && creditBalance === 0){
        creditBalance = recurringCredit;
        overpayment += creditBalance;
        creditInterestYearly += creditBalance * (serviceFee/100)
      } 

      creditInterestYearly += monthlyCreditRate * creditBalance;
      creditBalance -= monthlyCreditPayment
      creditBalance = Math.max(creditBalance, 0)

      let interestMonth = balance * monthlyRatePct;
      interestYearly += interestMonth;
      overpaymentYearly += overpayment;
      
      // principal payment is monthlyPayment - interestMonth
      balance -=
        monthlyPayment + monthlyOverpayment + overpayment - interestMonth;
      baseline -= monthlyPayment - baseline * monthlyRatePct;

      if (balance <= 0) {
        balance = 0;
        if (partial === undefined && month !== 12) {
          partial = month;
        }
      }
    }
    creditPayments.push({
      baseline: 0,
      interestYearly: creditInterestYearly,
      balance: creditBalance,
      partial,
      overpayment: monthlyCreditPayment,
    })

    mortgagePayments.push({
      baseline,
      interestYearly,
      balance,
      partial,
      overpayment: overpaymentYearly + +monthlyOverpayment * (partial || 12)
    });
    if (partial) partial = 0;
  }

  console.log(creditPayments)

  return { monthlyPayment, mortgagePayments, creditPayments };
}