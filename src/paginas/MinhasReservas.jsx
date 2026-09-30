import useReservas from "../hooks/useReservas";
import { lerIdsReservas } from "../utils/reservas";

export default function MinhasReservas() {
    const { reservas, aCarregar, erro, cancelarReserva } = useReservas();

    // Só as reservas feitas neste browser
    const ids = lerIdsReservas();
    const minhasReservas = reservas.filter(reserva => ids.includes(reserva.id));

    function handleCancelar(id) {
        if (!window.confirm("Queres mesmo cancelar esta reserva?")) {
            return;
        }
        cancelarReserva(id).catch(() => {
            alert("Não foi possível cancelar a reserva. Tenta novamente.");
        });
    }

    return (
        <section>
            <h2>As minhas reservas</h2>

            {aCarregar ? (
                <p className="estado">A carregar...</p>
            ) : erro ? (
                <p className="alerta alerta--erro">{erro}</p>
            ) : minhasReservas.length === 0 ? (
                <p className="estado estado--vazio">Ainda não tens reservas.</p>
            ) : (
                <div className="lista-reservas">
                    {minhasReservas.map(reserva => (
                        <article key={reserva.id} className="reserva">
                            <div className="reserva__cabecalho">
                                <h3>{reserva.itemNome}</h3>
                            </div>

                            <div className="reserva__dados">
                                <p>Entrada: {reserva.dataInicio}</p>
                                <p>Saída: {reserva.dataFim}</p>
                                <p>Hóspedes: {reserva.quantidade}</p>
                                <p>Nome: {reserva.nome}</p>
                            </div>

                            <p className="reserva__total">{reserva.total} €</p>

                            <button
                                className="btn btn--perigo"
                                onClick={() => handleCancelar(reserva.id)}
                            >
                                Cancelar
                            </button>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}