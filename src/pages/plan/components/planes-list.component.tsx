import { useCallback, useEffect, useRef, useState } from "react";
import { useAuthContext } from "../../../shared/hooks/use-general.context";
import { planService } from "../services/plan.service";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { twMerge } from "tailwind-merge";
import { PlanesListItemComponent } from "./planes-list-item.component";
import { Loading } from "@/shared/components/loading.component";
import { DataPlanProps } from "../interfaces/plan.interface";

interface Props {
	idType: number;
}

const widthCard = 288;

export const PlanesListComponent = ({ idType }: Props) => {
	const { authContext } = useAuthContext();
	const carouselRef = useRef<HTMLDivElement>(null);
	const [dataPlanes, setDataPlanes] = useState<DataPlanProps[]>([]);
	const [currentIndex, setCurrentIndex] = useState<number>(1);
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

	const handleNavigation = (type: "next" | "back") => {
		if (carouselRef.current) {
			if (type === "back") {
				carouselRef.current.scrollBy({ left: -288, behavior: "smooth" });
			} else {
				carouselRef.current.scrollBy({ left: 288, behavior: "smooth" });
			}
		}
	};

	const updateCurrent = useCallback(() => {
		if (carouselRef.current) {
			const scroll = carouselRef.current.scrollLeft;

			const current = Math.round(scroll / widthCard);
			setCurrentIndex(current + 1);
		}
	}, []);

	useEffect(() => {
		const carousel = carouselRef.current;

		if (carousel) carousel.addEventListener("scroll", updateCurrent);

		return () => {
			if (carousel) carousel.removeEventListener("scroll", updateCurrent);
		};
	}, [updateCurrent]);

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
		<>
			<div
				className="flex md:gap-x-8 gap-x-4 overflow-x-auto py-6 px-5"
				style={{
					scrollBehavior: "smooth",
					scrollbarWidth: "none",
				}}
				ref={carouselRef}
			>
				{dataPlanes.map((el, index) => (
					<PlanesListItemComponent index={index} item={el} />
				))}
			</div>

			{/* BUTTON NAVIGATION */}

			{}
			<div className="flex justify-center gap-x-4 items-center md:hidden">
				<div
					className={twMerge(
						"w-8 h-8 border rounded-full flex justify-center items-center cursor-pointer",
						currentIndex === 1 ? "border-secondary-400" : "border-secondary-700"
					)}
					onClick={() => handleNavigation("back")}
				>
					<IoIosArrowBack
						className={twMerge(
							"h-6 w-6",
							currentIndex === 1 ? "fill-secondary-400" : "fill-secondary-700"
						)}
					/>
				</div>

				<p className="text-text text-base">
					{currentIndex} / {dataPlanes.length}
				</p>
				<div
					className={twMerge(
						"w-8 h-8 border border-secondary rounded-full flex justify-center items-center cursor-pointer",
						currentIndex === dataPlanes.length
							? "border-secondary-400"
							: "border-secondary-700"
					)}
				>
					<IoIosArrowForward
						className={twMerge(
							"h-6 w-6",
							currentIndex === dataPlanes.length
								? "fill-secondary-400"
								: "fill-secondary-700"
						)}
						onClick={() => handleNavigation("next")}
					/>
				</div>
			</div>
		</>
	);
};
