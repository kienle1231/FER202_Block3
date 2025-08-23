import React, { useContext, useState } from 'react';
import NavBar from '../shared/NavBar';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const u = username.trim();
    if (!u || !password) {
      setError('Vui lòng nhập username và password.');
      return;
    }
    const saved = localStorage.getItem('users');
    const users = saved ? JSON.parse(saved) : [];
    const found = users.find((it) => it.username.toLowerCase() === u.toLowerCase() && it.password === password);
    if (!found) {
      setError('Sai thông tin đăng nhập.');
      return;
    }
    login(u);
    navigate('/checkout');
  };

  return (
    <div className="container py-3">
      <NavBar />
      <h2 className="mb-3">Login</h2>
      {error && (
        <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>
      )}
      <Form onSubmit={handleSubmit} style={{ maxWidth: 420 }}>
        <Form.Group className="mb-2">
          <Form.Label>Username</Form.Label>
          <Form.Control value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nhập username" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Nhập mật khẩu" />
        </Form.Group>
        <Button type="submit">Đăng nhập</Button>
      </Form>
    </div>
  );
};

export default LoginPage;


