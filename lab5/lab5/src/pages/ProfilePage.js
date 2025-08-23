import React, { useContext } from 'react';
import NavBar from '../shared/NavBar';
import { AuthContext } from '../contexts/AuthContext';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="container py-3">
      <NavBar />
      <h2>Profile</h2>
      {user ? (
        <p>Xin chào, {user.username}!</p>
      ) : (
        <p>Bạn chưa đăng nhập.</p>
      )}
    </div>
  );
};

export default ProfilePage;


