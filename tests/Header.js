import test from "tape";
import React from 'react';
import Header from '../components/Header';

import TestUtils from "react-addons-test-utils";

function createComponent(component, props, ...children) {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(React.createElement(component, props, children.length > 1 ? children : children[0]));
	return shallowRenderer.getRenderOutput();
}

test("Header navbar test", function (assert) {
	const headerComponent = createComponent(Header, {title:"The Title"});
	const container=headerComponent.props.children;
	assert.equal(headerComponent.type, "nav", "should be a nav");
	const navbar=container.props.children;
	const brand=navbar.props.children;
	assert.equal(brand.props.children, "The Title", "should display supplied title");
	assert.end();
});

