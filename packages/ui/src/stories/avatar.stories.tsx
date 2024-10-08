import { type Meta, type StoryObj } from '@storybook/react';
import { Avatar, AvatarFallback, AvatarImage } from '../components/avatar';

const meta: Meta<typeof Avatar> = {
	title: 'ui/Avatar',
	component: Avatar,
	tags: ['autodocs'],
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Base: Story = {
	render: () => (
		<Avatar>
			<AvatarImage src='https://github.com/shadcn.png' />
			<AvatarFallback>CN</AvatarFallback>
		</Avatar>
	),
	args: {},
};
