const fs = require('fs');
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.cjs');

async function main() {
  const data = new Uint8Array(fs.readFileSync('c:\\Users\\HOK\\Desktop\\hebin1\\2023-2025高考真题.pdf'));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  console.log('Total pages:', doc.numPages);

  let fullText = '';
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map(item => item.str).join('');
    fullText += pageText + '\n';
  }

  fs.writeFileSync('c:\\Users\\HOK\\Desktop\\hebin1\\pdf_content_utf8.txt', fullText, 'utf8');
  console.log('Total text length:', fullText.length);

  const sectionMatches = fullText.match(/第[一二三四五六七八九十]+节[^\n，,)件]*/g);
  if (sectionMatches) {
    console.log('\n=== Section Headers Found ===');
    sectionMatches.forEach((section, idx) => {
      console.log(`${idx + 1}. ${section}`);
    });
  }

  const听力Part = fullText.match(/听力[\\s\\S]{0,5000}第一节/);
  if (听力Part) {
    console.log('\n=== Listening Section Sample ===');
    console.log(听力Part[0].substring(0, 1500));
  }
}

main().catch(e => console.error(e));