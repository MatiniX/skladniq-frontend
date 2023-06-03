export type User = {
	sub: string;
	email: string;
	roles: string[];
	organizationId: string;
	iat: number;
	exp: string;
};
