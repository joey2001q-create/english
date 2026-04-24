import { create } from 'zustand';

const STORAGE_KEYS = {
  learnedWords: 'liubin_learned_words',
  todayLearned: 'liubin_today_learned',
  todayDate: 'liubin_today_date',
  studyProgress: 'liubin_study_progress',
  studySettings: 'liubin_study_settings',
  wordbook: 'liubin_wb',
  errorWords: 'liubn_error_words',
};

const getTodayDate = () => new Date().toDateString();

const loadFromStorage = (key, defaultValue) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const saveToStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const vocabularyBooks = [
  { key: 'LiuBin_1000', name: '刘彬1000核心词', icon: '🎯', color: '#4CAF50' },
  { key: 'LiuBin_3500', name: '刘彬3500词汇', icon: '🚀', color: '#2196F3' },
  { key: 'LiuBin_6000', name: '刘彬6000词汇', icon: '💎', color: '#9C27B0' },
];

const useWordStore = create((set, get) => {
  const todayDate = getTodayDate();
  const storedTodayDate = localStorage.getItem(STORAGE_KEYS.todayDate);
  
  let initialTodayLearned = [];
  if (storedTodayDate === todayDate) {
    initialTodayLearned = loadFromStorage(STORAGE_KEYS.todayLearned, []);
  } else {
    localStorage.setItem(STORAGE_KEYS.todayDate, todayDate);
    saveToStorage(STORAGE_KEYS.todayLearned, []);
  }

  const initialStudyProgress = loadFromStorage(STORAGE_KEYS.studyProgress, {
    LiuBin_1000: { currentList: 'List1', dailyGoal: 20 },
    LiuBin_3500: { currentList: 'List1', dailyGoal: 20 },
    LiuBin_6000: { currentList: 'List1', dailyGoal: 20 },
  });

  const initialStudySettings = loadFromStorage(STORAGE_KEYS.studySettings, null);

  return {
    mode: 'cards',
    currentBook: 'LiuBin_1000',
    vocabularyBooks,
    history: [],
    isSending: false,

    wordbook: loadFromStorage(STORAGE_KEYS.wordbook, { words: [] }).words || [],
    errorWords: loadFromStorage(STORAGE_KEYS.errorWords, []),
    
    learnedWords: loadFromStorage(STORAGE_KEYS.learnedWords, []),
    todayLearned: initialTodayLearned,
    studyProgress: initialStudyProgress,
    studySettings: initialStudySettings,

    setMode: (mode) => set({ mode }),
    setCurrentBook: (book) => set({ currentBook: book }),

    addHistory: (msg) => {
      const h = get().history;
      set({ history: [...h, msg] });
    },

    clearHistory: () => set({ history: [] }),

    setIsSending: (val) => set({ isSending: val }),

    addWord: (word, context) => {
      const wb = get().wordbook;
      if (!wb.find(w => w.word === word)) {
        const newWord = { word, context, date: new Date().toISOString(), mastered: false };
        const newWb = [...wb, newWord];
        saveToStorage(STORAGE_KEYS.wordbook, { words: newWb });
        set({ wordbook: newWb });
      }
    },

    addErrorWord: (word, type = '听写') => {
      let errors = [...get().errorWords];
      const existingIndex = errors.findIndex(e => e.word.toLowerCase() === word.toLowerCase());
      if (existingIndex >= 0) {
        errors[existingIndex] = {
          ...errors[existingIndex],
          count: errors[existingIndex].count + 1,
          lastTime: Date.now(),
        };
      } else {
        errors.push({ word, count: 1, lastTime: Date.now(), type });
      }
      saveToStorage(STORAGE_KEYS.errorWords, errors);
      set({ errorWords: errors });
    },

    removeErrorWord: (word) => {
      const errors = get().errorWords.filter(e => e.word.toLowerCase() !== word.toLowerCase());
      saveToStorage(STORAGE_KEYS.errorWords, errors);
      set({ errorWords: errors });
    },

    clearErrorWords: () => {
      localStorage.removeItem(STORAGE_KEYS.errorWords);
      set({ errorWords: [] });
    },

    markWordLearned: (word) => {
      const currentTodayLearned = get().todayLearned || [];
      if (!currentTodayLearned.includes(word)) {
        const newTodayLearned = [...currentTodayLearned, word];
        saveToStorage(STORAGE_KEYS.todayLearned, newTodayLearned);
        set({ todayLearned: newTodayLearned });
      }
    },

    markWordMastered: (word) => {
      const currentLearnedWords = get().learnedWords || [];
      if (!currentLearnedWords.includes(word)) {
        const newLearnedWords = [...currentLearnedWords, word];
        saveToStorage(STORAGE_KEYS.learnedWords, newLearnedWords);
        set({ learnedWords: newLearnedWords });
      }
      
      const currentMasteredWords = get().masteredWords || [];
      if (!currentMasteredWords.includes(word)) {
        const newMasteredWords = [...currentMasteredWords, word];
        saveToStorage('liubin_mastered_words', newMasteredWords);
        set({ masteredWords: newMasteredWords });
      }
    },

    addFavoriteWord: (wordData) => {
      const currentFavorites = get().favoriteWords || [];
      const exists = currentFavorites.find(f => f.word === wordData.word);
      if (!exists) {
        const newFavorite = {
          word: wordData.word,
          phonetic: wordData.phonetic,
          type: wordData.type,
          meaning: wordData.meaning,
          example: wordData.example,
          addedAt: Date.now()
        };
        const newFavorites = [...currentFavorites, newFavorite];
        saveToStorage('liubin_favorite_words', newFavorites);
        set({ favoriteWords: newFavorites });
      }
    },

    removeFavoriteWord: (word) => {
      const currentFavorites = get().favoriteWords || [];
      const newFavorites = currentFavorites.filter(f => f.word !== word);
      saveToStorage('liubin_favorite_words', newFavorites);
      set({ favoriteWords: newFavorites });
    },

    masteredWords: loadFromStorage('liubin_mastered_words', []),
    favoriteWords: loadFromStorage('liubin_favorite_words', []),

    setDailyGoal: (goal) => {
      const { currentBook, studyProgress } = get();
      const currentProgress = studyProgress || {};
      const newProgress = {
        ...currentProgress,
        [currentBook]: {
          ...(currentProgress[currentBook] || { currentList: 'List1', dailyGoal: 20 }),
          dailyGoal: goal,
        },
      };
      saveToStorage(STORAGE_KEYS.studyProgress, newProgress);
      set({ studyProgress: newProgress });
    },

    setCurrentList: (listName) => {
      const { currentBook, studyProgress } = get();
      const currentProgress = studyProgress || {};
      const newProgress = {
        ...currentProgress,
        [currentBook]: {
          ...(currentProgress[currentBook] || { currentList: 'List1', dailyGoal: 20 }),
          currentList: listName,
        },
      };
      saveToStorage(STORAGE_KEYS.studyProgress, newProgress);
      set({ studyProgress: newProgress });
    },

    saveStudySettings: (settings) => {
      saveToStorage(STORAGE_KEYS.studySettings, settings);
      set({ studySettings: settings });
    },

    hasStudySettings: () => {
      const settings = get().studySettings;
      return settings !== null && settings.dailyNew > 0;
    },
  };
});

export default useWordStore;
