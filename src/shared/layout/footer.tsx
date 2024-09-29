import "../styles/layout/footer.css";

export const FooterComponent = () => {
	return (
		<footer className="footer__container">
			<div className="footer">
				<picture>
					<source
						media="(max-width: 768px)"
						srcSet="/images/logo-white-movil.png"
					/>
					<img
						src="/images/logo-white.png"
						alt="logo-white"
						className="footer__logo"
					/>
				</picture>

				<div className="md:hidden h-[1px] w-full bg-[#2B304E] my-6" />

				<p className="footer__text">© 2023 RIMAC Seguros y Reaseguros.</p>
			</div>
		</footer>
	);
};
