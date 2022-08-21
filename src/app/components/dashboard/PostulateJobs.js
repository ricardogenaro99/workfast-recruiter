import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { BiLinkAlt } from "react-icons/bi";
import { useGlobal } from "../../contexts/globalContext";
import { API_POSTULATES } from "../../endpoints/apis";
import { helpHttp } from "../../helpers/helpHttp";
import { ButtonChip, CustomLinkFlexGap, Grilla } from "../../shared/components";
import { SectionTitle } from "../../shared/templates";
import { STATES } from "../../shared/utils/generalConst";

const PostulateJobs = () => {
	const { userId } = useGlobal();
	const [postulates, setPostulates] = useState([]);
	const [rows, setRows] = useState([]);
	const [error, setError] = useState();

	const columns = [
		{ field: "enterprise", headerName: "Empresa", flex: 1, minWidth: 150 },
		{
			field: "job",
			headerName: "Trabajo",
			flex: 2,
			minWidth: 250,
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
				switch (cellValues.value) {
					case STATES.inProgress:
						return (
							<ButtonChip
								background="var(--color-blue-ligth)"
								color="var(--color-blue)"
							>
								{cellValues.value}
							</ButtonChip>
						);
					case STATES.accepted:
						return (
							<ButtonChip
								background="var(--color-teal)"
								color="var(--color-green)"
							>
								{cellValues.value}
							</ButtonChip>
						);
					case STATES.refused:
						return (
							<ButtonChip
								background="var(--color-red)"
								color="var(--color-red-dark)"
							>
								{cellValues.value}
							</ButtonChip>
						);
					default:
						return "";
				}
			},
		},
		{
			field: "jobUbication",
			headerName: "Lugar",
			flex: 1,
			minWidth: 150,
		},
		{ field: "datePostulate", headerName: "F. de solicitud", width: 170 },
		{ field: "dateResponse", headerName: "F. de respuesta", width: 170 },
	];

	useEffect(() => {
		const getData = async () => {
			try {
				const options = {
					body: {
						userRef: userId,
					},
				};

				const res = await helpHttp().post(
					`${API_POSTULATES}/get-by-user`,
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
			}
		};

		getData();
	}, [userId]);

	useEffect(() => {
		const data = postulates.map((postulate) => ({
			id: postulate._id,
			enterprise: postulate.jobRef?.enterpriseRef?.details.name,
			job: postulate.jobRef?.details.name,
			jobUbication: `${postulate.jobRef?.details.city}, ${postulate.jobRef?.details.country}`,
			jobPosition: postulate.jobRef?.details.position,
			status: generateStatus(postulate.accepted, postulate.refused),
			datePostulate: dayjs(postulate.createdAt).format("MMMM D, YYYY"),
			dateResponse: dayjs(postulate.updatedAt).format("MMMM D, YYYY"),
		}));
		setRows(data);
	}, [postulates]);

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

	return (
		<SectionTitle
			title="Da un seguimiento a los empleos a los que postulaste"
			error={error?.statusText}
		>
			<Grilla rows={rows} columns={columns} />
		</SectionTitle>
	);
};

export default PostulateJobs;
