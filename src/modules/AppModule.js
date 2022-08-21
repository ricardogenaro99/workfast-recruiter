import styled from "styled-components";
import Main from "../app/components/Main";
import { Aside } from "../app/shared/components";

const Container = styled.div`
	width: 100%;
	height: 100%;
	min-height: 100vh;
	display: grid;
	grid-template-columns: auto 1fr;
	* {
		transition: all var(--transition);
	}
`;

const AppModule = () => {
	return (
		<Container>
			<Aside />
			<Main />
		</Container>
	);
};

export default AppModule;
