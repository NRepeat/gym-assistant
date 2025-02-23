import React from 'react'
import type { OpenWorkout } from '~/shared/types';
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table"
import { DataTable } from '~/components/data-table';
import OpenRepo from '~/service/repository/opens-repo';
import { getOpensWorkouts, getSemifinalsWorkouts } from '~/api/admin/workouts-api';
import type { Route } from './+types/workout-table';

import prisma from '~/service/prisma/client';
// import { getHeroesWorkouts, getOpensWorkouts, getSemifinalsWorkouts, getWorkoutsWorkouts } from '~/api/admin/workouts-api';

type WorkoutType = {
	opens: OpenWorkout,
}

export async function loader({ params, request }: Route.LoaderArgs) {
	try {


		const data = await getOpensWorkouts();
		// const data = await prisma.workoutData.findMany({ take: 500, skip: 1000 })
		// const content = await updateToMarkdown(data)
		// console.log('content', content)



		return { serializedData: data }
	} catch (error) {
		console.error('Workout loader error', error);
		throw new Response("Workout loader error", { status: 500 });
	}
}

const Workout = ({ loaderData, params }: Route.ComponentProps) => {
	const columnHelper = createColumnHelper<typeof loaderData.serializedData>()
	const columns = [
		columnHelper.accessor('id', { header: 'ID' }),
		columnHelper.accessor('year', {
			header: 'Year', cell: info => info.getValue(),
			footer: info => info.column.id,
		}),
		columnHelper.accessor('workout', {
			header: 'Workout', cell: info => {
				const value = info.getValue() as string

				return <i className='text-pretty overflow-hidden text-ellipsis max-h-[50px]'>{value.slice(0, 100)}...</i>
			}
		}),
		columnHelper.accessor('description', {
			header: 'Description', cell: info => {
				const value = info.getValue() as string

				return <i className='text-pretty overflow-hidden text-ellipsis max-h-[50px]'>{value.slice(0, 100)}...</i>
			}
		}),
		columnHelper.accessor('open', { header: 'Open' }),
		columnHelper.accessor('movement', { header: 'Movement' }),
		columnHelper.accessor('createdAt', { header: 'Created At' }),
		columnHelper.accessor('updatedAt', { header: 'Updated At' }),
		columnHelper.accessor('thumbnail', { header: 'Thumbnail' }),
		columnHelper.accessor('pdf', { header: 'PDF' }),
	]
	return (

		<DataTable columns={columns} data={loaderData.serializedData} workout={params.workout} />
	)
}

export default Workout