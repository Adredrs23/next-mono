import { type Meta, type StoryObj } from '@storybook/react';
import { Progress } from '../components/progress';

const meta: Meta<typeof Progress> = {
	title: 'ui/Progress',
	component: Progress,
	tags: ['autodocs'],
	argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Progress>;

export const Base: Story = {
	render: (args) => <Progress value={33} />,
	args: {},
};
