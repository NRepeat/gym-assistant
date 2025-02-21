import React from 'react'
import type { Route } from './+types/workout'
import type { OpenWorkout } from '~/shared/types';
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table"
import { DataTable } from '~/components/data-table';
import OpenRepo from '~/service/repository/opens-repo.server';
import { getOpensWorkouts, getSemifinalsWorkouts } from '~/api/admin/workouts-api';
import prisma from '~/service/prisma/client.server';
import { updateToMarkdown } from '~/service/opens-service.server';
// import { getHeroesWorkouts, getOpensWorkouts, getSemifinalsWorkouts, getWorkoutsWorkouts } from '~/api/admin/workouts-api';

type WorkoutType = {
	opens: OpenWorkout,
}

export async function loader({ params, request }: Route.LoaderArgs) {
	try {
		const url = new URL(request.url);
		const endpoint = `/api/admin/workouts/workout/${params.workout}?offset=0&limit=10`;
		const fullUrl = url.origin + endpoint;
		// const workoutsGetFunctions = {
		// 	// 'workout': getWorkoutsWorkouts,
		// 	'opens': getOpensWorkouts,
		// 	// 'heroes': getHeroesWorkouts,
		// 	'semifinals': getSemifinalsWorkouts,
		// }
		// const data = await workoutsGetFunctions[params.workout as keyof typeof workoutsGetFunctions](fullUrl);

		// const serializedData = data.flatMap((workout) => {
		// 	return {
		// 		id: workout.id,
		// 		year: workout.year,
		// 		workout: workout!.workout ? JSON.stringify(workout!.workout) : '',
		// 		description: workout.description ? JSON.stringify(workout.description) : '',
		// 		open: workout?.open ? workout.open : '',
		// 		movement: workout.movement ? workout.movement.flatMap(m => m.id).join(', ') : '',
		// 		createdAt: new Date(workout.createdAt).toLocaleString(),
		// 		updatedAt: new Date(workout.updatedAt).toLocaleString(),
		// 		thumbnail: workout.thumbnails ? workout.thumbnails.length : '',
		// 		pdf: workout.pdf ? workout.pdf : ''
		// 	}
		// })
		// return { serializedData }
	} catch (error) {
		console.error('Workout loader error', error);
		throw new Response("Workout loader error", { status: 500 });
	}
}

const Workout = ({ loaderData }: Route.ComponentProps) => {
	// const columnHelper = createColumnHelper<typeof loaderData.serializedData>()

	// const columns = [
	// 	columnHelper.accessor('id', { header: 'ID' }),
	// 	columnHelper.accessor('year', {
	// 		header: 'Year', cell: info => info.getValue(),
	// 		footer: info => info.column.id,
	// 	}),
	// 	columnHelper.accessor('workout', {
	// 		header: 'Workout', cell: info => {
	// 			const value = info.getValue() as string

	// 			return <i className='text-pretty overflow-hidden text-ellipsis max-h-[50px]'>{value.slice(0, 100)}...</i>
	// 		}
	// 	}),
	// 	columnHelper.accessor('description', {
	// 		header: 'Description', cell: info => {
	// 			const value = info.getValue() as string

	// 			return <i className='text-pretty overflow-hidden text-ellipsis max-h-[50px]'>{value.slice(0, 100)}...</i>
	// 		}
	// 	}),
	// 	columnHelper.accessor('open', { header: 'Open' }),
	// 	columnHelper.accessor('movement', { header: 'Movement' }),
	// 	columnHelper.accessor('createdAt', { header: 'Created At' }),
	// 	columnHelper.accessor('updatedAt', { header: 'Updated At' }),
	// 	columnHelper.accessor('thumbnail', { header: 'Thumbnail' }),
	// 	columnHelper.accessor('pdf', { header: 'PDF' }),
	// ]
	return (
		<div>
			<div className="container mx-auto py-10">
				{/* <DataTable columns={columns} data={loaderData.serializedData} /> */}
			</div>
		</div>
	)
}

export default Workout