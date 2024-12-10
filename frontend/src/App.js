import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./components/pages/Home";
import Ingredients from "./components/pages/Ingredients";

function App() {
    return (
        <Router>
            <div style={{ display: "flex" }}>
                <Sidebar />
                <div style={{ marginLeft: "200px", padding: "20px", width: "100%" }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/ingredients" element={<Ingredients />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
