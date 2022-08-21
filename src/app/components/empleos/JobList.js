import { useEffect, useState } from "react";
import styled from "styled-components";
import CardJob from "../../components/empleos/CardJob";
import { useGlobal } from "../../contexts/globalContext";
import { API_JOBS } from "../../endpoints/apis";
import { helpHttp } from "../../helpers/helpHttp";
import { SectionTitle } from "../../shared/templates";
import { device } from "../../shared/utils/generalBreakpoints";

const Container = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	grid-auto-rows: 1fr;
	gap: 25px;
	@media ${device.mobileL} {
		grid-template-columns: 1fr;
	}
`;

const JobList = () => {
	const [jobsDb, setJobsDb] = useState([]);
	const [error, setError] = useState(null);
	const { setLoading } = useGlobal();

	useEffect(() => {
		const getData = async () => {
			try {
				const res = await helpHttp().get(`${API_JOBS}`);
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

	return (
		<SectionTitle
			title={"Estos empleos se ajustan a tu perfil"}
			error={error?.statusText}
		>
			<Container>
				{jobsDb.map((job, i) => (
					<CardJob key={i} job={job} />
				))}
			</Container>
		</SectionTitle>
	);
};

export default JobList;
