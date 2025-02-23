import { randomUUID } from "crypto";
import { saveWorkout, WorkoutType } from "./repo/workout";
import { ScrapperService } from "./scrap-service";
import prisma from "service/prisma";
//@ts-ignore


const pageFunc = (div: SVGElement | HTMLElement) => {
	const paragraphs = div.querySelectorAll('p');

	const formattedData = Array.from(paragraphs)
		.map((p) => {
			const strong = p.querySelector('strong');
			const links = p.querySelectorAll('a');
			const textContent = p.textContent?.trim() || 'No data found';
			const isTitle = strong !== null;

			if (links.length > 0) {
				return {
					type: 'resources',
					title: strong ? strong.textContent?.trim() || 'Resources' : 'Resources',
					links: Array.from(links).map((a) => ({
						text: a.textContent?.trim() || 'No title',
						href: a.href
					}))
				};
			}


			return {
				type: isTitle ? 'title' : 'text',
				content: textContent,
				links: []
			};
		})
		.filter((p) => p.content !== '');

	return formattedData;
};


export const getWorkOfTheDayData = async (year: number, month: string) => {
	const scrapperService = new ScrapperService();
	await scrapperService.sleep()
	const content = await scrapperService.getPageSelectorContent({ month, year }, pageFunc)
	return content
	// console.log('content', content[0].content)

	// const data = content.map((c) => {
	// 	return {
	// 		type: c.type,
	// 		year,
	// 		month,
	// 		image: c.image ?? null,
	// 		title: c.title ?? null,
	// 		content: c.content ?? null,
	// 	};
	// });


	scrapperService.closeBrowser()
	return {}

}

export const getManyWorkOfTheDayData = async (to: { month: string, year: number }[]) => {
	const allData = await Promise.all(
		to.map(async ({ month, year }) => {
			return await getWorkOfTheDayData(year, month);
		})
	);
	console.log('allData', allData)
	Promise.all(allData.map(data => {

		prisma.
	}));

	// const workouts = allData.flat().map((c) => ({
	// 	year: c.year,
	// 	month: Number(c.month),
	// 	image: c.image ?? null,
	// 	day: `${c.title}-${randomUUID()}`,
	// 	data: c,
	// }));
	// console.log('workouts', workouts)

	// await Promise.all(workouts.map(saveWorkout));
};
