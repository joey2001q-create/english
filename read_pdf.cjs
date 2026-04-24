const fs = require('fs');
const path = require('path');

async function main() {
  const pdfParse = require('pdf-parse');
  const dataBuffer = fs.readFileSync(path.join('c:\\Users\\HOK\\Desktop\\hebin1', '2023-2025高考真题.pdf'));
  
  if (pdfParse.PDFParse) {
    const parser = new pdfParse.PDFParse();
    const result = await parser.parseBuffer(dataBuffer);
    console.log('PDFParse result keys:', Object.keys(result));
    const text = result.text || result.content || '';
    fs.writeFileSync(path.join('c:\\Users\\HOK\\Desktop\\hebin1', 'pdf_content.txt'), typeof text === 'string' ? text : JSON.stringify(result, null, 2));
    console.log('First 3000:', (typeof text === 'string' ? text : JSON.stringify(result)).substring(0, 3000));
  } else if (typeof pdfParse === 'function') {
    const data = await pdfParse(dataBuffer);
    fs.writeFileSync(path.join('c:\\Users\\HOK\\Desktop\\hebin1', 'pdf_content.txt'), data.text);
    console.log('Pages:', data.numpages);
    console.log('First 3000:', data.text.substring(0, 3000));
  } else {
    console.log('Unknown pdf-parse format:', typeof pdfParse, Object.keys(pdfParse));
  }
}
main().catch(e => console.error(e));
