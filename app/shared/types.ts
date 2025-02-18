export type MuscleType = {
	id: number,
	name: string,
	name_en: string | undefined,
	is_front: boolean,
	image_url_main: string,
	image_url_secondary: string
}

export interface GymApiResponseType<T> {
	count: number | null,
	next: number | null,
	previous: number | null,
	results: T
}
export enum CategoryTypeGroup {
	Abs = 10,
	Arms = 8,
	Back = 12,
	Calves = 14,
	Cardio = 15,
	Chest = 11,
	Legs = 9,
	Shoulders = 13,
}
export enum MuscleGroup {
	AnteriorDeltoid = 2,
	BicepsBrachii = 1,
	BicepsFemoris = 11,
	Brachialis = 13,
	Gastrocnemius = 7,
	GluteusMaximus = 8,
	LatissimusDorsi = 12,
	ObliquusExternusAbdominis = 14,
	PectoralisMajor = 4,
	QuadricepsFemoris = 10,
	RectusAbdominis = 6,
	SerratusAnterior = 3,
	Soleus = 15,
	Trapezius = 9,
	TricepsBrachii = 5
}

export enum Equipment {
	Barbell = 1,
	Bench = 8,
	Dumbbell = 3,
	GymMat = 4,
	InclineBench = 9,
	Kettlebell = 10,
	PullUpBar = 6,
	SZBar = 2,
	SwissBall = 5,
	NoneBodyweightExercise = 7,
}


export enum MuscleGroupEn {
	Shoulders = 2,
	Biceps = 11,
	Hamstrings = 1,
	Calves = 7,
	Glutes = 8,
	Lats = 12,
	Abs = 6,
	Chest = 4,
	Quads = 10,
	Triceps = 5,
}
export type ExerciseBaseInfoType =

	{
		"id": number,
		"uuid": string,
		"created": string,
		"last_update": string,
		"last_update_global": string,
		"category": CategoryType,
		"muscles": MuscleType[],
		"muscles_secondary": MusclesSecondary[],
		"equipment": EquipmentType[],
		"images": ImageType[],
		"exercises": ExerciseType[],
		"variations": number,
		"videos": VideoType[],
		"author_history": string[],
		"total_authors_history": string[]
	}



export type CategoryType = {
	"id": number,
	"name": string
}
export type MusclesSecondary = {
	"id": number,
	"name": string,
	"name_en": string,
	"is_front": true,
	"image_url_main": string,
	"image_url_secondary": string
}
export type EquipmentType = {
	"id": number,
	"name": string
}

export type ImageType = {
	"id": number,
	"uuid": string,
	"exercise_base": number,
	"exercise_base_uuid": string,
	"image": string,
	"is_main": true,
	"style": string,
	"license": number,
	"license_title": string,
	"license_object_url": string,
	"license_author": string,
	"license_author_url": string,
	"license_derivative_source_url": string,
	"author_history": string[]
}
export type ExerciseType = {
	"id": number,
	"uuid": string,
	"name": string,
	"exercise_base": number,
	"description": string,
	"created": string,
	"language": number,
	"aliases": AliasesType[],
	"notes": NotesType[],
	"license": number,
	"license_title": string,
	"license_object_url": string,
	"license_author": string,
	"license_author_url": string,
	"license_derivative_source_url": string,
	"author_history": string[]
}
export type AliasesType = {
	"id": number,
	"uuid": string,
	"alias": string
}
export type NotesType = {
	"id": number,
	"uuid": string,
	"exercise": number,
	"comment": string
}
export type VideoType = {
	"id": number,
	"uuid": string,
	"exercise_base": number,
	"video": string,
	"is_main": boolean,
	"size": number,
	"duration": string,
	"width": number,
	"height": number,
	"codec": string,
	"codec_long": string,
	"license": number,
	"license_title": string,
	"license_object_url": string,
	"license_author": string,
	"license_author_url": string,
	"license_derivative_source_url": string,
	"author_history": string[]
}