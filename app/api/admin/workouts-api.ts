import prisma from "~/service/prisma/client.server";
import OpenRepo from "~/service/repository/opens-repo.server";

type FiltersType = {
	name: string,
	open: number,
}

export const getOpensWorkouts = async (url: string) => {
	try {
		const openRepo = new OpenRepo();
		const data = await openRepo.getAllOpens({ limit: 10, offset: 0 });
		return data

	} catch (error) {
		console.error('Get workouts error', error);
		throw new Response("Get workouts error", { status: 500 });
	}
}
export const getSemifinalsWorkouts = async (url: string) => {
	try {

		const data = await prisma.semifinals.findMany({
			include: { movement: { select: { name: true, id: true } } }
		});
		return data

	} catch (error) {
		console.error('Get workouts error', error);
		throw new Response("Get workouts error", { status: 500 });
	}
}
export const getHeroesWorkouts = async (url: string) => {
	try {

		const data = await prisma.heroes.findMany({
			include: { movement: { select: { name: true, id: true } } }
		});
		return data

	} catch (error) {
		console.error('Get workouts error', error);
		throw new Response("Get workouts error", { status: 500 });
	}
}
export const getWorkoutsWorkouts = async (url: string) => {
	try {

		const data = await prisma.workoutData.findMany({
		});
		return data

	} catch (error) {
		console.error('Get workouts error', error);
		throw new Response("Get workouts error", { status: 500 });
	}
}