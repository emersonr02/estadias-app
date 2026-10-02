

const CHAVE = "minhasReservas";

export function lerIdsReservas() {
    const texto = localStorage.getItem(CHAVE);
    return texto ? JSON.parse(texto) : [];
}

export function guardarIdReserva(id) {
    const ids = lerIdsReservas();
    ids.push(id);
    localStorage.setItem(CHAVE, JSON.stringify(ids));
}
