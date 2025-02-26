import type { Wod, PrismaClient } from "@prisma/client";



export default class ConcreteWodRepo {
	constructor(private prisma: PrismaClient) { }

	async getAll({ limit, offset, all }: { limit: number; offset: number, all: boolean }): Promise<Wod[]> {
		if (all) {
			return this.prisma.wod.findMany();
		} else {
			return this.prisma.wod.findMany({ take: limit, skip: offset });

		}
	}

	async getById(id: number): Promise<Wod | null> {
		return this.prisma.wod.findUnique({ where: { id } });
	}

	async create(data: any): Promise<Wod> {
		return this.prisma.wod.create({ data });
	}

	async update(id: number, data: Partial<Omit<Wod, 'id' | 'typeId' | 'resources'>>): Promise<Wod> {
		return this.prisma.wod.update({
			where: { id },
			data,
		});
	}

	async delete(id: number): Promise<void> {
		await this.prisma.wod.delete({ where: { id } });
	}

	async count(): Promise<number> {
		return this.prisma.wod.count();
	}
}

