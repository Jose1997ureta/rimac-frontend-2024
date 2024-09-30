import { ContainerLayout } from "../../shared/layout";
import { FormHeaderComponent } from "./components/form-header";
import { FormHeaderMovilComponent } from "./components/form-header-movil";
import { FormHomeComponent } from "./components/form-home";
import "./styles/home.style.css";

export const HomePage = () => {
	return (
		<ContainerLayout>
			<section className="container__layout home__container">
				<picture>
					<source
						media="(max-width: 768px)"
						srcSet="/images/blur-left-movil.png"
					/>
					<img
						src="/images/blur-left.png"
						alt="logo-white"
						className="absolute h-full top-0 left-0"
					/>
				</picture>

				<div className="home">
					<div className="home__image hidden md:block">
						<img src="/images/login-family.png" alt="" />
					</div>

					<div className="md:pl-[70px] lg:pl-[120px]">
						<div className="w-full md:w-[352px]">
							<FormHeaderComponent />
							<FormHeaderMovilComponent />
							<h2 className="text-sm font-semibold md:mt-2 mt-[24px]">
								Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe
								nuestra asesoría. 100% online.
							</h2>

							<FormHomeComponent />
						</div>
					</div>
				</div>

				<picture>
					<source
						media="(max-width: 768px)"
						srcSet="/images/blur-right-movil.png"
					/>
					<img
						src="/images/blur-right.png"
						alt="logo-white"
						className="absolute h-full top-0 right-0"
					/>
				</picture>
			</section>
		</ContainerLayout>
	);
};
