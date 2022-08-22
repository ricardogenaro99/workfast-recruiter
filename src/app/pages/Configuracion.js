import ConfigurarCuenta from "../components/configuracion/ConfigurarCuenta";
import ConfigurarEmpresa from "../components/configuracion/ConfigurarEmpresa";
import { ContainerGapDefault } from "../shared/templates";

const Configuracion = () => {
	return (
		<ContainerGapDefault>
			<ConfigurarCuenta />
			<ConfigurarEmpresa />
		</ContainerGapDefault>
	);
};

export default Configuracion;
