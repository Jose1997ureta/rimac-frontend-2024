import "./styles/plan.style.css";
import { useState } from "react";
import { ContainerLayout } from "../../shared/layout";

import { useAuthContext } from "../../shared/hooks/use-general.context";
import { DataPlan } from "./constants/data";
import { PlanTypeComponent } from "./components/plan-type.component";

import { ButtonBackComponent } from "@/shared/components/button-back.component";
import { ProgressComponent, ProgressMovilComponent } from "@/shared/components";
import { PlanesListContainerComponent } from "./components/planes-list-container.component";

export const PlanPage = () => {
	const { authContext } = useAuthContext();

	const [typePlan, setTypePlan] = useState<number>(0);

	return (
		<ContainerLayout>
			<section className="plan__container">
				<ProgressComponent />
				<ProgressMovilComponent />

				<div className="w-screen md:max-w-[976px] md:py-[40px] py-8 h-full mx-auto">
					<div className="px-6 md:px-0">
						<ButtonBackComponent />

						<div className="mx-auto max-w-[554px] md:mt-14 mb-5">
							{/* NOMBRE DEL USUARIO */}
							<div className="mb-8 md:text-center text-left">
								<p className="font-bold md:text-[40px] text-[28px] leading-[36px] md:leading-[48px] text-text">
									{authContext?.name} ¿Para quién deseas cotizar?
								</p>

								<p className="text-text text-base mt-2">
									Selecciona la opción que se ajuste más a tus necesidades.
								</p>
							</div>

							<div className="flex md:items-center flex-col md:flex-row md:justify-between gap-x-8 gap-y-6">
								{DataPlan.type.map((el) => (
									<PlanTypeComponent
										item={el}
										typePlan={typePlan}
										key={el.id}
										onClick={() => setTypePlan(el.id)}
									/>
								))}
							</div>
						</div>
					</div>
					<PlanesListContainerComponent idType={typePlan} />
				</div>
			</section>
		</ContainerLayout>
	);
};
