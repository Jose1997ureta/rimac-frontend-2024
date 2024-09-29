export const FormHeaderMovilComponent = () => {
	return (
		<div className="md:hidden border-b border-b-[#CCD1EE] pb-6 flex items-center justify-between gap-3">
			<div className="">
				<div className="w-fit px-2 py-0.5 rounded bg-gradient-to-r from-[#00f4e2] to-[#00ff7f] mb-2">
					<h3 className="text-xs font-bold text-third">
						Seguro Salud Flexible
					</h3>
				</div>

				<h1 className="text-[28px] font-bold leading-[40px]">
					Creado para ti y tu familia
				</h1>
			</div>

			<div className="max-w-[136px] overflow-hidden rounded-[20px] z-10">
				<img src="/images/login-family.png" alt="" />
			</div>
		</div>
	);
};
