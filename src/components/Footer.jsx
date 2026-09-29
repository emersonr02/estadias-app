function Footer(){
    const anoAtual = new Date().getFullYear();
    
    return(
        <footer>
            <p>&copy; {anoAtual} </p>
        </footer>
    );
}

export default Footer;