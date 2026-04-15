import pkg from 'xlsx';
const { readFile, utils } = pkg;
import path from 'path';
import * as fs from 'fs';

const dir = './data_feedback';
const outputDoc = './_agency_docs/GSC_Feedback.doc';
const outputMd = './_agency_docs/GSC_Feedback.md';

if(!fs.existsSync('./_agency_docs')) {
    fs.mkdirSync('./_agency_docs');
}

let result = "# Google Search Console Feedback (2026-04-13)\n\n";

const files = fs.readdirSync(dir).filter(f => f.endsWith('.xlsx'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    const workbook = readFile(filePath);
    result += `## File: ${file}\n\n`;
    
    workbook.SheetNames.forEach(sheetName => {
        result += `### Sheet: ${sheetName}\n\n`;
        const csv = utils.sheet_to_csv(workbook.Sheets[sheetName]);
        result += '```csv\n' + csv + '\n```\n\n';
    });
});

fs.writeFileSync(outputDoc, result);
fs.writeFileSync(outputMd, result);
console.log('Conversion successful: _agency_docs/GSC_Feedback.md');
