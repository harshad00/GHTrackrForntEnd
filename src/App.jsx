import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import { BrowserRouter as Router ,Route, Routes } from 'react-router';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';

function App() {
  

  return (
    <Router>
      <Navbar />
      <div style={{ minHeight: '80vh', padding: '20px' }}>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
           <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />

    </Router>
  )
}

export default App
