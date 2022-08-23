import { useEffect, useState } from "react";
import styled from "styled-components";
import CardJob from "../../components/empleos/CardJob";
import { useGlobal } from "../../contexts/globalContext";
import { API_JOBS } from "../../endpoints/apis";
import { helpHttp } from "../../helpers/helpHttp";
import { ButtonPrimaryWhite } from "../../shared/components";
import { SectionTitle } from "../../shared/templates";
import { device } from "../../shared/utils/generalBreakpoints";
import AddJob from "./AddJob";

const Container = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	grid-auto-rows: 1fr;
	gap: 25px;
	@media ${device.mobileL} {
		grid-template-columns: 1fr;
	}
`;

const JobList = () => {
	const [jobsDb, setJobsDb] = useState([]);
	const [error, setError] = useState(null);
	const { setLoading, enterpriseId } = useGlobal();
	const [modalIsOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const getData = async () => {
			try {
				const options = {
					body: {
						enterpriseRef: enterpriseId,
					},
				};

				const res = await helpHttp().post(
					`${API_JOBS}/get-by-enterprise`,
					options,
				);
				if (res.err) {
					setError(res);
					setJobsDb([]);
					return;
				}
				if (res.data) {
					setError(null);
					setJobsDb(res.data);
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
	}, [setLoading]);

	const handleOpenModal = () => {
		setIsOpen(true);
	};

	const handleCloseModal = () => {
		setIsOpen(false);
	};

	const addJobList = (job) => {
		setJobsDb([...jobsDb, job]);
		handleCloseModal();
	};

	return (
		<SectionTitle
			title={"Estos empleos se ajustan a tu perfil"}
			subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe nobis omnis nisi, assumenda alias quasi sunt ducimus debitis id eius distinctio suscipit ut esse odit quam labore dolore quisquam doloremque!"
			actions={
				<ButtonPrimaryWhite onClick={handleOpenModal}>
					Agregar Empleo
				</ButtonPrimaryWhite>
			}
			error={error?.statusText}
		>
			<AddJob
				modalIsOpen={modalIsOpen}
				closeModal={handleCloseModal}
				addJobList={addJobList}
			/>
			<Container>
				{jobsDb.map((job, i) => (
					<CardJob key={i} job={job} />
				))}
			</Container>
		</SectionTitle>
	);
};

export default JobList;
