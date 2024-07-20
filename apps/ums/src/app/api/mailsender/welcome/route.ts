import { Resend } from 'resend';

import { WelcomeEmail } from '@/components/EmailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
	try {
		const { data, error } = await resend.emails.send({
			from: 'Acme <onboarding@resend.dev>',
			to: ['adredars@gmail.com'],
			subject: 'Hello world again!',
			react: WelcomeEmail({ userFirstname: 'John' }) as React.ReactElement,
		});

		if (error) {
			return Response.json({ error }, { status: 500 });
		}

		return Response.json(data);
	} catch (error) {
		return Response.json({ error }, { status: 500 });
	}   
}
