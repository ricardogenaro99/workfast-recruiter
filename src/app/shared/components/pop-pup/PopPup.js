import React, { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { useGlobal } from "../../../contexts/globalContext";

const margin = "2%";

const breatheAnimation = keyframes`
	0% { opacity: 0}
	20% { opacity: .8 }
	75% { opacity: .8 }
	100% { opacity: 0 }
`;

const Container = styled.div`
	position: fixed;
	top: calc(var(--height-header) + ${margin});
	right: ${margin};
	background: var(--color-primary-ligth);
	outline: 1px solid var(--color-primary);
	padding: 20px 5%;
	border-radius: calc(var(--border-radius-global) * 1.5);
	opacity: 0;
	font-weight: 500;
	color: var(--color-white);
	animation-name: ${breatheAnimation};
	animation-duration: 5s;
	z-index: 10000;

	max-width: calc(90vw - var(--min-width-aside));

	box-shadow: var(--color-primary-active) 0px 0px 10px 0px;
	button {
		position: absolute;
		top: 3px;
		right: 3px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: transparent;
	}
`;

const PopPup = ({ message }) => {
	const location = useLocation();
	const { setPopPup } = useGlobal();
	const path = useRef(location.pathname);

	useEffect(() => {
		const idTime = setTimeout(() => {
			setPopPup();
		}, 5000);

		return () => clearTimeout(idTime);
	}, [setPopPup]);

	useEffect(() => {
		if (path.current !== location.pathname) {
			setPopPup();
		}
	}, [location.pathname, setPopPup]);

	const handleClose = () => {
		setPopPup();
	};

	return (
		<Container>
			<button onClick={handleClose}>
				<IoClose color="var(--color-white)" />
			</button>
			{message}
		</Container>
	);
};

export default PopPup;
