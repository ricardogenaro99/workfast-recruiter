import { useEffect, useId, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import styled from "styled-components";
import { useGlobal } from "../../contexts/globalContext";
import { API_FAVORITES } from "../../endpoints/apis";
import { helpHttp } from "../../helpers/helpHttp";
import { CardDefaultStyle, LinkPrimaryPurple } from "../../shared/components";

const sizeStar = "20px";

const Container = styled(CardDefaultStyle)`
	max-height: 300px;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: auto 1fr auto;
	justify-content: center;
	padding: 15px var(--padding-global-x);
	div {
		&:nth-child(1) {
			display: flex;
			flex-direction: column;
			gap: 5px;
			position: relative;
			h2 {
				padding-right: ${sizeStar};
			}
			svg {
				position: absolute;
				top: 0;
				right: 0;
				cursor: pointer;
				width: ${sizeStar};
				height: ${sizeStar};
			}
		}
	}
`;

const ContentContainer = styled.div`
	overflow: hidden;
	-mask-image: -webkit-gradient(
		linear,
		left top,
		left bottom,
		from(rgba(0, 0, 0, 1)),
		to(rgba(0, 0, 0, 0))
	);
	-webkit-mask-image: -webkit-gradient(
		linear,
		left top,
		left bottom,
		from(rgba(0, 0, 0, 1)),
		to(rgba(0, 0, 0, 0))
	);
`;

const CardJob = ({ job }) => {
	const { userId, setPopPup } = useGlobal();
	const [favorite, setFavorite] = useState(false);
	const { details, enterpriseRef, _id } = job;

	useEffect(() => {
		const getUser = async () => {
			try {
				const options = {
					body: {
						userRef: userId,
						jobRef: _id,
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
		getUser();
	}, [_id, userId]);

	const handleClickFavorite = async () => {
		try {
			const options = {
				body: {
					userRef: userId,
					jobRef: _id,
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
					jobRef: _id,
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

	return (
		<Container id={useId()}>
			<div>
				<h2>{details.name}</h2>
				<span>
					{details.city}, {details.country}
				</span>
				<h4>{enterpriseRef.details.name}</h4>
				{favorite ? (
					<AiFillStar color="orange" onClick={handleClickUnfavorite} />
				) : (
					<AiOutlineStar color="orange" onClick={handleClickFavorite} />
				)}
			</div>
			<ContentContainer>{details.description}</ContentContainer>
			<LinkPrimaryPurple to={_id}>Conocer más...</LinkPrimaryPurple>
		</Container>
	);
};

export default CardJob;
