import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import ExternalDemoButton from "./ExternalDemoButton";

const ExternalHeader = () => {
    const navigate = useNavigate();
    const headerRef = useRef()
    const baseDivRef = useRef()

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    headerRef.current.classList.remove("external-header-sticky");
                } else {
                    headerRef.current.classList.add("external-header-sticky");
                }
            });
        });
        observer.observe(baseDivRef.current);
    }, [])

    return (
        <>
            <div id="intersection-element" style={{ position: 'absolute', top: '0' }} ref={baseDivRef}></div>
            <header className="external-header" ref={headerRef}>
                <div className="external-header-container">
                    <img src="/public/img/logo-transparent.png" alt="logo" className="external-header-logo" />
                    <nav className="external-nav">
                        <section className="external-nav-first-menu">
                            <a
                                className="external-header-button"
                                href="https://github.com/afikyefet/monday-clone-proj"
                                target="_blank">
                                Source code
                            </a>
                        </section>
                        <section className="external-nav-other-options">
                            <Link
                                className="external-header-button"
                                to="/login">
                                Log in
                            </Link>
                            <ExternalDemoButton styles={{ marginLeft: '8px' }} />
                        </section>
                    </nav>
                </div>
            </header >
        </>
    )
}

export default ExternalHeader;