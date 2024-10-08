import { useFormik } from "formik";
import { ButtonComponent, CheckBox, Input, Select } from "@/shared/components";
import { initialValuesFormik, validationSchema } from "../formik/home.formik";
import { twMerge } from "tailwind-merge";
import { useAuthContext } from "@/shared/hooks";
import { homeService } from "../services/home.service";
import { Data } from "@/shared/constants/data";
import { useState } from "react";

export const FormHomeComponent = () => {
	const { handleSaveAuth } = useAuthContext();
	const [loading, setLoading] = useState<boolean>(false);

	const {
		values,
		handleBlur,
		handleChange,
		errors,
		touched,
		handleSubmit,
		setFieldValue,
		setFieldError,
	} = useFormik({
		initialValues: initialValuesFormik,
		validationSchema: validationSchema,
		onSubmit: () => handleLogin(),
	});

	const hadleChangeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
		handleChange(e);

		setFieldValue("nro_document", "");
	};

	const handleLogin = async () => {
		try {
			setLoading(true);
			if (
				values.phone !== "987654321" ||
				values.nro_document !== "12141516" ||
				values.type_document !== "dni"
			) {
				setFieldError("phone", " ");
				setFieldError("nro_document", " ");
				return;
			}

			const { rpta, error } = await homeService.getUser();

			if (error) console.log(error);

			if (rpta?.status === 200) {
				const parameter = {
					nro_document: values.nro_document,
					type_document: values.type_document,
					phone: values.phone,

					name: rpta.data.name ?? "",
					lastName: rpta.data.lastName ?? "",
					birthDay: rpta.data.birthDay ?? "",
				};

				handleSaveAuth(parameter);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="mt-6">
			<div className="mb-4">
				<div className="flex items-center">
					<Select
						classNameContainer="w-[140px]"
						className="rounded-tr-none rounded-br-none"
						name="type_document"
						value={values.type_document}
						onChange={hadleChangeType}
						data={Data.typeDocument}
					/>
					<Input
						value={values.nro_document}
						className={twMerge(
							"rounded-tl-none rounded-bl-none",
							errors.nro_document &&
								touched.nro_document &&
								"border-red-500 text-red-500"
						)}
						classNameContainer="flex-1 ml-[-1px]"
						pattern="number"
						onChange={handleChange}
						onBlur={handleBlur}
						name="nro_document"
						maxLength={11}
						label="Nro. de documento"
					/>
				</div>

				{touched.nro_document && (
					<p className="text-red-500 text-xs mt-1.5">{errors.nro_document}</p>
				)}
			</div>

			<Input
				name="phone"
				value={values.phone}
				error={errors.phone}
				touched={touched.phone}
				classNameContainer="mb-6"
				pattern="number"
				onChange={handleChange}
				onBlur={handleBlur}
				maxLength={9}
				label="Celular"
			/>

			<CheckBox
				id="privacidad"
				onChange={(state) => setFieldValue("isPrivacidad", state)}
				value={values.isPrivacidad}
				label="Acepto lo Política de Privacidad"
				error={errors.isPrivacidad}
				touched={touched.isPrivacidad}
				classNameContainer="mb-3"
			/>

			<CheckBox
				id="politica"
				onChange={(state) => setFieldValue("isComunication", state)}
				value={values.isComunication}
				label="Acepto la Política Comunicaciones Comerciales"
				error={errors.isComunication}
				touched={touched.isComunication}
			/>

			<a className="link__terminos" href="" onClick={(e) => e.preventDefault()}>
				Aplican Términos y Condiciones.
			</a>

			<ButtonComponent
				text="Cotiza aquí"
				onClick={() => handleSubmit()}
				loading={loading}
				disabled={loading}
			/>
		</div>
	);
};
