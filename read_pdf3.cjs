const fs = require('fs');
const path = require('path');
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.mjs');

async function main() {
  const data = new Uint8Array(fs.readFileSync('c:\\Users\\HOK\\Desktop\\hebin1\\2023-2025高考真题.pdf'));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  console.log('Total pages:', doc.numPages);
  
  let fullText = '';
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map(item => item.str).join(' ');
    fullText += `\n--- Page ${i} ---\n${pageText}\n`;
  }
  
  fs.writeFileSync('c:\\Users\\HOK\\Desktop\\hebin1\\pdf_content.txt', fullText);
  console.log('Total length:', fullText.length);
  console.log('First 5000 chars:');
  console.log(fullText.substring(0, 5000));
}
main().catch(e => console.error(e));
