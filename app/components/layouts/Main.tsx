import { type FC } from 'react'
import { data, Outlet, useNavigation, } from 'react-router'
import Navbar from '../shared/Navbar'
import type { Route } from './+types/Main'
import { motion } from "framer-motion";
import { LoaderCircleIcon } from 'lucide-react';
import { commitSession, getSession } from '~/sessions/cookies-session.server';
type MainLayoutProps = Route.ComponentProps

export async function loader({ request }: Route.LoaderArgs) {
	const session = await getSession(
		request.headers.get("Cookie")
	);
	const theme = session.data.theme
	return data(theme, {
		headers: {
			"Set-Cookie": await commitSession(session),
		},
	});
}

const MainLayout: FC<MainLayoutProps> = ({ loaderData }) => {
	const theme = loaderData
	const nav = useNavigation()
	const Loading = () => {
		return (
			nav.state === "loading" && (
				<motion.div
					initial={{ opacity: 0, scale: 1 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 1 }}
					transition={{ duration: 0.4, ease: "linear" }}
					className="fixed inset-0 z-20 flex items-center justify-center backdrop-blur-xs bg-white-100/50"
				>
					<LoaderCircleIcon className='animate-spin h-12 w-12' />
				</motion.div>
			)
		);
	};

	return (

		<div className='px-2.5 py-2 min-h-screen relative'>
			<Loading />
			<Navbar theme={theme!} />
			<Outlet />
		</div>
	)
}

export default MainLayout