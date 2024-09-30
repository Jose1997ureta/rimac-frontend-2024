import { FaCheck } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { DataTypePlanProps } from "../interfaces/plan.interface";

interface Props {
	typePlan: number;
	onClick: () => void;
	item: DataTypePlanProps;
}

export const PlanTypeComponent = ({ typePlan, onClick, item }: Props) => {
	return (
		<div
			className={twMerge(
				"md:w-[256px] w-full h-[212px]bg-white rounded-3xl relative py-10 px-6 cursor-pointer",
				typePlan === item.id ? "border-[3px] border-third" : " "
			)}
			style={{
				boxShadow: "0px 1px 32px 0px #AEACF359",
			}}
			onClick={onClick}
		>
			<div
				className={twMerge(
					"absolute top-4 right-6 w-6 h-6 rounded-full flex items-center justify-center",
					typePlan === item.id ? "bg-green-500" : "border border-secondary-400"
				)}
			>
				{typePlan === item.id ? (
					<FaCheck className={"w-4 h-4 fill-white"} />
				) : null}
			</div>

			<div>
				<img src={item.img} alt="" />

				<p className="text-xl font-bold text-text my-2">{item.name}</p>
				<p className="text-xs text-text leading-[20px]">{item.description}</p>
			</div>
		</div>
	);
};
