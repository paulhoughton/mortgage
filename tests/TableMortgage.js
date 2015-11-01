import test from "tape";
import React from 'react';
import TableMortgage from '../components/TableMortgage';

import {shallowRender} from "../helpers/test";

test("Table Mortgage test", function (assert) {
	const props = {
		data:[
			{balance:200000, interestYearly:0, overpayment:0 },
			{balance:136631, interestYearly:8561, overpayment:0 },
			{balance:70019, interestYearly:5319, overpayment:0 },
			{balance:0, interestYearly:1911, overpayment:0 }   
		]
	}
	const tableMortgage = shallowRender(<TableMortgage {...props}/>);
	const {headings, rows, totals} = tableMortgage.props;
	const firstRow = rows[0];

	assert.deepEqual(headings, ['Years', 'Interest', 'Overpayment', 'Balance'], "should have correct headings");
	assert.equal(rows.length, 3, "should have correct number of rows");
	assert.equal(firstRow.length, 4, "should have 4 items in a row");
	assert.equal(firstRow[0], 1, "should start at year 1");
	assert.equal(totals[1], 15791, "should sum interest correctly")
	assert.equal(totals[2], 0, "should sum overpayments correctly")
	assert.end();
});


test("Table Mortgage test - early completion", function (assert) {

	const props = {
		data:[
			{balance:200000, interestYearly:0, overpayment:6000 },
			{balance:130491, interestYearly:8421, overpayment:6000 },
			{balance:57426, interestYearly:4865, overpayment:6000 },
			{balance:0, interestYearly:1207, overpayment:6000, partial:10 },   
			{balance:0, interestYearly:0, overpayment:0 }
		]
	}

	const tableMortgage = shallowRender(<TableMortgage {...props}/>);
	const {headings, rows, totals} = tableMortgage.props;
	const completionRow=rows[2];

	assert.equal(rows.length, 3, "should exclude empty rows");
	assert.equal(completionRow[0], "10m", "should display completion month");
	assert.end();
});

test("Table Mortgage test - no data", function (assert) {
	const props = {
		data:[]
	}

	const tableMortgage = shallowRender(<TableMortgage {...props}/>);
	const {headings, rows, totals} = tableMortgage.props;

	assert.deepEqual(headings, ['Years', 'Interest', 'Overpayment', 'Balance'], "should still have headings");
	assert.equal(rows.length, 0, "should have no rows");
	assert.equal(totals[1], 0, "should have 0 interest")
	assert.equal(totals[2], 0, "should have 0 overpayments")
	assert.end();
});
