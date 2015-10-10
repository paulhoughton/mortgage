import test from "tape";
import React from 'react';
import Table from '../components/Table';

import TestUtils from "react-addons-test-utils";

function createComponent(component, props, ...children) {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(React.createElement(component, props, children.length > 1 ? children : children[0]));
	return shallowRenderer.getRenderOutput();
}

test("Table test", function (assert) {
	const tableComponent = createComponent(Table, {data:[
		{balance:200000, interestYearly:0, overpayment:0 },
		{balance:136631, interestYearly:8561, overpayment:0 },
		{balance:70019, interestYearly:5319, overpayment:0 },
		{balance:0, interestYearly:1911, overpayment:0 }   
	]});
	assert.equal(tableComponent.type, "table", "should create a table");
	const tbody=tableComponent.props.children[1];
	const rows=tbody.props.children;
	assert.equal(rows.length, 4, "should have correct number of rows");
	const secondRow=rows[1].props.children;
	
	assert.equal(secondRow.length, 4, "should have 4 cells");
	assert.equal(secondRow[0].props.children,1,"should display correct year")
	assert.equal(secondRow[1].props.children,8561,"should display interest correcly")
	assert.equal(secondRow[2].props.children,0,"should display overpayments")
	assert.equal(secondRow[3].props.children,136631,"should display the balance")
	
	assert.end();
});

test("Table test - early completion", function (assert) {
	const tableComponent = createComponent(Table, {data:[
		{balance:200000, interestYearly:0, overpayment:6000 },
		{balance:130491, interestYearly:8421, overpayment:6000 },
		{balance:57426, interestYearly:4865, overpayment:6000 },
		{balance:0, interestYearly:1207, overpayment:6000, partial:10 },   
		{balance:0, interestYearly:0, overpayment:0 }
	]});

	const tbody=tableComponent.props.children[1];
	const rows=tbody.props.children;
	assert.equal(rows.length, 4, "should exclude empty rows");
	
	const completionRow=rows[3].props.children;
	assert.equal(completionRow[0].props.children, "10m", "should display completion month");
	assert.end();
});

test("Table test - no data", function (assert) {
	const tableComponent = createComponent(Table, {data:[]});
	assert.equal(tableComponent.props.children[1].props.children.length, 0, "should render empty table");
	assert.end();
});
