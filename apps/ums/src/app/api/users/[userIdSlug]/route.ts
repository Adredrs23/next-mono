import { generateResponse } from '@/utlls/responseGenerator';

export async function GET(
	request: Request,
	{ params }: { params: { userIdSlug: string } }
) {
	const userIdSlug = params.userIdSlug;

	try {
		const res = await fetch('http://localhost:3001/userDetails/' + userIdSlug, {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!res.ok) {
			return Response.json(
				generateResponse(res.status, res.statusText, null, false)
			);
		}

		const data = await res.json();
		return Response.json(
			generateResponse(res.status, res.statusText, data, false)
		);
	} catch (error: any) {
		return Response.json(
			generateResponse(500, 'Internal Server Error', null, true)
		);
	}
}
