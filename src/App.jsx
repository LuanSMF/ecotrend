import { useEffect,useState } from 'react'
import carrinhosvg from './assets/icons/shopping-cart.svg'
import lixosvg from './assets/icons/trash.svg'
import maissvg from './assets/icons/plus.svg'
import menossvg from './assets/icons/minus.svg'
import './App.css'

function App() {

  const[produtos,setProdutos] = useState([]);
  const[carregando,setCarregando] = useState(true);
  const[erro,setErro] = useState("");
  const [processando, setProcessando] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);

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

  function processarPedido(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const compraAprovada = Math.random() >0.2;

        if(compraAprovada){
          resolve("Compra finalizada com sucesso");
        }else{
          reject(new Error("Não foi possível finalizara compra."));
        }
      },2000);
    })
  }

  async function finalizarCompra(){
    if(carrinho.length === 0){
      setMensagem("Adicione pelo menos um produto ao carrinho.");
      return;
    }
    setProcessando(true);
    setMensagem("");

    try{
      const resultado = await processarPedido();

      setMensagem(resultado);
      setCarrinho([]);

      setTimeout(() =>{
        setMensagem("");
      },3000);
    }catch (erroCapturado){
      setMensagem(erroCapturado.message);
    } finally{
      setProcessando(false);
    }
  }



  return (
    <>
      <main>
        <header>
        <h1><span>Ecotrend</span></h1>
        {/* <p>Produtos sustentáveis para um futuro melhor.</p> */}
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
        <div className="contador">
  <button
    id="mostrar"
    onClick={() => setCarrinhoAberto(!carrinhoAberto)}
  >
    <img src={carrinhosvg} alt="Carrinho" />
    {carrinho.length}
  </button>
</div>
        </header>
          <h2>Produtos</h2>
        <section>
          {carregando && (
            <div className='loading'>
              <div className='spinner'></div>
              <p>Carregando produtos...</p>
            </div>
          )}
          {erro && <p>{erro}</p>}

          {!carregando && !erro && produtosFiltrados.map((produto) => (
          <article key={produto.id}>
            <h3>{produto.nome}</h3>
            <h4>{produto.categoria}</h4>
            <p>{produto.preco}</p>
            <button onClick={() => AdicionarAoCarrinho(produto)}>Adicionar ao carrinho</button>
          </article>
        ))}
        </section>
        <aside data-aberto={carrinhoAberto}>
          <h2>Carrinho</h2>
          {carrinho.length === 0?(
            !mensagem &&<p>O carrinho está vazio.</p>
          ):(
            <ul>
              <p>Itens do carrinho: {carrinho.length}</p>
              <p>Total: {totalCarrinho.toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}</p>
              {carrinho.map((item,index)=>(
                <li key={item.id}>
                <span><strong>{item.nome}</strong> — Quantidade: <strong>{item.quantidade}</strong></span>
                  <button onClick={() => removerDoCarrinho(index)}>
                    <img src={lixosvg} />
                  </button>
                  <button onClick={() => adicionarMaisUm(index)}>
                    <img src={maissvg} />
                  </button>
                  {item.quantidade > 1 &&(
                  <button onClick={() => removerMaisUm(index)}>
                    <img src={menossvg} />
                  </button>
                  )}
                </li>
              ))}
              {carrinho.length > 0 && (
                <button className="botao-finalizar" onClick={finalizarCompra} disabled={processando}>
                  {processando ? "Processando..." : "Finalizar compra"}
                </button>
                )}
            </ul>
          )}
          {mensagem && (
                  <p className="mensagem-compra">{mensagem}</p>
                )}
        </aside>
      </main>
    </>
  )
}

export default App
