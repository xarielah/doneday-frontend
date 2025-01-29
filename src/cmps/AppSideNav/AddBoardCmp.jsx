import { Heading, Text, TextField } from "@vibe/core";
import { Modal, ModalBasicLayout, ModalContent, ModalFooter, ModalHeader } from "@vibe/core/next";
import { useState } from "react";

export const AddBoardCmp = ({setAddedBoard, onDuplicateBoard, addedBoard, show, onClose, handleAddBoard}) => {


    const btnText = (addedBoard._id ? "Duplicate ": "Add ")+ "board"
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
                        value={addedBoard.name}
                        onChange={(name)=>setAddedBoard(board => board = {...board, name})}
                    />
                </div>
            </ModalContent>

        </ModalBasicLayout>

        <ModalFooter
            primaryButton={{
                text: btnText,
                onClick: () => addedBoard._id ? handleDuplicateBoard() : handleAddBoard()
            }}
            secondaryButton={{
                onClick: onClose,
                text: 'Cancel'
            }}
        />
    </Modal>
}

