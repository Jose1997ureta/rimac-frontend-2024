import { twMerge } from "tailwind-merge";
import { DataPlan } from "../constants/data";

interface Props {
	item: {
		id: number;
		name: string;
	};
	activeProgress: number;
}

export const PlanProgressItemComponent = ({ item, activeProgress }: Props) => {
	return (
		<div className="flex items-center gap-x-4">
			<div
				className={twMerge(
					"w-6 h-6 rounded-full flex items-center justify-center",
					activeProgress === item.id
						? "bg-[#4F4FFF]"
						: "border border-[#7981B2]"
				)}
			>
				<p
					className={twMerge(
						"text-sm leading-[1px]",
						activeProgress === item.id ? "text-white " : "text-[#7981B2]"
					)}
				>
					{item.id}
				</p>
			</div>
			<p
				className={twMerge(
					"text-base  text-text",
					activeProgress === item.id ? "text-text font-bold" : "text-[#7981B2]"
				)}
			>
				{item.name}
			</p>

			{item.id !== DataPlan.progress.length ? (
				<div className="flex items-center gap-x-1">
					{[...Array(4)].map((_, index) => (
						<div key={index} className="w-2 bg-[#4F4FFF] h-0.5 rounded-full" />
					))}
				</div>
			) : null}
		</div>
	);
};
