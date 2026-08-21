const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const ROOT = 'https://www.xsche.es';
const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const outDir = path.join(__dirname, 'output');
const shotsDir = path.join(outDir, 'screenshots');
fs.mkdirSync(shotsDir, { recursive: true });

const sanitize = (url) => new URL(url).pathname.replace(/^\/+|\/+$/g, '').replace(/[^a-z0-9-]+/gi, '-') || 'root';
const uniq = (xs) => [...new Set(xs)];

async function getSitemapUrls(request) {
  const response = await request.get(`${ROOT}/sitemap.xml`);
  const xml = await response.text();
  return uniq([...xml.matchAll(/<loc>(https:\/\/www\.xsche\.es\/[^<]*)<\/loc>/g)]
    .map((m) => m[1])
    .filter((url) => !url.includes('images.squarespace-cdn.com')));
}

async function auditPage(page, url) {
  const errors = [];
  const badResponses = [];
  page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('response', (res) => { if (res.status() >= 400) badResponses.push({ status: res.status(), url: res.url() }); });
  const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => null);
  await page.waitForTimeout(1000);

  const data = await page.evaluate(() => {
    const norm = (s) => (s || '').replace(/\s+/g, ' ').trim();
    const visible = (el) => {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return r.width > 0 && r.height > 0 && cs.display !== 'none' && cs.visibility !== 'hidden' && Number(cs.opacity) > 0;
    };
    const style = (el) => {
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        tag: el.tagName.toLowerCase(),
        text: norm(el.innerText).slice(0, 180),
        className: typeof el.className === 'string' ? el.className.slice(0, 250) : '',
        x: Math.round(r.x), y: Math.round(r.y), width: Math.round(r.width), height: Math.round(r.height),
        color: cs.color, backgroundColor: cs.backgroundColor, borderColor: cs.borderColor,
        fontFamily: cs.fontFamily, fontSize: cs.fontSize, fontWeight: cs.fontWeight,
        lineHeight: cs.lineHeight, letterSpacing: cs.letterSpacing, textTransform: cs.textTransform,
        textDecoration: cs.textDecorationLine, borderRadius: cs.borderRadius, padding: cs.padding,
        position: cs.position, display: cs.display,
      };
    };
    const all = [...document.querySelectorAll('body *')].filter(visible);
    const frequency = (prop) => Object.entries(all.reduce((acc, el) => {
      const value = getComputedStyle(el)[prop];
      if (value && value !== 'rgba(0, 0, 0, 0)') acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {})).sort((a,b) => b[1] - a[1]).slice(0, 30);

    const anchors = [...document.querySelectorAll('a')].filter(visible).map((a) => ({
      text: norm(a.innerText || a.getAttribute('aria-label') || a.querySelector('img')?.alt),
      href: a.href,
      target: a.target,
      rel: a.rel,
      style: style(a),
    }));
    const images = [...document.images].filter(visible).map((img) => {
      const r = img.getBoundingClientRect();
      return {
        src: img.currentSrc || img.src, alt: img.alt, loading: img.loading,
        naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight,
        displayWidth: Math.round(r.width), displayHeight: Math.round(r.height), objectFit: getComputedStyle(img).objectFit,
      };
    });
    const fields = [...document.querySelectorAll('input, textarea, select')].filter(visible).map((el) => ({
      tag: el.tagName.toLowerCase(), type: el.type, name: el.name, placeholder: el.placeholder,
      label: el.labels ? [...el.labels].map((x) => norm(x.innerText)).join(' | ') : '',
      ariaLabel: el.getAttribute('aria-label'), required: el.required, style: style(el),
    }));
    const sections = [...document.querySelectorAll('header, main, section, article, footer')].filter(visible).map((el) => {
      const r = el.getBoundingClientRect();
      return { tag: el.tagName.toLowerCase(), id: el.id, className: typeof el.className === 'string' ? el.className.slice(0,250) : '',
        y: Math.round(r.y + scrollY), width: Math.round(r.width), height: Math.round(r.height),
        backgroundColor: getComputedStyle(el).backgroundColor, text: norm(el.innerText).slice(0, 450) };
    });
    const cssVariables = {};
    const rootStyle = getComputedStyle(document.documentElement);
    for (const name of [...rootStyle].filter((n) => n.startsWith('--'))) {
      const value = rootStyle.getPropertyValue(name).trim();
      if (value && /color|font|heading|body|button|site|spacing|radius/i.test(name)) cssVariables[name] = value;
    }
    const structuredData = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => {
      try { return JSON.parse(s.textContent); } catch { return s.textContent.slice(0, 500); }
    });
    return {
      finalUrl: location.href,
      lang: document.documentElement.lang,
      title: document.title,
      metaDescription: document.querySelector('meta[name="description"]')?.content || '',
      canonical: document.querySelector('link[rel="canonical"]')?.href || '',
      bodyText: norm(document.body.innerText),
      headings: [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter(visible).map(style),
      paragraphs: [...document.querySelectorAll('p')].filter(visible).map(style),
      anchors,
      buttons: [...document.querySelectorAll('button,[role="button"],input[type="submit"]')].filter(visible).map(style),
      images,
      fields,
      sections,
      colors: { color: frequency('color'), backgroundColor: frequency('backgroundColor'), borderColor: frequency('borderColor') },
      fonts: frequency('fontFamily'),
      fontSizes: frequency('fontSize'),
      cssVariables,
      stylesheets: [...document.styleSheets].map((s) => s.href).filter(Boolean),
      structuredData,
      landmarks: { header: !!document.querySelector('header'), nav: document.querySelectorAll('nav').length, main: document.querySelectorAll('main').length, footer: !!document.querySelector('footer') },
      accessibility: {
        imagesMissingAlt: [...document.images].filter((i) => !i.hasAttribute('alt')).length,
        emptyAlt: [...document.images].filter((i) => i.getAttribute('alt') === '').length,
        linksWithoutName: [...document.querySelectorAll('a')].filter((a) => visible(a) && !norm(a.innerText || a.getAttribute('aria-label') || a.querySelector('img')?.alt)).length,
        buttonsWithoutName: [...document.querySelectorAll('button,[role="button"]')].filter((b) => visible(b) && !norm(b.innerText || b.getAttribute('aria-label') || b.getAttribute('title'))).length,
        inputsWithoutLabel: [...document.querySelectorAll('input,textarea,select')].filter((i) => visible(i) && !i.labels?.length && !i.getAttribute('aria-label') && !i.getAttribute('aria-labelledby')).length,
        duplicateIds: Object.entries([...document.querySelectorAll('[id]')].reduce((a,e)=>(a[e.id]=(a[e.id]||0)+1,a),{})).filter(([,n])=>n>1),
      },
      metrics: {
        viewport: { width: innerWidth, height: innerHeight },
        scrollWidth: document.documentElement.scrollWidth,
        scrollHeight: document.documentElement.scrollHeight,
        horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
        bodyBackground: getComputedStyle(document.body).backgroundColor,
      },
    };
  });

  data.httpStatus = response?.status() || null;
  data.consoleErrors = uniq(errors).slice(0, 20);
  data.badResponses = badResponses.slice(0, 50);
  return data;
}

