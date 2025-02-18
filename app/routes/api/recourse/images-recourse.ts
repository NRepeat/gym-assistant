import fs from "fs/promises";
import path from "path";
import type { Route } from "./+types/images-recourse";

export async function loader({ request }: Route.LoaderArgs) {
	const url = new URL(request.url);
	const imageName = url.pathname.split("/").pop();
	if (!imageName) {
		return new Response("Image not found", { status: 404 });
	}
	const imagePath = path.join(process.cwd(), process.env.NODE_ENV! === 'production' ? '/assets/images' : '/app/assets/images', imageName);
	console.log('imagePath', imagePath)
	try {
		const imageBuffer = await fs.readFile(imagePath);

		const mimeType = imageName.endsWith(".jpg") ? "image/jpeg" : "image/png";

		return new Response(imageBuffer, {
			status: 200,
			headers: {
				"Content-Type": mimeType,
			},
		});
	} catch (error) {
		return new Response("Image not found", { status: 404 });
	}
}
