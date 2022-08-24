import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import styled from "styled-components";
import "/node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { styleDefault } from "./StyledFormComponents";

const Container = styled.div`
	${styleDefault}
`;

const RichText = ({ name, onChange, formReview }) => {
	const [editorState, setEditorState] = useState(EditorState.createEmpty());

	useEffect(() => {
		const valueHtml = draftToHtml(
			convertToRaw(editorState.getCurrentContent()),
		);
		onChange({ target: { name, value: valueHtml } });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [editorState]);

	return (
		<Container>
			<Editor
				editorState={editorState}
				wrapperClassName="rich-text-wrapper"
				editorClassName="rich-text-editor"
				onEditorStateChange={setEditorState}
			/>
		</Container>
	);
};

export default RichText;
