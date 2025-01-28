import { Heading, Text, TextField } from "@vibe/core";
import { Modal, ModalBasicLayout, ModalContent, ModalFooter, ModalHeader } from "@vibe/core/next";
import { useState } from "react";

export const AddBoardCmp = ({ show, onClose, onAddBoard }) => {
    const [name, setName] = useState('')

    return <Modal
        show={show}
        size="medium"
        className="board-nav-add-modal"
        description="Adding a board"
        onClose={onClose}>
        <ModalBasicLayout>

            <ModalHeader
                title={
                    <Heading
                        type="h1">
                        Create board
                    </Heading>
                }
            />

            <ModalContent>
                <div className="board-nav-add-content">
                    <TextField
                        name="name"
                        id="name"
                        className="board-nav-name-textfield"
                        size="medium"
                        title="Board name"
                        placeholder="New Board Name"
                        type="text"
                        onChange={setName}
                    />
                </div>
            </ModalContent>

        </ModalBasicLayout>

        <ModalFooter
            primaryButton={{
                text: "Add Board",
                onClick: () => onAddBoard(name)
            }}
            secondaryButton={{
                onClick: onClose,
                text: 'Cancel'
            }}
        />
    </Modal>
}

