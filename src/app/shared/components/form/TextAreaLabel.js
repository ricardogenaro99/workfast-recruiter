import { useEffect, useId, useState } from "react";
import {
	ContainerErrors,
	ContainerInputTextAreaLabel,
	ContainerInputSelectLabelWithErrors
} from "./StyledFormComponents";

const TextAreaLabel = ({
	name,
	placeholder,
	label,
	value,
	onChange,
	formReview,
}) => {
	const inputId = useId();
	const [errors, setErrors] = useState([]);

	useEffect(() => {
		if (formReview) {
			const res = formReview.find((e) => e.name === name);
			setErrors(res ? res.errors : []);
		}
	}, [formReview, name]);

	return (
		<ContainerInputSelectLabelWithErrors>
			<ContainerInputTextAreaLabel>
				<label htmlFor={inputId}>{label}</label>
				<textarea
					id={inputId}
					placeholder={placeholder}
					name={name}
					value={value}
					onChange={onChange}
					rows={8}
				></textarea>
			</ContainerInputTextAreaLabel>
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

export default TextAreaLabel;
