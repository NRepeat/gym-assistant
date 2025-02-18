import { ZoneCardService } from "~/service/zone-card-service.server";
import type { Route } from "./+types/home";
import { Link } from "react-router";
import GymTable from "~/components/GymTable/GymTable";
import { Card, CardContent, CardFooter, CardHeader } from "~/components/ui/card";
import type { FC } from "react";
import { Button } from "~/components/ui/button";
import clsx from "clsx";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Gym assistant" },
    { name: "description", content: "Gym assistant" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  try {
    const cardsData = await ZoneCardService.getZoneCardData()
    console.log('cardsData', cardsData)

    return { cardsData }
  } catch (error) {
    throw new Response("Error while fetching zone card data", { status: 500 });
  }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { cardsData } = loaderData


  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-4">
      <HomeCard data={cardsData[0]} link={cardsData[0].link} className="col-span-2" />
      {/* <HomeCard data={cardsData[1]} link={cardsData[1].link} className="col-span-1" />
      <HomeCard data={cardsData[3]} link={cardsData[3].link} className="col-span-1" /> */}
    </div>
  )
}
type HomePageCardProps = {
  data: {
    description: string;
    id: number;
    title: string;
    image: string;
    link: string;

  }
  className?: string
  link: string
  horizontal?: boolean
  flip?: boolean
}
const HomeCard: FC<HomePageCardProps> = ({ data, link, className, flip, horizontal }) => {
  console.log('link', link)
  const { description, id, image, title } = data
  return <Link to={link} className={clsx("w-full h-full overflow-hidden  ", className)}>
    <Card className={clsx("w-full h-full overflow-hidden  ")}>
      <CardContent className={clsx('flex flex-row', { "flex-col": horizontal })}>
        <img className=" object-cover h-38 w-38 " src={`/api/assets/images/${data.image}`} alt={title} />
        <div className=" w-full  items-center justify-center text-center bg-gray-300/30 ">
          <div className="  flex flex-col   justify-center h-full">
            <p className="pl-2 text-3xl font-bold flex h-full  items-center">
              {title}
            </p>
            <p className="text-left p-2 bg-black/20 font-bold">
              {description}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  </Link>

}