import { WorkoutData } from "@prisma/client"
import prisma from "../service/prisma"
export type WorkoutType = Omit<WorkoutData, "data" | 'id' | "createdAt" | "updatedAt"> & { data: any }
export const saveWorkout = async (data: WorkoutType) => {

	try {
		await prisma.workoutData.upsert({
			where: { day: data.day },
			update: {}, // Можно обновить данные, если нужно
			create: {
				data: data.data,
				day: data.day,
				image: data.image,
				month: data.month,
				year: data.year,
			}
		});
	} catch (error) {
		throw new Error(`Error saving workout data: ${error}`)
	}
}