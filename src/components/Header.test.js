import React from 'react';
import renderer from 'react-test-renderer';

import Header from './Header';

it('Header has correct contents', () => {
  const component = renderer.create(
		<Header title="The Title"/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