async function responsiveAudit(browser, url, viewport, label, screenshot = true) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1, locale: 'es-ES', colorScheme: 'light' });
  const page = await context.newPage();
  const data = await auditPage(page, url);
  const interactive = await page.locator('a,button,[role="button"]').filter({ visible: true }).all().catch(() => []);
  const hoverSamples = [];
  for (const el of interactive.slice(0, 15)) {
    try {
      const before = await el.evaluate((x) => { const s=getComputedStyle(x); return {color:s.color,backgroundColor:s.backgroundColor,textDecoration:s.textDecorationLine,opacity:s.opacity,transform:s.transform}; });
      await el.hover({ timeout: 1500 });
      await page.waitForTimeout(250);
      const after = await el.evaluate((x) => { const s=getComputedStyle(x); return {color:s.color,backgroundColor:s.backgroundColor,textDecoration:s.textDecorationLine,opacity:s.opacity,transform:s.transform}; });
      const text = await el.evaluate((x) => (x.innerText || x.getAttribute('aria-label') || '').replace(/\s+/g,' ').trim().slice(0,120));
      if (JSON.stringify(before) !== JSON.stringify(after)) hoverSamples.push({ text, before, after });
    } catch {}
  }
  data.hoverSamples = hoverSamples;
  if (screenshot) {
    await page.screenshot({ path: path.join(shotsDir, `${sanitize(url)}-${label}.png`), fullPage: true });
  }
  await context.close();
  return data;
}

(async () => {
  const browser = await chromium.launch({ executablePath: chromePath, headless: true });
  const request = await browser.newContext();
  const urls = await getSitemapUrls(request.request);
  await request.close();
  const pages = [];
  for (const [i, url] of urls.entries()) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, locale: 'es-ES', colorScheme: 'light' });
    const page = await context.newPage();
    const data = await auditPage(page, url);
    pages.push({ url, ...data });
    console.log(`[${i+1}/${urls.length}] ${url} -> ${data.httpStatus} ${data.title}`);
    await context.close();
  }
  const representative = [
    `${ROOT}/home`, `${ROOT}/destacados`, `${ROOT}/about`, `${ROOT}/contact`,
    `${ROOT}/residencial`, `${ROOT}/restaurantes`, `${ROOT}/grandes-proyectos`, `${ROOT}/casa-ve`, `${ROOT}/baoli`
  ];
  const responsive = {};
  for (const url of representative) {
    responsive[url] = {};
    for (const [label, viewport] of Object.entries({ desktop: {width:1440,height:1000}, tablet:{width:768,height:1024}, mobile:{width:390,height:844} })) {
      console.log(`[responsive] ${sanitize(url)} ${label}`);
      responsive[url][label] = await responsiveAudit(browser, url, viewport, label, true);
    }
  }
  fs.writeFileSync(path.join(outDir, 'audit.json'), JSON.stringify({ generatedAt: new Date().toISOString(), urls, pages, responsive }, null, 2));
  await browser.close();
})().catch((error) => { console.error(error); process.exitCode = 1; });
