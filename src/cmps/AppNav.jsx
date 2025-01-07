import { Link, NavLink } from "react-router-dom";


export function AppNav(){
    return (
        <section className="app-nav">
            <nav className="nav">

                <section className="nav-section">
                    <NavLink to={"/1"}>
                        <div className="icon">
                            <img src="/public/img/monday-icons/asset 21.svg" alt="" />
                        </div>
                        <span>Home</span>
                    </NavLink>

                    <NavLink to={"/2"}>
                        <div className="icon">
                            <img src="/public/img/monday-icons/asset 22.svg" alt="" />
                        </div>
                        <span>My work</span>
                    </NavLink>
                </section>

                <div className="divider"></div>

                <section className="nav-section favorite">
                    <Link to={"/3"}>
                        <div className="icon-star">
                           <img src="/public/img/monday-icons/asset 34.svg" alt="" />
                      </div>
                      <span>Favorites</span>
                        <div className="icon">
                           <img src="/public/img/monday-icons/asset 28.svg" alt="" />
                      </div>
                      
                    </Link>
                </section>

                <div className="divider"></div>

                <section className="nav-section">
                    <Link to={"/4"}>
                        <div className="icon">
                            <img src="/public/img/monday-icons/asset 24.svg" alt="" />
                        </div>
                        <span>Workspaces</span>
                    </Link>

                    <Link to={"/4"}>
                        <div className="icon">
                            <img src="/public/img/monday-icons/asset 24.svg" alt="" />
                        </div>
                        <span>Main Workspaces</span>
                    </Link>
                </section>

                <section className="nav-section">
                    <NavLink to={"/5"}>
                        <div className="icon">
                            <img src="/public/img/monday-icons/asset 36.svg" alt="" />
                        </div>
                        <span>monday recreate</span>
                    </NavLink>

                    <NavLink to={"/6"}>
                        <div className="icon">
                            <img src="/public/img/monday-icons/asset 31.svg" alt="" />
                        </div>
                        <span>Dashboard and reporting</span>
                    </NavLink>
                </section>


            </nav>
        </section>
    )
}