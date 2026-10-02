function AlojamentoImage({ imagem, nome, className }){
    if (!imagem) {
        return (
            <div className={className}>
                Sem imagem disponível
            </div>
        );
    }

    return (
        <img className={className}
             src={imagem}
             alt={nome}/>
    );
}

export default AlojamentoImage;