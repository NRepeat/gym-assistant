import { data, type ActionFunctionArgs } from "react-router";
import { commitSession, getSession } from "~/sessions/cookies-session.server";
export async function action({
	request,
}: ActionFunctionArgs) {
	const session = await getSession(
		request.headers.get("Cookie")
	);
	const fromData = await request.formData()
	const theme = fromData.get("theme")
	session.set("theme", theme?.toString() ?? "system");
	return data("/", {
		headers: {
			"Set-Cookie": await commitSession(session),
		},
	});

}