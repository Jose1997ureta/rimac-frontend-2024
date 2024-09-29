import { NameCookie } from "../../constants/core";
import { Cookie } from "../../functions/cookies";
import { jwtVerify } from "jose";

export const GetUserAuthContext = async (secretKey: Uint8Array) => {
	const token = Cookie.getCookie(NameCookie.AuthCookie) || "";

	const { payload } = await jwtVerify(token, secretKey);

	return payload;
};

export const GetTokenAuthContext = () => {
	const token = Cookie.getCookie(NameCookie.AuthCookie);

	return token as string;
};
