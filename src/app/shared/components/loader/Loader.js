import styled from "styled-components";
import "./Loader.css";

const Container = styled.div`
	width: 100vw !important;
	max-width: none !important;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 100000;
	display: flex;
	align-items: center;
	justify-content: center;
	background: var(--color-black-modal);
`;
const Loader = () => {
	return (
		<Container>
			<div className="leap-frog">
				<div className="leap-frog__dot"></div>
				<div className="leap-frog__dot"></div>
				<div className="leap-frog__dot"></div>
			</div>
		</Container>
	);
};

export default Loader;
