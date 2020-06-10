import * as React from "react";
import * as ReactDOM from "react-dom";
import Careers from "./components/career";
import Login from './components/login';

const Index = () => {
  return (
    <div>
      <Login />
      
    </div>
  )
};

ReactDOM.render(<Index />, document.getElementById("root"));
