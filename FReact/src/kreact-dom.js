import {initVNode} from './kvdom'

function render(vnode, container) {
//   container.innerHTML = `<pre>${JSON.stringify(vnode, null, 2)}</pre>`;
container.appendChild(initVNode(vnode));
}
export default {render}