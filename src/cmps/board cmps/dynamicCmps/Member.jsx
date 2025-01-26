/* eslint-disable react/prop-types */
import { AvatarGroup, Avatar, Dialog, Icon, DialogContentContainer, IconButton, Text, Button, AttentionBox } from "@vibe/core";
import { Add, Search } from "@vibe/icons";
import { useState, useMemo } from "react";
import { debounce } from "../../../services/util.service";

export function Member({ info, allMembers, onTaskUpdate }) {
    
    const [infoState, setInfoState] = useState(info);
    const [allAvailableMembers, setAllAvailableMembers] = useState(allMembers);
    const [isAddButtonVisible, setisAddButtonVisible] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [selectedMembers, setSelectedMembers] = useState([]);

    const openDialog = () => setIsDialogOpen(true);
    const closeDialog = () => setIsDialogOpen(false);

    function handleMouseChanges(status) {
        setisAddButtonVisible(status);
        if(status === false) {
            setIsDialogOpen(false)
            setSelectedMembers([]); // reset selectedMembers upon dialog close
        }
    }

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
        onTaskUpdate(updatedInfo);
        setInfoState(updatedInfo);
    };

    const toggleMemberSelection = (memberName, isCtrlPressed) => {
        setSelectedMembers((prev) => {
            if (prev.includes(memberName)) {
                return prev;
            }

            let updatedMembers;
    
            if (isCtrlPressed) {
                // Toggle selection
                updatedMembers = prev.includes(memberName)
                    ? prev.filter((name) => name !== memberName)
                    : [...prev, memberName];
            } else {
                // Single selection
                updatedMembers = prev.includes(memberName) ? [] : [memberName];
            }
    
            // Call the service with the updated members
            updateServiceWithMembers(updatedMembers);
    
            return updatedMembers;
        });
    };

    const updateServiceWithMembers = (newMembers) => {
        setInfoState((prevInfo) => {
            const structuredMembers = newMembers.map((memberName) => {
                const member = allMembers.find((m) => m.name === memberName);
                if (member) {
                    return { name: member.name, color: member.color };
                }
            });
            
            if(!structuredMembers) {
                alert('No member data found.')
                return;
            }
            
            const updatedInfo = [...prevInfo, ...structuredMembers];
    
            const updatedAllAvailableMembers = allAvailableMembers.filter((member) => 
                !newMembers.some((newMember) => 
                    newMember === member.name
                )
            );
            
            setAllAvailableMembers(updatedAllAvailableMembers);
    
            return updatedInfo;
        });
    };

    const filteredMembers = allAvailableMembers?.filter((member) =>
        member.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
    
    console.log(`Updated all members: ${allAvailableMembers}`);

    const avatarMax = (infoState.length > 3 ? 3 : infoState.length)

    return (
        <div style={{width: '100%'}} onMouseEnter={() => handleMouseChanges(true)} onMouseLeave={() => handleMouseChanges(false)}>
            {isDialogOpen && (
                    <Dialog
                        isOpen={isDialogOpen}
                        onClose={closeDialog}
                        title="Add Members"
                        width="large"
                        position="top"
                        zIndex="99"
                    >
                        <DialogContentContainer className="addMemberDialog" size="large" type="modal">
                            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
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
                                                marginTop: 0
                                            }}
                                            aria-label={`Remove ${member.name}`}
                                        >
                                            <Avatar
                                                type="text"
                                                text={member.name.substring(0, 2)}
                                                backgroundColor={member?.color || "#6200ea"} // Default to purple
                                                ariaLabel={member.name}
                                                size="small"
                                            />
                                        </button>
                                        <span style={{ marginLeft: "8px", marginRight: "8px" }}>{member.name}</span>
                                        <button
                                            onClick={() => handleRemoveMember(member.name)}
                                            style={{
                                                background: "none",
                                                border: "none",
                                                color: "#999",
                                                cursor: "pointer",
                                                fontSize: "16px",
                                                marginTop: 0
                                            }}
                                            aria-label={`Remove ${member.name}`}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                                <Icon
                                    icon={Search}
                                    iconLabel="Search"
                                    style={{ marginRight: '8px', color: '#888' }}
                                />
                                <input
                                    type="text"
                                    placeholder="Search members based on their name"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    style={{
                                        flex: 1,
                                        padding: '8px',
                                        borderRadius: '4px',
                                        border: '1px solid #ddd',
                                    }}
                                />
                            </div>

                            {/* Members List */}
                            <Text type="text2" weight="light" style={{marginBottom: '5px'}}>
                                Suggested People
                            </Text>
                            <AvatarGroup size="medium">
                                {filteredMembers.length > 0 && filteredMembers?.map((member) => 
                                    <Button
                                        key={member.name}
                                        kind={selectedMembers.includes(member.name) ? "primary" : "tertiary"}
                                        style={{ flex: '0 1 100%', justifyContent: 'left' }}
                                        onClick={(e) =>
                                            toggleMemberSelection(member.name, e.ctrlKey || e.metaKey)
                                        }
                                    >
                                        <div
                                            key={member.name}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                marginBottom: '0',
                                                color: '#000'
                                            }}
                                        >
                                            <Avatar key={member.name}
                                                type="text"
                                                text={member.name.substring(0, 1)}
                                                backgroundColor={(member?.color ? member.color : 'black')}
                                                ariaLabel="Team 1"
                                                size="small"
                                            />
                                            <span style={{marginLeft: '5px'}}>{member.name}</span>
                                        </div>
                                    </Button>
                                )}
                            </AvatarGroup>
                        </DialogContentContainer>
                    </Dialog>
                )}
            <div className="avatars">
                {isAddButtonVisible && <IconButton className="addMembers" iconType="svg" icon={Add} iconLabel="Add Members" size="small" onClick={openDialog} />}
                <AvatarGroup
                    size="medium"
                    max={avatarMax}
                    counterProps={{
                        ariaLabelItemsName: "teams",
                    }}
                >
                    {infoState?.length > 0 && infoState?.map((member) => 
                        (
                            <Avatar key={member.name}
                                type="text"
                                text={member.name.substring(0, 1)}
                                backgroundColor={(member?.color ? member.color : 'black')}
                                ariaLabel="Team 1"
                            />
                        )
                    )}

                </AvatarGroup>
            </div>

        </div>
    )
    return (<div>{infoState?.length > 0 && infoState?.map((member) => member.name + ", ")}</div>)
}