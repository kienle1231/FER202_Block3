import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import ProfileBuilder from '../components/ProfileBuilder';


export default function AccountPage() {
  const { user } = useContext(AuthContext);
  const [showProfileBuilder, setShowProfileBuilder] = useState(false);
  if (!user) return <div>Vui lòng đăng nhập.</div>;
  return (
    <div className="account-wrapper">
      <div className="account-card">
        <div className="account-header">
          <h3 className="account-title">Tài khoản</h3>
          <button className="btn btn-primary" onClick={() => setShowProfileBuilder(true)}>
            Cập nhật hồ sơ
          </button>
        </div>
        <div className="account-body">
          <div className="account-grid">
            <div>
              <div className="account-label">ID</div>
              <div className="account-value">{user.id}</div>
            </div>
            <div>
              <div className="account-label">Email</div>
              <div className="account-value">{user.email}</div>
            </div>
            <div>
              <div className="account-label">Họ và tên</div>
              <div className="account-value">{user.name}</div>
            </div>
            <div>
              <div className="account-label">Trạng thái</div>
              <div className="account-value">Đang hoạt động</div>
            </div>
          </div>
        </div>
        <div className="account-actions">
          <button className="btn btn-secondary me-2" onClick={() => alert('Đăng xuất (demo)')}>Đăng xuất</button>
          <button className="btn btn-success" onClick={() => setShowProfileBuilder(true)}>Chỉnh sửa hồ sơ</button>
        </div>
      </div>

      <ProfileBuilder show={showProfileBuilder} onHide={() => setShowProfileBuilder(false)} />
    </div>
  );
}


