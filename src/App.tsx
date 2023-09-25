import { Route, Routes } from "react-router-dom";

import './App.css';

import { ProjectWorks } from "./components/project-works/organelles/project-works";


function App() {
  return (
    <div className="App">
        <div className="App_Actual">
            <Routes>
                <Route path="/" element={<ProjectWorks />}/>
            </Routes>
        </div>
    </div>
  );
}

export default App;
