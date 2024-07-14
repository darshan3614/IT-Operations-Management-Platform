import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Sidebar</h2>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/it-operations">IT Operations</Link></li>
        <li><Link to="/asset-management">Asset Management</Link></li>
        <li><Link to="/network-performance">Network Performance</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;