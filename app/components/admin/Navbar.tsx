import React from 'react'
import { Link } from 'react-router'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../ui/breadcrumb'
import { Slash } from 'lucide-react'

const Navbar = () => {
	return (
		<div className='flex	 items-center h-12  border-b-2	border-admin-primary-muted'>

			<Breadcrumb className='pl-8'>
				<BreadcrumbList>
					<BreadcrumbItem >
						<BreadcrumbLink className=' ' href="/">Home</BreadcrumbLink>
					</BreadcrumbItem>

					<BreadcrumbSeparator>
						<Slash className='-rotate-12' />
					</BreadcrumbSeparator>
					<BreadcrumbItem>
						<BreadcrumbPage>Breadcrumb</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
		</div>
	)
}

export default Navbar