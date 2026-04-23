let vocabularyData = null;

const defaultWords = [
  { word: "apple", phonetic: "ˈæp(ə)l", type: "n.", meaning: "苹果", example: "The apple is red and delicious.", list: "List1" },
  { word: "ball", phonetic: "bɔːl", type: "n.", meaning: "球", example: "The ball is round.", list: "List1" },
  { word: "cat", phonetic: "kæt", type: "n.", meaning: "猫", example: "The cat says meow.", list: "List1" },
  { word: "dog", phonetic: "dɔ:ɡ", type: "n.", meaning: "狗", example: "The dog barks happily.", list: "List1" },
  { word: "egg", phonetic: "eɡ", type: "n.", meaning: "鸡蛋", example: "We can cook the egg.", list: "List1" },
  { word: "fish", phonetic: "fɪʃ", type: "n.", meaning: "鱼", example: "The fish swims.", list: "List1" },
  { word: "girl", phonetic: "ɡɜːrl", type: "n.", meaning: "女孩", example: "The girl likes to play.", list: "List2" },
  { word: "hand", phonetic: "hænd", type: "n.", meaning: "手", example: "Wash your hands.", list: "List2" },
  { word: "insect", phonetic: "ˈɪnsekt", type: "n.", meaning: "昆虫", example: "Ants are insects.", list: "List2" },
  { word: "jump", phonetic: "dʒʌmp", type: "v.", meaning: "跳跃", example: "I like to jump.", list: "List2" },
  { word: "kite", phonetic: "kaɪt", type: "n.", meaning: "风筝", example: "I fly a kite.", list: "List2" },
  { word: "leg", phonetic: "leɡ", type: "n.", meaning: "腿", example: "My legs are strong.", list: "List2" },
  { word: "monkey", phonetic: "ˈmʌŋki", type: "n.", meaning: "猴子", example: "The monkey is hopping.", list: "List3" },
  { word: "name", phonetic: "neɪm", type: "n.", meaning: "名字", example: "My name is Tom.", list: "List3" },
  { word: "orange", phonetic: "ˈɔrɪndʒ", type: "n.", meaning: "橙子", example: "This orange is orange.", list: "List3" },
  { word: "pig", phonetic: "pɪɡ", type: "n.", meaning: "猪", example: "Look! A big pig.", list: "List3" },
  { word: "quiet", phonetic: "ˈkwaɪət", type: "adj.", meaning: "安静的", example: "Be quiet, please.", list: "List3" },
  { word: "river", phonetic: "ˈrɪvər", type: "n.", meaning: "河流", example: "The river is long.", list: "List3" },
  { word: "sing", phonetic: "sɪŋ", type: "v.", meaning: "唱歌", example: "The bird sings.", list: "List4" },
  { word: "teacher", phonetic: "ˈti:tʃər", type: "n.", meaning: "老师", example: "She is a teacher.", list: "List4" },
  { word: "umbrella", phonetic: "ʌmˈbrelə", type: "n.", meaning: "雨伞", example: "Put up your umbrella.", list: "List4" },
  { word: "vacation", phonetic: "veɪˈkeɪʃən", type: "n.", meaning: "假期", example: "Summer vacation is coming.", list: "List4" },
  { word: "winter", phonetic: "ˈwɪntər", type: "n.", meaning: "冬天", example: "Winter is cold.", list: "List4" },
  { word: "yellow", phonetic: "ˈjeloʊ", type: "adj.", meaning: "黄色的", example: "Yellow is my favourite colour.", list: "List4" },
  { word: "zoo", phonetic: "zu:", type: "n.", meaning: "动物园", example: "Let's go to the zoo.", list: "List4" },
  { word: "panda", phonetic: "ˈpændə", type: "n.", meaning: "熊猫", example: "Pandas can climb trees.", list: "List5" },
  { word: "bag", phonetic: "bæɡ", type: "n.", meaning: "包", example: "I like my new school bag.", list: "List5" },
  { word: "candle", phonetic: "ˈkændl", type: "n.", meaning: "蜡烛", example: "She lights a candle.", list: "List5" },
  { word: "happy", phonetic: "ˈhæpi", type: "adj.", meaning: "快乐的", example: "Happy birthday!", list: "List5" },
  { word: "sad", phonetic: "sæd", type: "adj.", meaning: "难过的", example: "Don't be sad.", list: "List5" },
];

const vocabularyBooks = {
  LiuBin_1000: {
    key: 'LiuBin_1000',
    name: '刘彬1000核心词',
    icon: '🎯',
    color: '#4CAF50',
    description: '中考/高考核心词汇，精选1000个最高频词汇',
    get words() {
      return vocabularyData || defaultWords;
    },
  },
  LiuBin_3500: {
    key: 'LiuBin_3500',
    name: '刘彬3500词汇',
    icon: '🚀',
    color: '#2196F3',
    description: '中考高考必考词汇3500词全覆盖',
    words: [],
  },
  LiuBin_6000: {
    key: 'LiuBin_6000',
    name: '刘彬6000词汇',
    icon: '💎',
    color: '#9C27B0',
    description: '托福雅思进阶词汇6000词',
    words: [],
  },
};

export const loadVocabularyData = async () => {
  if (vocabularyData) return vocabularyData;
  try {
    const response = await fetch('/vocabulary1000.json');
    if (response.ok) {
      vocabularyData = await response.json();
      return vocabularyData;
    }
  } catch (e) {
    console.warn('Failed to load vocabulary data:', e);
  }
  return defaultWords;
};

export const getVocabularyBook = (bookKey) => {
  return vocabularyBooks[bookKey] || vocabularyBooks.LiuBin_1000;
};

export const getAllVocabularyBooks = () => {
  return Object.values(vocabularyBooks);
};

export const getWordsByList = (bookKey, listName) => {
  const book = getVocabularyBook(bookKey);
  const words = book.words || [];
  if (!listName) return words;
  return words.filter(w => w.list === listName);
};

export const getAvailableLists = (bookKey) => {
  const book = getVocabularyBook(bookKey);
  const words = book.words || [];
  const lists = [...new Set(words.map(w => w.list).filter(Boolean))];
  return lists.sort((a, b) => {
    const numA = parseInt(String(a).replace('List', '')) || 0;
    const numB = parseInt(String(b).replace('List', '')) || 0;
    return numA - numB;
  });
};

export const getWordCount = (bookKey) => {
  const book = getVocabularyBook(bookKey);
  return (book.words || []).length;
};

export const getListWordCount = (bookKey, listName) => {
  return getWordsByList(bookKey, listName).length;
};

export default vocabularyBooks;
