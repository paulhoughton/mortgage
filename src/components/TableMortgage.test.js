import React from 'react';
import renderer from 'react-test-renderer';

import { TableMortgage } from './TableMortgage';

const component = (props) => renderer.create(
  <TableMortgage {...props}/>
);

it('Should render correctly', () => {
  const props = {
		payments:[
			{balance:200000, interestYearly:0, overpayment:0 },
			{balance:136631, interestYearly:8561, overpayment:0 },
			{balance:70019, interestYearly:5319, overpayment:0 },
			{balance:0, interestYearly:1911, overpayment:0 }   
		]
	}

  let tree = component(props).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Should render correctly on early completion', () => {
  const props = {
		payments:[
			{balance:200000, interestYearly:0, overpayment:6000 },
			{balance:130491, interestYearly:8421, overpayment:6000 },
			{balance:57426, interestYearly:4865, overpayment:6000 },
			{balance:0, interestYearly:1207, overpayment:6000, partial:10 },   
			{balance:0, interestYearly:0, overpayment:0 }
		]
	}

  let tree = component(props).toJSON();
  expect(tree).toMatchSnapshot();

});

it('Should render correctly with no data', () => {
	const props = {
		payments:[]
	}

  let tree = component(props).toJSON();
  expect(tree).toMatchSnapshot();

});
