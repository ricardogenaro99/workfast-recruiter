import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar, AiOutlineTrophy } from "react-icons/ai";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useGlobal } from "../../contexts/globalContext";
import { API_FAVORITES, API_JOBS, API_POSTULATES } from "../../endpoints/apis";
import { helpHttp } from "../../helpers/helpHttp";
import {
	ButtonPrimaryPurple,
	ButtonPrimaryWhite
} from "../../shared/components";
import { SectionTitle } from "../../shared/templates";
import { device, size } from "../../shared/utils/generalBreakpoints";

const gap = "40px";

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
			img {
				object-fit: cover;
				width: 100%;
				height: 100%;
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
	const { userId, setLoading, setPopPup } = useGlobal();
	const params = useParams();
	const [favorite, setFavorite] = useState(false);
	const [postulate, setPostulate] = useState(false);

	useEffect(() => {
		const getFavorite = async () => {
			try {
				const options = {
					body: {
						userRef: userId,
						jobRef: params.id,
					},
				};

				const { data } = await helpHttp().post(
					`${API_FAVORITES}/is-match`,
					options,
				);
				setFavorite(data);
			} catch (e) {
				console.error({ statusText: `${e.name}: ${e.message}` });
			}
		};

		const getPostulate = async () => {
			try {
				const options = {
					body: {
						userRef: userId,
						jobRef: params.id,
					},
				};

				const { data } = await helpHttp().post(
					`${API_POSTULATES}/get-by-user-job`,
					options,
				);
				setPostulate(data !== null);
			} catch (e) {
				console.error({ statusText: `${e.name}: ${e.message}` });
			}
		};

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
			await getFavorite();
			await getPostulate();
			await getData();
			setLoading(false);
		};

		load();
	}, [params.id, setLoading, userId]);

	const handleClickFavorite = async () => {
		try {
			const options = {
				body: {
					userRef: userId,
					jobRef: jobDb._id,
				},
			};
			const { message } = await helpHttp().post(
				`${API_FAVORITES}/match-user-job`,
				options,
			);
			setPopPup(message);
			setFavorite(!favorite);
		} catch (err) {
			setPopPup("Ocurrio un error inesperado");
		}
	};

	const handleClickUnfavorite = async () => {
		try {
			const options = {
				body: {
					userRef: userId,
					jobRef: jobDb._id,
				},
			};
			const { message } = await helpHttp().post(
				`${API_FAVORITES}/unmatch-user-job`,
				options,
			);
			setPopPup(message);
			setFavorite(!favorite);
		} catch (err) {
			setPopPup("Ocurrio un error inesperado");
		}
	};

	const handleClickPostulate = async () => {
		try {
			const options = {
				body: {
					userRef: userId,
					jobRef: jobDb._id,
				},
			};
			const { message } = await helpHttp().post(
				`${API_POSTULATES}/match-user-job`,
				options,
			);
			setPopPup(message);
			setPostulate(!postulate);
		} catch (err) {
			setPopPup("Ocurrio un error inesperado");
		}
	};

	return (
		<SectionTitle
			title={jobDb?.details.name || ""}
			maxWidth={size.laptopS}
			margin="0 auto"
			error={error?.statusText}
		>
			{jobDb ? (
				<Container>
					<section className="image-container">
						<img
							src={
								jobDb.details.image ||
								"https://lamanzanamordida.net/app/uploads-lamanzanamordida.net/2022/06/apple-park-visitor-center.jpg"
							}
							alt="job"
						/>
					</section>
					<section className="info-container">
						<div className="info-left">
							<p>{jobDb.details.description}</p>
						</div>
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
							{favorite ? (
								<ButtonPrimaryWhite onClick={handleClickUnfavorite}>
									<AiFillStar />
									Quitar de favoritos
								</ButtonPrimaryWhite>
							) : (
								<ButtonPrimaryWhite onClick={handleClickFavorite}>
									<AiOutlineStar />
									Agregar a favoritos
								</ButtonPrimaryWhite>
							)}
							<ButtonPrimaryPurple
								onClick={handleClickPostulate}
								className={postulate ? "disabled" : ""}
								disabled={postulate}
							>
								<AiOutlineTrophy />
								{postulate ? "Espera la respuesta" : "Enviar mi solicitud"}
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
