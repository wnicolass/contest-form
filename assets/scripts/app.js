function validateName(event) {
  const inputControl = event.target;
  const errorElement = inputControl.nextElementSibling;
  if (
    !/^(([A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ]{2,})\s([A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ]{2,}\s?))+$/.test(
      inputControl.value
    )
  ) {
   errorElement.innerHTML = "&#x274C";
  } else {
   errorElement.innerHTML = "";
  }
}

function validateEmail(event) {
  const emailInput = event.target;
  const errorElement = emailInput.nextElementSibling;

  if (!/^\w+@\w+\.[a-zA-Z]{2,}$/.test(emailInput.value)) {
   errorElement.innerHTML = "&#x274C";
  } else {
   errorElement.innerHTML = "";
  }
}

function validatePhone(event) {
  const phoneInput = event.target;
  const errorElement = phoneInput.nextElementSibling;

  if (!/(^\d{9}$)|(^\+\d{12}$)/.test(phoneInput.value)) {
    errorElement.innerHTML = "&#x274C";
  } else {
    errorElement.innerHTML = "";
  }

  if (phoneInput.value.length === 0) {
    errorElement.innerHTML = "";    
  }
}

function validadeBirthdate(event) {
  const birthdate = event.target;
  const errorElement = birthdate.nextElementSibling;

  if (!/^((0[1-9])|(1\d)|(2\d)|(3[0-1](?!\/02)))\/((0[1-9])|(1[0-2]))\/((1[8-9]{3})|(20[0-3]\d))$/.test(birthdate.value)) {
    errorElement.innerHTML = "&#x274C";
  } else{
    errorElement.innerHTML = "";
  }

  if(birthdate.value.length === 0) {
    errorElement.innerHTML = "";
  }
}

function main() {
  const nameInput = document.getElementById("fullName");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const birthdateInput = document.getElementById("birthdate");

  nameInput.addEventListener("input", (event) => validateName(event));
  emailInput.addEventListener("input", (event) => validateEmail(event));
  phoneInput.addEventListener("input", (event) => validatePhone(event));
  birthdateInput.addEventListener("input", (event) => validadeBirthdate(event));
}

window.addEventListener("load", main);
