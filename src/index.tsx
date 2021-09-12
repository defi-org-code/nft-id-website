import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { StepsProvider } from "./context/StepsContext";
import { Web3Provider } from "./context/Web3Context";

ReactDOM.render(
  <Web3Provider>
    <StepsProvider>
      <Router>
        <App />
      </Router>
    </StepsProvider>
  </Web3Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
