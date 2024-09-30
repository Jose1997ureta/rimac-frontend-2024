import * as Yup from "yup";

export const initialValuesFormik = {
	type_document: "dni",
	nro_document: "",
	phone: "",
	isPrivacidad: false,
	isComunication: false,
};

export const validationSchema = Yup.object().shape({
	nro_document: Yup.string().required("El campo es requerido"),
	phone: Yup.string()
		.required("El campo es requerido")
		.min(9, "No es un número valido"),
	isPrivacidad: Yup.boolean().oneOf(
		[true],
		"Debes aceptar la política de privacidad"
	),
	isComunication: Yup.boolean().oneOf(
		[true],
		"Debes aceptar recibir comunicaciones"
	),
});
