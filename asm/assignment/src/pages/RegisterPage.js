import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { ToastContext } from '../contexts/ToastContext';

const questions = [
  'Tên thú cưng đầu tiên của bạn?',
  'Trường tiểu học của bạn?',
  'Thành phố bạn sinh ra?',
];

export default function RegisterPage() {
  const { register, setRedirectAfterLogin, redirectAfterLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { showError, showSuccess } = useContext(ToastContext);
  const [step, setStep] = useState(1);
  const [avatarPreview, setAvatarPreview] = useState('');

  const [form, setForm] = useState({
    name: '', email: '', avatar: '', username: '', password: '', confirm: '', question: questions[0], answer: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const redirect = params.get('redirect_uri');
    if (redirect) setRedirectAfterLogin(decodeURIComponent(redirect));
  }, [location.search, setRedirectAfterLogin]);

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setError('Avatar phải là jpg/png');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError('Avatar ≤ 2MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarPreview(reader.result);
      setForm((f) => ({ ...f, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const next = () => setStep((s) => Math.min(2, s + 1));
  const prev = () => setStep((s) => Math.max(1, s - 1));

  const validate = () => {
    if (!form.name) return 'Name bắt buộc';
    if (!form.email.includes('@')) return 'Email không hợp lệ';
    if (!form.username) return 'Username bắt buộc';
    if (!/^.*(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w]).{6,}.*$/.test(form.password)) return 'Password ≥6, có hoa, thường, kí tự đặc biệt';
    if (form.password !== form.confirm) return 'Confirm không khớp';
    if (!form.answer) return 'Answer bắt buộc';
    return '';
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (v) { setError(v); return; }
    setError('');
    try {
      await register(form);
      showSuccess('Registration successful. You are now signed in.');
      navigate(redirectAfterLogin || '/');
    } catch (err) {
      setError(err.message || 'Register failed');
      showError(err.message || 'Register failed');
    }
  };

  return (
    <div className="container" style={{ maxWidth: 600, margin: '24px auto' }}>
      <div className="card" style={{ padding: 20 }}>
        <h2 style={{ marginTop: 0 }}>Register</h2>
        <div style={{ margin: '12px 0', color: '#64748b' }}>
          <progress value={step} max={2} /> Step {step}/2
        </div>
        {error && <div style={{ color: '#dc2626', marginBottom: 8 }}>{error}</div>}

        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {step === 1 && (
            <>
              <input className="input" placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              <input className="input" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              <div>
                <label style={{ display: 'block', marginBottom: 6, color: '#64748b' }}>Avatar (jpg/png, ≤2MB): </label>
                <input className="input" type="file" accept="image/*" onChange={handleAvatar} />
                {avatarPreview && <img src={avatarPreview} alt="preview" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8, display: 'block', marginTop: 8 }} />}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-primary" type="button" onClick={next}>Next</button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <input className="input" placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
              <input className="input" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
              <input className="input" type="password" placeholder="Confirm password" value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} required />
              <select className="select" value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })}>
                {questions.map((q) => <option key={q} value={q}>{q}</option>)}
              </select>
              <input className="input" placeholder="Answer" value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} required />
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn" type="button" onClick={prev}>Previous</button>
                <button className="btn btn-primary" type="submit">Submit</button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}


