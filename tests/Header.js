import Header from '../components/Header';

import {shallowRender} from "../helpers/test";

test("Header navbar test", function (assert) {
	const headerComponent = shallowRender(<Header title="The Title"/>);
	const container=headerComponent.props.children;
	assert.equal(headerComponent.type, "nav", "should be a nav");
	const navbar=container.props.children;
	const brand=navbar.props.children;
	assert.equal(brand.props.children, "The Title", "should display supplied title");
	assert.end();
});

