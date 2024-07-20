// wrrite a util function to generate response object with status code, statusText, data and error message if any

export function generateResponse(
	statusCode: number,
	message: string,
	data: any,
	error: boolean
) {
	return {
		statusCode,
		message,
		data,
		error,
	};
}
