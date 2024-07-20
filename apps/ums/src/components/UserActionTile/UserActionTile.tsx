import React, { forwardRef } from 'react';
import { Button } from '@repo/ui/components';

function UserActionTile(
	{
		children,
		actionLabel = 'Action',
		...restProps
	}: {
		children?: React.ReactNode;
		actionLabel?: string;
	},
	ref: React.ForwardedRef<HTMLButtonElement>
): JSX.Element {
	return (
		<Button
			className='flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted-foreground hover:text-white '
			ref={ref}
			variant='secondary'
			{...restProps}
		>
			{children}
			<span>{actionLabel}</span>
		</Button>
	);
}

const UserActionTileWithForwardRef = forwardRef(UserActionTile);

export { UserActionTileWithForwardRef as UserActionTile };
