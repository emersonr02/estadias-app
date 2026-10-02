import AlojamentoCard from "./AlojamentoCard";

function AlojamentoList({alojamentos, 
    favoritos, 
    onAlternarFavorito, 
    onVerDetalhe
}) {
    if (alojamentos.length === 0) {
        return (
            <p className="estado estado--vazio">
                Não existem alojamentos para mostrar.
            </p>
        );
    }

    return (
        <div className="grelha">
            {alojamentos.map((alojamento) => (
                <AlojamentoCard
                    key={alojamento.id}
                    alojamento={alojamento}
                    favorito={favoritos.includes(alojamento.id)}
                    onAlternarFavorito={onAlternarFavorito}
                    onVerDetalhe={onVerDetalhe} />
            ))}
        </div>
    );
}

export default AlojamentoList;