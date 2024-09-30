import { DataPlan } from "../../pages/plan/constants/data";
import { useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ProgressItemComponent } from "./progress-item.component";

export const ProgressComponent = () => {
	const location = useLocation();
	const [activeProgress, setActiveProgress] = useState<number>(0);

	useLayoutEffect(() => {
		if (location.pathname === "/planes") setActiveProgress(1);
		else if (location.pathname === "/resumen") setActiveProgress(2);
	}, [location.pathname]);

	return (
		<div className="bg-[#EDEFFC] py-4 w-full  md:justify-center hidden md:flex">
			<div className="w-[80%] flex justify-center gap-x-4">
				{DataPlan.progress.map((el) => (
					<ProgressItemComponent
						key={el.id.toString()}
						item={el}
						activeProgress={activeProgress}
					/>
				))}
			</div>
		</div>
	);
};
