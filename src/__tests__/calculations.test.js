import calculatePayments from '../calculations'

const defaultOverpaymentMock = { month: '1', year: '0', amount: '0' }

const mockResult = {
  monthlyPayment: 3774.2467288021985,
  payments: [
    { balance: 200000, baseline: 200000, overpayment: 0 },
    {
      balance: 163888.9494036801,
      baseline: 163888.9494036801,
      interestYearly: 9179.910149306548,
      overpayment: 0,
      partial: undefined,
    },
    {
      balance: 125930.38892434924,
      baseline: 125930.38892434924,
      interestYearly: 7332.400266295533,
      overpayment: 0,
      partial: undefined,
    },
    {
      balance: 86029.79645003729,
      baseline: 86029.79645003729,
      interestYearly: 5390.3682713144135,
      overpayment: 0,
      partial: undefined,
    },
    {
      balance: 44087.81393813391,
      baseline: 44087.81393813391,
      interestYearly: 3348.978233723013,
      overpayment: 0,
      partial: undefined,
    },
    {
      balance: 0,
      baseline: -8.926690497901291e-10,
      interestYearly: 1203.146807491574,
      overpayment: 0,
      partial: undefined,
    },
  ],
}

describe('calculatePayments function', () => {
  test('Should return correct object', () => {
    expect(
      calculatePayments({
        initial: 200000,
        years: 5,
        rate: 5,
        monthlyOverpayment: 0,
        overpayments: [defaultOverpaymentMock],
      }),
    ).toEqual(mockResult)
  })
})
