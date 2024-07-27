import { type Meta, type StoryObj } from '@storybook/react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../components/card';

const meta: Meta<typeof Card> = {
	title: 'ui/Card',
	component: Card,
	tags: ['autodocs'],
	argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Base: Story = {
	render: (args) => (
		<Card {...args}>
			<CardHeader>
				<CardTitle>Card Title</CardTitle>
				<CardDescription>Card Description</CardDescription>
			</CardHeader>
			<CardContent>
				<p>Card Content</p>
			</CardContent>
			<CardFooter>
				<p>Card Footer</p>
			</CardFooter>
		</Card>
	),
	args: {},
};
