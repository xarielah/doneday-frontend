import { Link } from "react-router-dom";

const AppHeaderLogo = () => {
    return <section className='app-header-logo'>
        <Link to='/'>
            <span className='app-header-text-and-img'>
                <img src="/img/logo-transparent.png" alt="Doneday logo" className='company-logo-header' style={{ display: 'inline', minWidth: 'max-content' }} />
            </span>
        </Link>
    </section>
}

export default AppHeaderLogo;