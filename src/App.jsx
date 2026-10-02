import './estadia.css'


function lerFavoritos() {
    try {
        const texto = localStorage.getItem("estadias-favoritos");
        const dados = texto ? JSON.parse(texto) : [];

        // Confirma o formato e elimina IDs repetidos.
        return Array.isArray(dados)
            ? [...new Set(dados.filter((id) => Number.isInteger(id)))]
            : [];
    } catch {
        return [];
    }
}


function App() {

  
}

export default App;