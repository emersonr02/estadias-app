function ButtonFavorite({favorito, onAlternar, noCard = true}) {
    //o icone fica sobre a imagem apenas quando esta num card
    const classe = noCard
        ? `cartao__favorito${favorito ? " cartao__favorito--ativo" : ""}`
        : "btn btn--secundario";

    const texto = favorito
        ? "Remover dos favoritos"
        : "Adicionar aos favoritos";
    
    return (
        <button
            type="button"
            className={classe}
            onClick={onAlternar}
            aria-label={texto}
            aria-pressed={favorito}
        >
            <span aria-hidden="true">{favorito ? "♥" : "♡"}</span>
            {!noCard && <span>{texto}</span>}
        </button>
    );
}

export default ButtonFavorite;