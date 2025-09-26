
import './main.css'
import Form from "./Form.jsx";
import {BrowserRouter, Link, Route, Routes, Outlet} from "react-router-dom";
import Order from "./Order.jsx";

function App() {


    return <>
        <BrowserRouter>
            <nav>
                <Link to="/">Home</Link> |{" "}
                <Link to="/order">Orders</Link> |{" "}
            </nav>
            <Routes>
                <Route path="/" element={<Form id="merchform"/>}/>
                <Route path="/order" element={<Order/>}/>
            </Routes>
        </BrowserRouter>

    </>
}

export default App

// FRONT-END (CLIENT) JAVASCRIPT HERE

