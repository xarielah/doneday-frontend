import { Button, Dialog, DialogContentContainer, Heading, IconButton, Link, Text, TextField } from "@vibe/core";
import {
    Modal,
    ModalBasicLayout,
    ModalContent,
    ModalFooter,
    ModalHeader
} from "@vibe/core/next";
import { Add, CloseSmall } from "@vibe/icons";
import { useEffect, useState } from 'react';

export function LinkColumn({ info, onTaskUpdate }) {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [link, setLink] = useState(info?.link || "");
    const [displayText, setDisplayText] = useState(info?.displayText || "");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [canSubmit, setCanSubmit] = useState(false);

    useEffect(() => {
        if (!link || !isValidUrl(link) || !displayText) {
            setCanSubmit(false);
        } else {
            setCanSubmit(true);
        }
    }, [link, displayText])

    const handleOpenDialog = () => {
        if (info) {
            setLink(info.link);
            setDisplayText(info.displayText);
        }
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const isValidUrl = (url) => {
        try {
            const parsedUrl = new URL(url);
            return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
        } catch (error) {
            return false;
        }
    };


    const handleSubmit = () => {
        const saveLinkStructure = {
            link,
            displayText
        }
        onTaskUpdate(saveLinkStructure);
        setDialogOpen(false);
    };

    const handleMouseChanges = (status) => {
        setPreviewVisible(status);
    };

    const handleDeleteLink = () => {
        onTaskUpdate({ link: "", displayText: "" });
        setDialogOpen(false);
        setIsModalOpen(false);
    }
    const EditableLink = ({ href, text }) => {
        const handleLinkClick = (e) => {
            e.preventDefault();
            handleOpenDialog();
        };

        return (
            <Link
                href={href}
                text={text}
                onClick={handleLinkClick}
                style={{ cursor: 'pointer' }}
            />
        );
    };

    return (
        <div
            className="column-label column-label-link default-cell-color"
            style={{ justifyContent: 'center', height: '100%', display: 'flex' }}
            onMouseEnter={() => handleMouseChanges(true)}
            onMouseLeave={() => handleMouseChanges(false)}
        >
            {!info?.link && previewVisible && (
                <Dialog
                    modifiers={[{ name: "preventOverflow", options: { mainAxis: false, padding: '5' } }]}
                    open={isDialogOpen}
                    showTrigger={isDialogOpen ? [] : null}
                    onClickOutside={isDialogOpen && handleCloseDialog}
                    zIndex={1010}
                    content={
                        <DialogContentContainer size="large">
                            <div className="space-y-4">
                                <Heading type="h3" weight="bold">
                                    Link
                                </Heading>
                                <Heading type="h5" weight="light">
                                    Write or paste a link
                                </Heading>
                                <div className="input-container">
                                    <TextField
                                        label="Link URL"
                                        placeholder="https://example.com"
                                        value={link || ""}
                                        onChange={(e) => setLink(e.trim())}
                                        className="link-input"
                                    />
                                </div>
                                <div className="input-container">
                                    <TextField
                                        label="Text to Display"
                                        placeholder="Example Text"
                                        value={displayText || ""}
                                        onChange={(e) => setDisplayText(e.trim())}
                                        className="link-input"
                                    />
                                </div>
                                <div className="mt-4 flex justify-center space-x-2">
                                    <Button
                                        onClick={handleSubmit}
                                        disabled={!canSubmit}
                                        size='small'
                                        position="center"
                                        style={{ marginTop: ".5rem" }}>
                                        Submit
                                    </Button>
                                </div>
                            </div>
                        </DialogContentContainer>
                    }
                    position="bottom"
                >
                    <IconButton size="xxs" className="addMembersIcon rounded-btn custom" kind="primary" ariaLabel="Add Link" onClick={handleOpenDialog}>
                        <Add />
                    </IconButton>
                </Dialog>
            )}

            {info?.link.length > 0 && (
                <Dialog
                    modifiers={[{ name: "preventOverflow", options: { mainAxis: false } }]}
                    open={info && isDialogOpen}
                    showTrigger={null}
                    onClickOutside={handleCloseDialog}
                    zIndex={1010}
                    content={
                        <DialogContentContainer size="large">
                            <div className="space-y-4">
                                <Heading type="h3" weight="bold">
                                    Edit Link
                                </Heading>
                                <div className="input-container">
                                    <TextField
                                        label="Link URL"
                                        placeholder="https://example.com"
                                        value={link}
                                        onChange={(e) => setLink(e.trim())}
                                        className="link-input"
                                    />
                                </div>
                                <div className="input-container">
                                    <TextField
                                        label="Text to Display"
                                        placeholder="Example Text"
                                        value={displayText}
                                        onChange={(e) => setDisplayText(e.trim())}
                                        className="link-input"
                                    />
                                </div>
                                <div className="mt-4 flex justify-center space-x-2">
                                    <Button onClick={handleSubmit} size='small' position="center" style={{ marginTop: ".5rem" }}>
                                        Update
                                    </Button>
                                </div>
                            </div>
                        </DialogContentContainer>
                    }
                    position="bottom"
                >
                    <div className="mt-4 flex justify-end space-x-2 infoOutput" onClick={() => handleOpenDialog()} onMouseEnter={() => handleMouseChanges(true)} onMouseLeave={() => handleMouseChanges(false)}>
                        <Link
                            href={info.link}
                            text={info.displayText}
                            onClick={(e) => e.stopPropagation()} />
                        {previewVisible && (
                            <IconButton
                                icon={CloseSmall}
                                size="xxs"
                                className="rounded-btn"
                                kind="tertiary"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsModalOpen(true);
                                }}
                            />
                        )}
                        <Modal
                            id="modal-basic"
                            show={isModalOpen}
                            size="small"
                            onClose={(e) => {
                                e.stopPropagation();
                                setIsModalOpen(false);
                            }}
                        >
                            <ModalBasicLayout>
                                <ModalHeader title="Want to delete?" />
                                <ModalContent>
                                    <Text type="text1" align="inherit" element="p">
                                        Are you sure you want to delete this link?
                                    </Text>
                                </ModalContent>
                            </ModalBasicLayout>
                            <ModalFooter
                                primaryButton={{
                                    text: "Confirm",
                                    onClick: (e) => {
                                        e.stopPropagation();
                                        handleDeleteLink(false);
                                    },
                                }}
                                secondaryButton={{
                                    text: "Cancel",
                                    onClick: (e) => {
                                        e.stopPropagation();
                                        setIsModalOpen(false);
                                    },
                                }}
                            />
                        </Modal>
                    </div>
                </Dialog>
            )}
        </div>
    );
}