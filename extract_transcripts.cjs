const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');

const folderPath = 'c:\\Users\\HOK\\Desktop\\hebin1\\2023-2025高考听力原文';

async function extractAllDocs() {
  const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.docx'));

  const results = {};

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    console.log(`Processing: ${file}`);

    try {
      const result = await mammoth.extractRawText({ path: filePath });
      const content = result.value;
      const cleanContent = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();

      const baseName = path.basename(file, '.docx');
      results[baseName] = cleanContent;

      console.log(`  Extracted ${cleanContent.length} characters`);
      console.log(`  First 200 chars: ${cleanContent.substring(0, 200)}`);
      console.log('---');
    } catch (err) {
      console.error(`  Error processing ${file}:`, err.message);
    }
  }

  const outputPath = 'c:\\Users\\HOK\\Desktop\\hebin1\\transcripts_extracted.json';
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf8');
  console.log(`\nTotal extracted: ${Object.keys(results).length} files`);
  console.log(`Output saved to: ${outputPath}`);
}

extractAllDocs().catch(console.error);