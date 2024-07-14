import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Login from './pages/Login';
import ITOperations from './components/ITOperations';
import AssetManagement from './components/AssetManagement';
import NetworkPerformance from './components/NetworkPerformance';
import NotFound from './pages/NotFound';
import './styles.css';
import Dashboard from './components/Dashboard';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (username) => {
    setCurrentUser(username);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" exact element={currentUser ? <Dashboard currentUser={currentUser} onLogout={handleLogout} /> : <Login onLogin={handleLogin} />} />
          <Route path="/dashboard" element={currentUser ? <Dashboard currentUser={currentUser} onLogout={handleLogout} /> : <Login onLogin={handleLogin} />} />
          <Route path="/it-operations" element={<ITOperations />} />
          <Route path="/asset-management" element={<AssetManagement />} />
          <Route path="/network-performance" element={<NetworkPerformance />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
          <Route index element={<Home />} />
        </Routes>
        <div className="app">
          <Sidebar />
          <div className="content">
            {/* render the routes here */}
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;