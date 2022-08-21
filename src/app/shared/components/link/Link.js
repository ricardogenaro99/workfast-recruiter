import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const CustomLinkFlexGap = styled(Link)`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: var(--gap-default-S);
`;