import styled from "styled-components";
import { Alert } from "../components";

const Container = styled.section`
	max-width: ${(props) => props.maxWidth};
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: var(--gap-default-XL);

	.controllers {
		display: flex;
		flex-wrap: wrap;
		gap: var(--gap-default-M);

		.section-title {
			font-size: 30px;
			font-weight: 600;
		}
		.section-subtitle {
			font-size: 24px;
		}

		.actions-container {
			display: flex;
			width: 100%;
			flex-wrap: wrap;
			gap: var(--gap-default-M);
		}
	}

	margin: ${(props) => props.margin};
`;
const SectionTitle = ({
	title,
	subtitle,
	actions,
	children,
	maxWidth = "none",
	margin = "initial",
	error,
}) => {
	return (
		<Container maxWidth={maxWidth} margin={margin}>
			{(title || subtitle || actions) && (
				<div className="controllers">
					{title && <h3 className="section-title">{title}</h3>}
					{subtitle && <p className="section-subtitle">{subtitle}</p>}
					{actions && <div className="actions-container">{actions}</div>}
				</div>
			)}

			{error ? <Alert message={error} /> : children}
		</Container>
	);
};

export default SectionTitle;
