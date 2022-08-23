import { Fragment, useEffect, useState } from "react";
import { uploadFile } from "../../../config/firebase";
import { useGlobal } from "../../contexts/globalContext";
import { API_JOBS } from "../../endpoints/apis";
import { helpHttp } from "../../helpers/helpHttp";
import { useForm } from "../../hooks/useForm";
import {
  ButtonPrimaryPurple,
  ControlGrid,
  CustomModal,
  FormDefault,
  InputFileLabel,
  InputLabel,
  SelectLabel,
  TextAreaLabel
} from "../../shared/components";
import { SectionTitle } from "../../shared/templates";
import { formIsValid, validateForm } from "../../shared/utils/generalFunctions";

const initialForm = {
	name: "",
	description: "",
	city: "",
	country: "",
	image: "",
	position: "",
};

const options = {
	country: [{ labelValue: "Perú" }],
	city: [
		{ labelValue: "Lima" },
		{ labelValue: "Arequipa" },
		{ labelValue: "Callao" },
	],
};

const AddJob = ({ modalIsOpen, closeModal, addJobList }) => {
	const { setLoading, enterpriseId, setPopPup } = useGlobal();
	const { form, handleChange, setForm } = useForm(initialForm);
	const [clickSubmit, setClickSubmit] = useState(false);
	const [formReview, setFormReview] = useState([]);
	const [file, setFile] = useState();

	useEffect(() => {
		handleChange({ target: { name: "image", value: file?.name || "" } });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [file]);

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
				const urlFile = await uploadFile(file, "jobs");
				const optionsPost = {
					body: {
						enterpriseRef: enterpriseId,
						details: { ...form, image: urlFile },
					},
				};
				const {data} = await helpHttp().post(`${API_JOBS}/save-job`, optionsPost);
				setLoading(false);
				setPopPup("Se guardo exitosamente!");
        addJobList(data)
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
		<CustomModal modalIsOpen={modalIsOpen} closeModal={closeModal}>
			<SectionTitle title="Crear Empleo">
				<FormDefault onSubmit={handleSubmit}>
					<Fragment>
						<InputLabel
							label="Nombre"
							name="name"
							placeholder="Ingrese un nombre para empleo"
							value={form.name}
							onChange={handleChange}
							formReview={formReview}
						/>
						<TextAreaLabel
							label="Descripcion"
							name="description"
							placeholder="Ingrese una descripción para el empleo"
							value={form.description}
							onChange={handleChange}
							formReview={formReview}
						/>
						<InputLabel
							label="Puesto"
							name="position"
							placeholder="Ingrese el puesto del empleo"
							value={form.position}
							onChange={handleChange}
							formReview={formReview}
						/>
						<InputFileLabel
							label="Suba una imagen referente al empleo"
							onChange={setFile}
							formReview={formReview}
							name="image"
							value={form.image}
						/>
						<SelectLabel
							label="Seleccione el País referente al empleo"
							name={"country"}
							options={options}
							onChange={handleSelectChange}
							value={form.country}
							formReview={formReview}
						/>
						<SelectLabel
							label="Seleccione la Ciudad referente al empleo"
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
			</SectionTitle>
		</CustomModal>
	);
};

export default AddJob;
