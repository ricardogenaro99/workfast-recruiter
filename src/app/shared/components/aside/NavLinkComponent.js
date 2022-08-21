import { AiFillCrown } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { pathDashboard } from "../../../routes/Path";
import { device } from "../../utils/generalBreakpoints";

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  20% {
    transform: rotate(20deg);
  }
  40% {
    transform: rotate(-20deg);
  }
  60% {
    transform: rotate(10deg);
  }
  80% {
    transform: rotate(-10deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

const Container = styled(NavLink)`
	height: 100%;
	width: 100%;
	text-decoration: none;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	gap: 25px;
	padding: 15px 20px;
	border-radius: calc(var(--border-radius-global) * 1.5);
	position: relative;
	color: var(--color-white);

	.icon-container {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	&:hover,
	&.active {
		background: var(--color-primary-active);
	}

	&.active {
		.icon-container {
			animation: ${rotate} 0.44s ease-out;
		}
	}

	.premium-icon {
		position: absolute;
		top: 8px;
		right: 10px;
	}

	@media ${device.tabletS} {
		padding: 5px;
		justify-content: center;
		span {
			display: none;
		}
	}
`;

const NavLinkComponent = ({ path = "", name, icon, isPremium = false }) => {
	return (
		<Container
			className={(navData) => (navData.isActive ? "active" : "")}
			to={`${pathDashboard}/${path}`}
		>
			<span className="icon-container">{icon}</span>
			<span>{name}</span>
			{isPremium && (
				<span className="premium-icon">
					<AiFillCrown color="orange" />
				</span>
			)}
		</Container>
	);
};

export default NavLinkComponent;
