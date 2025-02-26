import React from 'react'
import { Outlet } from 'react-router'
import { DataTable } from '~/components/data-table'
import type { Route } from './+types/workouts'
import { createColumnHelper } from '@tanstack/react-table'
import WodService from '~/service/wod-service'
import { pagination } from '~/lib/pagination'
import type { Wod } from '@prisma/client'

export async function loader({ request }: Route.LoaderArgs) {
	try {
		const url = new URL(request.url)
		const searchParams = new URLSearchParams(url.search)
		const page = searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 1
		const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit') as string) : 0
		const allWodsData = await WodService.getAllWods({ limit, offset: 0, all: true });

		const { offset, totalPages } = pagination(page, limit, allWodsData.count);

		const paginatedWodsData = await WodService.getAllWods({ limit, offset, all: true });

		return { serializedData: paginatedWodsData.allWods, totalPages, page, limit }
	} catch (error) {
		console.error('Workouts loader error', error)
		throw new Response('Workouts loader error', { status: 500 })
	}
}

const Workouts = ({ loaderData }: Route.ComponentProps) => {
	console.log('loaderData', loaderData)
	const columnHelper = createColumnHelper<Wod>();
	const data: Wod[] = loaderData.serializedData;
	const columns = [
		columnHelper.accessor('id', { header: 'ID' }),
		columnHelper.accessor('title', { header: 'Title' }),
	];
	return (
		<>
			<DataTable columns={columns} data={data} />

		</>
	)
}

export default Workouts