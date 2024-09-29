import "./styles/plan.style.css";
import { useState } from "react";
import { ContainerLayout } from "../../shared/layout";

import { IoIosArrowDropleft } from "react-icons/io";
import { useAuthContext } from "../../shared/hooks/use-general.context";
import { PlanesListComponent } from "./components/planes-list.component";
import { DataPlan } from "./constants/data";
import { PlanTypeComponent } from "./components/plan-type.component";
import { PlanProgressComponent } from "./components/plan-progress.component";

export const PlanPage = () => {
	const { authContext } = useAuthContext();

	const [typePlan, setTypePlan] = useState<number>(0);

	return (
		<ContainerLayout>
			<section>
				<PlanProgressComponent />

				<div className="max-w-[928px] py-[40px]  h-full mx-auto">
					<div className="flex items-center gap-x-2">
						<IoIosArrowDropleft className="fill-secondary w-5 h-5" />
						<p className="text-lg text-secondary font-bold">Volver</p>
					</div>

					<div className=" mx-auto max-w-[554px] mt-14 mb-5">
						{/* NOMBRE DEL USUARIO */}
						<div className="mb-8 text-center">
							<p className="font-bold text-[40px] leading-[48px] text-text">
								{authContext?.name} ¿Para quién deseas cotizar?
							</p>

							<p className="text-text text-base mt-2">
								Selecciona la opción que se ajuste más a tus necesidades.
							</p>
						</div>

						<div className="flex items-center justify-between">
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

					<div className="max-w-[928px] mx-auto">
						<PlanesListComponent idType={typePlan} />
					</div>
				</div>
			</section>
		</ContainerLayout>
	);
};
