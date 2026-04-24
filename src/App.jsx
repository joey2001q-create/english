import useAppStore from './store/useAppStore';
import Sidebar from './components/layout/Sidebar';
import TopHeader from './components/layout/TopHeader';
import MobileTabBar from './components/layout/MobileTabBar';
import NotifyToast from './components/common/NotifyToast';
import Dashboard from './components/dashboard/Dashboard';
import WordModule from './components/word/WordModule';
import SpokenEnglish from './components/speaking/SpokenEnglish';
import ListeningTraining from './components/listening/ListeningTraining';
import GrammarLearning from './components/grammar/GrammarLearning';
import ReadingComprehension from './components/reading/ReadingComprehension';
import EssayCorrection from './components/essay/EssayCorrection';
import AIChat from './components/qa/AIChat';

const OTHER_MODULES = ['config', 'library'];

export default function App() {
  const { activeModule, sidebarOpen, closeSidebar, getModuleTitle } = useAppStore();

  return (
    <>
      <NotifyToast />
      <div className="app">
        <div
          className={`mobile-mask${sidebarOpen ? ' show' : ''}`}
          onClick={closeSidebar}
        />

        <Sidebar />

        <main className="main">
          <TopHeader />

          <div className="content">
            {/* Dashboard 模块 */}
            <div
              id="mod-dashboard"
              className={`module${activeModule === 'dashboard' ? ' active' : ''}`}
            >
              <Dashboard />
            </div>

            {/* Word 模块 */}
            <div
              id="mod-word"
              className={`module${activeModule === 'word' ? ' active' : ''}`}
            >
              <WordModule />
            </div>

            {/* Speaking 口语对话模块 */}
            <div
              id="mod-speaking"
              className={`module${activeModule === 'speaking' ? ' active' : ''}`}
            >
              <SpokenEnglish />
            </div>

            {/* Listening 听力训练模块 */}
            <div
              id="mod-listening"
              className={`module${activeModule === 'listening' ? ' active' : ''}`}
            >
              <ListeningTraining />
            </div>

            {/* Grammar 语法学习模块 */}
            <div
              id="mod-grammar"
              className={`module${activeModule === 'grammar' ? ' active' : ''}`}
            >
              <GrammarLearning />
            </div>

            {/* Reading 阅读理解模块 */}
            <div
              id="mod-reading"
              className={`module${activeModule === 'reading' ? ' active' : ''}`}
            >
              <ReadingComprehension />
            </div>

            {/* Essay 作文批改模块 */}
            <div
              id="mod-essay"
              className={`module${activeModule === 'essay' ? ' active' : ''}`}
            >
              <EssayCorrection />
            </div>

            {/* QA AI问答模块 */}
            <div
              id="mod-qa"
              className={`module${activeModule === 'qa' ? ' active' : ''}`}
            >
              <AIChat />
            </div>

            {/* 其他模块占位 */}
            {OTHER_MODULES.map((mod) => (
              <div
                key={mod}
                id={`mod-${mod}`}
                className={`module${activeModule === mod ? ' active' : ''}`}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '200px',
                  fontSize: '18px',
                  color: 'var(--text-light)',
                  gap: '8px',
                }}>
                  <i className="fas fa-hammer" style={{ fontSize: '22px' }}></i>
                  {getModuleTitle(mod)} — 模块开发中…
                </div>
              </div>
            ))}
          </div>
        </main>

        <MobileTabBar />
      </div>
    </>
  );
}
