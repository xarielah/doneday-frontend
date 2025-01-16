import { Text } from "@vibe/core";
import { LiaLinkedin } from "react-icons/lia";


const ExternalFooter = () => {
    return (
        <footer className="external-footer">
            <div className="external-footer-left-section">
                <img src="/img/text-logo-transparent.png" alt="logo" className="external-footer-logo" />
            </div>
            <div className="external-footer-right-section">
                <section className="external-footer-socials">
                    <a href='https://www.linkedin.com/in/xarielah/' className="external-footer-socials-button">
                        <LiaLinkedin size="24px" className="external-footer-socials-icon" />
                        <span>Ariel Aharon</span>
                    </a>
                    <a href='https://www.linkedin.com/in/dor-cohen-79b182229/' className="external-footer-socials-button">
                        <LiaLinkedin size="24px" className="external-footer-socials-icon" />
                        <span>Dor Cohen</span>
                    </a>
                    <a href='https://www.linkedin.com/in/afik-yefet-906757326/' className="external-footer-socials-button">
                        <LiaLinkedin size="24px" className="external-footer-socials-icon" />
                        <span>Afik Yefet</span>
                    </a>
                </section>
                <Text color="secondary" className="external-footer-copyright">All Rights Reserved © doneday.coding.ac.il</Text>
            </div>
        </footer>
    )
}

export default ExternalFooter;