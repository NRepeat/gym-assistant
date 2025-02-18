import GymTable from "~/components/GymTable/GymTable";
import MainPageSkeleton from "~/components/shared/skeletons/MainPageSkeleton";
import { GymApiService } from "~/service/gym-api-service/gym-api-service.server";
import type { Route } from "./+types/muscle-list";
import { useNavigation } from "react-router";

export function meta({ }: Route.MetaArgs) {
	return [
		{ title: "Gym assistant" },
		{ name: "description", content: "Gym assistant" },
	];
}

export async function loader({ request }: Route.LoaderArgs) {
	try {
		const gymApiService = new GymApiService()
		const muscleList = await gymApiService.getMuscleList()
		return { muscleList };
	} catch (error) {
		throw new Response("Error while fetching zone card data", { status: 500 });
	}
}

export default function Home({ loaderData }: Route.ComponentProps) {
	const navigate = useNavigation();
	const cards = Array.from({ length: 5 }, (_, i) => i);

	return (
		<>
			{navigate.state === 'loading' && <MainPageSkeleton cards={cards} />}
			{navigate.state === 'idle' && <GymTable zoneCardsData={loaderData.muscleList.results} />}
		</>

	)
}
