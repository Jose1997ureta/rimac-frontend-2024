import "../styles/layout/header.css";
import { FaPhoneAlt } from "react-icons/fa";

export const HeaderComponent = () => {
	return (
		<header className="header__container">
			<div className="header">
				<img src="/images/logo-red.png" className="header__logo" />

				<div className="header__text">
					<p className="header__text--text">¡Compra por este medio!</p>
					<p className="header__text--phone">
						<FaPhoneAlt fill="fill-third" /> (01) 411 6001
					</p>
				</div>
			</div>
		</header>
	);
};
