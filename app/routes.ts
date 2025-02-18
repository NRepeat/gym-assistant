import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
	layout('./components/layouts/Main.tsx', [
		index("routes/home.tsx"),
		route('/muscle/list', 'routes/muscle-list.tsx', [
		]),
		route('/workout/muscle/:muscleId/list', 'routes/muscle-exercise-list.tsx'),
		route("/workout/muscle/:muscleId/list/exercise/:exerciseId", "routes/exercise.tsx",),
	]),
	route('/automator/register', 'routes/register.ts'),
	...prefix('api', [
		route("/assets/images/:slug", "routes/api/recourse/images-recourse.ts"),

		...prefix('theme', [
			route('change', 'routes/api/theme/change.ts')
		])
	])
] satisfies RouteConfig;
