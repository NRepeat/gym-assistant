import { getWorkouts } from "~/api/admin/workouts-api";
import prisma from "~/service/prisma/client";
import type { Route } from "../../api/admin/+types/workouts";

export async function loader({ request, params }: Route.LoaderArgs) {
	console.log('params', params)
	const url = new URL(request.url);
	const limit = url.searchParams.get('limit') || 10;
	console.log('limit', limit)
	const offset = url.searchParams.get('offset') || 0;
	console.log('offset', offset)
	return new Response(JSON.stringify({ params }), { status: 200 });
}