export const exactlyNYearsAgoDate = (yearsAgo: number): Date =>
	new Date(new Date().setFullYear(new Date().getFullYear() - yearsAgo));

export const getInitials = (nameForInitials: string): string => {
	const names = nameForInitials.split(' ');
	return names.map((n) => n.charAt(0)).join('');
};
