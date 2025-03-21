import { Avatar, Button, Dialog, DialogContentContainer, Heading, Icon } from "@vibe/core";
import { Person } from "@vibe/icons";
import React, { useEffect, useState } from "react";
import { loadMembers } from "../../../store/actions/board.actions";

export function BoardPerson() {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [allMembers, setAllMembers] = useState([])

    useEffect(() => {
        setAllMembers(loadMembers())
    }, [])

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
                                            key={member.fullname}
                                            type="text"
                                            size="small"
                                            text={member.fullname.substring(0, 1)}
                                            src={
                                                member?.imgUrl ? member.imgUrl : "https://vibe.monday.com/static/media/person1.dd0cd6ea.png"
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