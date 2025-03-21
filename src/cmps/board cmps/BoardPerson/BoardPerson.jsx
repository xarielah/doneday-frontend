import { Avatar, Button, Dialog, DialogContentContainer, Heading, Icon } from "@vibe/core";
import { Person } from "@vibe/icons";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export function BoardPerson() {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const allMembers = useSelector(storeState => storeState.boardModule.members)

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    return (
        <section className="board-person">

            <Dialog
                modifiers={[{ name: "preventOverflow", options: { mainAxis: false } }]}
                open={isDialogOpen}
                showTrigger={isDialogOpen ? [] : null}
                onClickOutside={isDialogOpen && handleCloseDialog}
                zIndex={1010}
                content={
                    <DialogContentContainer size="large">
                        <div className="space-y-4">
                            <Heading type="h3" weight="light">
                                All available members
                            </Heading>
                            <div
                                style={{
                                    display: "flex",
                                    gap: "3px",
                                    flexWrap: "wrap",
                                    marginBottom: "10px",
                                    marginTop: "10px"
                                }}
                            >
                                {allMembers?.length > 0 &&
                                    allMembers.map((member) => (
                                        <Avatar
                                            key={member.name}
                                            type="text"
                                            size="small"
                                            text={member.name.substring(0, 1)}
                                            // src={member.imgUrl ? member.imgUrl : undefined}
                                            backgroundColor={
                                                member?.color ? member.color : "black"
                                            }
                                        />
                                    ))}
                            </div>
                        </div>
                    </DialogContentContainer>
                }
                position="bottom"
            >
                <Button className="icon-button" size="small" ariaLabel="Person" kind="tertiary" onClick={setDialogOpen}>
                    <Icon iconSize={20} icon={Person} /> Person
                </Button>
            </Dialog>
        </section>
    )
}