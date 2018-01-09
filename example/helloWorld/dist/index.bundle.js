/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var containerNode = document.getElementById('app');

function App(props) {
    return (0, _index.y)(
        'div',
        null,
        props.name
    );
}

var TopApp = function (_Component) {
    _inherits(TopApp, _Component);

    function TopApp() {
        _classCallCheck(this, TopApp);

        return _possibleConstructorReturn(this, (TopApp.__proto__ || Object.getPrototypeOf(TopApp)).apply(this, arguments));
    }

    _createClass(TopApp, [{
        key: 'render',
        value: function render() {
            var children = this.props.children;

            return (0, _index.y)(
                'div',
                null,
                (0, _index.y)(App, { name: 'hello' })
            );
        }
    }]);

    return TopApp;
}(_index.Component);

(0, _index.mount)((0, _index.y)(TopApp, null), containerNode);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Component = exports.mount = exports.y = undefined;

var _y = __webpack_require__(2);

var _y2 = _interopRequireDefault(_y);

var _mount = __webpack_require__(3);

var _mount2 = _interopRequireDefault(_mount);

var _component = __webpack_require__(6);

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    y: _y2.default,
    mount: _mount2.default,
    Component: _component2.default
};
exports.y = _y2.default;
exports.mount = _mount2.default;
exports.Component = _component2.default;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = y;
/**
 * 
 * @param {*} type 
 * @param {*} props 
 */
function y(type) {
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
    }

    var children = [].concat(args);
    if (!Array.isArray(children)) {
        children = [children];
    }
    children = children.filter(Boolean);

    return {
        type: type,
        props: _extends({}, props, {
            children: children
        }),
        children: children
    };
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _element = __webpack_require__(4);

