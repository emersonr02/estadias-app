// Guarda no browser (localStorage) os ids das reservas feitas neste computador

const CHAVE = "minhasReservas";

// Devolve a lista de ids guardados, por exemplo [3, 7]
export function lerIdsReservas() {
    const texto = localStorage.getItem(CHAVE);
    return texto ? JSON.parse(texto) : [];
}

// Acrescenta um id à lista
export function guardarIdReserva(id) {
    const ids = lerIdsReservas();
    ids.push(id);
    localStorage.setItem(CHAVE, JSON.stringify(ids));
}
