import type { Movement, Opens } from "@prisma/client";
import prisma from "../prisma/client";
import type { OpensWithMovement } from "~/shared/types";



export default class OpenRepo {

	async getAllOpens({ limit, offset }: { limit: number, offset: number }): Promise<OpensWithMovement[]> {
		try {
			const data = await prisma.opens.findMany({ take: limit, skip: offset, include: { movement: true } },);
			return data
		} catch (error) {
			console.log(error)
			throw new Error('')
		}
	}
	// async getWorkout({ workout }) {
	// 	return prisma.opens.({ workout });
	// }
	// async createWorkout({ workout }) {
	// 	return prisma.opens.({ workout });
	// }
	// async updateWorkout({ workout }) {
	// 	return prisma.opens.({ workout });
	// }
	// async deleteWorkout({ workout }) {
	// 	return prisma.opens.({ workout });
	// }
}