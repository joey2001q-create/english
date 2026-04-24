let vocabularyData = null;
let vocabulary3500Data = null;

const defaultWords = [
  {
    "word": "apple",
    "phonetic": "ˈæp(ə)l",
    "type": "n.",
    "meaning": "苹果",
    "example": "I like to eat a juicy apple for a snack.",
    "list": "List1",
    "syllable": "ap-ple",
    "exampleCn": "我喜欢的零食是美味多汁的苹果。"
  },
  {
    "word": "ball",
    "phonetic": "bɔːl",
    "type": "n.",
    "meaning": "球",
    "example": "Let's play ball together in the park.",
    "list": "List1",
    "syllable": "ball",
    "exampleCn": "我们一起去公园里玩球吧。"
  },
  {
    "word": "cat",
    "phonetic": "kæt",
    "type": "n.",
    "meaning": "猫",
    "example": "My friend has a cute cat as a pet.",
    "list": "List1",
    "syllable": "cat",
    "exampleCn": "我朋友的宠物是一只可爱的猫咪。"
  },
  {
    "word": "dog",
    "phonetic": "dɔ:ɡ",
    "type": "n.",
    "meaning": "狗",
    "example": "I have a friendly dog as mypet.",
    "list": "List1",
    "syllable": "dog",
    "exampleCn": "我的宠物狗对人十分友好。"
  },
  {
    "word": "egg",
    "phonetic": "eɡ",
    "type": "n.",
    "meaning": "鸡蛋",
    "example": "Be careful not to break the egg when you crack it open.",
    "list": "List1",
    "syllable": "egg",
    "exampleCn": "当你敲开鸡蛋时，小心别把它打碎了。"
  },
  {
    "word": "fish",
    "phonetic": "fɪʃ",
    "type": "n.",
    "meaning": "鱼",
    "example": "The fish swims gracefully in the water.",
    "list": "List1",
    "syllable": "fish",
    "exampleCn": "鱼在水中优雅地游动。"
  },
  {
    "word": "juicy",
    "phonetic": "ˈdʒu:si",
    "type": "n.",
    "meaning": "多汁的",
    "example": "The orange is juicy and sweet.",
    "list": "List1",
    "syllable": "juic-y",
    "exampleCn": "这个橙子多汁又甜。"
  },
  {
    "word": "delicious",
    "phonetic": "dɪˈl ɪʃəs",
    "type": "n.",
    "meaning": "美味的",
    "example": "The cake is delicious.",
    "list": "List1",
    "syllable": "de-li-cious",
    "exampleCn": "这块蛋糕很美味。"
  },
  {
    "word": "round",
    "phonetic": "raʊ nd",
    "type": "n.",
    "meaning": "圆形的",
    "example": "The ball is round.",
    "list": "List1",
    "syllable": "round",
    "exampleCn": "球是圆的。"
  },
  {
    "word": "furry",
    "phonetic": "ˈfɜ:ri",
    "type": "n.",
    "meaning": "毛绒绒的",
    "example": "The cat is soft and furry.",
    "list": "List1",
    "syllable": "fur-ry",
    "exampleCn": "这只猫又软又毛茸茸。"
  },
  {
    "word": "bark",
    "phonetic": "bɑ:rk",
    "type": "n.",
    "meaning": "狗叫声",
    "example": "The dog barks at strangers.",
    "list": "List1",
    "syllable": "bark",
    "exampleCn": "狗对着陌生人叫。"
  },
  {
    "word": "break",
    "phonetic": "breɪk",
    "type": "n.",
    "meaning": "打破",
    "example": "Don't break the glass.",
    "list": "List1",
    "syllable": "break",
    "exampleCn": "别打破玻璃杯。"
  },
  {
    "word": "chicken",
    "phonetic": "ˈtʃɪ kɪn",
    "type": "n.",
    "meaning": "鸡",
    "example": "I like to eat chicken.",
    "list": "List1",
    "syllable": "chick-en",
    "exampleCn": "我喜欢吃鸡肉。"
  },
  {
    "word": "swim",
    "phonetic": "swɪm",
    "type": "n.",
    "meaning": "游泳",
    "example": "I can swim very well.",
    "list": "List1",
    "syllable": "swim",
    "exampleCn": "我游泳游得很好。"
  },
  {
    "word": "girl",
    "phonetic": "ɡɜːrl",
    "type": "n.",
    "meaning": "女孩",
    "example": "We can divide the students into two groups: one group is boys, the other is",
    "list": "List1",
    "syllable": "girl",
    "exampleCn": "我们可以把学生分成两组，男生为一组  ，女生为一组。"
  },
  {
    "word": "hand",
    "phonetic": "hænd",
    "type": "n.",
    "meaning": "手",
    "example": "She waved her hand to say hello to her friend.",
    "list": "List1",
    "syllable": "hand",
    "exampleCn": "她挥手对她朋友问好。"
  },
  {
    "word": "insect",
    "phonetic": "ˈɪnsekt",
    "type": "n.",
    "meaning": "昆虫",
    "example": "I saw a tiny insect crawling on a leaf.",
    "list": "List1",
    "syllable": "in-sect",
    "exampleCn": "我看到一只小昆虫在叶子上爬行。"
  },
  {
    "word": "jump",
    "phonetic": "dʒʌmp",
    "type": "v.",
    "meaning": "跳跃",
    "example": "The rabbit can jump high.",
    "list": "List1",
    "syllable": "jump",
    "exampleCn": "兔子能跳得很高。"
  },
  {
    "word": "kite",
    "phonetic": "kaɪt",
    "type": "n.",
    "meaning": "风筝",
    "example": "A father and his son go to a kite-flying festival.",
    "list": "List1",
    "syllable": "kite",
    "exampleCn": "父子俩一起参加了风筝节。"
  },
  {
    "word": "leg",
    "phonetic": "leɡ",
    "type": "n.",
    "meaning": "腿；大腿",
    "example": "I run fast with my legs during a  race.",
    "list": "List1",
    "syllable": "leg",
    "exampleCn": "在比赛中我用腿跑得很快。"
  },
  {
    "word": "student",
    "phonetic": "'stu:d(ə)nt",
    "type": "n.",
    "meaning": "学生",
    "example": "She is a good student.",
    "list": "List1",
    "syllable": "stu-dent",
    "exampleCn": "她是个好学生。"
  },
  {
    "word": "study",
    "phonetic": "ˈstʌdi",
    "type": "n.",
    "meaning": "学习",
    "example": "I study English every day.",
    "list": "List1",
    "syllable": "stud-y",
    "exampleCn": "我每天学习英语。"
  },
  {
    "word": "finger",
    "phonetic": "ˈfɪŋɡə(r)",
    "type": "n.",
    "meaning": "手指",
    "example": "I have five fingers on each hand.",
    "list": "List1",
    "syllable": "fin-ger",
    "exampleCn": "我每只手有五个手指。"
  },
  {
    "word": "nail",
    "phonetic": "neɪl",
    "type": "n.",
    "meaning": "手指甲",
    "example": "She painted her nails red.",
    "list": "List1",
    "syllable": "nail",
    "exampleCn": "她把指甲涂成了红色。"
  },
  {
    "word": "gesture",
    "phonetic": "ˈdʒestʃər",
    "type": "n.",
    "meaning": "手势",
    "example": "He made a gesture with his hand.",
    "list": "List1",
    "syllable": "ges-ture",
    "exampleCn": "他用手做了一个手势。"
  },
  {
    "word": "wave",
    "phonetic": "weɪv",
    "type": "n.",
    "meaning": "挥手",
    "example": "Wave goodbye.",
    "list": "List1",
    "syllable": "wave",
    "exampleCn": "挥手告别。"
  },
  {
    "word": "ant",
    "phonetic": "ænt",
    "type": "n.",
    "meaning": "蚂蚁",
    "example": "The ant is carrying food.",
    "list": "List1",
    "syllable": "ant",
    "exampleCn": "蚂蚁正在搬运食物。"
  },
  {
    "word": "bee",
    "phonetic": "bi:",
    "type": "n.",
    "meaning": "蜜蜂",
    "example": "The bee is collecting honey.",
    "list": "List1",
    "syllable": "bee",
    "exampleCn": "蜜蜂正在采蜜。"
  },
  {
    "word": "windy",
    "phonetic": "ˈwɪndi",
    "type": "n.",
    "meaning": "多风的",
    "example": "It's windy today.",
    "list": "List1",
    "syllable": "win-dy",
    "exampleCn": "今天风很大。"
  },
  {
    "word": "foot",
    "phonetic": "fʊt",
    "type": "n.",
    "meaning": "脚",
    "example": "I hurt my foot.",
    "list": "List1",
    "syllable": "foot",
    "exampleCn": "我弄伤了脚。"
  }
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
    get words() {
      return vocabulary3500Data || [];
    },
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

export const loadVocabulary3500Data = async () => {
  if (vocabulary3500Data) return vocabulary3500Data;
  try {
    const response = await fetch('/vocabulary3500.json');
    if (response.ok) {
      vocabulary3500Data = await response.json();
      return vocabulary3500Data;
    }
  } catch (e) {
    console.warn('Failed to load vocabulary 3500 data:', e);
  }
  return [];
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
