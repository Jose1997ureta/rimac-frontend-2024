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
		.matches(/^[0-9]+$/, "Debe ser un número válido")
		.required("El campo es requerido"),
	isPrivacidad: Yup.boolean().oneOf(
		[true],
		"Debes aceptar la política de privacidad"
	),
	isComunication: Yup.boolean().oneOf(
		[true],
		"Debes aceptar recibir comunicaciones"
	),
});
