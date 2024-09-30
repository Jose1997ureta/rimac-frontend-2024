import React, { ReactNode, useEffect, useState } from "react";
import {
	AuthContextProps,
	InitialValueAuthProps,
	InitialValueUserProps,
} from "./authContext.interface";
import { jwtVerify, SignJWT } from "jose";
import { KeyJWT, NameCookie } from "../../constants/core";
import Cookies from "js-cookie";

const initialValues: AuthContextProps = {
	authContext: null,
	tokenContext: "",
	handleSaveAuth: () => {},
	handleRemoveAuth: () => {},
	handleUpdateUser: () => {},
};

export const AuthContext = React.createContext<AuthContextProps>(initialValues);

const secretKey = new TextEncoder().encode(KeyJWT.AuthJWT);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<InitialValueAuthProps | null>(null);
	const [token, setToken] = useState<string>("");

	useEffect(() => {
		const load = async () => {
			try {
				const token = Cookies.get(NameCookie.AuthCookie);

				if (token) {
					const { payload } = await jwtVerify(token, secretKey);

					const parameter = {
						birthDay: payload.birthDay ?? "",
						lastName: payload.lastName ?? "",
						name: payload.name ?? "",
						nro_document: payload.nro_document ?? "",
						phone: payload.phone ?? "",
						type_document: payload.type_document ?? "",
					} as InitialValueAuthProps;

					setUser(parameter);
					setToken(token);
				}
			} catch (error) {
				console.log(error);
				handleRemoveAuth();
			}
		};

		load();
	}, []);

	const handleSaveAuth = async (userValue: InitialValueAuthProps) => {
		const jwt = await new SignJWT(userValue as any)
			.setProtectedHeader({ alg: "HS256" })
			.setExpirationTime("1h")
			.sign(secretKey);

		Cookies.set(NameCookie.AuthCookie, jwt);

		setUser(userValue);
		setToken(jwt);
	};

	const handleUpdateUser = (parameter: Partial<InitialValueUserProps>) => {
		const value = {
			...user,
			...parameter,
		};

		setUser(value as InitialValueAuthProps);
	};

	const handleRemoveAuth = async () => {
		Cookies.remove(NameCookie.AuthCookie);

		setUser(null);
		setToken("");
	};

	const valueContext: AuthContextProps = {
		authContext: user,
		tokenContext: token,
		handleSaveAuth,
		handleRemoveAuth,
		handleUpdateUser,
	};

	return (
		<AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
	);
};
