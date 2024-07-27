import { type Meta, type StoryObj } from '@storybook/react';
import {
	Sheet,
	SheetTrigger,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetDescription,
} from '../components/sheet';

const meta: Meta<typeof Sheet> = {
	title: 'ui/Sheet',
	component: Sheet,
	tags: ['autodocs'],
	argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Sheet>;

export const Base: Story = {
	render: (args) => (
		<Sheet {...args}>
			<SheetTrigger>Open</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Are you absolutely sure?</SheetTitle>
					<SheetDescription>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	),
	args: {},
};

export const Left: Story = {
	render: (args) => (
		<Sheet {...args}>
			<SheetTrigger>Open</SheetTrigger>
			<SheetContent side='left'>
				<SheetHeader>
					<SheetTitle>Are you absolutely sure?</SheetTitle>
					<SheetDescription>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	),
	args: {},
};

export const Top: Story = {
	render: (args) => (
		<Sheet {...args}>
			<SheetTrigger>Open</SheetTrigger>
			<SheetContent side='top'>
				<SheetHeader>
					<SheetTitle>Are you absolutely sure?</SheetTitle>
					<SheetDescription>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	),
	args: {},
};

export const Bottom: Story = {
	render: (args) => (
		<Sheet {...args}>
			<SheetTrigger>Open</SheetTrigger>
			<SheetContent side='bottom'>
				<SheetHeader>
					<SheetTitle>Are you absolutely sure?</SheetTitle>
					<SheetDescription>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	),
	args: {},
};
