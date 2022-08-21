import React, { useCallback, useEffect, useState } from "react";
import { BiLinkAlt } from "react-icons/bi";
import styled from "styled-components";
import { useGlobal } from "../../contexts/globalContext";
import { API_FAVORITES } from "../../endpoints/apis";
import { helpHttp } from "../../helpers/helpHttp";
import {
	ButtonPrimaryWhite,
	CustomLinkFlexGap,
	Grilla
} from "../../shared/components/";
import { SectionTitle } from "../../shared/templates";

const ButtonPrimaryWhiteTop = styled(ButtonPrimaryWhite)`
	transform: translate(7px, -45px);
`;

const FavoriteJobs = () => {
	const { userId, setPopPup } = useGlobal();
	const [favorites, setFavorites] = useState([]);
	const [rows, setRows] = useState([]);
	const [error, setError] = useState();
	const [selectedRows, setSelectedRows] = useState([]);
	const [loading, setLoading] = useState(false);

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
		{
			field: "jobUbication",
			headerName: "Lugar",
			flex: 1,
			minWidth: 150,
		},
		{ field: "jobPosition", headerName: "Cargo", flex: 1.5, minWidth: 250 },
	];

	const getData = useCallback(async () => {
		try {
			const options = {
				body: {
					userRef: userId,
				},
			};
			const res = await helpHttp().post(
				`${API_FAVORITES}/get-by-user`,
				options,
			);

			if (res.err) {
				setError(res);
				setFavorites([]);
				return;
			}
			if (res.data) {
				setError(null);
				setFavorites(res.data);
				return;
			}
		} catch (e) {
			console.error({ statusText: `${e.name}: ${e.message}` });
		}
	}, [userId]);

	useEffect(() => {
		getData();
	}, [getData, userId]);

	useEffect(() => {
		const data = favorites.map((favorite) => ({
			id: favorite._id,
			enterprise: favorite.jobRef?.enterpriseRef?.details.name,
			job: favorite.jobRef?.details.name,
			jobUbication: `${favorite.jobRef?.details.city}, ${favorite.jobRef?.details.country}`,
			jobPosition: favorite.jobRef?.details.position,
		}));
		setRows(data);
	}, [favorites]);

	const returnJobId = (rowId) => {
		const favorite = favorites.find((e) => e._id === rowId);
		return favorite?.jobRef._id;
	};

	const handleClick = async () => {
		try {
			setLoading(true);
			const options = {
				body: {
					favoritesId: selectedRows,
				},
			};

			const res = await helpHttp().post(
				`${API_FAVORITES}/unmatch-by-ids`,
				options,
			);

			setPopPup(res.message);

			if (res.err) {
				setError(res);
				return;
			}
			if (res.data) {
				setError(null);
				return;
			}
		} catch (e) {
			setPopPup(`${e.name}: ${e.message}`);
		} finally {
			getData();
			setLoading(false);
		}
	};

	return (
		<SectionTitle
			title="Revisa tus empleos favoritos"
			error={error?.statusText}
		>
			<Grilla rows={rows} columns={columns} setSelectedRows={setSelectedRows}>
				<ButtonPrimaryWhiteTop
					className={selectedRows.length === 0 || loading ? "disabled" : ""}
					disabled={selectedRows.length === 0 || loading}
					onClick={handleClick}
				>
					Quitar de favoritos
				</ButtonPrimaryWhiteTop>
			</Grilla>
		</SectionTitle>
	);
};

export default FavoriteJobs;
