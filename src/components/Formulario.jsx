import { useState } from "react";

export default function Formulario({ alojamento }) {
    const [dataEntrada, setDataEntrada] = useState("");
    const [dataSaida, setDataSaida] = useState("");
    const [hospedes, setHospedes] = useState(1);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");

    let noites = 0;
    if (dataEntrada && dataSaida) {
        const diferenca = new Date(dataSaida) - new Date(dataEntrada);
        noites = diferenca / (1000 * 60 * 60 * 24);
    }
    const total = noites > 0 ? noites * alojamento.precoNoite : 0;

    function handleSubmit(evento) {
        evento.preventDefault();
        console.log({ dataEntrada, dataSaida, hospedes, nome, email });
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="form__linha">
                <div className="form__grupo">
                    <label className="form__label" htmlFor="entrada">Entrada</label>
                    <input
                        id="entrada"
                        type="date"
                        className="input"
                        value={dataEntrada}
                        onChange={e => setDataEntrada(e.target.value)}
                    />
                </div>

                <div className="form__grupo">
                    <label className="form__label" htmlFor="saida">Saída</label>
                    <input
                        id="saida"
                        type="date"
                        className="input"
                        value={dataSaida}
                        onChange={e => setDataSaida(e.target.value)}
                    />
                </div>
            </div>

            <div className="form__grupo">
                <label className="form__label" htmlFor="hospedes">
                    Hóspedes (máx. {alojamento.capacidade})
                </label>
                <input
                    id="hospedes"
                    type="number"
                    className="input"
                    min="1"
                    max={alojamento.capacidade}
                    value={hospedes}
                    onChange={e => setHospedes(e.target.value)}
                />
            </div>

            <div className="form__grupo">
                <label className="form__label" htmlFor="nome">Nome</label>
                <input
                    id="nome"
                    type="text"
                    className="input"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                />
            </div>

            <div className="form__grupo">
                <label className="form__label" htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    className="input"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>

            {noites > 0 && (
                <p className="form__resumo">
                    {noites} {noites === 1 ? "noite" : "noites"} × {alojamento.precoNoite} € = <strong>{total} €</strong>
                </p>
            )}

            <button type="submit" className="btn btn--primario btn--bloco">
                Reservar
            </button>
        </form>
    );
}