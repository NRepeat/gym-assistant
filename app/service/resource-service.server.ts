export class ResourceService {
	static async getImage(path: string) {
		try {
			const data = await fetch(`http://localhost:3000/api/assets/images/${path}`);
			if (!data.ok) {
				throw new Error("Image not found");
			}
			const blob = await data.blob();
			const imageUrl = URL.createObjectURL(blob);

			return imageUrl;
		}
		catch (error) {
			throw new Response("Error while fetching zone card data");
		}
	}
}

