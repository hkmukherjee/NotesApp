"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
const react_1 = require("react");
require("../styles/app.scss");
const App = (props) => {
    const [count, setCount] = (0, react_1.useState)(props.count);
    return (React.createElement("div", null,
        React.createElement("span", null,
            "Current count is ",
            count),
        React.createElement("input", { type: 'button', value: '+1', onClick: () => setCount(count + 1) }),
        React.createElement("input", { type: 'button', value: '-1', onClick: () => setCount(count - 1) }),
        React.createElement("input", { type: 'button', value: 'Reset', onClick: () => setCount(props.count) })));
};
ReactDOM.render(React.createElement(App, { count: 0 }), document.getElementById('root'));
