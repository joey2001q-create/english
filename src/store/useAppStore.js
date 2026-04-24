import { create } from 'zustand';

const MODULE_TITLES = {
  dashboard: '刘彬英语 · 学习首页',
  word: '📖 单词背诵',
  speaking: '🎙️ 口语对话',
  listening: '🎧 听力训练',
  grammar: '🔍 语法学习',
  reading: '📝 阅读理解',
  essay: '✍️ 作文批改',
  qa: '💬 刘彬AI助手',
  config: '⚙️ API配置',
  library: '📥 资料库',
};

const NAV_ITEMS = [
  { key: 'dashboard', icon: 'fa-home', label: '学习首页' },
  { key: 'word', icon: 'fa-book-open', label: '单词背诵' },
  { key: 'speaking', icon: 'fa-microphone-alt', label: '口语对话' },
  { key: 'listening', icon: 'fa-headphones', label: '听力训练' },
  { key: 'grammar', icon: 'fa-pen-nib', label: '语法学习' },
  { key: 'reading', icon: 'fa-file-alt', label: '阅读理解' },
  { key: 'essay', icon: 'fa-edit', label: '作文批改' },
  { key: 'qa', icon: 'fa-comments', label: 'AI问答' },
];

const useAppStore = create((set, get) => ({
  activeModule: 'dashboard',
  sidebarOpen: false,
  darkMode: localStorage.getItem('darkMode') === 'true',
  apiStatus: 'idle', // idle | testing | ok | err
  apiStatusText: '尚未测试',

  getModuleTitle: (mod) => MODULE_TITLES[mod] || '刘彬英语',
  navItems: NAV_ITEMS,

  goModule: (mod) => {
    set({ activeModule: mod, sidebarOpen: false });
  },

  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  closeSidebar: () => set({ sidebarOpen: false }),

  toggleDark: () => {
    const next = !get().darkMode;
    set({ darkMode: next });
    localStorage.setItem('darkMode', String(next));
    document.body.classList.toggle('dark', next);
  },

  setApiStatus: (status, text) => set({ apiStatus: status, apiStatusText: text }),
}));

export default useAppStore;
