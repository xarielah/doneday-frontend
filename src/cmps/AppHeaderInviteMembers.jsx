import { Heading, Text, TextField } from "@vibe/core";
import { Modal, ModalBasicLayout, ModalContent, ModalFooter, ModalHeader } from "@vibe/core/next";
import { useState } from "react";

const AppHeaderInviteMembers = ({ show, onClose, onInviteMember }) => {
    const [email, setEmail] = useState('')
    const [reason, setReason] = useState('')

    const handleChange = (field, value) => {
        if (field === 'email') setEmail(value)
        else if (field === 'reason') setReason(value)
    }

    return <Modal
        show={show}
        size="medium"
        className="app-header-invite-modal"
        description="Your invite request will be sent to your admin for approval"
        onClose={onClose}>
        <ModalBasicLayout>

            <ModalHeader
                title={
                    <Heading
                        type="h1">
                        Invite to doneday
                    </Heading>
                }
                description={
                    <Text
                        type='text2'
                        color='secondary'
                        element='span'>
                        Your invite request will be sent to your admin for approval
                    </Text>
                }
            />

            <ModalContent>
                <div className="app-header-invite-content">
                    <TextField
                        onChange={(value) => handleChange('email', value)}
                        name="email"
                        id="email"
                        className="app-header-invite-textfield"
                        size="medium"
                        title="Invite with email"
                        placeholder="Enter one or more email addresses"
                        type="email"
                    />
                    <TextField
                        onChange={(value) => handleChange('reason', value)}
                        name="reason"
                        id="reason"
                        className="app-header-invite-textfield"
                        size="medium"
                        title="Reason for request (optional)"
                        placeholder="Add a note for your invitee"
                    />
                </div>
            </ModalContent>

        </ModalBasicLayout>

        <ModalFooter
            primaryButton={{
                text: "Send Request",
                onClick: () => onInviteMember({ email, reason })
            }}
        />
    </Modal>
}

export default AppHeaderInviteMembers;