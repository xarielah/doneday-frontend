import { Avatar } from '@vibe/core'
import { Invite, Notifications } from '@vibe/icons'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'

export function AppHeader() {
	const user = useSelector(storeState => storeState.userModule.user)
	const navigate = useNavigate()


	async function onLogout() {
		try {
			await logout()
			navigate('/')
			showSuccessMsg(`Bye now`)
		} catch (err) {
			showErrorMsg('Cannot logout')
		}
	}

	return (
		<header className="app-header full">
			<section className='app-header-logo'>
				<Link to='/'>
					<span className='app-header-text-and-img'>
						<img src="https://cdn.monday.com/images/logos/monday_logo_icon.png" alt="Doneday logo" className='company-logo' style={{ display: 'inline' }} />
						<p><b>doneday</b> ourway is done-way.</p>
					</span>
				</Link>
			</section>
			<section className='app-header-list'>
				<ul>
					<li>
						<Link role="button" to='/notifications'>
							<button><Notifications /></button>
						</Link>
					</li>
					<li>
						<Link to='/invite-members'>
							<button><Invite /></button>
						</Link>
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
		</header >
	)
}
