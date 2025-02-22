import React from 'react'
import { Outlet, useNavigation } from 'react-router'
import Navbar from '../admin/Navbar'
import Sidebar from '../admin/Sidebar'
import { SiteHeader } from '../site-header'

const AdminLayout = () => {
	const nav = useNavigation()
	return (
		<div className='bg-admin-layout-background '>
			<Sidebar header={<SiteHeader />} className='bg-admin-background'>
				{nav.state === 'loading' && <AdminLoading />}
				{nav.state === 'idle' &&
					<Outlet />
				}
			</Sidebar>
		</div>
	)
}

const AdminLoading = () => {
	return (
		<div className='flex justify-center items-center h-screen w-full'>
			<div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-admin-primary'></div>
		</div>
	)
}


export default AdminLayout