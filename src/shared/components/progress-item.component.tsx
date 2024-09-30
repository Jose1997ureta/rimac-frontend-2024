import { twMerge } from "tailwind-merge";
import { DataPlan } from "../../pages/plan/constants/data";
import { useLocation } from "react-router-dom";

interface Props {
	item: {
		id: number;
		name: string;
	};
	activeProgress: number;
}

export const ProgressItemComponent = ({ item, activeProgress }: Props) => {
	const location = useLocation();

	return (
		<div className="flex items-center gap-x-4">
			<div
				className={twMerge(
					"w-6 h-6 rounded-full flex items-center justify-center",
					activeProgress === item.id
						? "bg-secondary-700"
						: "border border-secondary-500"
				)}
			>
				<p
					className={twMerge(
						"text-sm leading-[1px]",
						activeProgress === item.id ? "text-white " : "text-secondary-500"
					)}
				>
					{item.id}
				</p>
			</div>
			<p
				className={twMerge(
					"text-base  text-text",
					activeProgress === item.id
						? "text-text font-bold"
						: "text-secondary-500"
				)}
			>
				{item.name}
			</p>

			{item.id !== DataPlan.progress.length ? (
				<div className="flex items-center gap-x-1">
					{[...Array(4)].map((_, index) => (
						<div
							key={index}
							className={twMerge(
								"w-2 h-0.5 rounded-full",
								location.pathname === "/resumen"
									? "bg-secondary-500"
									: "bg-secondary-700"
							)}
						/>
					))}
				</div>
			) : null}
		</div>
	);
};
