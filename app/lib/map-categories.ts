import { CategoryTypeGroup, Equipment, MuscleGroup, MuscleGroupEn } from "~/shared/types";

const categoryColorMap: Record<CategoryTypeGroup, string> = {
	[CategoryTypeGroup.Abs]: "#191919",
	[CategoryTypeGroup.Arms]: "#750E21",
	[CategoryTypeGroup.Back]: "#E3651D",
	[CategoryTypeGroup.Calves]: "#BED754",
	[CategoryTypeGroup.Cardio]: "#FF6500",
	[CategoryTypeGroup.Chest]: "#1E3E62",
	[CategoryTypeGroup.Legs]: "#2E073F",
	[CategoryTypeGroup.Shoulders]: "#EB3678",
};

const muscleGroupNamesEn: Record<MuscleGroupEn, string> = {
	[MuscleGroupEn.Triceps]: "#FF1493", // Deep Pink
	[MuscleGroupEn.Shoulders]: "#FF6347", // Tomato
	[MuscleGroupEn.Biceps]: "#FFD700", // Gold
	[MuscleGroupEn.Hamstrings]: "#8B0000", // Dark Red
	[MuscleGroupEn.Calves]: "#228B22", // Forest Green
	[MuscleGroupEn.Glutes]: "#800080", // Purple
	[MuscleGroupEn.Lats]: "#4682B4", // Steel Blue
	[MuscleGroupEn.Abs]: "#32CD32", // Lime Green
	[MuscleGroupEn.Chest]: "#DC143C", // Crimson
	[MuscleGroupEn.Quads]: "#FF8C00", // Dark Orange
};
const muscleGroupNames: Record<MuscleGroup, string> = {
	[MuscleGroup.AnteriorDeltoid]: "#FF6347", // Tomato
	[MuscleGroup.BicepsBrachii]: "#FFD700", // Gold
	[MuscleGroup.BicepsFemoris]: "#8B0000", // Dark Red
	[MuscleGroup.Brachialis]: "#A52A2A", // Brown
	[MuscleGroup.Gastrocnemius]: "#228B22", // Forest Green
	[MuscleGroup.GluteusMaximus]: "#800080", // Purple
	[MuscleGroup.LatissimusDorsi]: "#4682B4", // Steel Blue
	[MuscleGroup.ObliquusExternusAbdominis]: "#32CD32", // Lime Green
	[MuscleGroup.PectoralisMajor]: "#DC143C", // Crimson
	[MuscleGroup.QuadricepsFemoris]: "#FF8C00", // Dark Orange
	[MuscleGroup.RectusAbdominis]: "#D2691E", // Chocolate
	[MuscleGroup.SerratusAnterior]: "#7FFF00", // Chartreuse
	[MuscleGroup.Soleus]: "#2E8B57", // Sea Green
	[MuscleGroup.Trapezius]: "#6A5ACD", // Slate Blue
	[MuscleGroup.TricepsBrachii]: "#FF1493", // Deep Pink
};

const equipmentColorMap: Record<Equipment, string> = {
	[Equipment.Barbell]: "#FF6347", // Tomato
	[Equipment.Bench]: "#00BFFF", // Deep Sky Blue
	[Equipment.Dumbbell]: "#8A2BE2", // Blue Violet
	[Equipment.GymMat]: "#FFD700", // Gold
	[Equipment.InclineBench]: "#32CD32", // Lime Green
	[Equipment.Kettlebell]: "#FF1493", // Deep Pink
	[Equipment.PullUpBar]: "#8B0000", // Dark Red
	[Equipment.SZBar]: "#FF4500", // Orange Red
	[Equipment.SwissBall]: "#ADFF2F", // Green Yellow
	[Equipment.NoneBodyweightExercise]: "#DC143C", // Crimson
};


export const mapCategoriesColors = (category: CategoryTypeGroup): string => {
	return categoryColorMap[category] || "bg-gray-500";
};

export const mapMusclesEn = (muscle: MuscleGroupEn): string => {
	return muscleGroupNamesEn[muscle] || "bg-gray-500";
}
export const mapMuscles = (muscle: MuscleGroup): string => {
	return muscleGroupNames[muscle] || "bg-gray-500";
}

export const mapEquipment = (equipment: Equipment): string => {

	return equipmentColorMap[equipment] || "bg-gray-500";
}