import ConfigurarCuenta from "../components/configuracion/ConfigurarCuenta";
import { SectionTitle } from "../shared/templates";

const Configuracion = () => {
	return (
		<SectionTitle title="Configura los datos básicos de tu cuenta">
			<ConfigurarCuenta />
		</SectionTitle>
	);
};

export default Configuracion;
