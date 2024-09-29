import clsx from "clsx";
import {
	FC_ValidatePatterInput,
	PatternInputProps,
} from "../../functions/pattern";
import { twMerge } from "tailwind-merge";

interface Props {
	className?: string;
	classNameContainer?: string;

	error?: string;
	touched?: boolean;

	pattern?: PatternInputProps;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	onBlur?: React.FocusEventHandler<HTMLInputElement>;
	placeholder?: string;
	name?: string;
	value: string;
	maxLength?: number;
}

export const Input = ({
	className = "",
	classNameContainer = "",
	value,
	error,
	name,
	onBlur,
	onChange,
	pattern = "all",
	placeholder,
	touched,
	maxLength,
}: Props) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();

		if (FC_ValidatePatterInput(pattern, e.target.value)) {
			onChange && onChange(e);
		}
	};

	const classInput = clsx(
		"outline-none px-4 py-4 bg-white w-full border border-[#5e6488] text-third rounded-lg",
		{
			"border-red-500 text-red-500": error && touched,
		}
	);

	return (
		<div className={twMerge("relative w-full", classNameContainer)}>
			<input
				className={twMerge(classInput, className)}
				name={name}
				autoComplete="off"
				type="text"
				onChange={handleChange}
				placeholder={placeholder}
				value={value}
				onBlur={onBlur}
				maxLength={maxLength}
			/>

			{error && touched && (
				<p className="text-red-500 text-xs mt-1.5">{error}</p>
			)}
		</div>
	);
};
