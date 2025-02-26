export const pagination = (page: number, limit: number, total: number) => {
	const offset = (page - 1) * limit;
	const totalPages = Math.ceil(total / limit);
	return { offset, totalPages };
}