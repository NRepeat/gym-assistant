import { extractImagesFromPdf } from "pdf-extract-image";
import { saveWorkout } from "./repo/workout";
import { ScrapperService } from "./scrap-service";
import prisma from "./service/prisma";
import { getManyWorkOfTheDayData } from "./work-of-the-day";
import fs, { writeFileSync } from "fs";
import { randomUUID } from "crypto";


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
	// console.log('to:', to);
	// await getManyWorkOfTheDayData(to)
	// const newS = new ScrapperService();
	// const data = await newS.getHeroWorkoutData();
	// console.log('data', data);
	// const count = data.length;
	// console.log('count', count);
	// let i = 0;

	// for (const c of data) {
	// 	// Ensure c.image and c.title exist
	// 	if (!c.image || !c.title) {
	// 		console.log('Skipping incomplete data:', c);
	// 		continue;
	// 	}

	// 	// Prepare image data
	// 	const images = { href: c.image, text: c.title };

	// 	console.log('images', images);

	// 	// Create new entry in the database
	// 	await prisma.wod.create({
	// 		data: {
	// 			createdByUser: false,
	// 			hero: true,
	// 			uuid: randomUUID(),
	// 			title: c.title,
	// 			description: c.description || "", // Assuming you want the extractedContent here
	// 			workout: c.workout || "",    // Assuming workout info comes from extractedContent too
	// 			beginnerOption: null,
	// 			resources: '',
	// 			intermediateOption: null,
	// 			coachComments: null,
	// 			scaling: null,
	// 			strategy: null,
	// 			thumbnail: c.image,
	// 			images: {
	// 				create: {
	// 					image: {
	// 						create: {
	// 							name: images.text,
	// 							type: "image",
	// 							url: images.href
	// 						}
	// 					}
	// 				}
	// 			},
	// 		},
	// 	});

	// 	i++;
	// 	console.log('Processed:', i, 'of', count);
	// }
	// const workouts = data.flat().map((c) => ({
	// 	year: 0,
	// 	month: 0,
	// 	image: c.image ?? null,
	// 	day: c.title || 'hero-workout',
	// 	data: c,
	// }));
	// await Promise.all(workouts.map(saveWorkout));

	const links = [
		{ year: 2017, workout: 1 },
		{ year: 2017, workout: 2 },
		{ year: 2017, workout: 3 },
		{ year: 2017, workout: 4 },
		{ year: 2017, workout: 5 },

		// { year: 2024, workout: 5 },
		// { year: 2024, workout: 6 },
		// { year: 2021, workout: 7 },
	]
	const serv = new ScrapperService()
	for (const link of links) {
		const data = await serv.getOpenWorkoutData({ month: link.workout, year: link.year });
		console.log('data', data.content.moveStandards);

		const images = {
			text: 'image-name',  // Пример имени изображения
			href: 'image-url'    // Пример URL изображения
		};

		// Проверьте, если 'c' объект не определен, нужно его заменить
		const c = data.content; // Предполагаем, что 'content' это часть данных

		await prisma.wod.create({
			data: {
				createdByUser: false,
				hero: false,
				uuid: randomUUID(),
				title: c.title,                  // Название
				description: c.workoutDescriptionData || "", // Описание
				workout: c.workout || "",         // Данные о тренировке
				beginnerOption: null,
				resources: '',
				intermediateOption: null,
				coachComments: null,
				scaling: null,
				strategy: null,
				thumbnail: null,              // Пример для изображения
				images: {
					create: {
						image: {
							create: {
								name: images.text,
								type: "image",
								url: images.href
							}
						}
					}
				},
				movement: {
					create: c.moveStandards.items.map((item: any) => {
						console.log('item', item)

						return ({
							info: {
								create: {
									description: item.text,
									image: {
										create: {
											name: item.text,
											type: "image",
											url: item.img
										}
									}
								}
							}
						})
					})
				}
				// movement: {
				// 	create: {
				// 		info: {
				// 			create: {
				// 				description: '',
				// 				image: {
				// 					create: {
				// 						name: images.text,
				// 						type: "image",
				// 						url: images.href
				// 					}
				// 				}
				// 			}
				// 		}
				// 	}
				// }

			},
		});
	}
	console.log('done')
	// console.log('data', data)
})();

