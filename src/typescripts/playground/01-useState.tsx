import React = require("react");
import ReactDOM = require("react-dom");
import { useState } from "react";
import '../styles/app.scss';

const App = (props) => {

    const [count, setCount] = useState(props.count);

    return(
        <div>
            <span>Current count is {count}</span>

            <input 
                type='button'
                value='+1'
                onClick={() => setCount(count + 1)}
            />

            <input 
                type='button'
                value='-1'
                onClick={() => setCount(count - 1)}
            />

            <input 
                type='button'
                value='Reset'
                onClick={() => setCount(props.count)}
            />
        </div>
    );
}

ReactDOM.render(
    <App count = {0} />,
    document.getElementById('root')
);


