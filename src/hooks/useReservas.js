// src/hooks/useReservas.js
import { useState, useEffect } from "react";

import { API } from "../config";

export default function useReservas() {
    const [reservas, setReservas] = useState([]);
    const [aCarregar, setACarregar] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        setACarregar(true);
        setErro(null);

        fetch(`${API}/reservas`)
            .then(resposta => {
                if (!resposta.ok) {
                    throw new Error("Erro ao aceder à API");
                }
                return resposta.json();
            })
            .then(dados => {
                setReservas(dados);
                setACarregar(false);
            })
            .catch(() => {
                setErro("Erro ao carregar as reservas");
                setACarregar(false);
            });
    }, []);

    function cancelarReserva(id) {
        return fetch(`${API}/reservas/${id}`, { method: "DELETE" })
            .then(resposta => {
                if (!resposta.ok) {
                    throw new Error("Não foi possível cancelar a reserva");
                }

                setReservas(prev => prev.filter(reserva => reserva.id !== id));
            });
    }

    return { reservas, aCarregar, erro, cancelarReserva };
}