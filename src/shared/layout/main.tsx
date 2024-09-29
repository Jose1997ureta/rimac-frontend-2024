import { HeaderComponent } from "./header";
import { FooterComponent } from "./footer";
import "../styles/layout/main.css";

export const ContainerLayout = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<div className="layout__container">
			<HeaderComponent />
			{children}
			<FooterComponent />
		</div>
	);
};
