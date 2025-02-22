import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
	// layout('./components/layouts/Main.tsx', [
	// 	index("routes/home.tsx"),
	// 	route('/muscle/list', 'routes/muscle-list.tsx', [
	// 	]),
	// 	route('/workout/muscle/:muscleId/list', 'routes/muscle-exercise-list.tsx'),
	// 	route("/workout/muscle/:muscleId/list/exercise/:exerciseId", "routes/exercise.tsx",),
	// ]),
	route('/automator/register', 'routes/register.ts'),
	...prefix('admin', [
		layout('./components/layouts/Admin.tsx', [
			index("routes/admin/home.tsx"),
			route('workouts', 'routes/admin/workouts.tsx'),
			route('data/workout/:workout', 'routes/admin/workout-table.tsx'),
			route('data/workout/:workout/:id/edit', 'routes/admin/workout-edit.tsx'),

			// route('/workouts/edit', 'routes/admin/workout-edit.tsx'),

		])]),
	...prefix('api', [
		route("assets/images/:slug", "routes/api/recourse/images-recourse.ts"),

		...prefix('admin', [
			route('workouts/workout/:workout', 'routes/api/admin/workouts.ts'),
		]),
		...prefix('theme', [
			route('change', 'routes/api/theme/change.ts')
		])
	])
] satisfies RouteConfig;