var _element2 = _interopRequireDefault(_element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _element2.default;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(5);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function instantiateComponent(element) {
    var type = element.type;
    if (typeof type === 'function') {
        console.error(element, 'element: ');
        return new CompositeComponent(element);
    } else if (typeof type === 'string') {
        return new DOMComponent(element);
    } else if (typeof element === 'string') {
        console.error(element, 'element: ');
        return element;
    }
}

var StringComponent = function () {
    function StringComponent(element) {
        _classCallCheck(this, StringComponent);

        this.currentElement = element;
    }

    _createClass(StringComponent, [{
        key: 'mount',
        value: function mount() {}
    }]);

    return StringComponent;
}();

var CompositeComponent = function () {
    function CompositeComponent(element) {
        _classCallCheck(this, CompositeComponent);

        this.currentElement = element;
        this.renderedComponent = null;
        this.publicInstance = null;
        console.error(element);
    }

    _createClass(CompositeComponent, [{
        key: 'getHostNode',
        value: function getHostNode() {
            return this.renderedComponent.getHostNode();
        }
    }, {
        key: 'receive',
        value: function receive(nextElement) {
            var prevProps = this.currentElement.props;
            var publicInstance = this.publicInstance;
            var prevRenderedComponent = this.renderedComponent;
            var prevRenderedElement = prevRenderedComponent.currentElement;

            this.currentElement = nextElement;
            var type = nextElement.type;
            var nextProps = nextElement.props;

            var nextRenderedElement = void 0;

            if ((0, _utils.isClass)(type)) {
                if (publicInstance.componentWillUpdate) {
                    publicInstance.componentWillUpdate(nextProps);
                }

                publicInstance.props = nextProps;
                nextRenderedElement = publicInstance.render();
            } else if (typeof type === 'function') {
                nextRenderedElement = type(nextProps);
            }

            if (prevRenderedElement.type === nextRenderedElement.type) {
                prevRenderedComponent.receive(nextRenderedElement);
                return;
            }

            var prevNode = prevRenderedComponent.getHostNode();
            prevRenderedComponent.unmount();
            var nextRenderedComponent = instantiateComponent(nextRenderedComponent.type);
            var nextNode = nextRenderedComponent.mount();
            this.renderedComponent = nextRenderedComponent;
            prevNode.parentNode.replaceChild(nextNode, prevNode);
        }
    }, {
        key: 'getPublicInstance',
        value: function getPublicInstance() {
            return this.publicInstance;
        }
    }, {
        key: 'unmount',
        value: function unmount() {
            var publicInstance = this.publicInstance;
            if (publicInstance.componentWillUnmount) {
                publicInstance.componentWillUnmount();
            }
            var renderedComponent = this.renderedComponent;
            renderedComponent.unmount();
        }
    }, {
        key: 'mount',
        value: function mount() {
            var element = this.currentElement;
            var type = element.type;
            var props = element.props;
            var publicInstance = void 0;
            var renderedElement = void 0;
            if ((0, _utils.isClass)(element)) {
                console.error('?????', element);
                publicInstance = new type(props);
                publicInstance.props = props;
                if (publicInstance.componentWillMount) {
                    publicInstance.componentWillMount();
                }
                renderedElement = publicInstance.render();
            } else {
                publicInstance = null;
                renderedElement = type(props);
            }
            this.publicInstance = publicInstance;
            this.renderedComponent = instantiateComponent(renderedElement);
            return this.renderedComponent.mount();
        }
    }]);

    return CompositeComponent;
}();

var DOMComponent = function () {
    function DOMComponent(element) {
        _classCallCheck(this, DOMComponent);

        this.currentElement = element;
        this.renderedChildren = [];
        this.node = null;
    }

    _createClass(DOMComponent, [{
        key: 'getPublicInstance',
        value: function getPublicInstance() {
            return this.node;
        }
    }, {
        key: 'getHostNode',
        value: function getHostNode() {
            return this.node;
        }
    }, {
        key: 'receive',
        value: function receive(nextElement) {
            var selfNode = this.node;
            var prevElement = this.currentElement;
            var prevProps = prevElement.props;
            var nextProps = nextElement.props;
            this.currentElement = nextElement;

            // remove old attr
            Object.keys(prevProps).forEach(function (propsName) {
                if (prevProps !== 'children' && !nextProps.hasOwnProperty(propsName)) {
                    node.removeAttribute(propsName);
                }
            });

            // set new attr
            Object.keys(nextProps).forEach(function (propName) {
                if (propName !== 'children') {
                    node.setAttribute(propName, nextProps[propName]);
                }
            });

            // update children
            var prevChildren = prevProps.children || [];
            var nextChildren = nextProps.children;
            if (!Array.isArray(prevRenderedChildren)) {
                prevRenderedChildren = [prevRenderedChildren];
            }
            if (!Array.isArray(nextRenderedChildren)) {
                nextRenderedChildren = [nextRenderedChildren];
            }
            var prevRenderedChildren = this.renderedChildren;
            var nextRenderedChildren = [];
            var operationQueue = [];
            for (var _i = 0; _i < nextRenderedChildren.length; _i++) {
                var prevChild = prevRenderedChildren[_i];
                // 之前不存在 则新增
                if (!prevChild) {
                    var nextChild = instantiateComponent(nextRenderedChildren[_i]);
                    var _node = nextChild.mount();
                    operationQueue.push({ type: 'ADD', node: _node });
                    nextRenderedChildren.push(nextChild);
                    continue;
                }
                var canUpdate = prevRenderedChildren[_i].type === nextRenderedChildren[_i].type;
                // type not same, replace
                if (!canUpdate) {
                    var prevNode = perv.getHostNode();
                    prevChild.unmount();
                    var _nextChild = instantiateComponent(nextRenderedChildren[_i]);
                    var _node2 = _nextChild.mount();
                    operationQueue.push({ type: 'REPLACE', prevChild: prevChild, nextChild: _nextChild });
                    continue;
                }
                prevChild.receive(nextChildren[_i]);
                nextRenderedChildren.push(prevChild);
            }
            //unmounted don't exist children
            for (var j = nextChildren.length; j < prevChildren.length; j++) {
                var _prevChild = prevRenderedChildren[i];
                var _node3 = _prevChild.getHostNode();
                _prevChild.unmount();
                operationQueue.push({ type: 'REMOVE', node: _node3 });
            }
            this.renderedChildren = nextRenderedChildren;

            // handle queue
            while (operationQueue.length > 0) {
                var operation = operationQueue.shift();
                switch (child.type) {
                    case 'REMOVE':
                        selfNode.removeChild(operation.node);
                        break;
                    case 'ADD':
                        selfNode.appendChild(operation.node);
                        break;
                    case 'REPLACT':
                        selfNode.replaceChild(operation.nextChild, operation.prevChildren);
                        break;
                }
            }
        }

        // ???
        // why not need unmount self

    }, {
        key: 'unmount',
        value: function unmount() {
            var renderedChildren = this.renderedChildren;
            renderedChildren.forEach(function (child) {
                return child.mount();
            });
        }
    }, {
        key: 'mount',
        value: function mount() {
            var element = this.currentElement;
            console.error(element, 'wocao???');
            var type = element.type;
            var props = element.props;
            var children = props.children;
            if (!Array.isArray(children)) {
                children = [children];
            }
            children = children.filter(function (item) {
                return item;
            });
            var node = document.createElement(type);
            Object.keys(props).forEach(function (propsKey) {
                if (propsKey !== 'children') {
                    if (propsKey == 'className') {
                        node.setAttribute('class', props[propsKey]);
                    } else {
                        node.setAttribute(propsKey, props[propsKey]);
                    }
                }
            });
            var renderedChildren = children.map(instantiateComponent);
            console.error(renderedChildren, 'renderedChildren: ');
            this.renderedChildren = renderedChildren;
            var childNodes = renderedChildren.map(function (child) {
                console.error(child, '????');
                if (typeof child === 'string') {
                    return document.createTextNode(child);
                } else {
                    child.mount();
                }
            });
            childNodes.forEach(function (childNode) {
                return node.appendChild(childNode);
            });
            return node;
        }
    }]);

    return DOMComponent;
}();

function mount(element) {
    var type = element.type;
    if (typeof type === 'function') {
        return new CompositeComponent(element);
    } else if (typeof type === 'string') {
        return new DOMComponent(element);
    }
}

function mountTree(element, containerNode) {
    console.error(element, containerNode, '????');
    if (containerNode.firstChild) {
        var prevNode = containerNode.firstChild;
        var prevRootComponent = prevNode._internalInstance;
        var prevElement = prevRootComponent.currentElement;

        if (prevElement.type === element.type) {
            prevRootComponent.receive(element);
            return;
        }
        unmountTree(containerNode);
    }
    var rootComponent = instantiateComponent(element);
    var node = rootComponent.mount();
    containerNode.appendChild(node);
    node._internalInstance = rootComponent;
    var publicInstance = rootComponent.getPublicInstance;
    return publicInstance;
}

function unmountTree(containerNode) {
    // const instance = instantiateComponent(containerNode)
    var node = containerNode.firstChild;
    var rootComponent = node._internalInstance;
    rootComponent.unmount();
    containerNode.innerHTML = '';
}

exports.default = mountTree;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isClass = isClass;

/**
 * 
 * @param {*} type 
 */
function isClass(type) {
  return type.prototype && type.prototype.isReactComponent;
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Component = function () {
    function Component(props, state) {
        _classCallCheck(this, Component);

        this.props = props;
        this.state = state;
        this.setState = function (state) {
            this.state = _extends({}, this.state, state);
        };
    }

    _createClass(Component, [{
        key: "render",
        value: function render() {}
    }]);

    return Component;
}();

Component.prototype.isReactComponent = true;

exports.default = Component;

/***/ })
/******/ ]);