import React from "react";
import { GrClose } from "react-icons/gr";
import Modal from "react-modal";
import styled from "styled-components";

const ModalStyle = styled(Modal)`
	padding: var(--padding-global);
	background: var(--color-white);
	width: 90%;
	max-width: ${(props) => props.maxWidth || "800px"};
	position: relative;
	border: 1px solid var(--color-grey-ligth);
	display: flex;
	flex-direction: column;
	gap: var(--gap-default-M);
	border-radius: var(--border-radius-global);
	box-shadow: rgb(0 0 0 / 15%) 0px 0px 8px 0px;

	max-height: 98vh;
	overflow: hidden;

	.close-modal {
		position: absolute;
		top: 15px;
		right: 20px;
	}

	.content-modal {
		height: 100%;
		width: 100%;
		overflow: auto;
		padding: 0 5px;
	}
`;
const CustomModal = ({
	modalIsOpen,
	afterOpenModal,
	closeModal,
	children,
	maxWidth,
}) => {
	return (
		<ModalStyle
			isOpen={modalIsOpen}
			onAfterOpen={afterOpenModal}
			onRequestClose={closeModal}
			contentLabel="Modal"
			overlayClassName="Overlay"
			ariaHideApp={false}
			maxWidth={maxWidth}
		>
			<GrClose className="close-modal" onClick={closeModal} cursor="pointer" />
			<div className="content-modal">{children}</div>
		</ModalStyle>
	);
};

export default CustomModal;
