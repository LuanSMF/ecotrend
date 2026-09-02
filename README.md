# 🌱 EcoTrend

E-commerce especializado em produtos sustentáveis e ecológicos, focado em promover um estilo de vida mais consciente. O projeto foi desenvolvido como parte do **Check-point 04 — Web Development with JS**, da disciplina de Engenharia de Software.

🔗 **Acesse a aplicação:** [ecotrend.vercel.app](https://ecotrend.vercel.app/)

## 📋 Sobre o projeto

O EcoTrend reúne produtos sustentáveis divididos em categorias como roupas e acessórios, produtos de beleza e cuidados pessoais naturais, itens para casa e tecnologia verde. A aplicação foi construída em React, com foco em manipulação do DOM, persistência de dados local, consumo de JSON e requisições assíncronas.

## ✨ Funcionalidades

- **Catálogo de produtos**: carregamento assíncrono dos produtos via `fetch`, com spinner de carregamento enquanto os dados são buscados.
- **Filtro por categoria**: exibição dinâmica dos produtos (Todos, Casa, Roupas, Tecnologia) sem recarregar a página.
- **Carrinho de compras dinâmico**: adição, remoção e ajuste de quantidade dos itens, com atualização instantânea na interface.
- **Persistência do carrinho**: os itens adicionados ficam salvos no `localStorage`, permanecendo mesmo após fechar e reabrir o navegador.
- **Checkout simulado**: finalização de compra usando `Promises` e `async/await`, com mensagens de sucesso ou erro exibidas de forma assíncrona.

## 🛠️ Tecnologias utilizadas

- **React** — biblioteca para construção da interface
- **JavaScript (ES6+)** — lógica da aplicação, manipulação do DOM e requisições assíncronas
- **Vite** — build tool e ambiente de desenvolvimento
- **CSS** — estilização

## 🚀 Como rodar o projeto localmente

```bash
# Clone o repositório
git clone https://github.com/LuanSMF/ecotrend.git

# Acesse a pasta do projeto
cd ecotrend

# Instale as dependências
npm install

# Rode em modo de desenvolvimento
npm run dev
```

## 👥 Equipe

- João Nóbrega — RM 570322
- Kevin Simões — RM 571942
- Luan Sá — RM 569136
- Flávia Camerim — RM 570979

## 📄 Licença

Projeto acadêmico desenvolvido para fins educacionais.