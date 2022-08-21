import { useState } from "react";

export const useForm = (initalForm) => {
	const [form, setForm] = useState(initalForm);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	return {
		form,
		setForm,
		handleChange,
	};
};
