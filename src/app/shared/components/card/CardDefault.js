import styled from "styled-components";
import { device } from "../../utils/generalBreakpoints";

export const CardDefaultStyle = styled.div`
	border: 1px solid var(--color-grey-ligth);
	background: var(--color-white);
	display: flex;
	flex-direction: column;
	padding: var(--padding-global-y) 40px;
	gap: var(--gap-default-M);
	border-radius: var(--border-radius-global);
	box-shadow: rgb(0 0 0 / 15%) 0px 0px 8px 0px;

	.title-card {
		font-weight: 800;
		font-size: 26px;
		display: flex;
		align-items: center;
		color: var(--color-black);
	}

	.description-card {
		font-weight: 600;
		font-size: 18px;
		display: flex;
		align-items: center;
		color: var(--color-black);
	}

	@media ${device.mobileL} {
		padding: var(--padding-global-y) 7%;
	}
`;

export const CardDefault = ({ children, title, description }) => {
	return (
		<CardDefaultStyle>
			{title && <h2 className="title-card">{title}</h2>}
			{description && <p className="description-card">{description}</p>}
			{children}
		</CardDefaultStyle>
	);
};
