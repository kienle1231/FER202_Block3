import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { CartContext } from '../contexts/CartContext';
import { WishlistContext } from '../contexts/WishlistContext';

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const { count } = useContext(CartContext);
  const { ids } = useContext(WishlistContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const avatarInitial = (user?.name || user?.email || 'U').slice(0, 1).toUpperCase();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="app-header">
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" className="brand">
          <span className="brand-mark">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" stroke="#1d4ed8" strokeWidth="2"/>
              <path d="M12 8V16" stroke="#1d4ed8" strokeWidth="2"/>
              <path d="M8 10L12 8L16 10" stroke="#1d4ed8" strokeWidth="2"/>
            </svg>
          </span>
          <h3 className="brand-name">My Store</h3>
        </Link>
        <nav className="app-nav" style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <Link to="/checkout" className="nav-link">Checkout</Link>
          <Link to="/wishlist" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center' }}>
            Wishlist
            <span className="chip" style={{ background: '#1f2937', color: '#fff', marginLeft: 6 }}>{ids.length}</span>
          </Link>
          <Link to="/cart" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center' }}>
            Cart
            <span className="chip" style={{ background: '#2563eb', color: '#fff', marginLeft: 6 }}>{count}</span>
          </Link>
          {user ? (
            <div style={{ position: 'relative' }}>
              <button className="btn btn-outline" onClick={() => setOpen((o) => !o)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, borderColor: '#cbd5e1' }}>
                <span style={{
                  width: 26, height: 26, borderRadius: '999px', background: '#2563eb', color: '#fff', display: 'inline-flex',
                  alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 12,
                }}>{avatarInitial}</span>
                <span>Xin chào, {user.name || user.email}</span>
              </button>
              {open && (
                <div className="card" style={{ position: 'absolute', right: 0, top: 'calc(100% + 8px)', minWidth: 220, padding: 8 }}>
                  <div style={{ padding: 8, borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{
                      width: 30, height: 30, borderRadius: '999px', background: '#2563eb', color: '#fff', display: 'inline-flex',
                      alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12,
                    }}>{avatarInitial}</span>
                    <div style={{ fontWeight: 600 }}>{user.name || user.email}</div>
                  </div>
                  <div style={{ padding: 6 }}><Link to="/account" onClick={() => setOpen(false)} style={{ textDecoration: 'none' }}>Account</Link></div>
                  <div style={{ padding: 6 }}><Link to="/wishlist" onClick={() => setOpen(false)} style={{ textDecoration: 'none' }}>Wishlist</Link></div>
                  <div style={{ padding: 6 }}><button className="btn" onClick={() => { setOpen(false); handleLogout(); }}>Logout</button></div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary" style={{ textDecoration: 'none' }}>Sign in</Link>
          )}
        </nav>
      </div>
    </header>
  );
}


