import { convertJsonToMarkdown } from "~/lib/convertToMarkdown"
import prisma from "./prisma/client.server"
import OpenRepo from "./repository/opens-repo.server"
import type { OpensWithMovement } from "~/shared/types";
import type { WorkoutData } from "@prisma/client";
type ContentBlock = { type: string; content: string };
type Section = ContentBlock[]; // Одна секция с блоками контента
type NestedSections = Section[]; // Массив секций
const convertWorkoutsToMarkdown = (data: { type: string, content: string }[]) => {

	return data
		.map((block) => {
			if (block.type === "title") {
				return `## ${block.content}`;
			}
			return block.content;
		})
		.join("\n\n");
}
const convertJsonDescriptionToMarkdown = (nestedSections: NestedSections): string => {
	return nestedSections
		.map(sections =>
			sections
				.map(section => {
					if (section.type === "title") return `## ${section.content}\n`;
					if (section.type === "text") return section.content.replace(/\n/g, "  \n");
					return "";

				}



				).join("\n\n")

		).join("\n\n---\n\n") // Разделение между секциями
}

type asd = { type: string, content: string }[]
export const updateToMarkdown = async (data: WorkoutData[]) => {
	try {
		const newW = data.map((item) => {
			const content = convertWorkoutsToMarkdown(item.data!.content as asd)
			return { ...item, data: { ...item.data, content } }
		})
		newW.forEach(async (item) => {
			await prisma.workoutData.update({
				where: { id: item.id },
				data: {
					data: item.data
				}
			})
		}
		)
	} catch (error) {
		console.error('Get workouts error', error);
		throw new Response("Get workouts error", { status: 500 });
	}

}