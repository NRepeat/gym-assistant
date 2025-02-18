import { serializeMuscleExerciseList } from "~/lib/serialize-muscle-exercise-list";
import type { ExerciseBaseInfoType, GymApiResponseType, MuscleType } from "~/shared/types";

export class GymApiService {
	private apiKey
	constructor() {
		this.apiKey = import.meta.env.VITE_WGER_API_KEY;
	}
	async getExerciseBaseInfo(exerciseId: number): Promise<GymApiResponseType<ExerciseBaseInfoType>> {
		try {
			const response = await fetch(`https://wger.de/api/v2/exercisebaseinfo/${exerciseId}/`, {
				method: 'GET',
				headers: {
					Authorization: `Token ${import.meta.env.VITE_WGER_API_KEY}`
				}
			});
			if (!response.ok) {
				throw new Error('Failed to fetch exercise info');
			}
			const data = await response.json() as ExerciseBaseInfoType
			const filterExData = data.exercises.filter((exercise) => exercise.language === 2)
			const uniqueExData = new Set(filterExData)
			const validExData = { ...data, exercises: Array.from(uniqueExData) }
			return { results: validExData, count: 1, next: null, previous: null };
		} catch (error) {
			console.error('Get exercise info error', error);
			throw new Response("Get exercise info error", { status: 500 });
		}
	}
	async getMuscleExerciseList({ muscleId, pag: { limit = 10, offset = 0 } }: { muscleId: number, pag: { limit: number, offset: number } }): Promise<GymApiResponseType<ExerciseBaseInfoType[]>> {

		try {
			const response = await fetch(`https://wger.de/api/v2/exercisebaseinfo/?muscles=${muscleId}&limit=${limit}&offset=${offset}&ordering=id`, {
				method: 'GET',
				headers: {
					Authorization: `Token ${import.meta.env.VITE_WGER_API_KEY}`
				}
			});
			if (!response.ok) {
				throw new Error('Failed to fetch exercise list');
			}
			const data = await response.json();
			const formattedData = serializeMuscleExerciseList(data.results);
			const next = data.next ? offset + limit : null;
			const previous = data.previous ? offset - limit : null;
			return { ...data, next, previous, results: formattedData };
		} catch (error) {
			console.error('Get muscle exercise list error', error);
			throw new Response("Get muscle exercise list error", { status: 500 });
		}
	}

	async getMuscleList(): Promise<GymApiResponseType<MuscleType[]>> {
		try {
			if (!this.apiKey) {
				throw new Error('API key not found');
			}
			const response = await fetch(`https://wger.de/api/v2/muscle/?limit=10&offset=0&ordering=id`, {
				method: 'GET',
				headers: {
					Authorization: `Token ${this.apiKey}`
				}
			});
			if (!response.ok) {
				throw new Error('Failed to fetch muscle list');
			}
			const data = await response.json();
			return data
		} catch (error) {
			console.error('Get muscle list error', error);
			throw new Response("Get muscle list error", { status: 500 });
		}
	}
}