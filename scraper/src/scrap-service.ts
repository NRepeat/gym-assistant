import { HttpProxyAgent } from "http-proxy-agent";
import { Browser, BrowserType, chromium } from "playwright";
import fs from 'fs';
import axios from "axios";
import https from "https";
const certPath = '/home/nikita/.mitmproxy/mitmproxy-ca-cert.pem';
const keyPath = '/home/nikita/.mitmproxy/mitmproxy-ca.pem';

// const certificate = fs.readFileSync(certPath);
// const privateKey = fs.readFileSync(keyPath);

export class ScrapperService {
	private browser: BrowserType<Browser>
	private activeBrowser: Browser | undefined;
	constructor() {
		this.browser = chromium;
	}
	// async fetchData(url: string) {
	// 	try {
	// 		const proxyAgent = new HttpProxyAgent("http://127.0.0.1:8080");

	// 		const httpsAgent = new https.Agent({
	// 			cert: certificate,  // Load the mitmproxy CA certificate
	// 			key: privateKey,
	// 			rejectUnauthorized: false // This is important if you are dealing with self-signed certs
	// 		});

	// 		const response = await axios.get(url, {
	// 			httpsAgent,
	// 			httpAgent: proxyAgent,
	// 		});
	// 		return response.data
	// 	} catch (error) {
	// 		console.error("Error fetching data:", error);
	// 	}
	// }
	private async getPage(url: string) {
		this.activeBrowser = await this.browser.launch({
			headless: true,
			// proxy: {
			// 	server: "http://localhost:8080",

			// },

		},);
		const context = await this.activeBrowser.newContext({
			userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
			// clientCertificates: [{
			// 	cert: certificate,
			// 	origin: 'https://www.crossfit.com',
			// 	key: privateKey,

			// }]
		});
		const page = await context.newPage();
		console.log('url1', url)
		await page.goto(url, { timeout: 50000 });
		console.log('url', url)

		return page;
	}
	async closeBrowser() {
		await this.activeBrowser?.close()
	}
	async sleep() {
		return new Promise((resolve) => {
			const ms = Math.floor(Math.random() * 1000) + 1000
			setTimeout(resolve, ms);
		});
	}

	async getHeroWorkoutData() {
		try {
			const page = await this.getPage('https://www.crossfit.com/heroes');
			console.log('page');
			const selector = '#main';
			await page.waitForSelector(selector);
			await page.waitForSelector('._component_1ugao_79');

			const d = page.locator("._component_1ugao_79");
			const divsContent = await d.evaluateAll((divs) => {
				return divs.map((div) => {
					const titleElement = div.querySelector('h3');
					const imgElement = div.querySelector('img');
					const paragraphs = Array.from(div.querySelectorAll('p'));

					const title = titleElement?.textContent?.trim() || null;
					const image = imgElement?.getAttribute('src') || null;
					const skipTexts = ['Find a gym near you:', '2024 Open Registration is LIVE!', 'First posted'];

					let extractedContent: string[] = [];
					let betweenH3AndImgP: string[] = [];
					let collecting = false;
					const stripTags = (html: string) => {
						const doc = new DOMParser().parseFromString(html, 'text/html');
						return doc.body.textContent || "";
					};
					// Процесс обхода всех <p> элементов
					for (const p of paragraphs) {
						const textContent = p.textContent?.trim();
						if (!textContent || skipTexts.some(skipText => textContent.includes(skipText))) continue;

						// If <p> contains the image, stop collecting text for between title and image
						if (p.contains(imgElement)) collecting = false;

						// If collecting, add to betweenH3AndImgP
						if (collecting) {
							betweenH3AndImgP.push(stripTags(p.outerHTML));
						}

						// If title is before <p>, start collecting text
						if (titleElement && p.previousElementSibling === titleElement) collecting = true;

						// Add the stripped text content to extractedContent
						extractedContent.push(stripTags(textContent));
					}

					// Убираем текст из betweenH3AndImgP, который также присутствует в extractedContent
					const filteredExtractedContent = extractedContent.filter(content =>
						!betweenH3AndImgP.some(p => p.includes(content))
					);

					// Convert to Markdown format (for simplicity, converting to just plain text with newlines)
					const markdownContent = filteredExtractedContent.join('\n\n');
					const markdownBetweenH3AndImgP = betweenH3AndImgP.join('\n\n');
					return {
						title,
						image,
						workout: markdownContent,
						description: markdownBetweenH3AndImgP,
					};
				});
			});

			// console.log('divsContent', divsContent);
			// this.closeBrowser();
			return divsContent;
		} catch (error) {
			console.error('Ошибка:', error);
			throw new Error(`${error}`);
		}
	}

