import { GymApiService } from "~/service/gym-api-service/gym-api-service.server";
import type { Route } from "./+types/exercise";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { useEffect, useState } from "react";
import type { ExerciseType, ImageType, VideoType } from "~/shared/types";
import { mapCategoriesColors, mapEquipment, mapMuscles, mapMusclesEn } from "~/lib/map-categories";
import { Badge } from "~/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "~/components/ui/carousel";
import { Link } from "react-router";
import { ChevronDown, ChevronLeft } from "lucide-react";

export async function loader({ request, params, }: Route.LoaderArgs) {

	try {
		const exerciseId = params.exerciseId
		const listId = params.muscleId
		const gymApiService = new GymApiService()
		const exercise = await gymApiService.getExerciseBaseInfo(Number(exerciseId))
		return { exercise, listId };
	} catch (error) {
		throw new Response("Error while fetching zone card data", { status: 500 });
	}
}

const Exercise = ({ loaderData }: Route.ComponentProps) => {
	const { listId } = loaderData
	const exercise = loaderData.exercise
	console.log('exercise', exercise)
	const variants = exercise.results.exercises
	const [defaultVariant, setDefaultVariant] = useState<ExerciseType>(variants[0])
	const [exerciseVideos, setExerciseVideos] = useState<VideoType[]>(exercise.results.videos)
	const categoryColor = mapCategoriesColors(exercise.results.category.id)
	const category = exercise.results.category.name
	return (
		<>
			<div className="inline-flex h-12 items-center">
				<ChevronLeft />
				<Link to={`/workout/muscle/${listId}/list`} className="text-red-500">Back to muscle list</Link>
			</div>
			<Card className="w-full h-full overflow-hidden rounded-b-none">
				<CardHeader className="px-2 py-2.5 border-b-2  divide-x-2 divide-red-500 border-red-500">


					<h2 className="text-4xl pl-1 font-bold ">{defaultVariant.name}</h2>
					<div className="flex flex-wrap gap-2 pt-2.5">
						<Badge style={{ backgroundColor: categoryColor }}>{category}</Badge>
						{exercise.results.equipment.map((equipment) => {
							const colorEn = mapEquipment(equipment.id)
							return <Badge key={equipment.id} style={{ backgroundColor: colorEn }}>{equipment.name}</Badge>
						})}
						{exercise.results.muscles.map((muscle) => {
							const colorEn = mapMusclesEn(muscle.id)
							const colorLat = mapMuscles(muscle.id)
							return <Badge key={muscle.id} style={{ backgroundColor: colorEn || colorLat }}>{muscle.name || muscle.name_en}</Badge>
						})}
					</div>
				</CardHeader>
				<CardContent className="flex flex-col gap-4">
					<VariantTab setDefaultVariant={setDefaultVariant} variants={variants} />
					<ImageCarousel images={exercise.results.images} />
					<VideoAccordion videos={exerciseVideos} />
				</CardContent>
			</Card>
		</>

	)
}

export default Exercise
const VideoAccordion = ({ videos }: { videos: VideoType[] }) => {


	return <Accordion type="single" collapsible defaultChecked defaultValue={videos[0]?.uuid}>
		{videos.map((video, index) => (
			<AccordionItem key={video.id} value={video.uuid}>
				<AccordionTrigger className="px-2">Exercise video </AccordionTrigger>
				<AccordionContent className=" overflow-hidden">
					<video controls width="600" muted>
						<source src={video.video} type="video/mp4" />
					</video>
				</AccordionContent>
			</AccordionItem>
		))}
	</Accordion>
}

const ImageCarousel = ({ images }: { images: ImageType[] }) => {

	return (<Carousel opts={{}} className="bg-white/20">
		<CarouselContent >
			{images.map((image) => (
				<CarouselItem className="flex items-center	justify-center w-full" key={image.id}>
					<img className="h-[200px] object-fill" src={image.image} alt={image.image} />
				</CarouselItem>
			))}

		</CarouselContent>
		<CarouselPrevious className="" />
		<CarouselNext />
	</Carousel>)
}

const VariantTab = ({ variants, setDefaultVariant }: { variants: ExerciseType[], setDefaultVariant: (variant: ExerciseType) => void }) => {
	return (

		<Tabs defaultValue={variants[0].name} className="pt-2">
			<TabsList className="w-full rounded-none">
				{variants.map((variant) => (
					<div key={variant.id}>
						<TabsTrigger value={variant.name} onClick={() => setDefaultVariant(variant)}>{variant.name}</TabsTrigger>
					</div>
				))}
			</TabsList>
			{variants.map((variant) => (
				<TabsContent key={variant.id} value={variant.name}>
					<Description description={variant.description} />
				</TabsContent>
			))}
		</Tabs>

	)
}

const Description = ({ description }: { description: string }) => {
	const [html, setHtml] = useState<string | null>(null);
	useEffect(() => {
		setHtml(description);
	}, [description]);

	if (!html) return null;

	return <p className="px-2.5 h-fit pb-2" dangerouslySetInnerHTML={{ __html: html }} />;
};