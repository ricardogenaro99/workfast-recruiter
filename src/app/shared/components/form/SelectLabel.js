import { useEffect, useState } from "react";
import Select from "react-select";
import {
	ContainerErrors,
	ContainerInputSelectLabelWithErrors,
	ContainerSelectLabel
} from "./StyledFormComponents";

const SelectLabel = ({
	label,
	onChange,
	options,
	name,
	formReview = [],
	value,
}) => {
	const [errors, setErrors] = useState([]);
	const [optionSelect, setOptionSelect] = useState([]);

	useEffect(() => {
		const res = formReview.find((e) => e.name === name);
		setErrors(res ? res.errors : []);
	}, [formReview, name]);

	useEffect(() => {
		const data = options[name].map((op) => {
			return op.labelValue
				? { label: op.labelValue, value: op.labelValue, name }
				: { ...op.labelValue, name };
		});
		setOptionSelect(data);
	}, [name, options]);

	const customStyle = {
		control: (base) => ({
			...base,
			border: "0 !important",
			boxShadow: "0 !important",
			"&:hover": {
				border: "0 !important",
			},
		}),
	};

	return (
		<ContainerInputSelectLabelWithErrors>
			<ContainerSelectLabel>
				<span>{label}</span>
				{value ? (
					<Select
						options={optionSelect}
						onChange={onChange}
						styles={customStyle}
						value={optionSelect.filter((e) => e.value === value)}
					/>
				) : (
					<Select
						options={optionSelect}
						onChange={onChange}
						styles={customStyle}
					/>
				)}
			</ContainerSelectLabel>
			{errors.length !== 0 && (
				<ContainerErrors>
					{errors.map((error, i) => (
						<span key={i} className="input-error">
							{error}
						</span>
					))}
				</ContainerErrors>
			)}
		</ContainerInputSelectLabelWithErrors>
	);
};

export default SelectLabel;
