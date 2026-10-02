import { useEffect, useState } from "react";
import {API} from "./config";
import AlojamentoDetail from './components/AlojamentoDetail';
import AlojamentoFilter from './components/AlojamentoFilter';
import AlojamentoList from './components/AlojamentoList';
import Layout from './components/Layout';
import MinhasReservas from './components/MinhasReservas'


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
    //dados da API e estado de loading
    const [alojamentos, setAlojamentos] = useState([]);
    const [aCarregar, setACarregar] = useState(true);
    const [erro, setErro] = useState("");

    //valores nos campos dos filtros
    const [pesquisa, setPesquisa] = useState("");
    const [cidade, setCidade] = useState("");
    const [tipologia, setTipologia] = useState("");
    const [ordenacao, setOrdenacao] = useState("");

    //Vista diferencia a lista completa da lista de favoritos
    // O id selecionado retorna o detalhe
    const [vista, setVista] = useState("alojamentos");
    const [idSelecionado, setIdSelecionado] = useState(null);

    //A função de lerFavoritos só é usada para iniciar o estado
    const [favoritos, setFavoritos] = useState(lerFavoritos);
    const [erroFavoritos, setErroFavoritos] = useState("");


    useEffect(() => {
        const controlador = new AbortController();

        async function carregarAlojamentos() {
            try {
                const resposta = await fetch(
                    `${API}/itens`,
                    { signal: controlador.signal }
                );

                if (!resposta.ok) {
                    throw new Error("Não foi possível carregar os alojamentos.");
                }

                const dados = await resposta.json();
                setAlojamentos(dados);
            } catch (erro) {
                if (erro.name !== "AbortError") {
                    setErro(erro.message);
                }
            } finally {
                if (!controlador.signal.aborted) {
                    setACarregar(false);
                }
            }
        }

        carregarAlojamentos();

        return () => controlador.abort();
    }, []);

    function alternarFavorito(id) {
        // A atualização usa a lista mais recente do estado.
        const novosFavoritos = favoritos.includes(id)
            ? favoritos.filter((favoritoId) => favoritoId !== id)
            : [...favoritos, id];

        setFavoritos(novosFavoritos);

        try {
        // Guarda a nova lista para a próxima visita.
        localStorage.setItem(
            "estadias-favoritos",
            JSON.stringify(novosFavoritos)
        );

        // Limpa mensagem de erro anterior
        setErroFavoritos("");
    } catch {
        // A seleção continua a funcionar no estado do React,
        // mesmo que o browser não permita guardar os dados.
        setErroFavoritos(
            "Os favoritos funcionam nesta sessão, mas não foi possível guardá-los no browser."
        );
    }
    }

    function navegar(destino) {
        setVista(destino);
        setIdSelecionado(null);

        // Ao clicar pela Navbar, os filtros começam limpos.
        setPesquisa("");
        setCidade("");
        setTipologia("");
        setOrdenacao("");
    }

    //Set elimina repetições.
    const cidades = [
        ...new Set(alojamentos.map((item) => item.localizacao))
    ].sort();

    const tipologias = [
        ...new Set(alojamentos.map((item) => item.categoria))
    ].sort((a, b) => a.localeCompare(b, "pt", { numeric: true }));

    // Ignora maiúsculas e espaços no início e no fim da pesquisa.
    const texto = pesquisa.trim().toLowerCase();

    // Esta lista é calculada a partir dos estados; não precisa de outro useState.
    const alojamentosVisiveis = alojamentos.filter((item) => {
        const correspondeTexto =
            item.nome.toLowerCase().includes(texto) ||
            item.descricao.toLowerCase().includes(texto);

        const correspondeCidade =
            cidade === "" || item.localizacao === cidade;

        const correspondeTipologia =
            tipologia === "" || item.categoria === tipologia;

        const correspondeVista =
            vista !== "favoritos" || favoritos.includes(item.id);

        return (
            correspondeTexto &&
            correspondeCidade &&
            correspondeTipologia &&
            correspondeVista
        );
    });

    // filter criou um novo array, por isso não alteramos o estado original.
    if (ordenacao === "preco-crescente") {
        alojamentosVisiveis.sort((a, b) => a.precoNoite - b.precoNoite);
    } else if (ordenacao === "preco-decrescente") {
        alojamentosVisiveis.sort((a, b) => b.precoNoite - a.precoNoite);
    } else if (ordenacao === "avaliacao") {
        alojamentosVisiveis.sort((a, b) => b.avaliacao - a.avaliacao);
    }

    return (
        <Layout
            vista={vista}
            onNavegar={navegar}
            totalFavoritos={favoritos.length}
        >
            {erroFavoritos && (
                <p className="alerta alerta--aviso" role="alert">
                    {erroFavoritos}
                </p>
            )}

            {vista === "reservas" ? (
                <MinhasReservas />
            ) : idSelecionado !== null ? (
                <AlojamentoDetail
                    // Um ID diferente cria um detalhe com estado inicial novo.
                    key={idSelecionado}
                    id={idSelecionado}
                    favorito={favoritos.includes(idSelecionado)}
                    onAlternarFavorito={alternarFavorito}
                    onVoltar={() => setIdSelecionado(null)}
                />
            ) : (
                <>
                    <h1 className="page-title">
                        {vista === "favoritos"
                            ? "Os meus favoritos"
                            : "Alojamentos disponíveis"}
                    </h1>

                    {aCarregar && (
                        <p className="estado">A carregar alojamentos...</p>
                    )}

                    {erro && (
                        <p className="alerta alerta--erro" role="alert">
                            {erro}
                        </p>
                    )}

                    {!aCarregar && !erro && (
                        <>
                            <AlojamentoFilter
                                pesquisa={pesquisa}
                                setPesquisa={setPesquisa}
                                cidade={cidade}
                                setCidade={setCidade}
                                tipologia={tipologia}
                                setTipologia={setTipologia}
                                ordenacao={ordenacao}
                                setOrdenacao={setOrdenacao}
                                cidades={cidades}
                                tipologias={tipologias}
                            />

                            <p className="filtros__resultado">
                                Resultados: {alojamentosVisiveis.length}
                            </p>

                            <AlojamentoList
                                alojamentos={alojamentosVisiveis}
                                favoritos={favoritos}
                                onAlternarFavorito={alternarFavorito}
                                onVerDetalhe={setIdSelecionado}
                            />
                        </>
                    )}
                </>
            )}
        </Layout>
    );
}

export default App;