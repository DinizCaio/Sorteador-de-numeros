//Capturando parametros do sorteio
const quantityInput = document.getElementById("quantity");
const minInput = document.getElementById("minValue");
const maxInput = document.getElementById("maxValue");
const checkboxInput = document.getElementById("checkboxInput");

//Capturando o formulário e seus elementos
const form = document.getElementById("form");

const initial = document.getElementById("initial");
const result = document.getElementById("result");

const numbersList = document.getElementById("numbersList");

const span = document.getElementById("span");
const arrow = document.getElementById("arrow");
const repeat = document.getElementById("repeat");

const btnResetContainer = document.getElementById("btnResetContainer");

//Capturando o evento de input dos campos de parâmetros para permitir apenas números
quantityInput.oninput = () => {
  const quantityValue = quantityInput.value.replace(/\D/g, "");
  quantityInput.value = quantityValue;
};

minInput.oninput = () => {
  const minValue = minInput.value.replace(/\D/g, "");
  minInput.value = minValue;
};

maxInput.oninput = () => {
  const maxValue = maxInput.value.replace(/\D/g, "");
  maxInput.value = maxValue;
};

//Capturando o evento de click do botão de reset para limpar os campos e voltar para a seção inicial
btnResetContainer.addEventListener("click", () => {
  quantityInput.value = "";
  minInput.value = "";
  maxInput.value = "";
  checkboxInput.checked = false;
  initial.classList.remove("hidden");
  result.classList.add("hidden");
  btnResetContainer.classList.add("hidden");
  arrow.classList.remove("hidden");
  repeat.classList.add("hidden");
  span.textContent = "sortear";
});

//Capturando o evento de submit do formulário
form.addEventListener("submit", (event) => {
  event.preventDefault();

  //Convertendo os valores dos campos de texto para números inteiros
  const quantity = parseInt(quantityInput.value);
  const min = parseInt(minInput.value);
  const max = parseInt(maxInput.value);

  //Chama função para verificar os parametros do sorteio
  if (verifyParameters(quantity, min, max)) {
    //Verifica estado do checkbox para gerar números aleatórios únicos ou não
    if (checkboxInput.checked) {
      //Chama função para gerar números aleatórios únicos
      const numbers = generateUniqueRandomNumbers(quantity, min, max);

      showResults(numbers);
    } else {
      //Chama função para gerar números aleatórios (podem ser repetidos)
      const numbers = generateRandomNumbers(quantity, min, max);

      showResults(numbers);
    }
  }
});

//Função para verificar os parametros do sorteio
function verifyParameters(quantity, min, max) {
  try {
    if (quantity === "" || min === "" || max === "") {
      alert("Por favor, preencha todos os campos.");
      return false;
    } else if (quantity <= 0) {
      alert("A quantidade de números deve ser maior que zero.");
      return false;
    } else if (min >= max) {
      alert("O valor mínimo deve ser menor que o valor máximo.");
      return false;
    } else if (checkboxInput.checked && quantity > max - min + 1) {
      alert(
        "A quantidade de números não pode ser maior que o intervalo disponível.",
      );
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
    alert(
      "Ocorreu um erro ao verificar os parâmetros. Por favor, tente novamente.",
    );
  }
}

//Função para gerar números aleatórios únicos
function generateUniqueRandomNumbers(quantity, min, max) {
  try {
    let numbers = [];
    do {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!numbers.includes(randomNumber)) {
        numbers.push(randomNumber);
      }
    } while (numbers.length < quantity);

    //Ordena os números em ordem crescente
    numbers = numbers.toSorted((a, b) => a - b);
    return numbers;
  } catch (error) {
    console.error(error);
    alert(
      "Ocorreu um erro ao gerar os números aleatórios. Por favor, tente novamente.",
    );
  }
}

//Função para gerar números aleatórios (podem ser repetidos)
function generateRandomNumbers(quantity, min, max) {
  try {
    let numbers = [];
    for (let i = 0; i < quantity; i++) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      numbers.push(randomNumber);
    }
    //Ordena os números em ordem crescente
    numbers = numbers.toSorted((a, b) => a - b);
    return numbers;
  } catch (error) {
    console.error(error);
    alert(
      "Ocorreu um erro ao gerar os números aleatórios. Por favor, tente novamente.",
    );
  }
}

const pausar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
//Função para manipular HTML e exibir os resultados do sorteio
async function showResults(numbers) {
  span.textContent = "sortear novamente";
  arrow.classList.add("hidden");
  repeat.classList.remove("hidden");

  //Esconde a seção inicial e exibe a seção de resultado
  initial.classList.add("hidden");
  result.classList.remove("hidden");
  btnResetContainer.classList.remove("hidden");

  //Limpa a lista de números antes de exibir os novos resultados
  numbersList.innerHTML = "";

  for (let i = 0; i < numbers.length; i++) {
    //Cria um elemento "li" para cada número gerado
    const listItem = document.createElement("li");
    const span = document.createElement("span");
    const div = document.createElement("div");

    //Adiciona o número gerado ao elemento "span" e depois ao elemento "li"
    span.textContent = numbers[i];
    listItem.appendChild(span);
    listItem.appendChild(div);
    numbersList.appendChild(listItem);
    div.classList.add("rotation");
    span.classList.add("textIn");

    await pausar(2500);
    div.classList.remove("rotation");
    span.classList.remove("textIn");
  }

  //Adiciona a lista de números ao elemento de resultado
  result.appendChild(numbersList);
}
