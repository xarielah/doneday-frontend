import { Avatar, Badge } from "@vibe/core";
import { Invite, Notifications } from "@vibe/icons";

const AppHeaderList = ({ onToggleInvite, onOpenNotifications }) => {
    return <section className='app-header-list'>
        <ul>
            <li>
                <button onClick={onOpenNotifications}>
                    <Badge alignment='circular' color='notification' type='indicator' size="small">
                        <Notifications />
                    </Badge>
                </button>
            </li>
            <li>
                <button onClick={onToggleInvite}><Invite /></button>
            </li>
            <li><div className='app-header-logo-divider'></div></li>
            <li className='app-header-user-info'>
                <span className='icon'>
                    <img src="https://cdn.monday.com/images/logos/monday_logo_icon.png" alt="Doneday logo" className='company-logo' />
                </span>
                <span className='abbv'>
                    <Avatar
                        withoutBorder
                        size="medium"
                        type="text"
                        text="AA"
                        backgroundColor="purple"
                        ariaLabel="Ariel Aharon"
                    />
                </span>
            </li>
        </ul>
    </section>
}

export default AppHeaderList;