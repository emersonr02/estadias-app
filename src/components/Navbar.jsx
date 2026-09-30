
function Navbar() {
    return (
        <nav className='navbar'>
            <div className='container'>
                <a className='navbar__brand' href="#alojamentos">Estadias</a>
                <div className='navbar__links'>
                    <a className='navbar__link' href="#">Alojamnetos</a>

                    <a className='navbar__link' href="#favoritos">Favoritos</a>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;