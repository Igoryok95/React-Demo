import React, { useState } from "react";
import "./App.css";
import LineChart from "./Components/Charts/LineChart";
import Practice from "./Components/Table/Practice";
function App() {
  const [Item, setItem] = useState(true);

  const handleClick = () => {
    setItem(!Item);
  };

  return (
    <div className="App">
      <h2>{Item ? "Таблица" : "График"} React.js</h2>
      <button onClick={handleClick}>{Item ? "График" : "Таблица"}</button>
      {Item ? (
        <div style={{ marginBottom: "50px" }}>
          <Practice />
        </div>
      ) : (
        <React.Fragment>
          <div className="Appp">
            <LineChart />
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default App;
