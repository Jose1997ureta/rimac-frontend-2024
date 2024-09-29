import { useEffect, useState } from "react";
import "../../styles/form/checkbox.css";
import { twMerge } from "tailwind-merge";

interface Props {
	id: string;
	label: string;
	error?: string;
	touched?: boolean;
	value: boolean;
	onChange: (state: boolean) => void;
	className?: string;
	classNameContainer?: string;
}

export const CheckBox = ({
	id = "checkbox",
	label,
	value,
	onChange,
	error,
	touched,
	className,
	classNameContainer,
}: Props) => {
	const [valueCheck, setValueCheck] = useState<boolean>(false);

	useEffect(() => {
		setValueCheck(value);
	}, [value]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.checked);
	};

	const handleClick = (e: React.MouseEvent) => {
		e.stopPropagation();

		onChange(!valueCheck);
	};

	return (
		<div className={twMerge("checkbox__container", classNameContainer)}>
			<div className="checkbox__info">
				<div className={twMerge("checkbox__input", className)}>
					<input
						id={id}
						type="checkbox"
						checked={valueCheck}
						onChange={handleChange}
						onClick={(e) => e.stopPropagation()}
						className={twMerge(
							"checkbox",
							error && touched && "checkbox__error"
						)}
					/>
					<svg
						className={twMerge("checkbox__svg hidden", valueCheck && "block")}
						onClick={handleClick}
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="#fff"
						stroke-width="3"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<polyline points="20 6 9 17 4 12"></polyline>
					</svg>
				</div>

				<div onClick={handleClick} className="cursor-pointer">
					<p
						className={twMerge(
							" text-sm md:text-xs text-third",
							error && touched && "text-red-500"
						)}
					>
						{label}
					</p>
				</div>
			</div>
		</div>
	);
};
