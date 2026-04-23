import useAppStore from '../../store/useAppStore';

const TAB_ITEMS = [
  { key: 'dashboard', icon: 'fa-home', label: '首页' },
  { key: 'word', icon: 'fa-book', label: '单词' },
  { key: 'listening', icon: 'fa-headphones', label: '听力' },
  { key: 'speaking', icon: 'fa-microphone', label: '口语' },
  { key: 'essay', icon: 'fa-pen-fancy', label: '作文' },
];

export default function MobileTabBar() {
  const { activeModule, goModule } = useAppStore();

  return (
    <nav className="mobile-tabbar">
      {TAB_ITEMS.map((item) => (
        <button
          key={item.key}
          className={`mobile-tabbar-item${activeModule === item.key ? ' active' : ''}`}
          onClick={() => goModule(item.key)}
        >
          <i className={`fas ${item.icon}`}></i>
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
