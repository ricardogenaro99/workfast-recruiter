import { useNavigate } from "react-router-dom";
import { useGlobal } from "../../contexts/globalContext";
import { useForm } from "../../hooks/useForm";
import { pathAuth } from "../../routes/Path";
import {
	ButtonPrimaryPurple,
	ButtonPrimaryWhite,
	ControlGrid,
} from "../../shared/components";
import AuthModel from "./AuthModel";

const initialForm = {
	email: "",
};
const ResetPassword = () => {
	const navigate = useNavigate();
	const { resetPassword } = useGlobal();
	const { form, handleChange } = useForm(initialForm);
	const handleLogin = () => navigate(`${pathAuth}/login`);

	return (
		<AuthModel
			title={"Resetear Contraseña"}
			form={form}
			onChange={handleChange}
			action={resetPassword}
			resetPassword={true}
			typeAction="resetPassword"
		>
			<ControlGrid>
				<ButtonPrimaryWhite type="button" onClick={handleLogin}>
					Tengo Cuenta
				</ButtonPrimaryWhite>
				<ButtonPrimaryPurple type="submit">
					Continuar
				</ButtonPrimaryPurple>
			</ControlGrid>
		</AuthModel>
	);
};

export default ResetPassword;
