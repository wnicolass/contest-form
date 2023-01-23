function validateName(event) {
  const inputControl = event.target;
  const errorSymbol = inputControl.nextElementSibling;
  if (
    !/^(([A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ]{2,})\s([A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ]{2,}\s?))+$/.test(
      inputControl.value
    )
  ) {
    errorSymbol.innerHTML = "&#x274C";
  } else {
    errorSymbol.innerHTML = "";
  }
}

function validateEmail(event) {
  const emailInput = event.target;
  const errorSymbol = emailInput.nextElementSibling;

  if (!/^\w+@\w+\.[a-zA-Z]{2,}$/.test(emailInput.value)) {
    errorSymbol.innerHTML = "&#x274C";
  } else {
    errorSymbol.innerHTML = "";
  }
}

function main() {
  const nameInput = document.getElementById("fullName");
  const emailInput = document.getElementById("email");

  nameInput.addEventListener("input", (event) => validateName(event));
  emailInput.addEventListener("input", (event) => validateEmail(event));
}

window.addEventListener("load", main);
