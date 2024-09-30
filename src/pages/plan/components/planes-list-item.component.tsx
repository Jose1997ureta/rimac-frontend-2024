import { useAuthContext } from "@/shared/hooks";
import { useNavigate } from "react-router-dom";
import { DataPlanProps } from "../interfaces/plan.interface";

interface Props {
	index: number;
	item: DataPlanProps;
}

export const PlanesListItemComponent = ({ index, item }: Props) => {
	const navigate = useNavigate();
	const { handleUpdateUser } = useAuthContext();

	const handleSelectPlan = () => {
		const parameter = {
			name: item.name,
			price: item.price || item.priceBase,
		};

		handleUpdateUser({
			plan: parameter,
		});
		navigate("/resumen");
	};

	return (
		<div
			className="w-[288px] border-white bg-white
   rounded-3xl px-8 pt-[68px] pb-12 relative flex flex-col justify-between gap-y-6 flex-shrink-0"
			style={{
				boxShadow: "0px 1px 32px 0px rgba(174, 172, 243, 0.35)",
			}}
		>
			{index === 1 ? (
				<div className="absolute top-10 left-[32px] bg-[#7DF0BA] rounded-md flex justify-center items-center">
					<p className="text-sm font-black py-0.5 px-2 text-text">
						Plan recomendado
					</p>
				</div>
			) : null}
			<div>
				<div className="flex items-start justify-between gap-x-4">
					<div>
						<p className="text-2xl font-black text-text mb-6">{item.name}</p>
						<p className="text-xs font-black text-secondary-500 mb-1 uppercase">
							COSTO DEL PLAN
						</p>
						{item.priceBase ? (
							<p className="my-1 text-sm text-secondary-500 line-through">
								${item.priceBase} antes
							</p>
						) : null}
						<p className="text-xl font-black text-text">${item.price} al mes</p>
					</div>
					{index === 1 ? (
						<img src="/images/IcHospitalLight.svg" alt="" />
					) : (
						<img src="/images/IcHomeLight.svg" alt="" />
					)}
				</div>

				<div className="h-[1px] w-full bg-[#D7DBF5] my-6" />

				<ul className="flex flex-col gap-y-6">
					{item.description.map((d, i) => (
						<li className="list-disc ml-[18px] text-text" key={i}>
							{d}
						</li>
					))}
				</ul>
			</div>

			<button
				className="rounded-[32px] bg-[#FF1C44] text-lg leading-5 text-white w-full flex justify-center items-center py-3.5"
				onClick={handleSelectPlan}
			>
				Seleccionar Plan
			</button>
		</div>
	);
};
