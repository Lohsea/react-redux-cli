/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-08-06 11:23:24
 * @LastEditTime: 2021-08-25 18:36:52
 */

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import * as wasm from "starks_proofgen";
import Home from "./home";
import avatar from "./avatar.jpeg";

import "./index.css";

// function App() {
//   return (
//     <BrowserRouter>
//       <Switch>
//         <Route path="/" exact component={Home} />
//         <Route path="/list" component={List} />
//       </Switch>
//     </BrowserRouter>
//   );
// }

class App extends React.Component {
  render() {
    return (
      <h1>
        Hello, react
        <img src={avatar} />
      </h1>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
