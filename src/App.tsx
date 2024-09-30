import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import { HomePage } from "./pages/home";
import { PlanPage } from "./pages/plan/plan.page";
import { PrivateRoute, PublicRoute } from "./shared/router/router";
import { ResumenPage } from "./pages/resumen/resumen.page";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<PublicRoute />}>
					<Route path="/" element={<HomePage />} />
				</Route>
				<Route element={<PrivateRoute />}>
					<Route path="/planes" element={<PlanPage />} />
					<Route path="/resumen" element={<ResumenPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
