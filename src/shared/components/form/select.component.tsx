import "../../styles/form/select.css";
import { IoIosArrowDown } from "react-icons/io";
import { twMerge } from "tailwind-merge";

interface Props {
	classNameContainer?: string;
	className?: string;
	name: string;
	value: string;
	onChange?: React.ChangeEventHandler<HTMLSelectElement>;
	onBlur?: React.FocusEventHandler<HTMLSelectElement>;
}

export const Select = ({
	className = "",
	classNameContainer = "",
	name,
	value,
	onBlur,
	onChange,
}: Props) => {
	return (
		<div className={twMerge("select__container", classNameContainer)}>
			<select
				className={twMerge("select rounded-lg", className)}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				name={name}
			>
				<option value="dni">DNI</option>
				<option value="ruc">RUC</option>
			</select>

			<IoIosArrowDown className="select__icon" />
		</div>
	);
};
