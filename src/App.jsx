import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import From from './pages/From';
import PrivateRoute from './PrivateRoute';
import UserRepo from './pages/UserRepo';
import AiSummary from './pages/AiSummary';
import Myrepo from './pages/Myrepo';


function App() {


  return (
    <Router>
      <Navbar />
      <div className='mt-5' style={{ minHeight: '80vh', padding: '20px' }}>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/myrepos"
            element={
              <PrivateRoute>
                <Myrepo/>
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <From />
              </PrivateRoute>
            }
          />
          <Route
            path="/user-repo/:githubusername/:repo"
            element={
              <PrivateRoute>
                <UserRepo />
              </PrivateRoute>
            }
          />
          <Route
            path="/user-repo-AIsummary/:repo"
            element={
              <PrivateRoute>
                <AiSummary />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />

    </Router>
  )
}

export default App
