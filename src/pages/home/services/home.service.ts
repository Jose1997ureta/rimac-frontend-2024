import { httpClient } from "../../../shared/services/api.config";

const getUser = async () => {
	return await httpClient({
		url: `/user.json`,
		method: "GET",
	});
};

export const homeService = {
	getUser: getUser,
};
