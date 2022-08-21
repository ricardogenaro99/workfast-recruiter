import { Link, useNavigate } from "react-router-dom";
import { useGlobal } from "../../contexts/globalContext";
import { useForm } from "../../hooks/useForm";
import { pathAuth } from "../../routes/Path";
import {
	ButtonPrimaryPurple,
	ButtonPrimaryWhite,
	ControlGrid
} from "../../shared/components";
import AuthModel from "./AuthModel";

const initialForm = {
	email: "",
	password: "",
};

const Login = () => {
	const navigate = useNavigate();
	const { login } = useGlobal();
	const { form, handleChange } = useForm(initialForm);
	const handleRegister = () => navigate(`${pathAuth}/register`);

	return (
		<AuthModel
			title={"Iniciar Sesión"}
			form={form}
			onChange={handleChange}
			action={login}
			typeAction="login"
		>
			<ControlGrid>
				<ButtonPrimaryWhite type="button" onClick={handleRegister}>
					Crear Cuenta
				</ButtonPrimaryWhite>
				<ButtonPrimaryPurple type="submit">
					Ingresar
				</ButtonPrimaryPurple>
			</ControlGrid>
			<ControlGrid columns={1}>
				<Link to={`${pathAuth}/reset-password`}>
					¿Olvidaste tu contraseña?
				</Link>
			</ControlGrid>
		</AuthModel>
	);
};

export default Login;
