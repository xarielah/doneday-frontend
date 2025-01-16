import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import AppHeaderInviteMembers from './AppHeaderInviteMembers'
import AppHeaderList from './AppHeaderList'
import AppHeaderLogo from './AppHeaderLogo'

export function AppHeader() {
	const [showInvite, setShowInvite] = useState(false);

	// const user = useSelector(storeState => storeState.userModule.user)
	// const navigate = useNavigate()

	const handleInviteMember = (inviteDetails) => {
		console.log(inviteDetails);
	}

	const handleOpenNotifications = () => {
		console.log('open notifications');
	}

	return (
		<header className="app-header full">
			<AppHeaderInviteMembers
				show={showInvite}
				onClose={() => setShowInvite(false)}
				onInviteMember={handleInviteMember}
			/>
			<AppHeaderLogo />
			<AppHeaderList
				onToggleInvite={() => setShowInvite(true)}
				onOpenNotifications={handleOpenNotifications}
			/>
		</header >
	)
}

