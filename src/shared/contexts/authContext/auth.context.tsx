import React, { ReactNode, useEffect, useState } from "react";
import {
	AuthContextProps,
	InitialValueAuthProps,
} from "./authContext.interface";
import { SignJWT } from "jose";
import { KeyJWT, NameCookie } from "../../constants/core";
import { Cookie } from "../../functions/cookies";
import {
	GetTokenAuthContext,
	GetUserAuthContext,
} from "./auth.context.functions";

const initialValues: AuthContextProps = {
	authContext: null,
	tokenContext: "",
	handleSaveAuth: () => {},
	handleRemoveAuth: () => {},
};

export const AuthContext = React.createContext<AuthContextProps>(initialValues);

const secretKey = new TextEncoder().encode(KeyJWT.AuthJWT);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<InitialValueAuthProps | null>(null);
	const [token, setToken] = useState<string>(GetTokenAuthContext() || "");

	useEffect(() => {
		const load = async () => {
			const payload: InitialValueAuthProps | any = await GetUserAuthContext(
				secretKey
			);

			setUser(payload);
		};

		load();
	}, []);

	const handleSaveAuth = async (userValue: InitialValueAuthProps) => {
		const jwt = await new SignJWT(userValue as any)
			.setProtectedHeader({ alg: "HS256" })
			.setExpirationTime("1h")
			.sign(secretKey);

		Cookie.setCookie(NameCookie.AuthCookie, jwt);

		setUser(userValue);
		setToken(jwt);
	};

	const handleRemoveAuth = async () => {
		Cookie.removeCookie(NameCookie.AuthCookie);

		setUser(null);
		setToken("");
	};

	const valueContext: AuthContextProps = {
		authContext: user,
		tokenContext: token,
		handleSaveAuth,
		handleRemoveAuth,
	};

	return (
		<AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
	);
};
