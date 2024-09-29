import { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../../../shared/hooks/use-general.context";
import { planService } from "../services/plan.service";

interface Props {
	idType: number;
}

interface DataPlanProps {
	name: string;
	price: number;
	description: string[];
	age: number;
}

export const PlanesListComponent = ({ idType }: Props) => {
	const { authContext } = useAuthContext();

	const [dataPlanes, setDataPlanes] = useState<DataPlanProps[]>([]);

	const loadPlans = useCallback(async () => {
		if (idType === 0) return;

		const { error, rpta } = await planService.getPlans();

		if (error) console.log(error);

		if (rpta?.status === 200) {
			const data = rpta.data.list as DataPlanProps[];

			const nowYear = new Date().getFullYear();
			const birthYear = new Date(authContext?.birthDay || "").getFullYear();

			const age = nowYear - birthYear;

			const dataFilter = data
				.filter((el) => el.age >= age)
				.map((el) => {
					return {
						...el,
						price:
							idType === 2
								? Number(Math.round(el.price * 0.95).toFixed(2))
								: el.price,
					};
				});

			setDataPlanes(dataFilter);
		}
	}, [authContext?.birthDay, idType]);

	useEffect(() => {
		loadPlans();
	}, [loadPlans]);

	return (
		<div className="flex gap-x-8">
			{dataPlanes.map((el, index) => (
				<div
					className="w-[288px] border-white bg-white
   rounded-3xl px-8 pt-[68px] pb-12 relative"
					key={index}
					style={{
						boxShadow: "0px 1px 32px 0px rgba(174, 172, 243, 0.35)",
					}}
				>
					{index === 1 ? (
						<div className="absolute top-10 left-[32px] bg-[#7DF0BA] rounded-md flex justify-center items-center">
							<p className="text-sm font-bold py-0.5 px-2">Plan recomendado</p>
						</div>
					) : null}
					<div className="flex items-start justify-between gap-x-4">
						<div>
							<p className="text-2xl font-bold text-text mb-6">{el.name}</p>
							<p className="text-xs font-bold text-[#7981B2] mb-1 uppercase">
								COSTO DEL PLAN
							</p>
							<p className="text-xl font-bold text-text">${el.price} al mes</p>
						</div>
						{index === 1 ? (
							<img src="/images/IcHospitalLight.svg" alt="" />
						) : (
							<img src="/images/IcHomeLight.svg" alt="" />
						)}
					</div>

					<div className="h-[1px] w-full bg-[#D7DBF5] my-6" />

					<ul className="flex flex-col gap-y-6">
						{el.description.map((d) => (
							<li className="list-disc ml-[18px]" key={d}>
								{d}
							</li>
						))}
					</ul>

					<button className="rounded-[32px] bg-[#FF1C44] text-lg text-white w-full flex justify-center items-center mt-[54px] py-3.5">
						{" "}
						Seleccionar Plan
					</button>
				</div>
			))}
		</div>
	);
};
