import { Route, Routes } from "react-router-dom";
import Job from "../components/empleos/Job";
import JobList from "../components/empleos/JobList";
import { ContainerGapDefault } from "../shared/templates";

const Empleos = () => {
	return (
		<ContainerGapDefault>
			<Routes>
				<Route path="/">
					<Route index element={<JobList />} />
					<Route path=":id" element={<Job />} />
				</Route>
			</Routes>
		</ContainerGapDefault>
	);
};

export default Empleos;
