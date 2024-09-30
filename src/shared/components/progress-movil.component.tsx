import { useAuthContext } from "@/shared/hooks";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const initialValue = {
	total: 2,
	initial: 1,
	porcentage: "w-0",
};

export const ProgressMovilComponent = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [dataStep, setDataStep] = useState(initialValue);
	const { handleRemoveAuth } = useAuthContext();

	useEffect(() => {
		if (location.pathname === "/planes") {
			setDataStep((state) => ({
				...state,
				initial: 1,
				porcentage: "w-1/2",
			}));
		} else if (location.pathname === "/resumen") {
			setDataStep((state) => ({
				...state,
				initial: 2,
				porcentage: "w-full",
			}));
		}
	}, [location.pathname]);

	const handleNavigation = () => {
		if (location.pathname === "/planes") {
			handleRemoveAuth();
		} else if (location.pathname === "/resumen") {
			navigate("/planes");
		}
	};

	return (
		<div className="bg-white py-4 w-full flex px-6 md:hidden border-b border-[#FAFBFF] gap-x-4">
			<div
				className="h-6 w-6 border border-secondary-400 rounded-full flex items-center justify-center cursor-pointer"
				onClick={handleNavigation}
			>
				<IoIosArrowBack className="fill-secondary-500 h-5-w-5" />
			</div>

			<div className="flex items-center gap-x-4 w-full flex-1">
				<p className="uppercase text-text font-black text-[10px]">
					Paso {dataStep.initial} DE {dataStep.total}
				</p>

				<div className="w-full relative h-1.5 bg-[#D7DBF5] rounded-[20px] flex-1 overflow-hidden">
					<div
						className={twMerge(
							"absolute top-0 left-0 bg-secondary-700 h-full rounded-[20px]",
							dataStep.porcentage
						)}
					/>
				</div>
			</div>
		</div>
	);
};
