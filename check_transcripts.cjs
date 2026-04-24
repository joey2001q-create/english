const fs = require('fs');
const transcripts = JSON.parse(fs.readFileSync('c:\\Users\\HOK\\Desktop\\hebin1\\transcripts_extracted.json', 'utf8'));

const nameToIdMap = {
  '2023年-1月浙江卷_原文': '2023-zhejiang1',
  '2023年-上海卷_原文': '2023-shanghai',
  '2023年-全国乙卷_原文': '2023-quanguoyi',
  '2023年-全国甲卷_原文': '2023-quanguojia',
  '2023年-新课标Ⅰ卷_原文': '2023-xinkebiao1',
  '2023年-新课标Ⅱ卷_原文': '2023-xinkebiao2',
  '2024年-1月浙江卷_原文': '2024-zhejiang1',
  '2024年-全国甲卷_原文': '2024-quanguojia',
  '2024年-新课标Ⅰ卷_原文': '2024-xinkebiao1',
  '2024年-新课标Ⅱ卷_原文': '2024-xinkebiao2',
  '2025年-1月浙江卷_原文': '2025-zhejiang1',
  '2025年-全国一卷_原文': '2025-quanguoyi',
  '2025年-全国二卷_原文': '2025-quanguojia',
};

const idToTranscriptKey = {};
Object.entries(nameToIdMap).forEach(([key, id]) => {
  idToTranscriptKey[id] = key;
});

console.log('Mapping created:');
Object.entries(idToTranscriptKey).forEach(([id, key]) => {
  const hasTranscript = !!transcripts[key];
  console.log(`  ${id}: ${key} ${hasTranscript ? '✓' : '✗'}`);
});

const examIds = [
  '2023-xinkebiao1', '2023-xinkebiao2', '2023-zhejiang1', '2023-quanguoyi', '2023-quanguojia', '2023-shanghai',
  '2024-xinkebiao1', '2024-xinkebiao2', '2024-zhejiang1', '2024-quanguojia',
  '2025-xinkebiao1', '2025-xinkebiao2', '2025-zhejiang1', '2025-quanguoyi', '2025-quanguojia'
];

console.log('\\nExams missing transcripts:');
examIds.forEach(id => {
  if (!idToTranscriptKey[id]) {
    console.log(`  ${id}`);
  }
});