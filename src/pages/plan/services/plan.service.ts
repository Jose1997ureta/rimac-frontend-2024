import { httpClient } from "../../../shared/services/api.config";

const getPlans = async () => {
	return await httpClient({
		url: `/plans.json`,
		method: "GET",
	});
};

export const planService = {
	getPlans: getPlans,
};
