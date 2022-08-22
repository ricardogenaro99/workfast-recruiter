import { Fragment, useEffect, useState } from "react";
import { useGlobal } from "../../contexts/globalContext";
import { API_ENTERPRISES } from "../../endpoints/apis";
import { helpHttp } from "../../helpers/helpHttp";
import { useForm } from "../../hooks/useForm";
import {
	ButtonPrimaryPurple,
	ControlGrid,
	FormDefault,
	InputLabel
} from "../../shared/components";
import SelectLabel from "../../shared/components/form/SelectLabel";
import { SectionTitle } from "../../shared/templates";
import { formIsValid, validateForm } from "../../shared/utils/generalFunctions";

const initialForm = {
	name: "",
	description: "",
	city: "",
	country: "",
	image: "",
};

const options = {
	country: [{ labelValue: "Perú" }],
	city: [
		{ labelValue: "Lima" },
		{ labelValue: "Arequipa" },
		{ labelValue: "Callao" },
	],
};

const ConfigurarEmpresa = () => {
	const { setLoading, getEnterpriseDb, enterpriseId, setPopPup } = useGlobal();
	const { form, handleChange, setForm } = useForm(initialForm);
	const [error, setError] = useState(null);
	const [clickSubmit, setClickSubmit] = useState(false);
	const [formReview, setFormReview] = useState([]);

	useEffect(() => {
		const getData = async () => {
			try {
				const data = await getEnterpriseDb();
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
			setLoading(true);
			const optionsPost = {
				body: {
					enterpriseId,
					details: form,
				},
			};
			await helpHttp().post(`${API_ENTERPRISES}/save-details`, optionsPost);
			setLoading(false);
			setPopPup("Se guardo exitosamente!");
		}
	};

	const handleSelectChange = (e) => {
		const { name, value } = e;
		setForm({ ...form, [name]: value });
	};

	return (
		<SectionTitle
			title="Configura los datos básicos de la empresa"
			error={error?.statusText}
		>
			{enterpriseId && !error && (
				<FormDefault onSubmit={handleSubmit}>
					<Fragment>
						<InputLabel
							label="Nombre"
							name="name"
							placeholder="Ingrese el nombre de la empresa"
							value={form.name}
							onChange={handleChange}
							formReview={formReview}
						/>
						<InputLabel
							label="Descripcion"
							name="description"
							placeholder="Ingrese la descripción de la empresa"
							value={form.description}
							onChange={handleChange}
							formReview={formReview}
						/>
						<SelectLabel
							label="Seleccione el País de la empresa"
							name={"country"}
							options={options}
							onChange={handleSelectChange}
							value={form.country}
							formReview={formReview}
						/>
						<SelectLabel
							label="Seleccione la Ciudad de la empresa"
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

export default ConfigurarEmpresa;
