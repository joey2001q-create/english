import { useEffect } from 'react';
import useWordStore from '../../store/useWordStore';
import WordCardGrid from './WordCardGrid';
import WordStudyPage from './WordStudyPage';
import WordListPage from './WordListPage';
import WordFuncView from './WordFuncView';
import FavoritePage from './FavoritePage';
import WordListenPage from './WordListenPage';

export default function WordModule() {
  const mode = useWordStore((s) => s.mode);
  const studySettings = useWordStore((s) => s.studySettings);
  const hasSettings = studySettings && studySettings.dailyNew > 0;

  useEffect(() => {
    if (mode !== 'listen' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, [mode]);

  if (mode === 'cards') {
    return <WordCardGrid />;
  }

  if (mode === 'study' || mode === 'quick') {
    return <WordStudyPage showSettings={!hasSettings} />;
  }

  if (mode === 'settings') {
    return <WordStudyPage showSettings={true} />;
  }

  if (mode === 'wordlist') {
    return <WordListPage />;
  }

  if (mode === 'favorite') {
    return <FavoritePage />;
  }

  if (mode === 'listen') {
    return <WordListenPage />;
  }

  return <WordFuncView />;
}
