import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SidePanel, MobileHeader } from '@/components';

import '@repo/ui/styles.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Enix Demo',
	description: 'Demo for Enix',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>): JSX.Element {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<div className='flex min-h-screen w-full flex-col bg-muted/40'>
					<SidePanel />

					<div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
						<MobileHeader />

						<main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-4'>
							{children}
						</main>
					</div>
				</div>
			</body>
		</html>
	);
}
