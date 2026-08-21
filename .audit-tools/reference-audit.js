const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: true,
  });
  const output = {};
  for (const [label, viewport] of Object.entries({
    desktop: { width: 1440, height: 1000 },
    mobile: { width: 390, height: 844 },
  })) {
    const context = await browser.newContext({ viewport, locale: 'es-ES' });
    const page = await context.newPage();
    await page.goto('https://nextarquitectura.com/', { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(1000);
    await page.evaluate(async () => {
      const step = Math.max(320, Math.floor(innerHeight * 0.7));
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 120));
      }
      scrollTo(0, 0);
    });
    await page.waitForTimeout(800);
    output[label] = await page.evaluate(() => {
      const visible = (element) => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
      };
      const summary = (element) => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return {
          tag: element.tagName.toLowerCase(),
          text: (element.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 280),
          x: Math.round(rect.x),
          y: Math.round(rect.y + scrollY),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          fontFamily: style.fontFamily,
          fontSize: style.fontSize,
          lineHeight: style.lineHeight,
          color: style.color,
          backgroundColor: style.backgroundColor,
        };
      };
      return {
        title: document.title,
        headings: [...document.querySelectorAll('h1,h2,h3,h4')].filter(visible).map(summary),
        sections: [...document.querySelectorAll('header,main,section,footer')].filter(visible).map(summary),
        links: [...document.querySelectorAll('a')].filter(visible).map(summary),
        pageHeight: document.documentElement.scrollHeight,
        pageWidth: document.documentElement.scrollWidth,
      };
    });
    await page.screenshot({
      path: path.join(__dirname, 'output', `reference-${label}.png`),
      fullPage: true,
    });
    await context.close();
  }
  fs.writeFileSync(path.join(__dirname, 'output', 'reference-audit.json'), JSON.stringify(output, null, 2));
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
