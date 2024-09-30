import { useCallback, useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { twMerge } from "tailwind-merge";
import { PlanesListItemComponent } from "./planes-list-item.component";
import { DataPlanProps } from "../interfaces/plan.interface";

interface Props {
	idType: number;
	data: DataPlanProps[];
}

const widthCard = 288;

export const PlanesListComponent = ({ idType, data }: Props) => {
	const carouselRef = useRef<HTMLDivElement>(null);
	const [currentIndex, setCurrentIndex] = useState<number>(1);

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

	return (
		<>
			<div
				className="flex md:gap-x-8 gap-x-4 overflow-x-auto py-6 px-5"
				style={{
					scrollBehavior: "smooth",
					scrollbarWidth: "none",
				}}
				ref={carouselRef}
			>
				{data.map((el, index) => (
					<PlanesListItemComponent index={index} item={el} />
				))}
			</div>

			{/* BUTTON NAVIGATION */}

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
					{currentIndex} / {data.length}
				</p>
				<div
					className={twMerge(
						"w-8 h-8 border border-secondary rounded-full flex justify-center items-center cursor-pointer",
						currentIndex === data.length
							? "border-secondary-400"
							: "border-secondary-700"
					)}
				>
					<IoIosArrowForward
						className={twMerge(
							"h-6 w-6",
							currentIndex === data.length
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
