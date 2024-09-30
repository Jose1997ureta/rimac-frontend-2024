import { LuLoader2 } from "react-icons/lu";
import { twMerge } from "tailwind-merge";
interface Props {
	className?: string;
	classNameIcon?: string;
}

export const Loading = ({ className, classNameIcon }: Props) => {
	return (
		<div
			className={twMerge(
				"absolute left-0 top-0 flex h-full w-full items-center justify-center",
				className
			)}
		>
			<LuLoader2
				className={twMerge(
					"animate-spin fill-transparent stroke-text stroke-1 w-10 h-10",
					classNameIcon
				)}
			/>
		</div>
	);
};
