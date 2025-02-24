import { extractImagesFromPdf } from "pdf-extract-image";
import { saveWorkout } from "./repo/workout";
import { ScrapperService } from "./scrap-service";
import prisma from "./service/prisma";
import { getManyWorkOfTheDayData } from "./work-of-the-day";
import fs, { writeFileSync } from "fs";


(async () => {
	const to = [];

	// for (let year = 2021; year <= 2024; year++) {
	// 	for (let month = 1; month <= 12; month++) {
	// 		to.push({
	// 			month: month.toString().padStart(2, '0'),
	// 			year: year
	// 		});
	// 	}
	// }
	// to.push({
	// 	month: '01',
	// 	year: 2025
	// });
	to.push({
		month: '02',
		year: 2025
	});
	console.log('to:', to);
	await getManyWorkOfTheDayData(to)
	// const newS = new ScrapperService()
	// const data = await newS.getHeroWorkoutData()
	// const workouts = data.flat().map((c) => ({
	// 	year: 0,
	// 	month: 0,
	// 	image: c.image ?? null,
	// 	day: c.title || 'hero-workout',
	// 	data: c,
	// }));
	// await Promise.all(workouts.map(saveWorkout));

	const links = [
		{ year: 2024, workout: 1 },
		{ year: 2024, workout: 2 },
		{ year: 2024, workout: 3 },
		{ year: 2024, workout: 4 },
		{ year: 2024, workout: 5 },
		{ year: 2024, workout: 6 },
		// { year: 2021, workout: 7 },
	]
	// const serv = new ScrapperService()
	// for (const link of links) {
	// 	const data = await serv.getOpenWorkoutData({ month: link.workout, year: link.year });

	// 	// Create movements
	// 	const movements: Omit<Movement, 'id' | 'createdAt' | 'updatedAt'>[] = [];
	// 	for (const c of data.content.moveStandards.items) {
	// 		const name = `${c.text.split(',')[0]}-${link.year}.${link.workout}`;
	// 		const description = c.text;

	// 		movements.push({ description, image: [c.img], name, year: link.year, workout: link.workout });

	// 		// Create movement in the database
	// 		console.log('name', name)
	// 		// await prisma.movement.create({
	// 		// 	data: { description, image: [c.img], name, year: link.year, workout: link.workout },
	// 		// });
	// 	}

	// 	// Create Open record
	// 	const open = {
	// 		description: data.content.workoutDescriptionData,
	// 		open: link.workout,
	// 		year: link.year,
	// 		pdf: data.content.pdfLink,
	// 		workout: data.content.workout,
	// 		thumbnails: data.content.moveStandards.thumbnails as string[],
	// 	};

	// 	// Create Open with associated movements
	// 	// await prisma.semifinals.create({
	// 	// 	data: {
	// 	// 		description: open.description,
	// 	// 		semifinal: open.open,
	// 	// 		year: open.year,
	// 	// 		pdf: open.pdf,
	// 	// 		workout: open.workout,
	// 	// 		thumbnails: open.thumbnails,
	// 	// 		movement: {
	// 	// 			connect: movements.map((c) => ({ name: c.name })),
	// 	// 		},
	// 	// 	},
	// 	// });

	// 	console.log('Data processed for workout:', link.workout);
	// }


	// console.log('data', data)
})();

