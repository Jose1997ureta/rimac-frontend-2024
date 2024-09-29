export interface AuthContextProps {
	authContext: InitialValueAuthProps | null;
	tokenContext: string;
	handleSaveAuth: (userValue: InitialValueAuthProps) => void;
	handleRemoveAuth: () => void;
}

export interface InitialValueAuthProps extends InitialValueUserProps {
	nro_document: string;
	type_document: string;
	phone: string;
}

export interface InitialValueUserProps {
	name: string;
	lastName: string;
	birthDay: string;
}
