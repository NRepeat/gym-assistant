import { type FC } from 'react'
import ZoneCard from '../shared/ZoneCard'
import type { MuscleType } from '~/shared/types'

export type GymTableProps = {
	zoneCardsData: MuscleType[]
}
const bodySideMap = {
	'1': true,
	"2": true,
	'3': true,
	'4': true,
	'5': false,
	'6': true,
	'7': false,
	'8': false,
	'9': false,
	'10': true,
}
const GymTable: FC<GymTableProps> = ({ zoneCardsData }) => {

	const Cards = () => zoneCardsData.map(data => <ZoneCard key={data.id} link={`/muscle/${data.id}/list`} muscle={data} frontBodyImage={bodySideMap[data.id as unknown as keyof typeof bodySideMap]} />)
	return (
		<>
			<div className="grid grid-cols-2 grid-rows-2 gap-4">
				<Cards />
			</div>
		</>

	)
}

export default GymTable