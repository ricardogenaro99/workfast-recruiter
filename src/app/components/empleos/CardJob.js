import parse from "html-react-parser";
import { useId } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import styled from "styled-components";
import { useGlobal } from "../../contexts/globalContext";
import { API_JOBS } from "../../endpoints/apis";
import { helpHttp } from "../../helpers/helpHttp";
import { CardDefaultStyle, LinkPrimaryPurple } from "../../shared/components";

const sizeIcon = "20px";

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
				padding-right: ${sizeIcon};
			}

			.controls-container {
				display: flex;
				flex-direction: column;
				position: absolute;
				top: 0;
				right: 0;
				gap: var(--gap-default-XS);
				svg {
					cursor: pointer;
					width: ${sizeIcon};
					height: ${sizeIcon};
				}
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

const CardJob = ({ job, removeJobList }) => {
	const { setLoading } = useGlobal();
	const { details, enterpriseRef, _id } = job;

	const handleClickEdit = () => {};

	const handleClickDelete = async () => {
		try {
			setLoading(true);
			const options = {
				body: {
					jobId: _id,
				},
			};
			const res = await helpHttp().post(
				`${API_JOBS}/delete-package-job`,
				options,
			);
			removeJobList(_id);
			console.log(res);
		} catch (e) {
			console.error({ statusText: `${e.name}: ${e.message}` });
		} finally {
			setLoading(false);
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
				<div className="controls-container">
					<AiFillEdit color="var(--color-primary)" onClick={handleClickEdit} />
					<AiFillDelete color="#EA2925" onClick={handleClickDelete} />
				</div>
			</div>
			<ContentContainer>{parse(details.description)}</ContentContainer>
			<LinkPrimaryPurple to={_id}>Conocer más...</LinkPrimaryPurple>
		</Container>
	);
};

export default CardJob;
