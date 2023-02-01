export function validateRequiredField({ target: input }, regex) {
  const errorElement = input.nextElementSibling;
  if (!regex.test(input.value)) {
    errorElement.innerHTML = "&#x274C";
    input.classList.add("error");
  } else {
    errorElement.innerHTML = "";
    input.classList.remove("error");
  }
}

export function validateUnrequiredField({ target: input }, regex) {
  const errorElement = input.nextElementSibling;

  if (!regex.test(input.value)) {
    errorElement.innerHTML = "&#x274C";
  } else {
    errorElement.innerHTML = "";
  }

  if (input.value.length === 0) {
    errorElement.innerHTML = "";
  }
}

export function confirmPassword({ target }, passwordInput) {
  const confirmPasswordInput = target;
  const errorElement = confirmPasswordInput.nextElementSibling;

  if (confirmPasswordInput.value !== passwordInput.value) {
    errorElement.innerHTML = "&#x274C";
    passwordInput.classList.add("error");
  } else {
    errorElement.innerHTML = "&#x2713";
    errorElement.style.color = "#0f0";
    passwordInput.nextElementSibling.innerHTML = "&#x2713";
    passwordInput.nextElementSibling.style.color = "#0f0";
    passwordInput.classList.remove("error");
  }
}

export function validateIfTermIsChecked(terms) {
  if (!terms.checked) {
    terms.nextElementSibling.nextElementSibling.innerHTML = "&#x274C";
    return true;
  }

  terms.nextElementSibling.nextElementSibling.innerHTML = "";
  return false;
}

function displaySuccessOrErrorMessage(hasError) {
  const allInputGroups = document.querySelectorAll(".input-control");
  const resultElement = document.getElementById("result");
  const message = resultElement.firstElementChild;

  if (hasError) {
    message.textContent =
      "Não foi possível concluir a inscrição. Utilizador já registrado!";
    message.className = "fail";
    resultElement.style.display = "block";
  } else {
    message.textContent = "Inscrição realizada com sucesso";
    message.className = "success";
    allInputGroups.forEach((input) => (input.style.display = "none"));
    resultElement.style.display = "block";
  }
}

async function handleData(dataToStore) {
  const res = await fetch("http://localhost:8000/inscrever", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToStore),
  });
  const data = await res.json();
  return data;
}

export async function fetchData() {
  const inputs = document.querySelectorAll("input");
  const selectElement = document.querySelector("select");
  const data = {};
  inputs.forEach((input) => {
    data[input.name] = input.value;
  });
  data[selectElement.name] = selectElement.value;

  try {
    const myObj = await handleData(data);
    alert(myObj);
  } catch (error) {
    console.error(error.message);
  }
}

function validateInputs() {
  const inputs = document.querySelectorAll("input:not([type='checkbox'])");
  return Array.from(inputs).some(
    (input) =>
      input.classList.contains("error") ||
      (input.classList.contains("required") && input.value.trim() === "")
  );
}

export function validateForm(event) {
  event.preventDefault();

  const terms = document.getElementById("terms");
  let hasError = false;

  hasError = validateInputs();
  if (hasError) {
    return;
  }

  hasError = validateIfTermIsChecked(terms);
  if (!hasError) {
    displaySuccessOrErrorMessage(hasError);
  }
}
