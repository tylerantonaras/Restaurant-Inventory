import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./components/pages/Home";
import Ingredients from "./components/pages/Ingredients";
import MenuItems from "./components/pages/MenuItems";
import Orders from './components/pages/Orders';
import Suppliers from "./components/pages/Suppliers";
import UpdateStock from "./components/pages/UpdateStock";
import Reports from "./components/pages/Reports";
import { UIProvider } from './context/UIContext';

function App() {
    return (
        <UIProvider>
            <Router>
                <div style={{ display: "flex" }}>
                    <Sidebar />
                    <div style={{ 
                        marginLeft: "280px", 
                        padding: "20px", 
                        width: "calc(100% - 280px)", 
                        minHeight: "100vh"
                    }}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/ingredients" element={<Ingredients />} />
                            <Route path="/menu-items" element={<MenuItems />} />
                            <Route path="/orders" element={<Orders />} />
                            <Route path="/suppliers" element={<Suppliers />} />
                            <Route path="/inventory" element={<UpdateStock />} />
                            <Route path="/reports" element={<Reports />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </UIProvider>
    );
}

export default App;
