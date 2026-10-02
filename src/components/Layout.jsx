import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({children, onNavegar, totalFavoritos}) {
    return(
        <div className="app">
            <Navbar
                onNavegar={onNavegar}
                totalFavoritos={totalFavoritos}
            />
                <main className="container">
                    <div className="section">
                        {children}
                    </div>
                </main>
            <Footer />
        </div>
    );
}

export default Layout;