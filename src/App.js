// import logo from './logo.svg';
import './App.css';
import Quiz from './components/Quiz';
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home"
import Register from './components/Register';
import Login from './components/Login';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/quiz" element={<Quiz/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
        </Routes>
    );
}

export default App;
