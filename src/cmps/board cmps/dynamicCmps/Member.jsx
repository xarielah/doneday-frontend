/* eslint-disable react/prop-types */
import { AvatarGroup, Avatar, Dialog, Icon, DialogContentContainer, IconButton, Text, Button, AttentionBox, AttentionBoxLink } from "@vibe/core";
import { Add, Search } from "@vibe/icons";
import { useState, useMemo } from "react";
import { debounce } from "../../../services/util.service";

export function Member({ info, onTaskUpdate }) {
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

    const toggleMemberSelection = (memberName, isCtrlPressed) => {
        setSelectedMembers((prev) => {
            if (isCtrlPressed) {
                // Toggle selection
                return prev.includes(memberName)
                    ? prev.filter((name) => name !== memberName)
                    : [...prev, memberName];
            } else {
                // Single selection
                return prev.includes(memberName) ? [] : [memberName];
            }
        });
    };

    const filteredMembers = info?.filter((member) =>
        member.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
    
    const avatarMax = (info.length > 3 ? 3 : info.length)

    return (
        <div className="column-label-members default-cell-color" style={{width: '100%'}} onMouseEnter={() => handleMouseChanges(true)} onMouseLeave={() => handleMouseChanges(false)}>
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
                            <AttentionBox
                                title="Did you know?"
                                text="Hold Crl for multiple selection"
                            />
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
                    {info?.length > 0 && info?.map((member) => 
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
}