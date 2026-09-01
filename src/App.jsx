import { useEffect,useState } from 'react'
import './App.css'

function App() {

  const[produtos,setProdutos] = useState([]);
  const[carregando,setCarregando] = useState(true);
  const[erro,setErro] = useState("");

  useEffect(() => {
    async function carregaProdutos(){
      try{
        const resposta= await fetch("/produtos.json");

        if(!resposta.ok){
          throw new Error("Não foi possível carregar os produtos.");
        }

        const dados  = await resposta.json();
        setProdutos(dados);
      }catch(erroCapturado){
        setErro(erroCapturado.message);
      }finally{
        setCarregando(false);
      }
    }

    carregaProdutos();
  },[]);

  
  const [carrinho, setCarrinho] = useState(() => {
    const carrinhosalvo = localStorage.getItem("carrinho");
    if(carrinhosalvo){
      return JSON.parse(carrinhosalvo);
    }
    return [];
  });
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
  useEffect (() =>{
    localStorage.setItem("carrinho",JSON.stringify(carrinho));
  },[carrinho])
  function AdicionarAoCarrinho(produto){
    const produtoExistente = carrinho.find ((item)=> item.id === produto.id);

    if(produtoExistente){
      const carrinhoAtualizado = carrinho.map((item) => {
        if(item.id === produto.id){
          return{
            ...item,quantidade:item.quantidade +1
          };
        }

        return item;
      });

      setCarrinho(carrinhoAtualizado);
    } else {
      const novoitem = {
        ...produto,quantidade: 1
      };

      setCarrinho([...carrinho,novoitem]);
    }
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

  const totalCarrinho = carrinho.reduce((total,item) => {
    return total + item.preco * item.quantidade;
  }, 0);

  function adicionarMaisUm(indexAdicionar){
    const carrinhoAtualizado = carrinho.map((item,index) =>{
      if(index === indexAdicionar){
        return{...item,quantidade:item.quantidade+1};
      }
      return item;
    });
    setCarrinho(carrinhoAtualizado);
  }
  function removerMaisUm(indexAdicionar){
    const carrinhoAtualizado = carrinho.map((item,index) =>{
      if(index === indexAdicionar && item.quantidade>0){
        return{...item,quantidade:item.quantidade-1};
      }
      return item;
    })
    .filter((item) => item.quantidade>0);
    setCarrinho(carrinhoAtualizado);
  }



  return (
    <>
      <main>
        <h1>Ecotrend</h1>
        <p>Itens do carrinho: {carrinho.length}</p>
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
              <p>Total: {totalCarrinho.toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}</p>
              {carrinho.map((item,index)=>(
                <li key={item.id}>
                {item.nome} — Quantidade: {item.quantidade}
                  <button onClick={() => removerDoCarrinho(index)}>
                    Remover
                  </button>
                  <button onClick={() => adicionarMaisUm(index)}>
                    +
                  </button>
                  <button onClick={() => removerMaisUm(index)}>
                    -
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
