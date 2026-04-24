const fs = require('fs');
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.mjs');

async function main() {
  const data = new Uint8Array(fs.readFileSync('c:\\Users\\HOK\\Desktop\\hebin1\\2023-2025高考真题.pdf'));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  console.log('Total pages:', doc.numPages);

  let examSections = [];
  let currentExam = null;
  let currentSection = null;
  let currentQuestionNum = 0;

  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map(item => item.str).join('');
    console.log(`\n=== Page ${i} ===`);
    console.log(pageText.substring(0, 2000));

    const lines = pageText.split(/[\n\r]+/);

    for (const line of lines) {
      const trimmedLine = line.trim();

      if (/^\d{4}年.*(?:全国|新课标|浙江|甲卷|乙卷)/.test(trimmedLine) ||
          /^(202[3-5])年/.test(trimmedLine)) {
        if (currentExam) {
          console.log('\n--- Exam Complete ---');
          console.log(JSON.stringify(currentExam, null, 2));
        }
        currentExam = {
          title: trimmedLine,
          sections: [],
          questions: []
        };
        currentSection = null;
        currentQuestionNum = 0;
        console.log('\n>>> New Exam:', trimmedLine);
      }

      const sectionMatch = trimmedLine.match(/^(第[一二三四五六七八九十]+节|[A-Z]节)\s*[:：]?\s*(.*)/);
      if (sectionMatch && currentExam) {
        const sectionName = sectionMatch[1];
        const sectionDesc = sectionMatch[2] || '';
        currentSection = {
          id: `section${currentExam.sections.length + 1}`,
          name: sectionName,
          desc: sectionDesc,
          questionIds: []
        };
        currentExam.sections.push(currentSection);
        console.log('>>> Section:', sectionName, '-', sectionDesc);
      }

      const questionMatch = trimmedLine.match(/^(\d+)[.、](.*)/);
      if (questionMatch && currentExam && currentSection) {
        const qNum = parseInt(questionMatch[1]);
        if (qNum <= 20) {
          if (qNum > currentQuestionNum) {
            currentSection.questionIds.push(qNum);
            currentQuestionNum = qNum;
            console.log(`  Question ${qNum} found`);
          }
        }
      }
    }
  }

  if (currentExam) {
    console.log('\n--- Final Exam ---');
    console.log(JSON.stringify(currentExam, null, 2));
  }
}
main().catch(e => console.error(e));