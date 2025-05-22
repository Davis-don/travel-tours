import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Homepage from './pages/Homepage';
import Layout from './components/Layout/Layout';
import ToursPage from './pages/ToursPage';
import Aboutpage from './pages/Aboutpage/Aboutpage';
import Contactpage from './pages/Contactpage';
import Clientdashboard from './pages/Clientdashboard/Clientdashboard';
import Agentaccount from './pages/Agentaccount';
function App() {
  

  return (
  <div className="app">
 <HashRouter>
  <Routes>
    <Route path="/" element={<Layout><Homepage/></Layout>} />
    <Route path="/tours" element={<Layout><ToursPage/></Layout>} />
    <Route path="/about" element={<Layout><Aboutpage/></Layout>} />
    <Route path="/contact" element={<Layout><Contactpage/></Layout>} />
    <Route path="/booking" element={<Clientdashboard/>} />
    <Route path="/agent" element={<Agentaccount/>} />
  </Routes>
</HashRouter>
  </div>
  )
}

export default App
