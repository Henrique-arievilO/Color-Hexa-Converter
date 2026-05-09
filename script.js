const inputs = document.querySelectorAll(".container input");
const button = document.querySelector(".button");
const feedback = document.querySelector(".feedback");
const hexaCode = document.querySelector(".hexa-code");
const colorBox = document.querySelector(".color-box");

let isConverted = false;

function showError(message) {
  feedback.classList.add("error");
  feedback.innerText = message;
}

function showHexCode(hexColor) {
  feedback.classList.remove("error");
  feedback.classList.remove("warning");
  feedback.innerHTML = `Código Hex: <span class="codigo-hex">${hexColor}</span>`;
}

function disableInputs() {
  for (const input of inputs) {
    input.disabled = true;
  }
}

function enableInputs() {
  for (const input of inputs) {
    input.disabled = false;
  }
}

function clearInputs() {
  for (const input of inputs) {
    input.value = "";
  }
}

function resetInterface() {
  clearInputs();
  enableInputs();

  feedback.innerHTML = `Código Hex: <span class="codigo-hex"></span>`;

  colorBox.style.backgroundColor = "transparent";

  button.innerText = "Converter cor";

  isConverted = false;
}

function generateHexColor() {
  let hexColor = "#";

  for (const input of inputs) {
    if (input.value === "") {
      showError("Por favor, preencha todos os campos");
      feedback.classList.add("warning");
      return;
    }

    const value = Number(input.value);

    if (value < 0 || value > 255) {
      showError("O valor está fora do intervalo.");
      return;
    }

    const hexValue = value.toString(16).padStart(2, "0");

    hexColor += hexValue;
  }

  showHexCode(hexColor);

  colorBox.style.backgroundColor = hexColor;

  disableInputs();

  button.innerText = "Limpar cor";

  isConverted = true;
}

function handleClick(event) {
  event.preventDefault();

  if (!isConverted) {
    generateHexColor();
  } else {
    resetInterface();
  }
}

button.addEventListener("click", handleClick);
