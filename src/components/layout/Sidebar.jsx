import useAppStore from '../../store/useAppStore';

const navItems = useAppStore.getState().navItems;

export default function Sidebar() {
  const { activeModule, goModule, closeSidebar } = useAppStore();

  return (
    <aside className="sidebar" id="sidebar">
      <div className="sidebar-logo" onClick={() => goModule('dashboard')}>
        <div className="logo-icon">英</div>
        <div className="logo-text">
          <h2>刘彬英语</h2>
          <p>AI智能提分专家</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.key}
            className={`nav-item${activeModule === item.key ? ' active' : ''}`}
            onClick={() => goModule(item.key)}
          >
            <i className={`fas ${item.icon}`}></i>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <h4>💡 使用技巧</h4>
        <p>10大模块全部可用，口语对话/思维导图全新上线。干货PDF配置URL后即可预览下载。</p>
        <div className="tag-group">
          <span className="tag">口语对话</span>
          <span className="tag">思维导图</span>
          <span className="tag">拍照答疑</span>
        </div>
      </div>
    </aside>
  );
}
