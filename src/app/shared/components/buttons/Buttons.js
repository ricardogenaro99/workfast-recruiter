import { Link } from "react-router-dom";
import styled from "styled-components";

const styleDefault = `
	padding: 10px 5%;
	transition-duration: 0.27s;
	font-weight: 500;
	border-radius: var(--border-radius-global);
	display: flex;
	justify-content: center;
	align-items: center;
	gap: var(--gap-default-S);
	outline: 1px solid var(--color-primary);
	
	&:hover {
		box-shadow: var(--color-primary) 0px 0px 8px 2px;
	}

	&.disabled{
		opacity: .6;
		cursor: initial;
		&:hover {
			box-shadow: none;
		}
	}
`;

const ButtonDefault = styled.button`
	${styleDefault}
`;

export const ButtonPrimaryPurple = styled(ButtonDefault)`
	background: var(--color-primary);
	color: var(--color-white);
`;

export const ButtonPrimaryWhite = styled(ButtonDefault)`
	background: var(--color-white);
	color: var(--color-primary);
`;

const LinkDefault = styled(Link)`
	${styleDefault}
`;

export const LinkPrimaryPurple = styled(LinkDefault)`
	background: var(--color-primary);
	color: var(--color-white);
`;

export const LinkPrimaryWhite = styled(LinkDefault)`
	background: var(--color-white);
	color: var(--color-primary);
`;

export const ButtonChip = styled.button`
	background: ${(props) => props.background || "var(--color-white)"};
	color: ${(props) => props.color || "var(--color-primary)"};
	outline: 1px solid ${(props) => props.color || "var(--color-primary)"};
	border-radius: 10px;
	padding: 5px 10px;
	opacity: 0.8;
	cursor: ${(props) => props.cursor || "initial"};
`;
