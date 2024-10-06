'use client';

import React, { type PropsWithChildren, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { trpc } from './client';

export default function Provider({ children }: PropsWithChildren): JSX.Element {
	// eslint-disable-next-line react/hook-use-state -- not needed setter here
	const [queryClient] = useState(() => new QueryClient());
	// eslint-disable-next-line react/hook-use-state -- not needed setter here
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				httpBatchLink({
					url: 'http://localhost:3000/trpc',
				}),
			],
		})
	);

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</trpc.Provider>
	);
}
