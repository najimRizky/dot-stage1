// import logo from './logo.svg';
import './App.css';
import Quiz from './components/Quiz';
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home"

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/quiz" element={<Quiz/>}/>
        </Routes>
    );
}

export default App;
