import dayjs from "dayjs";
import parse from "html-react-parser";
import React, { useEffect, useState } from "react";
import { AiOutlineStar, AiOutlineTrophy } from "react-icons/ai";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useGlobal } from "../../contexts/globalContext";
import { API_JOBS } from "../../endpoints/apis";
import { helpHttp } from "../../helpers/helpHttp";
import {
	ButtonPrimaryPurple,
	ButtonPrimaryWhite
} from "../../shared/components";
import { SectionTitle } from "../../shared/templates";
import { device, size } from "../../shared/utils/generalBreakpoints";
import { WORKFAST_IMAGE_WHITE } from "../../shared/utils/generalConst";

const gap = "40px";
const sizeEnterprise = "80px";

const Container = styled.article`
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: auto 1fr;
	gap: ${gap};

	> section {
		&.image-container {
			overflow: hidden;
			min-height: 250px;
			max-height: 400px;
			position: relative;
			img {
				object-fit: cover;
				&:nth-child(1) {
					width: 100%;
					height: 100%;
				}
				&:nth-child(2) {
					position: absolute;
					height: ${sizeEnterprise};
					width: ${sizeEnterprise};
					border-radius: 100%;
					bottom: 10px;
					right: 10px;
				}
			}
		}

		&.info-container {
			display: grid;
			grid-template-columns: 1fr 230px;
			gap: ${gap};
			align-items: start;
			.info-left {
			}

			.info-right {
				display: grid;
				grid-template-columns: 1fr;
				gap: calc(${gap} / 3);
			}

			@media ${device.tabletM} {
				grid-template-columns: 1fr;
				.info-right {
					grid-row-start: 1;
				}
			}
		}
	}
`;
const Job = () => {
	const [jobDb, setJobDb] = useState();
	const [error, setError] = useState(null);
	const { userId, setLoading } = useGlobal();
	const params = useParams();

	useEffect(() => {
		const getData = async () => {
			try {
				const res = await helpHttp().get(`${API_JOBS}/${params.id}`);
				if (res.err) {
					setError(res);
					setJobDb();
					return;
				}
				if (res.data) {
					setJobDb(res.data);
					setError();
					return;
				}
			} catch (e) {
				setError({ statusText: `${e.name}: ${e.message}` });
			}
		};

		const load = async () => {
			setLoading(true);
			await getData();
			setLoading(false);
		};

		load();
	}, [params.id, setLoading, userId]);

	return (
		<SectionTitle
			title={jobDb?.details.name || ""}
			subtitle="[Vista del postulante]"
			maxWidth={size.laptopS}
			margin="0 auto"
			error={error?.statusText}
		>
			{jobDb ? (
				<Container>
					<section className="image-container">
						<img src={jobDb.details.image || WORKFAST_IMAGE_WHITE} alt="job" />
						<img src={jobDb.enterpriseRef.details.image} alt="enterprise" />
					</section>
					<section className="info-container">
						<div className="info-left">{parse(jobDb.details.description)}</div>
						<div className="info-right">
							<span>
								<b>Pulicado el:</b>{" "}
								{dayjs(jobDb.createdAt).format("MMMM D, YYYY")}
							</span>
							<span>
								<b>Ubicación:</b> {jobDb.details.city}, {jobDb.details.country}
							</span>
							<span>
								<b>Empresa:</b> {jobDb.enterpriseRef.details.name}
							</span>
							<ButtonPrimaryWhite>
								<AiOutlineStar />
								Agregar a favoritos
							</ButtonPrimaryWhite>
							<ButtonPrimaryPurple>
								<AiOutlineTrophy />
								Enviar mi solicitud
							</ButtonPrimaryPurple>
						</div>
					</section>
				</Container>
			) : (
				""
			)}
		</SectionTitle>
	);
};

export default Job;
