import React, { type FC } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { Link } from 'react-router'
import type { MuscleType } from '~/shared/types'
import { Button } from '../ui/button'

export type ZoneCardProps = {
	muscle: MuscleType
	frontBodyImage: boolean
	link: string
}
const ZoneCard: FC<ZoneCardProps> = ({ link, muscle, frontBodyImage }) => {
	const frontBodyImageUrl = 'https://wger.de/static/images/muscles/muscular_system_front.svg'
	const backBodyImageUrl = 'https://wger.de/static/images/muscles/muscular_system_back.svg'
	const bodyImage = frontBodyImage ? frontBodyImageUrl : backBodyImageUrl
	return (
		<Link to={'/workout' + link} className="col-span-1 ">
			<Card className="  divide-x-2 divide-chart-2 border-2 rounded-sm  shadow-none ">
				<CardHeader className='overflow-hidden p-2 h-14'>
					<p className="pt-1  text-xl font-medium leading-none  uppercase ">{muscle.name_en || muscle.name}</p>
				</CardHeader>
				<CardContent className="flex flex-col items-center justify-center  overflow-hidden pt-2">

					<div className="flex flex-wrap justify-center gap-4 pb-1">
						{muscle.image_url_main && (
							<img className="absolute h-42"
								src={`https://wger.de/${muscle.image_url_main}`}
								alt={`${muscle.name_en} main image`} />
						)}

						<img className="h-44"
							src={bodyImage}
							alt="Muscular System Front" />
					</div>
				</CardContent>
				<CardFooter className="flex justify-center ">
					<Button className=" border-0 rounded-none w-full rounded-b-sm" >View Exercises</Button>
				</CardFooter>
			</Card>
		</Link>
	)
}

export default ZoneCard