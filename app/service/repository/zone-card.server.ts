import prisma from "../prisma/client.server"



export class ZoneCardRepository {
	static async getZoneCardData() {
		try {
			const zones = await prisma.zoneCard.findMany()
			return zones
		} catch (error) {
			throw new Error("Error while fetching zone card data")
		}
	}
}