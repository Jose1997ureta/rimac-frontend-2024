import "./styles/plan.style.css";
import { useState } from "react";
import { ContainerLayout } from "../../shared/layout";
import { twMerge } from "tailwind-merge";
import { IoIosArrowDropleft } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { useAuthContext } from "../../shared/hooks/use-general.context";
import { PlanesListComponent } from "./components/planes-list.component";

const DataProgress = [
	{
		id: 1,
		name: "Planes y coberturas",
	},
	{
		id: 2,
		name: "Resumen",
	},
];

const DataType = [
	{
		id: 1,
		name: "Para mi",
		description:
			"Cotiza tu seguro de salud y agrega familiares si así lo deseas.",
		img: "/images/IcProtectionLight.svg",
	},
	{
		id: 2,
		name: "Para alguien más",
		description:
			"Realiza una cotización para uno de tus familiares o cualquier persona.",
		img: "/images/IcAddUserLight.svg",
	},
];

export const PlanPage = () => {
	const { authContext } = useAuthContext();
	const [activeProgress, setActiveProgress] = useState<number>(1);

	const [typePlan, setTypePlan] = useState<number>(0);

	return (
		<ContainerLayout>
			<section>
				<div className="bg-[#EDEFFC] py-4 w-full flex justify-center">
					<div className="w-[80%] flex justify-center gap-x-4">
						{DataProgress.map((el) => (
							<div className="flex items-center gap-x-4" key={el.id}>
								<div
									className={twMerge(
										"w-6 h-6 rounded-full flex items-center justify-center",
										activeProgress === el.id
											? "bg-[#4F4FFF]"
											: "border border-[#7981B2]"
									)}
								>
									<p
										className={twMerge(
											"text-sm leading-[1px]",
											activeProgress === el.id
												? "text-white "
												: "text-[#7981B2]"
										)}
									>
										{el.id}
									</p>
								</div>
								<p
									className={twMerge(
										"text-base  text-text",
										activeProgress === el.id
											? "text-text font-bold"
											: "text-[#7981B2]"
									)}
								>
									{el.name}
								</p>

								{el.id !== DataProgress.length ? (
									<div className="flex items-center gap-x-1">
										{[...Array(4)].map((el) => (
											<div
												key={el}
												className="w-2 bg-[#4F4FFF] h-0.5 rounded-full"
											/>
										))}
									</div>
								) : null}
							</div>
						))}
					</div>
				</div>

				<div className="max-w-[928px] py-[40px]  h-full mx-auto">
					<div className="flex items-center gap-x-2">
						<IoIosArrowDropleft className="fill-secondary w-5 h-5" />
						<p className="text-lg text-secondary font-bold">Volver</p>
					</div>

					<div className=" mx-auto max-w-[554px] mt-14 mb-5">
						<div className="mb-8 text-center">
							<p className="font-bold text-[40px] leading-[48px] text-text">
								{authContext?.name} ¿Para quién deseas cotizar?
							</p>

							<p className="text-text text-base mt-2">
								Selecciona la opción que se ajuste más a tus necesidades.
							</p>
						</div>

						<div className="flex items-center justify-between">
							{DataType.map((el) => (
								<div
									className={twMerge(
										"w-[256px] h-[212px]bg-white rounded-3xl relative py-10 px-6 cursor-pointer",
										typePlan === el.id ? "border-[3px] border-third" : " "
									)}
									key={el.id}
									style={{
										boxShadow: "0px 1px 32px 0px #AEACF359",
									}}
									onClick={() => setTypePlan(el.id)}
								>
									<div
										className={twMerge(
											"absolute top-4 right-6 w-6 h-6 rounded-full flex items-center justify-center",
											typePlan === el.id
												? "bg-green-500"
												: "border border-[#A9AFD9]"
										)}
									>
										{typePlan === el.id ? (
											<FaCheck className={"w-4 h-4 fill-white"} />
										) : null}
									</div>

									<div>
										<img src={el.img} alt="" />

										<p className="text-xl font-bold text-text my-2">
											{el.name}
										</p>
										<p className="text-xs text-text leading-[20px]">
											{el.description}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="max-w-[928px] mx-auto">
						<PlanesListComponent idType={typePlan} />
					</div>
				</div>
			</section>
		</ContainerLayout>
	);
};
