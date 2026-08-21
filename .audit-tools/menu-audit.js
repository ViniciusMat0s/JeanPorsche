const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const outDir = path.join(__dirname, 'output');

const visible = async (locator) => {
  const result = [];
  for (const el of await locator.all()) {
    if (await el.isVisible().catch(() => false)) {
      result.push(await el.evaluate((x) => ({
        tag: x.tagName.toLowerCase(),
        text: (x.innerText || x.getAttribute('aria-label') || x.getAttribute('title') || '').replace(/\s+/g, ' ').trim(),
        href: x.href || '', ariaExpanded: x.getAttribute('aria-expanded'), ariaControls: x.getAttribute('aria-controls'),
        box: (() => { const r=x.getBoundingClientRect(); return {x:r.x,y:r.y,width:r.width,height:r.height}; })(),
        style: (() => { const s=getComputedStyle(x); return {color:s.color,backgroundColor:s.backgroundColor,fontFamily:s.fontFamily,fontSize:s.fontSize,lineHeight:s.lineHeight}; })(),
      })));
    }
  }
  return result;
};

(async () => {
  const browser = await chromium.launch({ executablePath: chromePath, headless: true });
  const output = {};
  for (const [label, viewport] of Object.entries({ desktop:{width:1440,height:1000}, tablet:{width:768,height:1024}, mobile:{width:390,height:844} })) {
    const context = await browser.newContext({ viewport, locale:'es-ES' });
    const page = await context.newPage();
    await page.goto('https://www.xsche.es/home', { waitUntil:'networkidle', timeout:60000 });
    await page.waitForTimeout(700);
    const header = page.locator('header');
    const before = await visible(header.locator('a,button,[role="button"]'));
    let trigger = header.getByRole('button', { name: /Abrir men/i }).first();
    if (!await trigger.isVisible().catch(()=>false)) trigger = header.locator('button:visible').first();
    if (label !== 'desktop' && await trigger.isVisible().catch(()=>false)) {
      await trigger.click();
      await page.waitForTimeout(500);
    } else {
      const interiorismo = header.getByText('Interiorismo', { exact:true }).first();
      if (await interiorismo.isVisible().catch(()=>false)) { await interiorismo.hover(); await page.waitForTimeout(500); }
    }
    const after = await visible(page.locator('header a,header button,header [role="button"]'));
    const language = page.getByText('Español', {exact:true}).last();
    if (await language.isVisible().catch(()=>false)) { await language.click().catch(()=>{}); await page.waitForTimeout(500); }
    const languageOpen = await visible(page.locator('header a,header button,header [role="button"]'));
    await page.screenshot({path:path.join(outDir,`menu-${label}.png`),fullPage:false});
    output[label] = { before, after, languageOpen, bodyOverflow: await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,innerWidth})) };
    await context.close();
  }
  fs.writeFileSync(path.join(outDir,'menu-audit.json'),JSON.stringify(output,null,2));
  await browser.close();
})().catch((e)=>{console.error(e);process.exitCode=1;});
