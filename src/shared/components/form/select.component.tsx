import "@/shared/styles/form/select.css";
import { IoIosArrowDown } from "react-icons/io";
import { twMerge } from "tailwind-merge";

interface Props {
	classNameContainer?: string;
	className?: string;
	name: string;
	value: string;
	onChange?: React.ChangeEventHandler<HTMLSelectElement>;
	onBlur?: React.FocusEventHandler<HTMLSelectElement>;
	data: { id: string; name: string }[];
}

export const Select = ({
	className = "",
	classNameContainer = "",
	name,
	value,
	onBlur,
	onChange,
	data,
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
				{data.map((el) => (
					<option value={el.id} key={el.id}>
						{el.name}
					</option>
				))}
			</select>

			<IoIosArrowDown className="select__icon" />
		</div>
	);
};
