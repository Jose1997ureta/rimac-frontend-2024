import { MouseEvent } from "react";
import { LuLoader2 } from "react-icons/lu";
import { twMerge } from "tailwind-merge";

interface Props {
	text: string;
	onClick: (e: MouseEvent<HTMLButtonElement>) => void;
	loading?: boolean;
	disabled?: boolean;
}

export const ButtonComponent = ({
	text,
	onClick,
	disabled,
	loading,
}: Props) => {
	const classLoading = twMerge("animate-spin fill-transparent w-6 h-6");

	return (
		<button
			className="appearance-none py-5 px-10 w-full md:w-fit text-white text-xl font-bold flex justify-center items-center bg-third rounded-[40px] gap-2"
			onClick={onClick}
			disabled={disabled}
		>
			{text}

			{loading ? <LuLoader2 className={classLoading} /> : null}
		</button>
	);
};
