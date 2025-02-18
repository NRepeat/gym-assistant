import type { ExerciseBaseInfoType } from "~/shared/types";

export const serializeMuscleExerciseList = (muscleExerciseList: ExerciseBaseInfoType[]): ExerciseBaseInfoType[] => {
	const data = muscleExerciseList
		.map((baseExercise) => {
			let exercise = baseExercise.exercises.filter((exercise) => exercise.language === 2);

			if (exercise.length > 1) {
				const uniqueExData = new Set(exercise);
				exercise = Array.from(uniqueExData);
			}

			exercise = exercise.filter((exercise) => exercise.description !== null && exercise.description.trim() !== "");

			return { ...baseExercise, exercises: exercise };
		})
		.filter((baseExercise) => baseExercise.exercises.length > 0 && baseExercise.images.length > 0);

	return data;
};