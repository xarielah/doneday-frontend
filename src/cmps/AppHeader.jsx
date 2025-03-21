import { useState } from 'react';
import { panelTypes, togglePanel } from '../services/sidePanel.service';
import AppHeaderInviteMembers from './AppHeaderInviteMembers';
import AppHeaderList from './AppHeaderList';
import AppHeaderLogo from './AppHeaderLogo';

export function AppHeader() {
	const [showInvite, setShowInvite] = useState(false);

	const handleInviteMember = (inviteDetails) => {
		console.log(inviteDetails);
	}

	const handleOpenNotifications = () => {
		togglePanel(panelTypes.notifications)
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