	async getOpenWorkoutData({ year, month }: { year: number, month: number }) {
		try {
			const page = await this.getPage(`https://games.crossfit.com/workouts/open/${year}/${month}`);

			const selector = '#workouts';
			await page.waitForSelector(selector);


			await page.waitForSelector('.exercises')
			const exercisesData = await page.$eval('.exercises', (div) => {
				const ps = div.querySelectorAll('p');
				let workoutData = '';
				let isFirstParagraph = true; // Флаг для пропуска отступа в первом параграфе
				Array.from(ps).forEach((p) => {
					const textContent = p.textContent?.trim() || '';
					if (textContent) {
						// Пропускаем первый параграф
						if (isFirstParagraph) {
							isFirstParagraph = false;
							workoutData += `${textContent}\n`; // Не добавляем маркер списка для первого параграфа
							return;
						}

						// Если в параграфе есть <br>, разбиваем текст на строки
						const lines = p.innerHTML.split('<br>').map((line) => line.trim());
						lines.forEach((line) => {
							if (line) {
								// Если линия не пустая, добавляем маркер списка
								workoutData += `- ${line}\n`;
							}
						});
					}
				});
				return workoutData;
			});




			// await page.waitForSelector('.pdf-link');
			// const pdfLink = await page.$eval('.pdf-link', (div) => {
			// 	const a = div.querySelector('a');
			// 	return a?.getAttribute('href') || '';
			// });

			await page.waitForSelector('#workoutDescription');
			const workoutDescriptionData = await page.$eval('#workoutDescription', (div) => {
				function getMarkdown(node: HTMLElement, seenParagraphs: Set<string>): string {
					const tag = node.tagName.toLowerCase();
					const text = node.textContent?.trim() || '';
					console.log('text', text)

					if (!text) return '';

					const skippedHeaders = new Set([
						"ADAPTIVE DIVISIONS",
						"FOUNDATIONS",
						"YOUR SCORE",
						"DOWNLOAD YOUR SCORECARD"
					]);

					if (skippedHeaders.has(text.toUpperCase())) return '';

					if (tag === 'h1') return `# ${text}\n`;
					if (tag === 'h2') return `## ${text}\n`;
					if (tag === 'h3') return `### ${text}\n`;
					if (tag === 'h4') return `#### ${text}\n`;
					if (tag === 'h5') return `##### ${text}\n`;
					if (tag === 'h6') return `###### ${text}\n`;

					if (tag === 'p' || tag === 'li') {
						if (seenParagraphs.has(text)) return '';
						seenParagraphs.add(text);
						return text;
					}

					if (tag === 'ul' || tag === 'ol') {
						return `\n${Array.from(node.children)
							.map((li, i) => {
								const itemText = getMarkdown(li as HTMLElement, seenParagraphs);
								if (!itemText) return ''; // Пропускаем пустые строки
								return tag === 'ul' ? `- ${itemText}` : `${i + 1}. ${itemText}`;
							})
							.filter(Boolean)
							.join('\n')}\n`;
					}

					return text;
				}
				const seenParagraphs = new Set<string>();
				console.log('seenParagraphs', seenParagraphs)

				return Array.from(div.querySelectorAll('div')).map((innerDiv) => {
					return Array.from(innerDiv.childNodes)
						.map((node) => {
							if (node.nodeType === Node.ELEMENT_NODE) {
								return getMarkdown(node as HTMLElement, seenParagraphs);
							}
						})
						.filter(Boolean)
						.join(' ');
				}).join('\n');
			});



			const inactiveTab = page.locator('.tabs .tab:not(.active) a');
			await inactiveTab.click();

			await page.waitForTimeout(1000 + Math.random() * 1000);
			const moveStandards = await page.evaluate(() => {
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
			const content = { workout: exercisesData, title: `${month}-${year}`, pdfLink: '', workoutDescriptionData, moveStandards }
			// this.closeBrowser();
			return { content }
		} catch (error) {
			console.error('Ошибка:', error);
			throw new Error(`${error}`);

		}
	}
	async getPageSelectorContent({ year, month }: { year: number, month: string }, pageFunction: (div: SVGElement | HTMLElement) => any) {
		try {
			const page = await this.getPage('https://www.crossfit.com/workout/');

			const selector = '#archives';
			await page.waitForSelector(selector, { timeout: 50000 });


			const yearFilter = page.locator('#yearFilter');

			await yearFilter.selectOption({ value: year.toString() });
			await this.sleep();
			const monthFilter = page.locator('#monthFilter');

			await this.sleep();
			await monthFilter.selectOption({ value: month });
			await this.sleep();

			await page.getByText('Search').click();

			await this.sleep();
			await page.waitForSelector(selector);



			const data = await page.$eval(selector, (div) => {
				const workoutBlocks = div.querySelectorAll('.content-container');

				return Array.from(workoutBlocks).map((block) => {
					const imgElement = block.querySelector('img');
					const paragraphs = block.querySelectorAll('p');
					const title = block.querySelector('h3 a')?.textContent?.trim() || '';
					const image = imgElement ? imgElement.getAttribute('src') : null;

					// Массив для сохранения контента
					//@ts-ignore
					const extractedContent = [];
					let isStimulusSection = false;

					Array.from(paragraphs).forEach((p) => {
						const textContent = p.textContent?.trim() || '';


						if (
							textContent.includes("Rest Day") ||
							textContent.includes('Find a gym near you:') ||
							textContent.includes('2024 Open Registration is LIVE!')
						) {
							return;
						}

						const linksInP = p.querySelectorAll('a');

						// Инициализация переменных
						let workout = '';
						let strategy = '';
						let scaling = '';
						let intermediate = '';
						let beginner = '';
						let coaching = '';

						if (!textContent.includes('Scaling') && !textContent.includes('Intermediate option') && !textContent.includes('Beginner option') && !textContent.includes('Coaching cues') && !textContent.includes('Stimulus and Strategy') && !textContent.includes('Resources:')) {
							if (textContent.includes("Compare to")) {
								return
							}
							if (textContent.includes("Post time to comments.")) {
								return
							}
							if (textContent.includes('Post rounds completed to comments')) {
								return;
							}
							if (textContent.includes('Post reps to comments')) {
								return
							}
							if (textContent.includes('comments')) {
								return
							}
							workout += textContent;
						}

						if (textContent.includes('Scaling')) {
							scaling += textContent.replace('Scaling:', '').trim();
						} else if (textContent.includes('Intermediate option')) {
							intermediate += textContent.replace('Intermediate option:', '').trim();
						} else if (textContent.includes('Beginner option')) {
							beginner += textContent.replace('Beginner option:', '').trim();
						} else if (textContent.includes('Coaching cues')) {
							coaching += textContent.replace('Coaching cues:', '').trim();
						} else if (textContent.includes('Stimulus and Strategy')) {
							strategy += textContent.replace('Stimulus and Strategy:', '').trim();
						}

						extractedContent.push({
							workout,
							scaling,
							intermediate,
							beginner,
							strategy,
							coaching,
							recourses: Array.from(linksInP).map((a) => ({
								text: a.textContent?.trim() || '',
								href: a.getAttribute('href') || '',
							})),
						});
					});

					// Объединяем все данные в один объект
					const combinedContent = {
						image,
						title: title,
						workout: '',
						scaling: '',
						intermediate: '',
						beginner: '',
						coaching: "",
						description: '',
						strategy: '',
						recourses: [],
						rawlinks: [],
					};
					//@ts-ignore
					extractedContent.forEach((item) => {
						if (item) {
							if (item.coaching) combinedContent.coaching += `### Coaching cues\n${item.coaching}\n\n`;
							if (item.workout) combinedContent.workout += `**${item.workout}**\n\n`;
							if (item.scaling) combinedContent.scaling += `### Scaling\n${item.scaling}\n\n`;
							if (item.intermediate) combinedContent.intermediate += `### Intermediate Option\n${item.intermediate}\n\n`;
							if (item.beginner) combinedContent.beginner += `### Beginner Option\n${item.beginner}\n\n`;
							if (item.strategy) combinedContent.strategy += `### Stimulus and Strategy\n${item.strategy}\n\n`;
							//@ts-ignore
							combinedContent.rawlinks.push(...item.recourses);
							//@ts-ignore
							item.recourses.forEach((link) => {
								//@ts-ignore
								combinedContent.recourses.push(`[${link.text}](${link.href})`);
							});
						}
					});

					return combinedContent;
				});
			});



			this.closeBrowser();
			return data;
		} catch (error) {
			console.error('Ошибка:', error);
			throw new Error(`${error}`);
		}
	}
}