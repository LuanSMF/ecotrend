import { useState } from 'react'
import produtos from "./data/produtos.json";
import './App.css'

function App() {
  const [carrinho, setCarrinho] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");

  function AdicionarAoCarrinho(produto){
    setCarrinho([...carrinho,produto]);
  }
  function removerDoCarrinho(indexRemover){
    const carrinhoAtualizado = carrinho.filter((item,index) => index !== indexRemover);

    setCarrinho(carrinhoAtualizado);
  }

  const produtosFiltrados = produtos.filter((produto) =>{
    if(categoriaSelecionada === "Todos"){
      return true;
    }
    
    return produto.categoria === categoriaSelecionada;
  });


  return (
    <>
      <main>
        <h1>Ecotrend</h1>
        <p>Itens no carrinho: {carrinho.length}</p>
        <p>Produtos sustentáveis para um futuro melhor.</p>
        <div>
          <button onClick={() => setCategoriaSelecionada("Todos")}>
            Todos
          </button>
          <button onClick = {() => setCategoriaSelecionada("Casa")}>
            Casa
          </button>
          <button onClick={() => setCategoriaSelecionada("Roupas")}>
            Roupas
          </button>
          <button onClick={() => setCategoriaSelecionada("Tecnologia")}>
            Tecnologia
          </button>
        </div>
        <section>
          <h2>Carrinho</h2>
          {produtosFiltrados.map((produto) =>(
          <article key={produto.id}>
            <h2>{produto.nome}</h2>
            <p>{produto.categoria}</p>
            <p>{produto.preco}</p>
            <button onClick={() => AdicionarAoCarrinho(produto)}>Adicionar ao carrinho</button>
          </article>
        ))}
        </section>
        <aside>
          <h2>Carrinho</h2>
          {carrinho.length === 0?(
            <p>O carrinho está vazio.</p>
          ):(
            <ul>
              {carrinho.map((item,index)=>(
                <li key={`${item.id}-${index}`}>
                  {item.nome} - R$ {item.preco}
                  <button onClick={() => removerDoCarrinho(index)}>
                    Remover
                  </button>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </main>
    </>
  )
}

export default App
