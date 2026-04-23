import useAppStore from '../../store/useAppStore';

export default function TopHeader() {
  const { activeModule, getModuleTitle, toggleSidebar, darkMode, toggleDark, apiStatus, apiStatusText } = useAppStore();

  const apiDotClass = apiStatus === 'ok' ? 'api-dot ok' : 'api-dot';
  const apiLabelClass = apiStatus === 'ok' ? 'api-label ok' : 'api-label';

  return (
    <header className="top-header">
      <button className="mobile-menu-btn" onClick={toggleSidebar}>
        <i className="fas fa-bars"></i>
      </button>

      <div className="header-welcome">
        <h3>{getModuleTitle(activeModule)}</h3>
      </div>

      <div className="header-right">
        <div className="api-status-wrap">
          <span className={apiDotClass}></span>
          <span className={apiLabelClass}>{apiStatusText}</span>
        </div>

        <button className="dark-toggle" onClick={toggleDark} title="深色模式">
          <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
        </button>

        <button className="header-btn" onClick={() => useAppStore.getState().goModule('qa')}>
          <i className="fas fa-camera"></i>
          <span>拍照答疑</span>
        </button>
      </div>
    </header>
  );
}
