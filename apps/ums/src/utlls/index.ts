export const exactlyNYearsAgoDate = (yearsAgo: number) =>
	new Date(new Date().setFullYear(new Date().getFullYear() - yearsAgo));
