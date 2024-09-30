import { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../../../shared/hooks/use-general.context";
import { planService } from "../services/plan.service";

import { Loading } from "@/shared/components/loading.component";
import { DataPlanProps } from "../interfaces/plan.interface";
import { PlanesListComponent } from "./planes-list.component";

interface Props {
	idType: number;
}

export const PlanesListContainerComponent = ({ idType }: Props) => {
	const { authContext } = useAuthContext();

	const [dataPlanes, setDataPlanes] = useState<DataPlanProps[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const loadPlans = useCallback(async () => {
		if (idType === 0) return;

		try {
			setLoading(true);
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
							priceBase: idType === 2 ? el.price : 0,
						};
					});

				setDataPlanes(dataFilter);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	}, [authContext?.birthDay, idType]);

	useEffect(() => {
		loadPlans();
	}, [loadPlans]);

	if (idType === 0) return null;

	return loading ? (
		<div className="h-[300px] bg-white flex justify-center items-center relative">
			<Loading />
		</div>
	) : idType !== 0 && dataPlanes.length === 0 ? (
		<div className="flex justify-center py-10">
			<p className="text-text text-lg font-bold">
				No hay informacion que mostrar
			</p>
		</div>
	) : (
		<PlanesListComponent idType={idType} data={dataPlanes} />
	);
};
