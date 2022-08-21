import styled from "styled-components";
import { device } from "../../utils/generalBreakpoints";

export const ControlGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(${(props) => props.columns || 2}, 1fr);
	gap: var(--gap-default-M);
	justify-content: center;
	align-items: stretch;
	text-align: ${(props) => props.textAlign || "center"};

	@media ${device.tabletL} {
		grid-template-columns: 1fr;
	}
`;
