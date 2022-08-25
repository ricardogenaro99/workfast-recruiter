import dayjs from "dayjs";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BiLinkAlt } from "react-icons/bi";
import styled from "styled-components";
import { useGlobal } from "../../contexts/globalContext";
import { API_POSTULATES } from "../../endpoints/apis";
import { helpHttp } from "../../helpers/helpHttp";
import {
	ButtonChip,
	ButtonPrimaryPurple,
	ButtonPrimaryWhite,
	ControlGrid,
	CustomLinkFlexGap,
	CustomModal,
	Grilla
} from "../../shared/components";
import { ContainerGapDefault, SectionTitle } from "../../shared/templates";
import { STATES } from "../../shared/utils/generalConst";

const ContainerContentModal = styled(ContainerGapDefault)`
	display: flex;
	padding: var(--gap-default-M) var(--gap-default-L);
	gap: var(--gap-default-XL);
`;

const PostulateJobs = () => {
	const { enterpriseId, setLoading } = useGlobal();
	const [postulates, setPostulates] = useState([]);
	const [rows, setRows] = useState([]);
	const [error, setError] = useState();
	const [isDataLoad, setIsDataLoad] = useState(true);
	const [modalIsOpen, setIsOpen] = useState(false);
	const selected = useRef();

	const columns = [
		{
			field: "postulateLastname",
			headerName: "Apellido del postulante",
			flex: 1,
			minWidth: 200,
		},
		{
			field: "postulateName",
			headerName: "Nombre del postulante",
			flex: 1,
			minWidth: 200,
		},
		{
			field: "job",
			headerName: "Trabajo",
			flex: 2,
			minWidth: 300,
			renderCell: (cellValues) => {
				return (
					<CustomLinkFlexGap
						to={`/dashboard/empleos/${returnJobId(cellValues.id)}`}
					>
						<BiLinkAlt /> {cellValues.value}
					</CustomLinkFlexGap>
				);
			},
		},
		{ field: "jobPosition", headerName: "Cargo", flex: 1.5, minWidth: 150 },
		{
			field: "status",
			headerName: "Estado",
			width: 130,
			renderCell: (cellValues) => {
				const handleClick = () => {
					selected.current = cellValues.row;
					openModal();
				};

				const props = {
					background: "",
					color: "",
					onClick: () => handleClick(),
					cursor: "pointer",
				};

				switch (cellValues.value) {
					case STATES.inProgress:
						props.background = "var(--color-blue-ligth)";
						props.color = "var(--color-blue)";
						break;
					case STATES.accepted:
						props.background = "var(--color-teal)";
						props.color = "var(--color-green)";
						break;
					case STATES.refused:
						props.background = "var(--color-red)";
						props.color = "var(--color-red-dark)";
						break;
					default:
						break;
				}

				return <ButtonChip {...props}>{cellValues.value}</ButtonChip>;
			},
		},
		{ field: "datePostulate", headerName: "F. de solicitud", width: 170 },
	];

	const getData = useCallback(async () => {
		try {
			setIsDataLoad(true);
			const options = {
				body: {
					enterpriseRef: enterpriseId,
				},
			};

			const res = await helpHttp().post(
				`${API_POSTULATES}/get-by-enterprise`,
				options,
			);

			if (res.err) {
				setError(res);
				setPostulates([]);
				return;
			}
			if (res.data) {
				setError(null);
				setPostulates(res.data);
				return;
			}
		} catch (e) {
			console.error({ statusText: `${e.name}: ${e.message}` });
		} finally {
			setIsDataLoad(false);
		}
	}, [enterpriseId]);

	useEffect(() => {
		getData();
	}, [getData]);

	useEffect(() => {
		const data = postulates.map((postulate) => ({
			id: postulate._id,
			postulateLastname: postulate.userRef?.details?.lastname,
			postulateName: postulate.userRef?.details?.name,
			job: postulate.jobRef?.details.name,
			jobPosition: postulate.jobRef?.details.position,
			status: generateStatus(postulate.accepted, postulate.refused),
			datePostulate: dayjs(postulate.createdAt).format("MMMM D, YYYY"),
		}));
		setRows(data);
	}, [postulates]);

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	const returnJobId = (rowId) => {
		const postulate = postulates.find((e) => e._id === rowId);
		return postulate?.jobRef._id;
	};

	const generateStatus = (accepted, refused) => {
		if (!accepted && !refused) return STATES.inProgress;
		if (accepted) return STATES.accepted;
		if (refused) return STATES.refused;
		return "";
	};

	const changeStatusPostulate = async (path) => {
		try {
			setLoading(true);
			const options = {
				body: {
					id: selected.current,
				},
			};
			await helpHttp().post(`${API_POSTULATES}/${path}`, options);
			await getData();
			closeModal();
		} catch (e) {
			console.error({ statusText: `${e.name}: ${e.message}` });
		} finally {
			setLoading(false);
		}
	};

	return (
		<SectionTitle
			title="Estas son la solicitudes de tus empleos publicados"
			subtitle="Para cambiar el estado de una solicitud, solo debes hacer click sobre el estado de la fila a cambiar y confirmar el nuevo estado en la ventana modal"
			error={error?.statusText}
		>
			<Grilla
				height="600px"
				rows={rows}
				columns={columns}
				isDataLoad={isDataLoad}
			/>
			<CustomModal modalIsOpen={modalIsOpen} closeModal={closeModal}>
				<ContainerContentModal>
					<section>{JSON.stringify(selected.current)}</section>
					<ControlGrid>
						<ButtonPrimaryPurple
							onClick={() => changeStatusPostulate("accepted")}
						>
							Aceptar
						</ButtonPrimaryPurple>
						<ButtonPrimaryWhite
							onClick={() => changeStatusPostulate("refused")}
						>
							Rechazar
						</ButtonPrimaryWhite>
					</ControlGrid>
				</ContainerContentModal>
			</CustomModal>
		</SectionTitle>
	);
};

export default PostulateJobs;
