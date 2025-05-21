import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Header from './components/Header/Header';

function App() {
  

  return (
  <div className="app">
    <Router>
    <Header />
    </Router>
  </div>
  )
}

export default App
