import { type Meta, type StoryObj } from '@storybook/react';
import { Label } from '../components/label';

const meta: Meta<typeof Label> = {
	title: 'ui/Label',
	component: Label,
	tags: ['autodocs'],
	argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Label>;

export const Base: Story = {
	render: (args) => <Label htmlFor='email'>Your email address</Label>,
	args: {},
};
