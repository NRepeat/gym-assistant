import React from 'react'
import Editor from '~/components/admin/Editor'
import type { Route } from './+types/workout-edit';
import { getOpensWorkout, getOpensWorkouts, getSemifinalsWorkout, getSemifinalsWorkouts } from '~/api/admin/workouts-api';

export async function loader({ params }: Route.LoaderArgs) {
	console.log('params', params)
	try {
		const workoutsGetFunctions = {
			// 'workout': getWorkoutsWorkouts,
			'opens': getOpensWorkout,
			// 'heroes': getHeroesWorkouts,
			'semifinals': getSemifinalsWorkout,
		}
		const data = await workoutsGetFunctions[params.workout as keyof typeof workoutsGetFunctions](Number(params.id));
		return { data }


	} catch (error) {
		console.error('Workout loader error', error);
		throw new Response("Workout loader error", { status: 500 });
	}
}

const WorkoutEdit = ({ loaderData }: Route.ComponentProps) => {

	return (
		<div className="container">
			{/* <Editor content={loaderData.data?.description as string} /> */}
		</div>
	)
}

export default WorkoutEdit