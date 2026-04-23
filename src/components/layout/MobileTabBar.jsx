import useAppStore from '../../store/useAppStore';

const TAB_ITEMS = [
  { key: 'dashboard', icon: 'fa-home', label: '首页' },
  { key: 'word', icon: 'fa-book', label: '单词' },
  { key: 'grammar', icon: 'fa-search', label: '语法' },
  { key: 'reading', icon: 'fa-file-alt', label: '阅读' },
  { key: 'qa', icon: 'fa-robot', label: 'AI助手' },
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
