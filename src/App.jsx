import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import FlightScheduler from "./components/FlightScheduler";
import DayScheduler from "./components/DayScheduler";

function App(props) {
  const [colName, setColName] = useState([]);
  return (
    <BrowserRouter>
      <div className="">
        
        <Routes>
          <Route path="/" element={<FlightScheduler />} />
          <Route path="/schedule/week" element={<FlightScheduler />} />
          <Route path="/schedule/day" element={<DayScheduler />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
