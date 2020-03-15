// 转换vdom为dom
export function initVNode(vnode) {
    // vnode是虚拟dom树
    const {vtype} = vnode;
    if (!vtype) {
        // 文本节点，TextNode
        return document.createTextNode(vnode);
    }

    if (vtype === 1) {
        // 原生节点
        return createElement(vnode);
    } else if(vtype === 2) {
        // class组件
        return createClassComp(vnode);
    } else {
        return createFuncComp(vnode);
    }
}

function createElement(vnode) {
    const {type,props} = vnode;
    const node = document.createElement(type);
    // 属性处理
    const {key, children, ...rest} = props;
    Object.keys(rest).forEach(attr => {
        // 特殊处理的属性：htmlFor，className
        if (attr === 'className') {
            node.setAttribute('class', rest[attr]);
        } else {
            node.setAttribute(attr, rest[attr]);
        }
    });

    // 递归可能存在的子元素
    children.forEach(c => {
        // c如果是数组
        if (Array.isArray(c)) {
            c.forEach(n=>node.appendChild(initVNode(n)))
        } else {
            node.appendChild(initVNode(c))
        }        
    })

    return node;
}

function createClassComp(vnode) {
    const {type, props} = vnode;
    console.log(type);
    
    const component = new type(props);
    // 执行class组件的render得到vdom
    const newNode = component.render();
    return initVNode(newNode);
}

function createFuncComp(vnode) {
    const {type, props} = vnode;
    // type是函数组件，它执行直接返回vdom
    const newNode = type(props);
    return initVNode(newNode);
}
// vdom diff

export function createVNode(vtype, type, props) {
    // 传递类型有三种：1-原生标签，2-函数式组件，3-class组件
    // 使用vtype属性表示元素类型
    const vnode = {
        vtype,type,props
    }

    return vnode;
}