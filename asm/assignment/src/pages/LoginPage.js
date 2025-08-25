import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { ToastContext } from '../contexts/ToastContext';

export default function LoginPage() {
  const { login, setRedirectAfterLogin, redirectAfterLogin } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { showError, showSuccess } = useContext(ToastContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const redirect = params.get('redirect_uri');
    if (redirect) setRedirectAfterLogin(decodeURIComponent(redirect));
  }, [location.search, setRedirectAfterLogin]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      showSuccess('Signed in successfully');
      navigate(redirectAfterLogin || '/');
    } catch (err) {
      setError(err.message || 'Login failed');
      showError(err.message || 'Login failed');
    }
  };

  return (
    <div className="container" style={{ maxWidth: 480, margin: '24px auto' }}>
      <div className="card" style={{ padding: 20 }}>
        <h2 style={{ marginTop: 0 }}>Sign in</h2>
        {error && <div style={{ color: '#dc2626', marginBottom: 8 }}>{error}</div>}
        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input className="input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button className="btn btn-primary" type="submit">Sign in</button>
        </form>
        <div style={{ marginTop: 12, color: '#64748b' }}>
          New Customer? <Link to="/register">Create an account</Link>
        </div>
      </div>
    </div>
  );
}


