import { createCookieSessionStorage } from "react-router";

type SessionData = {
	userId: string;
	theme: string;
};

type SessionFlashData = {
	error: string;
};


const { getSession, commitSession, destroySession } =
	createCookieSessionStorage<SessionData, SessionFlashData>(
		{
			// a Cookie from `createCookie` or the CookieOptions to create one
			cookie: {
				name: "__session",


				// Expires can also be set (although maxAge overrides it when used in combination).
				// Note that this method is NOT recommended as `new Date` creates only one date on each server deployment, not a dynamic date in the future!
				//
				// expires: new Date(Date.now() + 60_000),
				httpOnly: true,
				maxAge: 60,
				path: "/",
				sameSite: "lax",
				secrets: [process.env.VITE_SESSION_SECRET!],
				secure: true,
			},
		}
	);

export { getSession, commitSession, destroySession };
