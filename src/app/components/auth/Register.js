import { useNavigate } from "react-router-dom";
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
const Register = () => {
	const navigate = useNavigate();
	const { signup } = useGlobal();
	const { form, handleChange } = useForm(initialForm);

	const handleLogin = () => navigate(`${pathAuth}/login`);
	return (
		<AuthModel
			title={"Crear Cuenta"}
			form={form}
			onChange={handleChange}
			action={signup}
			typeAction="register"
		>
			<ControlGrid>
				<ButtonPrimaryWhite type="button" onClick={handleLogin}>
					Tengo Cuenta
				</ButtonPrimaryWhite>
				<ButtonPrimaryPurple type="submit">
					Registrarme
				</ButtonPrimaryPurple>
			</ControlGrid>
		</AuthModel>
	);
};

export default Register;
