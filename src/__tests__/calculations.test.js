import calculatePayments from '../calculations'

const defaultOverpaymentMock = { month: '1', year: '0', amount: '0' }

const mockResult = {
  monthlyPayment: 3774.24672880221,
  payments: [
    { balance: 200000, baseline: 200000, overpayment: 0 },
    {
      balance: 163888.94940368005,
      baseline: 163888.94940368005,
      interestYearly: 9179.910149306546,
      overpayment: 0,
      partial: undefined,
    },
    {
      balance: 125930.38892434904,
      baseline: 125930.38892434904,
      interestYearly: 7332.400266295525,
      overpayment: 0,
      partial: undefined,
    },
    {
      balance: 86029.79645003693,
      baseline: 86029.79645003693,
      interestYearly: 5390.3682713144,
      overpayment: 0,
      partial: undefined,
    },
    {
      balance: 44087.8139381334,
      baseline: 44087.8139381334,
      interestYearly: 3348.978233722991,
      overpayment: 0,
      partial: undefined,
    },
    {
      balance: 0,
      baseline: -1.576609065523371e-9,
      interestYearly: 1203.1468074915438,
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
