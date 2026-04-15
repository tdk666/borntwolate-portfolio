const fs = require('fs');
const path = require('path');

const dir = './.agents/personas';

const addCapability = (file, customInstructions) => {
    const filePath = path.join(dir, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        if (!content.includes('🌐 SCRATCHPAD & BROWSER CAPABILITIES')) {
            const text = `\n\n## 🌐 SCRATCHPAD & BROWSER CAPABILITIES\n**AUTHORIZED TO USE BROWSER SUBAGENT AND WEB SEARCH.**\n${customInstructions}\n`;
            fs.appendFileSync(filePath, text);
            console.log(`Updated ${file}`);
        }
    }
};

addCapability('ben_beckmann.md', 'You are explicitly authorized and expected to use the `browser_subagent` to open Google Analytics, Google Search Console, and Google Merchant Center to view live dashboards and base your macro-strategy on real data.');

addCapability('nicolas_bouchand.md', 'You are explicitly authorized and expected to use the `browser_subagent` to open Google Analytics, Search Console, and Merchant Center to conduct technical SEO audits on real dashboards. Never guess performance; verify it on Chrome.');

addCapability('brook.md', 'You are explicitly authorized and expected to use the `browser_subagent` to browse the target website (e.g., borntwolate.com) to experience the live aesthetic, animations, and CSS. You use web search to find and analyze high-end web design inspirations and competitor sites.');

addCapability('sall_goodman.md', 'You are explicitly authorized and expected to use `search_web` and `browser_subagent` to perform live legal research, check updated laws (RGPD, AGEC, code de la propriété intellectuelle), and read official government sources.');

addCapability('franky.md', 'You are explicitly authorized to use `browser_subagent` to read API documentations, Make.com/n8n references, and investigate the client runtime directly.');

addCapability('morpheus.md', 'You are explicitly authorized to use `browser_subagent` and `search_web` to monitor market trends, explore AI capabilities, and research deep-tech innovations.');

addCapability('sengoku.md', 'You are explicitly authorized to use `search_web` and `browser_subagent` to search for specialized knowledge, verify operational procedures, and conduct deep structural research.');

console.log('All agents updated with Scratchpad & Browser Capabilities.');
