import { IoIosArrowBack } from "react-icons/io";
import { useAuthContext } from "../hooks";
import { useNavigate } from "react-router-dom";

export const ButtonBackComponent = () => {
	const { handleRemoveAuth } = useAuthContext();
	const navigate = useNavigate();

	const handleNavigation = () => {
		if (location.pathname === "/planes") {
			handleRemoveAuth();
		} else if (location.pathname === "/resumen") {
			navigate("/planes");
		}
	};

	return (
		<div
			className="items-center gap-x-2 md:flex hidden cursor-pointer"
			onClick={handleNavigation}
		>
			<div className="w-5 h-5 flex items-center justify-center border border-secondary-700 rounded-full">
				<IoIosArrowBack className="fill-secondary-700 h-5-w-5" />
			</div>
			<p className="text-lg text-secondary-700 font-bold">Volver</p>
		</div>
	);
};
