import styled from "styled-components";

const styleDefault = `
	display: flex;
	flex-direction: column;
	border: 1px solid var(--color-grey-ligth);
	border-radius: var(--border-radius-global);
	padding: 10px 16px;
	min-height: 70px;
	gap: var(--gap-default-XS);
	justify-content: center;
`;

export const ContainerInputSelectLabelWithErrors = styled.div`
	display: flex;
	flex-direction: column;
	gap: var(--gap-default-S);
	* {
		background: transparent;
		font-weight: 400;
	}
`;

export const ContainerInputLabel = styled.div`
	${styleDefault}

	label {
		color: var(--color-grey);
	}

	input {
		color: var(--color-black);
		border: none;
		outline: none;
	}
`;

export const ContainerSelectLabel = styled.div`
	${styleDefault}
	gap: 0;
	padding-bottom: 0;

	span {
		color: var(--color-grey);
		display: flex;
		align-items: center;
	}
`;

export const ContainerErrors = styled.div`
	display: flex;
	flex-direction: column;
	gap: var(--gap-default-XS);
	border-radius: var(--border-radius-global);
	padding: 0 16px;

	.input-error {
		color: red;
		font-size: 0.8em;
	}
`;
