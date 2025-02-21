import { SidebarInset, SidebarProvider, SidebarTrigger } from '../ui/sidebar'
import { AppSidebar } from '../app-sidebar'

import { SiteHeader } from '../site-header'
import type { FC } from 'react'
import { Outlet } from 'react-router'
type SidebarProps = {
	children?: React.ReactNode
	header?: React.ReactNode
	className?: string
}
const Sidebar: FC<SidebarProps> = ({ children, header, className }) => {
	return (
		<div className="[--header-height:calc(theme(spacing.14))]">
			<SidebarProvider className="flex flex-col">
				{header}
				<div className="flex flex-1">
					<AppSidebar className={className} />
					<SidebarInset>
						{children}
					</SidebarInset>
				</div>
			</SidebarProvider>
		</div>
	)
}

export default Sidebar