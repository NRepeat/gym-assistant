import { PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	// Define your seed data
	const cartData = [
		{
			title: "Exercises",
			description: "Exercises list",
			image: "/app/assets/images/3.jpg",
			link: '/muscle/list'
		},
		{
			title: "Chest",
			description: "",
			image: '/app/assets/images/2.webp',
			link: '/chest'
		},
		{
			title: "Back",
			description: "",
			image: '/app/assets/images/5.jpg',
			link: '/back'
		},
		{
			title: "Abs",
			description: "",
			image: '/app/assets/images/4.jpg',
			link: '/abs'
		},
		{
			title: "Arm",
			description: "",
			image: "/app/assets/images/1.jpeg",
			link: '/arms'
		}
	];

	// Insert the seed data into the database
	for (const card of cartData) {
		await prisma.zoneCard.create({
			data: card,
		});
	}

	console.log('Seed data inserted successfully');
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});