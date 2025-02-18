import React, { type FC } from 'react'
import type { GymTableProps } from '~/components/GymTable/GymTable'
import { Skeleton } from '~/components/ui/skeleton'

const MainPageSkeleton: FC<{ cards: number[] }> = ({ cards }) => {
	const SkeletonCards = () => cards.map(data => <Skeleton key={data + "skeleton"} className='overflow-hidden h-44 w-44 border-2 border-white/20 rounded-xl col-span-1' />)
	return (
		<div className="grid grid-cols-2 grid-rows-2 gap-2 ">
			<SkeletonCards />
		</div>
	)
}

export default MainPageSkeleton