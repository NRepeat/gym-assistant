import { test, expect } from '@playwright/test';




test('getPageSelectorContent applies filters and retrieves data', async ({ page }) => {
  // Переход на страницу
  await page.goto('https://games.crossfit.com/workouts/open/2017');

  const selector = '#workouts';
  await page.waitForSelector(selector);


  await page.waitForSelector('.exercises')
  const exercisesData = await page.$eval('.exercises', (div => {
    const ps = div.querySelectorAll('p');
    return Array.from(ps).map((p) => {
      const textContent = p.textContent?.trim() || '';
      return {
        type: 'p',
        content: textContent,
      };
    }
    )
  }))
  await page.waitForSelector('.pdf-link');
  const pdfLink = await page.$eval('.pdf-link', (div) => {
    const a = div.querySelector('a');
    return a?.getAttribute('href') || '';
  });
  await page.waitForSelector('#workoutDescription')
  const workoutDescriptionData = await page.$eval('#workoutDescription', (div) => {
    const divs = div.querySelectorAll('div');
    return Array.from(divs).map((div) => {
      const divDat = Array.from(div.childNodes).map((node) => {
        if (node.nodeName === 'H2') {
          return {
            type: 'title',
            content: node.textContent?.trim() || '',
          };
        }
        if (node.nodeName === 'P') {
          return {
            type: 'text',
            content: node.textContent?.trim() || '',
          };
        }
        return null;
      }).filter(Boolean);
      return divDat;
    })
  })


  const inactiveTab = page.locator('.tabs .tab:not(.active) a');
  await inactiveTab.click();

  await page.waitForTimeout(1000 + Math.random() * 1000);
  const data = await page.evaluate(() => {
    const slides = document.querySelectorAll('.slick-slide');
    const items: any = [];

    slides.forEach(slide => {
      const img = slide.querySelector('img')?.src;
      //@ts-ignore
      const text = slide.querySelector('.col-md-4')?.innerText.trim();
      if (img && text) {
        items.push({ img, text, type: 'slide' });
      }
    });

    //@ts-ignore
    const thumbnails = Array.from(document.querySelectorAll('.thumbnails img')).map(img => img.src);

    return { items, thumbnails };
  });
  console.log('exercisesData', exercisesData, 'pdfLink', pdfLink, 'workoutDescriptionData', workoutDescriptionData)
  console.log(JSON.stringify(data, null, 2));
});
