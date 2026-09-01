import { useEffect,useState } from 'react'
import './App.css'
import carrinhosvg from './assets/icons/shopping-cart.svg'
import lixosvg from './assets/icons/trash.svg'
import maissvg from './assets/icons/plus.svg'
import menossvg from './assets/icons/minus.svg'

function App() {

  const[produtos,setProdutos] = useState([]);
  const[carregando,setCarregando] = useState(true);
  const[erro,setErro] = useState("");

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



  return (
    <>
      <main>
        <header>
          <h1><span>Eco</span>trend</h1>
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
          {produtosFiltrados.map((produto) =>(
          <article key={produto.id}>
            <h3>{produto.nome}</h3>
            <h4>R${produto.preco}</h4>
            <p>{produto.categoria}</p>
            <button onClick={() => AdicionarAoCarrinho(produto)}>Adicionar ao carrinho</button>
          </article>
        ))}
        </section>
        <aside  data-aberto={carrinhoAberto}>
          <h2>Carrinho</h2>
          {carrinho.length === 0?(
            <p>O carrinho está vazio.</p>
          ):(
            <ul>
              <p>Total: {totalCarrinho.toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}</p>
              {carrinho.map((item,index)=>(
                <li key={item.id}>
                <span><strong>{item.nome}</strong> — Quantidade: <strong>{item.quantidade}</strong></span>
                <button onClick={() => adicionarMaisUm(index)}>
                    <img src={maissvg} />
                  </button>
                  <button onClick={() => removerMaisUm(index)}>
                    <img src={menossvg} />
                  </button>
                  <button onClick={() => removerDoCarrinho(index)}>
                    <img src={lixosvg} />
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
