'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Package2, PanelLeft, Search, Users2 } from 'lucide-react';
import {
	Sheet,
	SheetContent,
	SheetTrigger,
	Input,
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@repo/ui/components';

export function MobileHeader(): JSX.Element {
	return (
		<header className='sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6'>
			<Sheet>
				<SheetTrigger asChild>
					<Button className='sm:hidden' size='icon' variant='outline'>
						<PanelLeft className='h-5 w-5' />
						<span className='sr-only'>Toggle Menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent className='sm:max-w-xs' side='left'>
					<nav className='grid gap-6 text-lg font-medium'>
						<Link
							className='group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base'
							href='#'
						>
							<Package2 className='h-5 w-5 transition-all group-hover:scale-110' />
							<span className='sr-only'>Acme Inc</span>
						</Link>

						<Link
							className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
							href='#'
						>
							<Users2 className='h-5 w-5' />
							Customers
						</Link>
					</nav>
				</SheetContent>
			</Sheet>

			<div className='relative ml-auto flex-1 md:grow-0'>
				<Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
				<Input
					className='w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]'
					placeholder='Search...'
					type='search'
				/>
			</div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						className='overflow-hidden rounded-full'
						size='icon'
						variant='outline'
					>
						<Image
							alt='Avatar'
							className='overflow-hidden rounded-full'
							height={36}
							src='/next.svg'
							width={36}
						/>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>Settings</DropdownMenuItem>
					<DropdownMenuItem>Support</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem>Logout</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</header>
	);
}
