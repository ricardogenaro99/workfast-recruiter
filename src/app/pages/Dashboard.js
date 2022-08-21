import FavoriteJobs from "../components/dashboard/FavoriteJobs";
import PostulateJobs from "../components/dashboard/PostulateJobs";
import { ContainerGapDefault } from "../shared/templates";

const Dashboard = () => {
	return (
		<ContainerGapDefault>
			<FavoriteJobs />
			<PostulateJobs />
		</ContainerGapDefault>
	);
};

export default Dashboard;
