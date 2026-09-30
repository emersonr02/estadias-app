import { useState } from "react";
import { API } from "../config";
import { guardarIdReserva } from "../utils/reservas";

export default function Formulario({ alojamento }) {
    const [dataEntrada, setDataEntrada] = useState("");
    const [dataSaida, setDataSaida] = useState("");
    const [hospedes, setHospedes] = useState(1);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");

    const [erro, setErro] = useState("");
    const [reservaFeita, setReservaFeita] = useState(null);
    const [aEnviar, setAEnviar] = useState(false);

    let noites = 0;
    if (dataEntrada && dataSaida) {
        noites = (new Date(dataSaida) - new Date(dataEntrada)) / (1000 * 60 * 60 * 24);
    }
    const total = noites > 0 ? noites * alojamento.precoNoite : 0;

    async function handleSubmit(evento) {
        evento.preventDefault();
        setErro("");
        setReservaFeita(null);
        setAEnviar(true);

        try {
            const resposta = await fetch(`${API}/reservas`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    itemId: Number(alojamento.id),
                    dataInicio: dataEntrada,
                    dataFim: dataSaida,
                    quantidade: Number(hospedes),
                    nome: nome,
                    email: email,
                }),
            });
            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(dados.erro);
            }

            guardarIdReserva(dados.id);
            setReservaFeita(dados);
        } catch (e) {
            setErro(e.message);
        }

        setAEnviar(false);
    }

    return (
        <form className="form" onSubmit={handleSubmit} noValidate>
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

            {erro && <p className="alerta alerta--erro">{erro}</p>}

            {reservaFeita && (
                <p className="alerta alerta--sucesso">
                    Reserva confirmada! Total: {reservaFeita.total} €
                </p>
            )}

            <button type="submit" className="btn btn--primario btn--bloco" disabled={aEnviar}>
                {aEnviar ? "A reservar..." : "Reservar"}
            </button>
        </form>
    );
}
