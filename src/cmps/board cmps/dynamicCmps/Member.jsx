/* eslint-disable react/prop-types */
import {
    AvatarGroup,
    Avatar,
    Dialog,
    Icon,
    DialogContentContainer,
    IconButton,
    Text,
    Button,
} from "@vibe/core";
import { Add, Search } from "@vibe/icons";
import { useState, useMemo } from "react";
import { debounce } from "../../../services/util.service";

export function Member({ info, allMembers, onTaskUpdate }) {
    const [infoState, setInfoState] = useState(info);
    const [allAvailableMembers, setAllAvailableMembers] = useState(allMembers);
    const [isAddButtonVisible, setIsAddButtonVisible] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [selectedMembers, setSelectedMembers] = useState([]);

    const openDialog = () => setIsDialogOpen(true);
    const closeDialog = () => {
        setIsDialogOpen(false);
        setSelectedMembers([]); // Reset selected members when the dialog is closed
    };

    const onAddMembers = (newMembers) => {
        onTaskUpdate(newMembers);
    };

    const handleMouseChanges = (status) => {
        setIsAddButtonVisible(status);
        if (!status) closeDialog();
    };

    const debouncedUpdate = useMemo(
        () =>
            debounce((value) => {
                setDebouncedSearchTerm(value);
            }, 300),
        []
    );

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        debouncedUpdate(value);
    };

    const handleRemoveMember = (memberName) => {
        const updatedInfo = infoState.filter((member) => member.name !== memberName);
        const memberToRemove = infoState.find((member) => member.name === memberName);

        if (memberToRemove) {
            const updatedAvailableMembers = [
                ...allAvailableMembers,
                { name: memberToRemove.name, color: memberToRemove.color },
            ];

            setInfoState(updatedInfo);
            setAllAvailableMembers(updatedAvailableMembers);
            onTaskUpdate(updatedInfo);
        }
    };

    const toggleMemberSelection = (memberName, isCtrlPressed) => {
        const updatedMembers = isCtrlPressed
            ? selectedMembers.includes(memberName)
                ? selectedMembers.filter((name) => name !== memberName)
                : [...selectedMembers, memberName]
            : selectedMembers.includes(memberName)
            ? []
            : [memberName];

        setSelectedMembers(updatedMembers);

        if (!isCtrlPressed) {
            updateServiceWithMembers(updatedMembers);
        }
    };

    const updateServiceWithMembers = (newMembers) => {
        const structuredMembers = newMembers.map((memberName) => {
            const member = allMembers.find((m) => m.name === memberName);
            return member ? { name: member.name, color: member.color } : null;
        });

        if (!structuredMembers.length) {
            alert("No member data found.");
            return;
        }

        const updatedInfo = [...infoState, ...structuredMembers];
        const updatedAllAvailableMembers = allAvailableMembers.filter(
            (member) => !newMembers.includes(member.name)
        );

        setInfoState(updatedInfo);
        setAllAvailableMembers(updatedAllAvailableMembers);
        onAddMembers(updatedInfo);
    };

    const filteredMembers = (allAvailableMembers ? allAvailableMembers.filter(
        (member) =>
            member.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) &&
            !infoState.some((infoMember) => infoMember.name === member.name)
    ) : '');

    const avatarMax = infoState.length > 3 ? 3 : infoState.length;

    return (
        <div
            className="column-label-members default-cell-color"
            style={{ width: "100%" }}
            onMouseEnter={() => handleMouseChanges(true)}
            onMouseLeave={() => handleMouseChanges(false)}
        >
            {isDialogOpen && (
                <Dialog
                    showTrigger={[]}
                    onClose={closeDialog}
                    title="Add Members"
                    width="large"
                    position="top"
                    zIndex="99"
                    className="dialogMembers"
                >
                    <DialogContentContainer
                        className="addMemberDialog"
                        size="large"
                        type="modal"
                    >
                        <div
                            style={{
                                display: "flex",
                                gap: "8px",
                                flexWrap: "wrap",
                                marginBottom: "20px",
                            }}
                        >
                            {infoState.map((member) => (
                                <div
                                    key={member.name}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        backgroundColor: "#f0f4ff",
                                        borderRadius: "20px",
                                        padding: "0",
                                        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.2)",
                                        fontSize: "12px",
                                        color: "#333",
                                    }}
                                >
                                    <button
                                        onClick={() => handleRemoveMember(member.name)}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            background: "none",
                                            border: "none",
                                            padding: "0",
                                            cursor: "pointer",
                                        }}
                                        aria-label={`Remove ${member.name}`}
                                    >
                                        <Avatar
                                            type="text"
                                            text={member.name.substring(0, 2)}
                                            backgroundColor={member?.color || "#6200ea"}
                                            ariaLabel={member.name}
                                            size="small"
                                        />
                                    </button>
                                    <span style={{ margin: "0 8px" }}>{member.name}</span>
                                    <button
                                        onClick={() => handleRemoveMember(member.name)}
                                        style={{
                                            background: "none",
                                            border: "none",
                                            color: "#999",
                                            cursor: "pointer",
                                            fontSize: "16px",
                                        }}
                                        aria-label={`Remove ${member.name}`}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: "1rem",
                            }}
                        >
                            <Icon
                                icon={Search}
                                iconLabel="Search"
                                style={{ marginRight: "8px", color: "#888" }}
                            />
                            <input
                                type="text"
                                placeholder="Search members based on their name"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                style={{
                                    flex: 1,
                                    padding: "8px",
                                    borderRadius: "4px",
                                    border: "1px solid #ddd",
                                }}
                            />
                        </div>
                        <Text type="text2" weight="light" style={{ marginBottom: "5px" }}>
                            Suggested People
                        </Text>
                        <AvatarGroup size="medium">
                            {filteredMembers.length > 0 &&
                                filteredMembers.map((member) => (
                                    <Button
                                        key={member.name}
                                        kind={
                                            selectedMembers.includes(member.name)
                                                ? "primary"
                                                : "tertiary"
                                        }
                                        style={{
                                            flex: "0 1 100%",
                                            justifyContent: "left",
                                        }}
                                        onClick={(e) =>
                                            toggleMemberSelection(
                                                member.name,
                                                e.ctrlKey || e.metaKey
                                            )
                                        }
                                    >
                                        <div
                                            key={member.name}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                marginBottom: "0",
                                                color: "#000",
                                            }}
                                        >
                                            <Avatar
                                                key={member.name}
                                                type="text"
                                                text={member.name.substring(0, 1)}
                                                backgroundColor={
                                                    member?.color ? member.color : "black"
                                                }
                                                ariaLabel="Team 1"
                                                size="small"
                                            />
                                            <span style={{ marginLeft: "5px" }}>
                                                {member.name}
                                            </span>
                                        </div>
                                    </Button>
                                ))}
                        </AvatarGroup>
                    </DialogContentContainer>
                </Dialog>
            )}
            <div className="avatars">
                {allAvailableMembers &&
                    isAddButtonVisible && (
                        <IconButton
                            className="addMembers"
                            iconType="svg"
                            icon={Add}
                            iconLabel="Add Members"
                            size="small"
                            onClick={openDialog}
                        />
                    )}
                <AvatarGroup
                    size="medium"
                    max={avatarMax}
                    counterProps={{
                        ariaLabelItemsName: "teams",
                    }}
                >
                    {infoState?.length > 0 &&
                        infoState.map((member) => (
                            <Avatar
                                key={member.name}
                                type="text"
                                text={member.name.substring(0, 1)}
                                backgroundColor={
                                    member?.color ? member.color : "black"
                                }
                                ariaLabel="Team 1"
                            />
                        ))}
                </AvatarGroup>
            </div>
        </div>
    );
}
