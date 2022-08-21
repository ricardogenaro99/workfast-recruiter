import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { useGlobal } from "../contexts/globalContext";
import { Configuracion, Dashboard, Empleos } from "../pages";
import { ButtonBackToTop } from "../shared/components";
import PopPup from "../shared/components/pop-pup/PopPup";

const Container = styled.main`
	padding: 60px var(--padding-global-x);
	position: relative;
`;

const RoutesApp = () => {
	const { popPup } = useGlobal();
	return (
		<Container>
			{popPup && <PopPup message={popPup} />}
			<Routes>
				<Route path="/">
					<Route index element={<Dashboard />} />
					<Route path="empleos/*" element={<Empleos />} />
					<Route path="configuracion" element={<Configuracion />} />
				</Route>
				<Route path="*" element={<h1>Error 404</h1>} />
			</Routes>
			<ButtonBackToTop />
		</Container>
	);
};

export default RoutesApp;
