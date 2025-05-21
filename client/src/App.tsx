import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Header from './components/Header/Header';
import Homepage from './pages/Homepage';

function App() {
  

  return (
  <div className="app">
    <Router>
    <Header />
    <Routes>
      <Route path='/' element={<Homepage/>}/>
    </Routes>
    </Router>
  </div>
  )
}

export default App
