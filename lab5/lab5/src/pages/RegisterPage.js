import React, { useState } from 'react';
import NavBar from '../shared/NavBar';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContext } from '../shared/ToastContext';
import { useContext } from 'react';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { showToast } = useContext(ToastContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const u = username.trim();
    if (!u || !password || !confirm) {
      setError('Vui lòng nhập đầy đủ thông tin.');
      return;
    }
    if (password.length < 4) {
      setError('Mật khẩu phải tối thiểu 4 ký tự.');
      return;
    }
    if (password !== confirm) {
      setError('Mật khẩu nhập lại không khớp.');
      return;
    }
    const saved = localStorage.getItem('users');
    const users = saved ? JSON.parse(saved) : [];
    if (users.some((it) => it.username.toLowerCase() === u.toLowerCase())) {
      setError('Tên đăng nhập đã tồn tại.');
      return;
    }
    const next = [...users, { username: u, password }];
    localStorage.setItem('users', JSON.stringify(next));
    showToast('Đăng ký thành công. Vui lòng đăng nhập.');
    navigate('/login');
  };

  return (
    <div className="container py-3">
      <NavBar />
      <h2 className="mb-3">Register</h2>
      {error && (
        <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>
      )}
      <Form onSubmit={handleSubmit} className="" style={{ maxWidth: 420 }}>
        <Form.Group className="mb-2">
          <Form.Label>Username</Form.Label>
          <Form.Control value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nhập username" />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Nhập mật khẩu" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Nhập lại mật khẩu" />
        </Form.Group>
        <Button type="submit">Đăng ký</Button>
      </Form>
    </div>
  );
};

export default RegisterPage;


