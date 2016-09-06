import { calculatePayments } from '../helpers/mortgage';

describe('200000 for 25 years @ 5%', () => {
  const { monthlyPayment, payments } = calculatePayments({ initial: 200000, years: 25, rate: 5, monthlyOverpayment: 0 });

  it('should have initial 200000 balance', () => {
    expect(Math.floor(payments[0].balance)).toBeCloseTo(200000);
  });
  it('should have 25 payments plus inital', () => {
    expect(payments.length).toBe(26);
  });
  it('should have payment of 1169.18 a month', () => {
    expect(monthlyPayment).toBe("1169.18");
  });
  it('should have positive balance until final year', () => {
    expect(payments[24].balance).toBeGreaterThan(0);
  });
  it('should have 0 balance at end', () => {
    expect(payments[25].balance).toBeCloseTo(0);
  });
});

describe('300000 for 30 years @ 2.5%', () => {
  const { monthlyPayment, payments } = calculatePayments({ initial: 300000, years: 30, rate: 2.5, monthlyOverpayment: 0 });

  it('should have initial 300000 balance', () => {
    expect(Math.floor(payments[0].balance)).toBeCloseTo(300000);
  });
  it('should have 30 payments plus inital', () => {
    expect(payments.length).toBe(31);
  });
  it('should have payment of 1185.36 a month', () => {
    expect(monthlyPayment).toBe("1185.36");
  });
  it('should have positive balance until final year', () => {
    expect(payments[29].balance).toBeGreaterThan(0);
  });
  it('should have 0 balance at end', () => {
    expect(payments[30].balance).toBeCloseTo(0);
  });
});

describe('200000 for 25 years @ 5% overpaying 50', () => {
  const { monthlyPayment, payments } = calculatePayments({ initial: 200000, years: 25, rate: 5, monthlyOverpayment: 50 });

  it('should have initial 300000 balance', () => {
    expect(Math.floor(payments[0].balance)).toBeCloseTo(200000);
  });
  it('should have 30 payments plus inital', () => {
    expect(payments.length).toBe(26);
  });
  it('should have payment of 1169.18 a month', () => {
    expect(monthlyPayment).toBe("1169.18");
  });
  it('should have positive balance until 23th year', () => {
    expect(payments[23].balance).toBeGreaterThan(0);
  });
  it('should have 0 balance in 24th year', () => {
    expect(payments[24].balance).toBeCloseTo(0);
  });
  it('should have 0 balance at end', () => {
    expect(payments[25].balance).toBeCloseTo(0);
  });
});

