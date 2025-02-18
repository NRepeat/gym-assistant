import { ZoneCardRepository } from "./repository/zone-card.server";
import { ResourceService } from "./resource-service.server";

export class ZoneCardService {
	static async getZoneCardData() {
		try {
			const zoneCardsData = await ZoneCardRepository.getZoneCardData();
			return zoneCardsData
		} catch (error) {
			throw new Response("Error while fetching zone card data")
		}
	}
}