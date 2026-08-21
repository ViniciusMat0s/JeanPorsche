const { chromium } = require('playwright-core')
const path = require('path')

;(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  })

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } })
  await mobile.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' })
  await mobile.click('.menu-toggle')
  await mobile.waitForTimeout(200)
  const menuOpen = await mobile.locator('.menu-toggle').getAttribute('aria-expanded')
  const menuVisible = await mobile.locator('.mobile-menu').evaluate((element) => getComputedStyle(element).visibility)
  const focusedOnOpen = await mobile.evaluate(() => ({
    tag: document.activeElement?.tagName,
    className: document.activeElement?.className,
    text: document.activeElement?.textContent?.trim(),
  }))
  await mobile.screenshot({ path: path.resolve(__dirname, 'output/local-mobile-menu.png') })
  await mobile.keyboard.press('Escape')
  const menuClosed = await mobile.locator('.menu-toggle').getAttribute('aria-expanded')

  const desktop = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
  await desktop.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' })
  const introTop = await desktop.locator('#intro-title').evaluate((element) => element.getBoundingClientRect().top + scrollY)
  await desktop.evaluate((top) => scrollTo(0, top - innerHeight * .68), introTop)
  await desktop.waitForTimeout(800)
  const midLetterState = await desktop.locator('#intro-title [data-letter]').evaluateAll((letters) => {
    const visible = letters.filter((letter) => Number(getComputedStyle(letter).opacity) > .9).length
    const hidden = letters.filter((letter) => Number(getComputedStyle(letter).opacity) < .1).length
    return { total: letters.length, visible, hidden }
  })
  await desktop.evaluate((top) => scrollTo(0, top - innerHeight * .25), introTop)
  await desktop.waitForTimeout(900)
  const completedLetterState = await desktop.locator('#intro-title [data-letter]').evaluateAll((letters) => ({
    allVisible: letters.every((letter) => Number(getComputedStyle(letter).opacity) > .98),
    allJoined: letters.every((letter) => getComputedStyle(letter).transform === 'matrix(1, 0, 0, 1, 0, 0)' || getComputedStyle(letter).transform === 'none'),
  }))
  await desktop.locator('.services-section').scrollIntoViewIfNeeded()
  await desktop.waitForTimeout(1400)
  const servicesVisible = await desktop.locator('.services-section [data-reveal]').evaluateAll((elements) =>
    elements.every((element) => Number(getComputedStyle(element).opacity) > .98),
  )
  await desktop.locator('.project-card').first().scrollIntoViewIfNeeded()
  await desktop.waitForTimeout(1400)
  const firstProjectVisible = await desktop.locator('.project-card').first().evaluate((element) =>
    Number(getComputedStyle(element).opacity) > .98,
  )
  await desktop.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += window.innerHeight) {
      window.scrollTo(0, y)
      await new Promise((resolve) => setTimeout(resolve, 100))
    }
  })
  await desktop.waitForTimeout(600)
  const imagesLoaded = await desktop.locator('img').evaluateAll((images) =>
    images.every((image) => image.complete && image.naturalWidth > 0),
  )

  console.log(JSON.stringify({
    menuOpen: menuOpen === 'true',
    menuVisible: menuVisible === 'visible',
    focusedOnOpen,
    menuClosedWithEscape: menuClosed === 'false',
    letterByLetterAtMidScroll: midLetterState,
    lettersCompleteAfterScroll: completedLetterState,
    servicesVisibleAfterScroll: servicesVisible,
    projectVisibleAfterScroll: firstProjectVisible,
    imagesLoaded,
  }, null, 2))
  await browser.close()
})().catch((error) => { console.error(error); process.exit(1) })
