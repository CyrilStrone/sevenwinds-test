import React from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css';
import { ProjectWorks } from './Pages/ProjectWorks/Organoids/ProjectWorks';

function App() {
  return (
    <div className="App">
        <div className="App_Actual">
            <Routes>
                <Route path="/" element={<ProjectWorks />}></Route>
            </Routes>
        </div>
    </div>
  );
}

export default App;
