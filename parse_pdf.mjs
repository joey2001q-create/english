import pdfParse from 'pdf-parse';
import fs from 'fs';

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

  const听力Matches = fullText.match(/听力[^\n]*[第][一二三四五六七八九十]+节[^\n]*/g);
  if (听力Matches) {
    console.log('\n=== Listening Sections Found ===');
    听力Matches.forEach((section, idx) => {
      console.log(`${idx + 1}. ${section}`);
    });
  }
}

main().catch(e => console.error(e));