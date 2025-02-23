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
		await page.goto(url);

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
			const selector = '#main';
			const d = await page.$(selector);
			console.log('d', d)
			console.log('d', d)
			const data = await page.$eval(selector, (div) => {
				const workoutBlocks = div.querySelectorAll('._component_1ugao_79');
				return Array.from(workoutBlocks).map((block) => {
					const titleElement = block.querySelector('h3');
					const imgElement = block.querySelector('img');
					const paragraphs = block.querySelectorAll('p');
					const title = titleElement ? titleElement.textContent?.trim() : null;
					const image = imgElement ? imgElement.getAttribute('src') : null;
					const extractedContent = Array.from(paragraphs).map((p) => {
						const strong = p.querySelector('strong');
						const linksInP = p.querySelectorAll('a');
						const textContent = p.textContent?.trim() || '';
						if (textContent.includes('Find a gym near you:') || textContent.includes('2024 Open Registration is LIVE!')) return null;
						return {
							type: strong ? 'title' : 'text',
							content: textContent,
							links: Array.from(linksInP).map((a) => ({
								text: a.textContent?.trim() || '',
								href: a.getAttribute('href') || '',
							})),
						};

					});
					return {
						type: 'hero-workout',
						image,
						title,
						content: extractedContent.filter((p) => p !== null),
					};

				})

			})
			console.log('data', data)
			return data

		} catch (error) {
			console.error('Ошибка:', error);
			throw new Error(`${error}`);

		}
	}
	async getOpenWorkoutData({ year, month }: { year: number, month: number }) {
		try {
			const page = await this.getPage(`https://games.crossfit.com/workouts/semifinals/${year}/${month}`);

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
			// await page.waitForSelector('.pdf-link');
			// const pdfLink = await page.$eval('.pdf-link', (div) => {
			// 	const a = div.querySelector('a');
			// 	return a?.getAttribute('href') || '';
			// });
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
			const content = { workout: exercisesData, pdfLink: '', workoutDescriptionData, moveStandards }
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

					const image = imgElement ? imgElement.getAttribute('src') : null;

					// Массив для сохранения контента
					//@ts-ignore
					const extractedContent = [];
					let isStimulusSection = false;

					Array.from(paragraphs).forEach((p) => {
						const textContent = p.textContent?.trim() || '';

						// Прекращаем обработку, как только находим "Stimulus and Strategy"
						if (textContent.includes('Stimulus and Strategy')) {
							isStimulusSection = true;
							return; // Прекращаем обработку текущего параграфа
						}

						// Фильтруем ненужные параграфы
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

						if (!isStimulusSection) {
							if (textContent.includes('Post time to comments')) {
								return
							}
							workout = textContent; // Если это обычный параграф для тренировки
						} else {
							// Если это раздел "Stimulus and Strategy", сохраняем стратегию
							strategy = textContent.replace('Stimulus and Strategy', '').trim();
						}

						// Обработка различных разделов
						if (textContent.includes('Scaling')) {
							scaling = textContent.replace('Scaling', '').trim();
						}
						if (textContent.includes('Intermediate option')) {
							intermediate = textContent.replace('Intermediate option', '').trim();
						}
						if (textContent.includes('Beginner option')) {
							beginner = textContent.replace('Beginner option', '').trim();
						}
						if (textContent.includes('Coaching cues')) {
							coaching = textContent.replace('Coaching cues', '').trim();
						}
						if (textContent.includes('Stimulus and Strategy')) {
							strategy = textContent.replace('Stimulus and Strategy', '').trim();
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
						workout: '',
						scaling: '',
						intermediate: '',
						beginner: '',
						coaching: "",
						strategy: '',
						recourses: [],
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
			console.log('data', data)
			return data;
		} catch (error) {
			console.error('Ошибка:', error);
			throw new Error(`${error}`);
		}
	}
}