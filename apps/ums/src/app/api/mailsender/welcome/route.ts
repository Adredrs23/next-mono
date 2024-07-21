import { Resend } from 'resend';
import { WelcomeEmail } from '@/components';
import { type WelcomeEmailProps } from './types';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request): Promise<Response> {
	try {
		const { username } = (await req.json()) as WelcomeEmailProps;

		const { data, error } = await resend.emails.send({
			from: 'The DayOwls <onboarding@resend.dev>',
			to: ['adredars@gmail.com'],
			subject: 'Hello world again!',
			react: WelcomeEmail({ username }) as React.ReactElement,
		});

		if (error) {
			return Response.json({ error }, { status: 500 });
		}

		return Response.json(data);
	} catch (error) {
		return Response.json({ error }, { status: 500 });
	}
}
