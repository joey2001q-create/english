import { create } from 'zustand';

const DAILY_QUOTES = [
  "The best time to plant a tree was 20 years ago. The second best time is now.",
  "英语不是学会的，是用会的。",
  "单词是砖，语法是水泥，阅读是盖楼。",
  "Don't count the days, make the days count.",
  "重复是记忆他妈，语境是单词她爸。",
  "The difference between ordinary and extraordinary is that little extra.",
  "每天搞定10个单词，365天就是3650个，高考词汇全覆盖。",
  "Language is not a gift, it's a skill. Skills are built with practice.",
  "阅读理解做不对？80%的问题都是词汇量不够惹的祸。",
  "The more that you read, the more things you will know.",
  "完形填空的本质是同义替换，读懂上下文是关键。",
  "Practice does not make perfect. Only perfect practice makes perfect."
];

const useStudyStore = create((set, get) => ({
  streak: parseInt(localStorage.getItem('liubin_streak') || '0'),
  lastCheckin: localStorage.getItem('liubin_last_checkin') || '',
  todayChecked: localStorage.getItem('liubin_today_checkin') === new Date().toDateString(),
  todayWords: parseInt(localStorage.getItem('liubin_today_words') || '0'),
  totalWords: parseInt(localStorage.getItem('liubin_total_words') || '0'),
  totalQA: parseInt(localStorage.getItem('liubin_total_qa') || '0'),
  dailyQuote: DAILY_QUOTES[Math.floor(Math.random() * DAILY_QUOTES.length)],

  reviewCount: 0,

  doCheckin: () => {
    const today = new Date().toDateString();
    const last = get().lastCheckin;
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    let newStreak = get().streak;
    if (last === yesterday) {
      newStreak++;
    } else if (last !== today) {
      newStreak = 1;
    }
    localStorage.setItem('liubin_streak', String(newStreak));
    localStorage.setItem('liubin_last_checkin', today);
    localStorage.setItem('liubin_today_checkin', today);
    set({ streak: newStreak, lastCheckin: today, todayChecked: true });
    return newStreak;
  },

  addWords: (count) => {
    const newTotal = get().totalWords + count;
    const newToday = get().todayWords + count;
    localStorage.setItem('liubin_total_words', String(newTotal));
    localStorage.setItem('liubin_today_words', String(newToday));
    set({ totalWords: newTotal, todayWords: newToday });
  },

  addQA: () => {
    const newCount = get().totalQA + 1;
    localStorage.setItem('liubin_total_qa', String(newCount));
    set({ totalQA: newCount });
  },

  setReviewCount: (count) => set({ reviewCount: count }),
}));

export default useStudyStore;
