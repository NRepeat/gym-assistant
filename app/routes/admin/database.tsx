import React from 'react'
import { Link } from 'react-router'
import { CardContent, Card } from '~/components/ui/card'

const Database = () => {
	return (
		<div className='w-full	 grid grid-cols-4 gap-4 grid-rows-1 p-4'>
			<DataCard title={'Opens'} />
			<DataCard title={'Semifinals'} />
			<DataCard title={'Heroes'} />
			<DataCard title={'Workout'} />
		</div>
	)
}
const DataCard = ({ title }: { title: string }) => {
	return (
		<Link to={`/admin/data/workout/${title.toLowerCase()}`}>
			<Card className=' col-span-1 rounded-lg shadow-md p-4 row-span-1 hover:border hover:border-admin-primary-muted cursor-pointer'>
				<CardContent className='h-[250px] flex	flex-col justify-center items-center'>
					<h2 className='text-2xl font-bold'>{title}</h2>
				</CardContent>

			</Card>
		</Link>

	)
}
export default Database