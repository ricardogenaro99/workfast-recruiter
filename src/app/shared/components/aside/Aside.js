import { CgUserlane } from "react-icons/cg";
import { FaCog } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { SiSpeedtest } from "react-icons/si";
import styled from "styled-components";
import { device } from "../../utils/generalBreakpoints";
import NavLinkComponent from "./NavLinkComponent";

const Container = styled.aside`
	background: var(--color-primary);
	width: var(--max-width-aside);
	position: relative;
	z-index: 1000;
	top: 0;
	display: flex;
	justify-content: center;
	> div {
		position: fixed;
		height: 100%;
		width: 100%;
		max-width: var(--max-width-aside);
		box-shadow: rgb(0 0 0 / 15%) 4px var(--height-header) 8px 0px;
		> section {
			display: grid;
			padding: 15px;
			gap: 8px;

			.logo {
				display: flex;
				justify-content: center;
				align-items: center;
				margin: 30px 0;
			}
		}
	}

	@media ${device.tabletS} {
		width: var(--min-width-aside);
		> div {
			max-width: calc(var(--min-width-aside) - 6px);
			> section {
				padding: 10px 0;
			}
		}
	}
`;

const sizeIconTech = 25;

const Aside = () => {
	return (
		<Container>
			<div>
				<section>
					<div className="logo">
						<CgUserlane size={"90%"} color={"var(--color-white)"} />
					</div>
					<NavLinkComponent
						name="Dashboard"
						icon={<SiSpeedtest size={sizeIconTech} />}
					/>
					<NavLinkComponent
						path="empleos"
						name="Empleos"
						icon={<MdWork size={sizeIconTech} />}
					/>
					<NavLinkComponent
						path="configuracion"
						name="Configuracion"
						icon={<FaCog size={sizeIconTech} />}
					/>
				</section>
			</div>
		</Container>
	);
};

export default Aside;
