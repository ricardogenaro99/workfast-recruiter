import styled from "styled-components";
import RoutesApp from "../routes/RoutesApp";
import { Header } from "../shared/components";

const Container = styled.section`
	width: 100%;
	height: 100%;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: var(--height-header) 1fr;
`;

const Main = () => {
	return (
		<Container>
			<Header />
			<RoutesApp />
		</Container>
	);
};

export default Main;
