function ButtonFavorite({favorito, onAlternar}) {
    return (
        <button className={favorito ? "cartao__favorito cartao__favorito--ativo"
            : "cartao__favorito"
        }
        onClick={onAlternar}
        aria-label={
            favorito
            ? "Remover dos favoritos"
            : "Adicionar aos favoritos"
        }
        aria-pressed={favorito}>

            {favorito ? "♥" : "♡"}
        </button>
    );
}

export default ButtonFavorite;