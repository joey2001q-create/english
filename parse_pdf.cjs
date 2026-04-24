const pdfParse = require('pdf-parse');
const fs = require('fs');

async function main() {
  const dataBuffer = fs.readFileSync('c:\\Users\\HOK\\Desktop\\hebin1\\2023-2025高考真题.pdf');
  const data = await pdfParse(dataBuffer);
  const fullText = data.text;

  fs.writeFileSync('c:\\Users\\HOK\\Desktop\\hebin1\\pdf_content_utf8.txt', fullText, 'utf8');
  console.log('Total text length:', fullText.length);

  const examMatches = fullText.match(/202[3-5]年[^\n]*全国[^\n]*/g);
  if (examMatches) {
    console.log('\n=== Exam Titles Found ===');
    examMatches.forEach((title, idx) => {
      console.log(`${idx + 1}. ${title}`);
    });
  }

  const sectionMatches = fullText.match(/第[一二三四五六七八九十]+节[^\n，,]*/g);
  if (sectionMatches) {
    console.log('\n=== Section Headers Found ===');
    sectionMatches.forEach((section, idx) => {
      console.log(`${idx + 1}. ${section}`);
    });
  }

  const questionPatternMatches = fullText.match(/\d+\.[\s]*[A-D]/g);
  if (questionPatternMatches) {
    console.log('\n=== Question Pattern Found (count) ===');
    console.log('Total questions found:', questionPatternMatches.length);
  }
}

main().catch(e => console.error(e));