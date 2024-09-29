import Cookies from "js-cookie";

const getCookie = (name: string) => {
	try {
		const auth = Cookies.get(name);

		return auth;
	} catch (error) {
		console.log(error);
	}
};

const setCookie = (name: string, payload: string) => {
	Cookies.set(name, payload);
};

const removeCookie = (name: string) => {
	Cookies.remove(name);
};

export const Cookie = {
	getCookie,
	setCookie,
	removeCookie,
};
