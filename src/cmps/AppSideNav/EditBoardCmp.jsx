import { Heading, TextField } from "@vibe/core";
import { Modal, ModalBasicLayout, ModalContent, ModalFooter, ModalHeader } from "@vibe/core/next";

export const EditBoardCmp = ({ editedBoard, show, onClose, handleSaveBoard, isDuplicate }) => {


    return <Modal
        show={show}
        size="medium"
        className="board-nav-add-modal"
        description="Editing a board"
        onClose={onClose}
    >
        <ModalBasicLayout>
            <ModalHeader title={<Heading type="h1">Edit board</Heading>} />
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
                        value={editedBoard.name}
                        onChange={(name) => setAddedBoard(board => board = { ...board, name })}
                    />
                </div>
            </ModalContent>
        </ModalBasicLayout>
        <ModalFooter
            primaryButton={{
                text: "Edit",
                onClick: () => handleSaveBoard()
            }}
            secondaryButton={{
                onClick: onClose,
                text: 'Cancel'
            }}
        />
    </Modal>
}

