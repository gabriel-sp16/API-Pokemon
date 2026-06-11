const btnGerar = document.querySelector('#btn-gerar');
const divResta = document.querySelector('#resta');

btnGerar.addEventListener('click', chamarGarcomAPI);

function chamarGarcomAPI() {
    // Gera um ID aleatório baseado nos Pokémons da API (1 até 1025)
    const numeroRandom = Math.floor(Math.random() * 1025) + 1;

    // Efetua a requisição HTTP (O Garçom buscando os dados)
    fetch(`https://pokeapi.co/api/v2/pokemon/${numeroRandom}`)
        .then((response) => response.json()) // Converte a resposta bruta para JSON
        .then((data) => {
            // Repassa o objeto tratado para a função de renderização
            gerarCardPokemon(data);
        })
        .catch((error) => console.error("Erro ao buscar dados do Pokémon:", error));
}

function gerarCardPokemon(data) {
    // Extração das propriedades necessárias do objeto JSON da API
    const nome = data.name;
    const id = data.id;
    const tipo = data.types[0].type.name;

    // Mapeamento seguro da imagem padrão (fallback se o sprite não existir)
    const imagem = data.sprites.front_default || "https://via.placeholder.com/120";

    // Estrutura HTML que será montada de forma dinâmica no DOM
    divResta.innerHTML = `
        <div class="card">
            <img src="${imagem}" alt="${nome}">
            <div class="container">
                <div class="title">
                    <h1>${nome}</h1>
                    <p>#${id}</p>
                </div>
                <p id="poison">${tipo}</p>
            </div>
        </div>
    `;
}