import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({children}) {
    return(
        <div className="app">
            <Navbar />
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