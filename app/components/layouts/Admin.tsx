import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../admin/Navbar'
import Sidebar from '../admin/Sidebar'
import { SiteHeader } from '../site-header'

const AdminLayout = () => {
	return (
		<div className='bg-admin-layout-background '>

			<Sidebar header={<SiteHeader />} className='bg-admin-background'>
				<Outlet />
			</Sidebar>
		</div>
	)
}

export default AdminLayout