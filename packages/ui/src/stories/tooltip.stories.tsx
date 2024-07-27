import { Plus } from 'lucide-react';
import { type Meta, type StoryObj } from '@storybook/react';
import { Button } from '../components/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../components/tooltip';

const meta: Meta<typeof Tooltip> = {
	title: 'ui/Tooltip',
	component: Tooltip,
	tags: ['autodocs'],
	argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Base: Story = {
	render: () => (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button className='w-10 rounded-full p-0' variant='outline'>
					<Plus className='h-4 w-4' />
					<span className='sr-only'>Add</span>
				</Button>
			</TooltipTrigger>
			<TooltipContent>
				<p>Add to library</p>
			</TooltipContent>
		</Tooltip>
	),
	args: {},
};
