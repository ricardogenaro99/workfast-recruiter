import { useEffect, useState } from "react";
import { CgUserlane } from "react-icons/cg";
import { FaCog } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { SiSpeedtest } from "react-icons/si";
import styled from "styled-components";
import { useGlobal } from "../../../contexts/globalContext";
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
		display: flex;
		flex-direction: column;
		justify-content: space-between;
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

const PerfilSection = styled.section`
	width: 100%;
	display: flex !important;
	align-items: center;
	justify-content: center;
	img {
		object-fit: cover;
		width: 100%;
		max-width: 140px;

		border-radius: 100%;
	}
`;

const sizeIconTech = 25;

const Aside = () => {
	const { getEnterpriseDb } = useGlobal();
	const [enterpriseImage, setEnterpriseImage] = useState();

	useEffect(() => {
		const getData = async () => {
			try {
				const res = await getEnterpriseDb();
				setEnterpriseImage(
					res.details.image ||
						"https://firebasestorage.googleapis.com/v0/b/workfast-f9c03.appspot.com/o/workfast%2Fworkfast-logo-white.jpg?alt=media&token=cf857536-c755-4159-ad04-a83d3e21bbd7",
				);
			} catch (err) {
				console.error(err);
				setEnterpriseImage(
					"https://firebasestorage.googleapis.com/v0/b/workfast-f9c03.appspot.com/o/workfast%2Fworkfast-logo-white.jpg?alt=media&token=cf857536-c755-4159-ad04-a83d3e21bbd7",
				);
			}
		};

		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
				<PerfilSection>
					{enterpriseImage && <img src={enterpriseImage} alt="enterprise" />}
				</PerfilSection>
			</div>
		</Container>
	);
};

export default Aside;
