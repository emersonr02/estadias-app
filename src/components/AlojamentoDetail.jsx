import { useEffect, useState } from "react";
import ButtonFavorite from "./ButtonFavorite";
import AlojamentoImage from "./AlojamentoImage";


function AlojamentoDetail({
    id,
    favorito,
    onAlternarFavorito,
    onVoltar
}){
    const [alojamento, setAlojamento] = useState(null);
    const [erro, setErro] = useState("");

    useEffect(()=> {
        const controlador = new AbortController();

        async function carregarDetalhe() {
            try {
                const resposta = await fetch(
                    `http://localhost:3001/estadias/itens/${id}`,
                    { signal: controlador.signal }
                );

                if (!resposta.ok) {
                    throw new Error(
                        resposta.status === 404
                            ? "Este alojamento não existe."
                            : "Não foi possível carregar o alojamento."
                    )
                }
                const dados = await resposta.json();
                setAlojamento(dados);
            } catch (erro) {
                if (erro.name !== "AbortError") {
                    setErro(erro.message);
                }
            }
        }

        carregarDetalhe();

        return () => controlador.abort();
    }, [id]);

    return (
        <section>
            <button 
                type="button"
                className="btn btn--secundario"
                onClick={onVoltar}
            >
                Voltar à lista
            </button>

            {erro && (
                <p className="alerta alerta--erro mt-2" role="alert">
                    {erro}
                </p>
            )}

            {!erro && !alojamento && (
                <p className="estado">A carregar alojamento...</p>
            )}

            {!erro && alojamento && (
                <div className="detalhe mt-2">
                    <AlojamentoImage
                        imagem={alojamento.imagem}
                        nome={alojamento.nome}
                        className="detalhe__imagem"
                    />

                    <div className="detalhe__info">
                        <h1 className="detalhe__titulo">
                            {alojamento.nome}
                        </h1>

                        <p className="texto-suave">
                            {alojamento.localizacao} · {alojamento.categoria}
                        </p>

                        //TODO: avaliacao

                        <p className="detalhe__descricao">
                            {alojamento.descricao}
                        </p>

                        <ul className="detalhe__caracteristicas">
                            <li className="caracteristica">
                                {alojamento.quartos} quartos
                            </li>

                            <li className="caracteristica">
                                {alojamento.casasDeBanho} casas de banho
                            </li>

                            <li className="caracteristica">
                                Até {alojamento.capacidade} hóspedes
                            </li>

                            {/* Reutilizamos o mesmo formato para os booleanos. */}
                            {[
                                ["Wi-Fi", alojamento.wifi],
                                ["Piscina", alojamento.piscina],
                                ["Aceita animais", alojamento.aceitaAnimais]
                            ].map(([nome, disponivel]) => (
                                <li
                                    key={nome}
                                    className={
                                        disponivel
                                            ? "caracteristica caracteristica--sim"
                                            : "caracteristica caracteristica--nao"
                                    }
                                >
                                    {nome}
                                    <span className="oculto">
                                        {disponivel ? ": sim" : ": não"}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        <p className="cartao__preco">
                            {alojamento.precoNoite} €
                            <small> / noite</small>
                        </p>

                        <ButtonFavorite
                            favorito={favorito}
                            noCartao={false}
                            onAlternar={() => onAlternarFavorito(id)}
                        />
                    </div>
                </div>
            )}
        </section>
    );
}

export default AlojamentoDetail;