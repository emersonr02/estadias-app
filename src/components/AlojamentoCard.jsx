import AlojamentoImage from "./AlojamentoImage";
import ButtonFavorite from "./ButtonFavorite";
import Rate from "./Rate";

function AlojamentoCard({
    alojamento, 
   favorito, 
   onAlternarFavorito, 
    onVerDetalhe}) {
    
        return(
            <article className="cartao">
                <AlojamentoImage
                    imagem={alojamento.imagem}
                    nome={alojamento.nome}
                    className="cartao__imagem" 
                />
                <ButtonFavorite 
                    favorito = {favorito}
                    onAlternar={()=> onAlternarFavorito(alojamento.id)}
                />

                <div className="cartao__corpo">
                     <h2 className="cartao__titulo">
                        {alojamento.nome}
                     </h2>
                     <p className="cartao__meta">
                        <span>{alojamento.localizacao}</span>
                        <span className="etiqueta">{alojamento.categoria}</span>
                     </p>

                     <Rate valor={alojamento.avaliacao} />

                     <div className="cartao__rodape">
                        <p className="cartao__preco">
                            {alojamento.precoNoite} €
                            <small>/noite</small>
                        </p>

                        <button type="button" 
                                className="btn btn--primario"
                                onClick={() => onVerDetalhe(alojamento.id)}>
                        Ver detalhe 

                        </button>
                     </div>
                </div>
            </article>
        );
}

export default AlojamentoCard;