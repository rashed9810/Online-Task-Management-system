import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <div>
      <h2>Welcome, {userInfo.username}</h2>
      <nav>
        <ul>
          <li>
            <Link to="/tasks">Task List</Link>
          </li>
          <li>
            <Link to="/create-task">Create Task</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
