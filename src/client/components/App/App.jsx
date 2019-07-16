import React from "react";
import logo from "./logo.svg";
import "./App.css";
import VideoStream from "../VideoStream/VideoStream";
import { Divider } from "semantic-ui-react";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} width="100px" className="App-logo" alt="logo" />
        <VideoStream />
      </header>
      <Divider />
    </div>
  );
}

export default App;
