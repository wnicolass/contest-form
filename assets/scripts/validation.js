const participants = JSON.parse(localStorage.getItem("participants")) || {};

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

function participantAlreadyExists(participantIdentifier) {
  return (
    participantIdentifier in JSON.parse(localStorage.getItem("participants"))
  );
}

function handleUserData(event) {
  const formData = new FormData(event.target);
  const participantEmail = formData.get("email");

  if (participantAlreadyExists(participantEmail)) {
    return true;
  }

  participants[participantEmail] = {
    name: formData.get("fullName"),
    phone: formData.get("phone"),
    birthdate: formData.get("birthdate"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    level: formData.get("level"),
    terms: formData.get("terms"),
  };

  localStorage.setItem("participants", JSON.stringify(participants));
  return false;
}

export function validateForm(event) {
  event.preventDefault();

  const allInputs = document.querySelectorAll("input:not([type='checkbox'])");
  const terms = document.getElementById("terms");
  let hasError = false;

  hasError = Array.from(allInputs).some(
    (input) =>
      input.classList.contains("error") ||
      (input.classList.contains("required") && input.value.trim() === "")
  );
  if (hasError) {
    return;
  }

  hasError = validateIfTermIsChecked(terms);
  if (!hasError) {
    hasError = handleUserData(event);
    displaySuccessOrErrorMessage(hasError);
  }
}
