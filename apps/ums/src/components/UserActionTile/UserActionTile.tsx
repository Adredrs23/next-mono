import { Button } from '@/components/Atoms';
import React from 'react';

const UserActionTile = (
	{
		children,
		actionLabel = 'Action',
		...restProps
	}: {
		children?: React.ReactNode;
		actionLabel?: string;
	},
	ref: React.ForwardedRef<HTMLButtonElement>
) => {
	return (
		<Button
			variant="secondary"
			className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted-foreground hover:text-white "
			ref={ref}
			{...restProps}
		>
			{children}
			<span>{actionLabel}</span>
		</Button>
	);
};

const UserActionTileWithForwardRef = React.forwardRef(UserActionTile);
export { UserActionTileWithForwardRef as UserActionTile };
