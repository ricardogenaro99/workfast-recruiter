import { Fragment, useEffect, useState } from "react";
import { useGlobal } from "../../contexts/globalContext";
import { API_USERS } from "../../endpoints/apis";
import { helpHttp } from "../../helpers/helpHttp";
import { useForm } from "../../hooks/useForm";
import {
	ButtonPrimaryPurple,
	ControlGrid,
	FormDefault,
	InputLabel,
} from "../../shared/components";
import SelectLabel from "../../shared/components/form/SelectLabel";
import { SectionTitle } from "../../shared/templates";
import { formIsValid, validateForm } from "../../shared/utils/generalFunctions";

const initialForm = {
	name: "",
	lastname: "",
	city: "",
	country: "",
	email: "",
};

const options = {
	country: [{ labelValue: "Perú" }],
	city: [
		{ labelValue: "Lima" },
		{ labelValue: "Arequipa" },
		{ labelValue: "Callao" },
	],
};

const ConfigurarCuenta = () => {
	const { setLoading, getUserDb, userId, setPopPup, isConfComplete } =
		useGlobal();
	const { form, handleChange, setForm } = useForm(initialForm);
	const [error, setError] = useState(null);
	const [clickSubmit, setClickSubmit] = useState(false);
	const [formReview, setFormReview] = useState([]);

	useEffect(() => {
		const getData = async () => {
			try {
				const data = await getUserDb();
				if (data) {
					setForm(data.details);
				}
				setError(null);
			} catch (e) {
				setError({ statusText: `${e.name}: ${e.message}` });
			}
		};
		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (clickSubmit) {
			setFormReview(validateForm(form));
		}
	}, [form, clickSubmit]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		setClickSubmit(true);
		const res = formIsValid(form);
		if (res) {
			try {
				setLoading(true);
				const optionsPost = {
					body: {
						userId,
						details: form,
					},
				};
				await helpHttp().post(`${API_USERS}/save-details`, optionsPost);
				setLoading(false);
				setPopPup("Se guardo exitosamente!");
				if (!isConfComplete) window.location.reload();
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		}
	};

	const handleSelectChange = (e) => {
		const { name, value } = e;
		setForm({ ...form, [name]: value });
	};

	return (
		<SectionTitle
			title="Configura los datos básicos de tu cuenta"
			error={error?.statusText}
		>
			{userId && !error && (
				<FormDefault onSubmit={handleSubmit}>
					<Fragment>
						<InputLabel
							label="Nombres"
							name="name"
							placeholder="Ingrese sus nombres"
							value={form.name}
							onChange={handleChange}
							formReview={formReview}
						/>
						<InputLabel
							label="Apellidos"
							name="lastname"
							placeholder="Ingrese sus apellidos"
							value={form.lastname}
							onChange={handleChange}
							formReview={formReview}
						/>
						<SelectLabel
							label="Seleccione su País"
							name={"country"}
							options={options}
							onChange={handleSelectChange}
							value={form.country}
							formReview={formReview}
						/>
						<SelectLabel
							label="Seleccione su Ciudad"
							name={"city"}
							options={options}
							onChange={handleSelectChange}
							value={form.city}
							formReview={formReview}
						/>
					</Fragment>
					<ControlGrid columns={3}>
						<ButtonPrimaryPurple type="submit">Guardar</ButtonPrimaryPurple>
					</ControlGrid>
				</FormDefault>
			)}
		</SectionTitle>
	);
};

export default ConfigurarCuenta;
