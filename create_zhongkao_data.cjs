const fs = require('fs');

const audioUrls = JSON.parse(fs.readFileSync('c:\\Users\\HOK\\Desktop\\hebin1\\audio_urls.json', 'utf8'));
const zhongkaoUrls = audioUrls['中考听力'];

const transcripts = JSON.parse(fs.readFileSync('c:\\Users\\HOK\\Desktop\\hebin1\\zhongkao_transcripts_extracted.json', 'utf8'));

const AUDIO_BASE_URL = 'https://listen-1420411580.cos.ap-guangzhou.myqcloud.com/%E5%8E%86%E5%B9%B4%E9%AB%98%E8%80%83%E7%9C%9F%E9%A2%98-%E5%90%AC%E5%8A%9B/%E5%8E%86%E5%B9%B4%E4%B8%AD%E8%80%83%E7%9C%9F%E9%A2%98-%E5%90%AC%E5%8A%9B';

const nameToIdMap = {
  '2025年-安徽卷_原文': '2025-anhui',
  '2025年-山西卷_原文': '2025-shanxi',
  '2025年-广东卷_原文': '2025-guangdong',
  '2025年-广西卷_原文': '2025-guangxi',
  '2025年-成都卷_原文': '2025-chengdu',
  '2025年-新疆卷_原文': '2025-xinjiang',
  '2025年-武汉卷_原文': '2025-wuhan',
  '2025年-江西卷_原文': '2025-jiangxi',
  '2025年-河北卷_原文': '2025-hebei',
  '2025年-河南卷_原文': '2025-henan',
  '2025年-湖南卷_原文': '2025-hunan',
  '2025年-甘肃卷_原文': '2025-gansu',
  '2025年-福建卷_原文': '2025-fujian',
  '2025年-贵州卷_原文': '2025-guizhou',
  '2025年-重庆卷_原文': '2025-chongqing',
  '2025年-长沙卷_原文': '2025-changsha',
  '2025年-陕西卷_原文': '2025-shanxi2',
};

const idToNameMap = {};
Object.entries(nameToIdMap).forEach(([key, id]) => {
  idToNameMap[id] = key;
});

console.log('=== 中考听力数据结构模板 ===\n');
console.log('const AUDIO_BASE_URL = \'' + AUDIO_BASE_URL + '\';');
console.log('\nexport const zhongkaoListeningExams = [');
console.log('  {');
console.log('    id: \'模板ID\',');
console.log('    year: \'2025\',');
console.log('    title: \'2025年XX省初中学业水平考试\',');
console.log('    region: \'XX卷\',');
console.log('    audioUrl: AUDIO_BASE_URL + \'/2025年-XX卷.mp3\',');
console.log('    transcript: `听力原文...`,');
console.log('    questions: [');
console.log('      { id: 1, question: "题目", options: ["A", "B", "C"], correct: "A", transcript: "相关听力片段", analysis: "解析" },');
console.log('    ],');
console.log('  },');
console.log('];\n');

console.log('=== 可用的试卷 ===');
zhongkaoUrls.forEach((item, idx) => {
  const id = idToNameMap[Object.keys(nameToIdMap)[idx]];
  console.log(`${idx + 1}. ${item.title}`);
  console.log(`   ID: ${Object.values(nameToIdMap)[idx]}`);
  console.log(`   URL: ${item.url}`);
  console.log(`   Has transcript: ${!!transcripts[idToNameMap[Object.keys(nameToIdMap)[idx]]]}`);
  console.log('');
});