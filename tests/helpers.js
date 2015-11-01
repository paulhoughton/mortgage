import test from "tape";
import {calculatePayments} from '../helpers/mortgage';

test("200000 for 25 years @ 5%", function (assert) {
	const {monthlyPayment, payments} = calculatePayments(200000, 25, 5, 0);

	assert.equal(Math.floor(payments[0].balance), 200000, "should have initial 200000 balance");
	assert.equal(payments.length, 26, "should have 25 payments plus inital");
	assert.equal(+monthlyPayment, 1169.18, "should be 1169.18 a month");
	assert.ok(Math.floor(payments[24].balance)>0, "should have positive balance until final year");
	assert.equal(Math.floor(payments[25].balance), 0, "should have 0 balance at end");
	assert.end();
});

test("300000 for 30 years @ 2.5%", function (assert) {
	const {monthlyPayment, payments} = calculatePayments(300000, 30, 2.5, 0);

	assert.equal(Math.floor(payments[0].balance), 300000, "should have initial 200000 balance");
	assert.equal(payments.length, 31, "should have 30 payments plus inital");
	assert.equal(+monthlyPayment, 1185.36, "should be 1185.36 a month");
	assert.ok(payments[29].balance>0, "should have positive balance until final year");
	assert.equal(Math.floor(payments[30].balance), 0, "should have 0 balance at end");
	assert.end();
});

test("200000 for 25 years @ 5% overpaying 50", function (assert) {
	const {monthlyPayment, payments} = calculatePayments(200000, 25, 5, 50);

	assert.equal(Math.floor(payments[0].balance), 200000, "should have initial 200000 balance");
	assert.equal(payments.length, 26, "should have 25 payments plus inital");
	assert.equal(+monthlyPayment, 1169.18, "should be 1169.18 a month");
	assert.ok(Math.floor(payments[23].balance)>0, "should have positive balance until 23th year");
	assert.equal(Math.floor(payments[24].balance), 0, "should have 0 balance in 24th year");
	assert.equal(Math.floor(payments[25].balance), 0, "should have 0 balance at end");
	assert.end();
});