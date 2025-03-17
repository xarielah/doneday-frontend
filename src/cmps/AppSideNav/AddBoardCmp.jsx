import { Heading, TextField } from "@vibe/core";
import { Modal, ModalBasicLayout, ModalContent, ModalFooter, ModalHeader } from "@vibe/core/next";

export const AddBoardCmp = ({ setAddedBoard, onDuplicateBoard, addedBoard, show, onClose, handleSaveBoard, isDuplicate }) => {
    const btnText = (isDuplicate ? "Duplicate " : "Save ") + "board";

    const modalTitle = isDuplicate ? "Duplicate" : addedBoard._id ? "Edit" : "Create"

    return <Modal
        show={show}
        size="medium"
        className="board-nav-add-modal"
        description="Adding a board"
        onClose={onClose}
    >
        <ModalBasicLayout>
            <ModalHeader title={<Heading type="h1">{modalTitle} board</Heading>} />
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
                        onChange={(name) => setAddedBoard(board => board = { ...board, name })}
                    />
                </div>
            </ModalContent>
        </ModalBasicLayout>
        <ModalFooter
            primaryButton={{
                text: btnText,
                onClick: () => isDuplicate ? onDuplicateBoard() : handleSaveBoard()
            }}
            secondaryButton={{
                onClick: onClose,
                text: 'Cancel'
            }}
        />
    </Modal>
}

