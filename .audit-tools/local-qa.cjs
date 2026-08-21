const { chromium } = require('playwright-core')
const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, 'output')
fs.mkdirSync(root, { recursive: true })

const viewports = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
]

async function inspect(browser, viewport) {
  const page = await browser.newPage({ viewport })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const consoleErrors = []
  const failedRequests = []
  page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()) })
  page.on('requestfailed', (request) => failedRequests.push(`${request.method()} ${request.url()}: ${request.failure()?.errorText}`))
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' })
  await page.evaluate(async () => {
    const height = document.documentElement.scrollHeight
    for (let y = 0; y < height; y += Math.max(400, window.innerHeight * .7)) {
      window.scrollTo(0, y)
      await new Promise((resolve) => setTimeout(resolve, 50))
    }
    window.scrollTo(0, 0)
  })
  await page.waitForTimeout(700)

  const metrics = await page.evaluate(() => ({
    viewport: { width: innerWidth, height: innerHeight },
    document: { width: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight },
    overflowX: document.documentElement.scrollWidth > innerWidth + 1,
    h1Count: document.querySelectorAll('h1').length,
    headingOrder: [...document.querySelectorAll('h1,h2,h3')].map((el) => ({ level: Number(el.tagName[1]), text: el.textContent?.trim().slice(0, 80) })),
    emptyLinks: [...document.querySelectorAll('a')].filter((el) => !el.textContent?.trim() && !el.getAttribute('aria-label')).length,
    imagesMissingAlt: [...document.images].filter((img) => !img.hasAttribute('alt')).map((img) => img.src),
    targetsBelow44: [...document.querySelectorAll('button, a')].map((el) => {
      const r = el.getBoundingClientRect()
      return { text: (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 40), width: Math.round(r.width), height: Math.round(r.height) }
    }).filter((item) => item.width > 0 && item.height > 0 && (item.width < 44 || item.height < 44)),
    fonts: {
      body: getComputedStyle(document.body).fontFamily,
      h1: getComputedStyle(document.querySelector('h1')).fontFamily,
    },
  }))

  await page.addScriptTag({ path: path.resolve(__dirname, 'node_modules/axe-core/axe.min.js') })
  const axe = await page.evaluate(async () => {
    const result = await axe.run(document, { resultTypes: ['violations'] })
    return result.violations.map((violation) => ({
      id: violation.id,
      impact: violation.impact,
      help: violation.help,
      nodes: violation.nodes.map((node) => node.target),
    }))
  })
  await page.screenshot({ path: path.join(root, `local-${viewport.name}.png`), fullPage: true })
  await page.close()
  return { ...viewport, metrics, axe, consoleErrors, failedRequests }
}

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  })
  const results = []
  for (const viewport of viewports) results.push(await inspect(browser, viewport))
  await browser.close()
  fs.writeFileSync(path.join(root, 'local-qa.json'), JSON.stringify(results, null, 2))
  console.log(JSON.stringify(results.map((r) => ({
    viewport: r.name,
    overflowX: r.metrics.overflowX,
    size: r.metrics.document,
    h1Count: r.metrics.h1Count,
    axe: r.axe.length,
    consoleErrors: r.consoleErrors.length,
    failedRequests: r.failedRequests.length,
    smallTargets: r.metrics.targetsBelow44.length,
  })), null, 2))
})().catch((error) => { console.error(error); process.exit(1) })
