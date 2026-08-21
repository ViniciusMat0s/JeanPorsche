const { chromium } = require('playwright-core');
const axe = require('axe-core');
const fs = require('fs');
const path = require('path');

const urls = ['/home','/destacados','/about','/contact','/residencial','/restaurantes','/grandes-proyectos','/casa-ve'];
const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

(async () => {
  const browser = await chromium.launch({ executablePath: chromePath, headless: true });
  const output = {};
  for (const [label, viewport] of Object.entries({desktop:{width:1440,height:1000},mobile:{width:390,height:844}})) {
    output[label] = {};
    for (const pathname of urls) {
      const context = await browser.newContext({viewport,locale:'es-ES'});
      const page = await context.newPage();
      await page.goto(`https://www.xsche.es${pathname}`,{waitUntil:'networkidle',timeout:60000});
      await page.addScriptTag({content:axe.source});
      const result = await page.evaluate(async () => await axe.run(document, {runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}, resultTypes:['violations','incomplete']}));
      output[label][pathname] = {
        violations: result.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,help:v.help,helpUrl:v.helpUrl,nodes:v.nodes.map(n=>({target:n.target,html:n.html,failureSummary:n.failureSummary}))})),
        incomplete: result.incomplete.map(v=>({id:v.id,impact:v.impact,help:v.help,nodes:v.nodes.length}))
      };
      console.log(`${label} ${pathname}: ${result.violations.length} rules / ${result.violations.reduce((n,v)=>n+v.nodes.length,0)} nodes`);
      await context.close();
    }
  }
  fs.writeFileSync(path.join(__dirname,'output','axe-audit.json'),JSON.stringify(output,null,2));
  await browser.close();
})().catch(e=>{console.error(e);process.exitCode=1});
