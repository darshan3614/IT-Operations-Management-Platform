
import React from 'react';

const Dashboard = ({ currentUser, onLogout }) => {
  return (
    <div>
      <h1>Welcome, {currentUser}!</h1>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};
export default Dashboard;
//Dashboard.js

