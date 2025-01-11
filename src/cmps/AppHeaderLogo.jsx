import { Text } from "@vibe/core";
import { Link } from "react-router-dom";

const AppHeaderLogo = () => {
    return <section className='app-header-logo'>
        <Link to='/'>
            <span className='app-header-text-and-img'>
                <img src="https://cdn.monday.com/images/logos/monday_logo_icon.png" alt="Doneday logo" className='company-logo' style={{ display: 'inline' }} />
                <Text type='text1' element='h1' color='primary' style={{ margin: '0' }}>
                    <b>monday</b><span style={{ fontWeight: '300' }}>.com</span>
                </Text>
            </span>
        </Link>
    </section>
}

export default AppHeaderLogo;