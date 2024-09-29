import "../styles/layout/header.css";
import { FaPhoneAlt } from "react-icons/fa";

export const HeaderComponent = () => {
	return (
		<header className="header__container">
			<div className="header container__layout">
				<img src="/images/logo-red.png" className="header__logo" />

				<div className="header__text">
					<p className="header__text--text">¡Compra por este medio!</p>
					<div className="flex items-center gap-x-2">
						<FaPhoneAlt fill="fill-third" />
						<p className="header__text--phone">(01) 411 6001</p>
					</div>
				</div>
			</div>
		</header>
	);
};
