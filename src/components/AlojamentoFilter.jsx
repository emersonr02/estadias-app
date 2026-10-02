function AlojamentoFilter({
    pesquisa,
    setPesquisa,
    cidade,
    setCidade,
    tipologia,
    setTipologia,
    ordenacao,
    setOrdenacao,
    cidades,
    tipologias
}) {
    return (
        <div className="filtros">
            <div className="filtros__campo">
                <label className="filtros__label" htmlFor="pesquisa">
                    Pesquisar
                </label>
                <input 
                    id="pesquisa"
                    type="search"
                    className="input"
                    placeholder="Nome ou descrição"
                    value={pesquisa}
                    onChange={(evento) => setPesquisa(evento.target.value)} />
            </div>
            <div className="filtros__campo">
                <label className="filtros__label" htmlFor="cidade">
                    Cidade
                </label>

                <select id="cidade"
                        className="select"
                        value={cidade}
                        onChange={(evento) => setCidade(evento.target.value)}
                >
                    <option value="">Todas as cidades</option>

                    {cidades.map((nome) => (
                        <option key={nome} value={nome}>
                            {nome}
                        </option>
                    ))}
                </select>
            </div>
            <div className="filtros__campo">
                <label className="filtros__label" htmlFor="tipologia">
                    Tipologia
                </label>
                <select id="tipologia"
                        className="select"
                        value={tipologia}
                        onChange={(evento) => setTipologia(evento.target.value)} 
                >
                    <option value="">Todas as tipologias</option>

                    {tipologias.map((tipo)=>(
                        <option key={tipo} value={tipo}>
                            {tipo}
                        </option>
                    ))}
                </select>                
            </div>
            <div className="filtros__campo">
                <label className="filtros__label" htmlFor="ordenacao">
                    Ordenar por
                </label>
                <select id="ordenacao"
                        className="select"
                        value={ordenacao}
                        onChange={(evento) => setOrdenacao(evento.target.value)}
                >
                    <option value="">Sem ordenação</option>
                    <option value="preco-crescente">Menor preço</option>
                    <option value="preco-decrescente">Maior preço</option>
                    <option value="avaliacao">Melhor avaliação</option>
                </select>
            </div>
        </div>
    );
}

export default AlojamentoFilter;