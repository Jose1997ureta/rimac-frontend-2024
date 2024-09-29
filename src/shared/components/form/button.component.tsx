import { MouseEvent } from "react";

interface Props {
	text: string;
	onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const ButtonComponent = ({ text, onClick }: Props) => {
	return (
		<button
			className="appearance-none py-5 px-10 w-full md:w-fit text-white text-xl font-bold flex justify-center items-center bg-third rounded-[40px]"
			onClick={onClick}
		>
			{text}
		</button>
	);
};
