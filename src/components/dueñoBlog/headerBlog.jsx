import './css/styleHeaderBlog.css'


const HeaderBlog = () => {
    return (
        <>
            <header className="bg-dark text-white py-3">
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-dark">
                        <a className="navbar-brand d-flex align-items-center" href="#">
                            <img src="../../public/logoBlog.png" alt="Logo" width="50" height="50" className="me-2" />
                            <span className="fs-4">Blogger</span>
                        </a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">

                            <form className="d-flex ms-lg-3">
                                <input className="form-control me-2" type="search" placeholder="Buscar Entrada" aria-label="Search" />
                                <button className="btn btn-outline-light" type="submit">Buscar</button>
                            </form>
                            <div className="perfilUsuario">
                                <div className="btn-group">

                                    <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src="../../public/logoBlog.png" alt="Logo" width="50" height="50" className="me-2" />
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="#">Ver Perfil</a></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><a className="dropdown-item" href="#">Cerrar Session</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>

        </>
    );
}

export default HeaderBlog;