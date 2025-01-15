import ExternalFooter from "../cmps/external-home-page/ExternalFooter";
import ExternalHeader from "../cmps/external-home-page/ExternalHeader";
import ExternalHero from "../cmps/external-home-page/ExternalHero";

const ExternalHomePage = () => {
    return (
        <div className="external-home-page">
            <ExternalHeader />
            <ExternalHero />
            <ExternalFooter />
        </div>
    )
}

export default ExternalHomePage;