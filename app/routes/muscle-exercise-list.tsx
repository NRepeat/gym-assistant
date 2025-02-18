import { GymApiService } from "~/service/gym-api-service/gym-api-service.server";
import type { Route } from "./+types/muscle-exercise-list";
import type { ExerciseBaseInfoType, ExerciseType, ImageType } from "~/shared/types";
import { Card, CardContent } from "~/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useWindowVirtualizer } from '@tanstack/react-virtual'
import { Link, useFetcher } from "react-router";
import { InfiniteScroller } from "~/components/shared/InfinityScroll";
import { Skeleton } from "~/components/ui/skeleton";

const gymApiService = new GymApiService();

export async function loader({ params, request }: Route.LoaderArgs) {
	let url = new URL(request.url);
	let offset = url.searchParams.get("offset") ? Number(url.searchParams.get("offset")) : 0;
	const muscleId = params.muscleId;

	const muscleExerciseList = await gymApiService.getMuscleExerciseList({ muscleId: Number(muscleId), pag: { limit: 20, offset } });
	await new Promise((resolve) => setTimeout(resolve, 3000));
	return { muscleExerciseList, muscleId };
}

export default function MuscleExerciseList({ loaderData }: Route.ComponentProps) {
	const { muscleId } = loaderData;
	const data = loaderData.muscleExerciseList;
	const fetcher = useFetcher<typeof loader>();
	const [items, setItems] = useState<ExerciseBaseInfoType[]>(data.results);


	const listRef = React.useRef<HTMLDivElement | null>(null)

	const rowVirtualizer = useWindowVirtualizer({
		count: items.length,
		overscan: 5,
		estimateSize: () => 130,
		scrollMargin: listRef.current?.offsetTop ?? 0,
	})
	const fetchNextPage = async () => {
		const newOffset = fetcher.data ? fetcher.data.muscleExerciseList.next : data.next;
		await fetcher.submit({ offset: newOffset }, { method: 'get' });
	};
	useEffect(() => {
		if (!fetcher.data || fetcher.state === "loading") {
			return;
		}

		if (fetcher.data) {
			const newItems = fetcher.data.muscleExerciseList.results;
			setItems((prevAssets) => [...prevAssets, ...newItems]);
		}
	}, [fetcher.data]);


	return (
		<div className="min-h-screen flex flex-col" ref={listRef}>
			<div className="inline-flex h-12 items-center ">
				<ChevronLeft />
				<Link to={`/muscle/list`} className="text-red-500">Back to muscle list</Link>
			</div>
			<div
				style={{
					height: `${rowVirtualizer.getTotalSize()}px`,
					width: '100%',
					position: 'relative',
				}}
			>
				<InfiniteScroller
					loadNext={() => {
						fetchNextPage()
					}}
					loading={fetcher.state === "loading"}
				>
					{rowVirtualizer.getVirtualItems().map((virtualItem) => {
						const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse()
						if (lastItem.index === virtualItem.index && fetcher.state === "loading") {
							return (
								<>
									<div
										key={virtualItem.key}
										style={{
											width: '100%',
											height: `${virtualItem.size}px`,
											transform: `translateY(${virtualItem.start - rowVirtualizer.options.scrollMargin
												}px)`,
										}}
									>
										<Skeleton className="w-full h-30 absolute " />
										<ExerciseItem exercise={items[virtualItem.index]?.exercises[0]} image={items[virtualItem.index]?.images[0]} listId={muscleId} />
									</div>
								</>
							)
						}
						return (
							<div
								key={virtualItem.key}
								style={{

									position: 'absolute',
									top: 0,
									left: 0,
									width: '100%',
									height: `${virtualItem.size}px`,
									transform: `translateY(${virtualItem.start - rowVirtualizer.options.scrollMargin
										}px)`,
								}}
							>
								<ExerciseItem exercise={items[virtualItem.index]?.exercises[0]} image={items[virtualItem.index]?.images[0]} listId={muscleId} />
							</div>
						)
					}
					)}
				</InfiniteScroller>
			</div>
		</div>
	);
}

const ExerciseItem = ({ exercise, image, listId }: { exercise: Pick<ExerciseType, 'name' | "exercise_base">, image: ImageType, listId: string }) => {
	return (
		<Link to={`/workout/muscle/${listId}/list/exercise/${exercise.exercise_base}`}>
			<Card className="h-30">
				<CardContent className="flex p-1 items-center h-full">
					{image ? (
						<div className="overflow-hidden rounded-lg bg-white min-w-22">
							<img className="object-contain scale-105 h-24 w-22 min-w-22 " src={image.image} alt='' />
						</div>
					) : (
						<div className="overflow-hidden rounded-lg h-28 w-22 text-red-500 text-7xl flex items-center justify-center">G</div>
					)}
					<h2 className="text-lg text-left pl-2.5 text-balance">{exercise.name}</h2>
					<div className="flex-1 flex justify-end pr-1">
						<ChevronRight className="w-6 h-6" />
					</div>
				</CardContent>
			</Card>
		</Link>

	);
};