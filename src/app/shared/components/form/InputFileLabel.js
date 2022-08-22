import { useEffect, useId, useState } from "react";
import styled from "styled-components";
import {
	ContainerErrors,
	ContainerInputSelectLabelWithErrors,
	ContainerInputTextAreaLabel
} from "./StyledFormComponents";

const InputFile = styled(ContainerInputTextAreaLabel)``;
const InputFileLabel = ({
	value,
	name,
	placeholder,
	label,
	onChange,
	formReview,
	accept = "image/png,image/jpeg",
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
			<InputFile>
				<label htmlFor={inputId}>{label}</label>
				<input
					id={inputId}
					type="file"
					placeholder={placeholder}
					onChange={(e) => onChange(e.target.files[0])}
					accept={accept}
				/>
			</InputFile>
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

export default InputFileLabel;
