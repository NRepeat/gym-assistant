import React from 'react'
import ToggleThemeButton from './ToggleThemeButton'
import { Link } from 'react-router'

const Navbar = ({ theme }: { theme: string }) => {
	return (
		<div className='w-full inline-flex bg-background px-2 rounded-md items-center	justify-between py-2 sticky	top-0  shadow-md z-10'>
			<Link to={'/'} className='text-2xl'>Gym </Link>
			<ToggleThemeButton theme={theme} />
		</div>
	)
}

export default Navbar