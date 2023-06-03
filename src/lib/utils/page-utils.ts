export const isCurrentRoute = (routeId: string | null, routeHref: string) => {
	if (!routeId) return false;
	return routeId.startsWith(routeHref);
};

export const hasRoute = (routeId: string | null, paths: string[]) => {
	let ret = false;

	if (!routeId || !paths.length) return false;
	paths.forEach((p) => {
		if (routeId.includes(p)) {
			ret = true;
		}
	});

	return ret;
};
