

function Navbar({onNavegar, totalFavoritos}) {

    function navegar(evento, destino) {
        evento.preventDefault();
        onNavegar(destino);
    }

    return (
        <nav className='navbar'>
            <div className='container'>
                <a
                    className="navbar__brand"
                    href="#alojamentos"
                    onClick={(evento) => navegar(evento, "alojamentos")}
                >
                    Estadias
                </a>
                <div className='navbar__links'>
                    <a
                        className="navbar__link"
                        href="#alojamentos"
                        onClick={(evento) => navegar(evento, "alojamentos")}
                    >
                        Alojamentos
                    </a>

                    <a
                        className="navbar__link"
                        href="#favoritos"
                        onClick={(evento) => navegar(evento, "favoritos")}
                    >
                        Favoritos
                        <span className="navbar__badge">
                            {totalFavoritos}
                        </span>
                    </a>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;