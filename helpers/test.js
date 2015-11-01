import TestUtils from "react-addons-test-utils";

export function shallowRender(element) {
  var shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(element);
  return shallowRenderer.getRenderOutput();
}
