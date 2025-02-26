import type { Wod } from "@prisma/client";
import prisma from "./prisma/client";
import ConcreteWodRepo from "./repository/wod-repo";

export default class WodService {
	private static wodRepo = new ConcreteWodRepo(prisma);
	static async getAllWods({ limit, offset, all }: { limit: number, offset: number, all: boolean }): Promise<{ allWods: Wod[], count: number }> {
		const allWods = await this.wodRepo.getAll({ limit, offset, all });
		const count = await this.wodRepo.count();
		return { allWods, count };
	}
}