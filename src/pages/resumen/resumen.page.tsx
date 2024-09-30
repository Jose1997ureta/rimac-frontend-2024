import { ContainerLayout } from "@/shared/layout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/shared/hooks";
import { ButtonBackComponent } from "@/shared/components/button-back.component";
import { FaUserGroup } from "react-icons/fa6";

import "./styles/resumen.css";

import { ProgressComponent, ProgressMovilComponent } from "@/shared/components";

export const ResumenPage = () => {
	const navigate = useNavigate();
	const { authContext } = useAuthContext();

	useEffect(() => {
		if (authContext?.plan === null) navigate("/plan");
	}, [authContext?.plan, navigate]);

	return (
		<ContainerLayout>
			<section className="resumen__container">
				<ProgressComponent />
				<ProgressMovilComponent />

				<div className="w-screen md:max-w-[928px] md:py-[40px] py-8 h-full mx-auto">
					<div className="px-6 md:px-0">
						<ButtonBackComponent />

						<div className="md:mt-8">
							<h2 className="text-text text-[40px] font-bold md:mb-12 mb-10">
								Resumen del seguro
							</h2>

							<div
								className="rounded-3xl py-6 px-8 bg-white"
								style={{
									boxShadow: "0px 1px 24px 0px #AEACF340",
								}}
							>
								<div className="">
									<span className="uppercase text-text text-[10px] mb-2 font-black">
										Precios calculados para:
									</span>
									<div className="flex items-center gap-x-3">
										<FaUserGroup className="w-6 h-6 fill-text" />
										<p className="text-xl text-text font-bold">
											{authContext?.name} {authContext?.lastName}
										</p>
									</div>
								</div>

								<div className="h-[1px] w-full bg-[#D7DBF5] my-4" />

								<div className="mb-4">
									<p className="text-text font-bold text-base mb-1">
										Responsable de pago
									</p>
									<div className="flex items-center gap-x-2 mb-1">
										<p className="text-text text-sm">DNI:</p>
										<p className="text-text text-sm">
											{authContext?.nro_document}
										</p>
									</div>
									<div className="flex items-center gap-x-2">
										<p className="text-text text-sm">Celular:</p>
										<p className="text-text text-sm">{authContext?.phone}</p>
									</div>
								</div>

								<div className="mb-4">
									<p className="text-text font-bold text-base mb-1">
										Plan elegido
									</p>

									<p className="text-text text-sm mb-1">
										{authContext?.plan?.name}
									</p>
									<p className="text-text text-sm">
										Costo del Plan: ${authContext?.plan?.price} al mes
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</ContainerLayout>
	);
};
